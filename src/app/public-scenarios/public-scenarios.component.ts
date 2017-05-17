import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { WindowService } from '../shared/window.service';
import { AppStoreService } from '../app-store/app-store.service';
import { AppStoreActions } from '../app-store/app-store.actions';

import { ModalsService } from '../modals/modals.service';
import { PublicScenariosAsyncs } from './public-scenarios.asyncs';

import * as helpers from '../app.helpers';
import { PublicScenario,
         PdfForm,
         ResponseObject,
         ScenarioState,
         ScenarioGenre } from '../interfaces';

import { APP_NAME,
         DEFAULT_SELECT_STATE,
         ERROR_MSG,
         COMMON_MSG } from '../app.constants';

import { PDF_FORM_TXT,
         EMAIL_PATTERN,
         SCENARIO_STATES,
         SCENARIO_GENRES,
         SCENARIO_ACCEPTABLE_MIMETYPE,
         SCENARIO_SIZE_LIMIT_KB,
         SCENARIO_TITLE_MIN_LENGTH,
         SCENARIO_DESCRIPTION_MIN_LENGTH,
         SCENARIO_DESCRIPTION_MAX_LENGTH } from '../public-scenarios/new-scenario-form/new-scenario-form.constants';

import { SCENARIO_FILTER_DROPDOWN_OPTIONS } from '../app.constants';

@Component({
    selector: 'sce-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {

    @ViewChild('fileInputNode') fileInputNode: ElementRef;

    private emailFieldName = 'authorEmail';
    private emailConfirmFieldName = 'authorEmailConfirm';

    public pdfForm: FormGroup;
    public formText: Map<string, string> = PDF_FORM_TXT;
    private acceptableMimetype: string = SCENARIO_ACCEPTABLE_MIMETYPE;
    private acceptableSize: number = SCENARIO_SIZE_LIMIT_KB;

    public formVisible = false;
    private emailPattern: RegExp = EMAIL_PATTERN;

    private fileBlob: Blob;
    private fileName = '';

    public scenarios: PublicScenario[] = [];

    public scenarioStates: ScenarioState[] = SCENARIO_STATES;
    public scenarioGenres: ScenarioGenre[] = SCENARIO_GENRES;

    public selectFilterOptions = SCENARIO_FILTER_DROPDOWN_OPTIONS;

    public selectedState;
    public selectedGenre;

    constructor(
        private appStoreService: AppStoreService,
        private appStoreActions: AppStoreActions,
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private formBuilder: FormBuilder,
        private modalsService: ModalsService,
        private windowService: WindowService
    ) {

        this.pdfForm = formBuilder.group({
            title: [
                '',
                Validators.compose([Validators.required, Validators.minLength(SCENARIO_TITLE_MIN_LENGTH)])
            ],
            authorEmail: [
                '',
                Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])
            ],
            authorEmailConfirm: [
                '',
                Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])
            ],
            genre: [
                '',
                Validators.required
            ],
            state: [
                '',
                Validators.required
            ],
            description: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(SCENARIO_DESCRIPTION_MIN_LENGTH),
                    Validators.maxLength(SCENARIO_DESCRIPTION_MAX_LENGTH)
                ])
            ],
        });

    }

    ngOnInit() {
        this.preparePublicScenarios();
        this.setDefaultStateInForm();
        this.setDefaultGenreInForm();

        // this.pdfTestFunctionality();
    }

    public filterScenarios(scenarios: PublicScenario[] = []): any {

        if (!scenarios.length) {
            return scenarios;
        }

        return scenarios.filter(scenario => scenario[this.appStoreService.getScenarioFilterChoice().category].toLowerCase()
                        .indexOf(this.appStoreService.getScenarioFilterValue().toLowerCase()) !== -1);
    }

    private preparePublicScenarios(): void {
        this.publicScenariosAsyncs.getPublicScenarios().subscribe(
            (res: PublicScenario[]) => {
                this.scenarios = res.map(this.stringifyScenario);
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenariosDownload'));
                this.appStoreActions.setShowError(true);
            }
        );
    }

    private stringifyScenario(scenario: PublicScenario): PublicScenario {
        scenario.state = scenario.state.label;
        scenario.genre = scenario.genre.label;
        scenario.pages = String(scenario.pages);
        return scenario;
    }

    public showAlert(title, message): void {
        this.modalsService.showAlert(title, message);
    }

    public showPrompt(title): Observable<any> {
        return this.modalsService.showPrompt(title);
    }

    public hasError(controlName: string): boolean {

        if (controlName === this.emailConfirmFieldName) {
            return !this.isEmailConfirmed() || !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
        }
        return !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
    }

    public fileChangeEvent(fileInput: any, context: any): void {
        if (fileInput.target.files && fileInput.target.files[0]) {

            const reader = new FileReader(),
                  fileFormat = fileInput.target.files[0].type,
                  fileSize = fileInput.target.files[0].size;

            if (this.isAcceptableMimetype(fileFormat) && this.isAcceptableSize(fileSize)) {

                context.fileName = fileInput.target.files[0].name;

                reader.onload = function (e: any) {
                    context.fileBlob = new Blob([e.target.result], { type: context.acceptableMimetype });
                };
                reader.readAsArrayBuffer(fileInput.target.files[0]);
            }
        }
    }

    public toggleForm(): void {
        this.formVisible = !this.formVisible;
    }

    private isDefaultStateInForm(): boolean {
        if (!this.selectedState) {
            return true;
        }
        return this.selectedState.label === this.scenarioStates[0].label;
    }

    private isDefaultGenreInForm(): boolean {
        if (!this.selectedGenre) {
            return true;
        }
        return this.selectedGenre.label === this.scenarioStates[0].label;
    }

    private setDefaultStateInForm(): void {
        this.selectedState = this.scenarioStates[0];
        this.pdfForm.controls['state'].setValue(this.scenarioStates[0]);
    }

    private setDefaultGenreInForm(): void {
        this.selectedGenre = this.scenarioGenres[0];
        this.pdfForm.controls['genre'].setValue(this.scenarioGenres[0]);
    }

    private isEmailConfirmed(): boolean {
        return this.pdfForm.controls[this.emailConfirmFieldName].value === this.pdfForm.controls[this.emailFieldName].value;
    }

    private isAcceptableSize(fileSize: number): boolean {
        const isAcceptable = (fileSize <= this.acceptableSize);

        if (!isAcceptable) {
            this.showAlert(APP_NAME, PDF_FORM_TXT.get('fileSize'));
        }

        return isAcceptable;
    }

    private isAcceptableMimetype(fileFormat: string): boolean {
        const isAcceptable = (fileFormat === this.acceptableMimetype);

         if (!isAcceptable) {
            this.showAlert(APP_NAME, PDF_FORM_TXT.get('fileFormat'));
        }

        return isAcceptable;
    }

    public isDefaultOption(option: ScenarioState | ScenarioGenre): boolean {
        return option.label === DEFAULT_SELECT_STATE;
    }

    public resetForm(): void {
        this.pdfForm.reset();
        this.fileBlob = null;
        this.fileName = '';
        this.setDefaultStateInForm();
        this.setDefaultGenreInForm();
    }

    public isFormValid(): boolean {

        const requirements = [
            this.pdfForm.valid,
            Boolean(this.fileBlob),
            this.isEmailConfirmed(),
            !this.isDefaultGenreInForm(),
            !this.isDefaultStateInForm()
        ];

        return requirements.every(value => value);
    }

    public triggerUpload(): void {
        this.fileInputNode.nativeElement.click();
    }

    public submitPDF(submitted: PdfForm): void {

        const formData = new FormData();
        const that = this;

        formData.append('title', submitted.title);
        formData.append('authorEmail', submitted.authorEmail);
        formData.append('genre', JSON.stringify(submitted.genre));
        formData.append('state', JSON.stringify(submitted.state));
        formData.append('description', submitted.description);
        formData.append('file', that.fileBlob, that.fileName);

        this.publicScenariosAsyncs.postPublicScenario(formData).subscribe(
            (response: ResponseObject) => {
                const successMessage = helpers.translateServerResponse(response.code);

                console.log(successMessage);
                this.showAlert(APP_NAME, successMessage);
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenarioAdd'));
                this.appStoreActions.setShowError(true);
            }
        );
    }

    public removeScenario(): void {

        this.showPrompt(COMMON_MSG.get('deleteScenarioPrompt')).subscribe((deleteCode) => {
            if (!deleteCode) {
                return;
            }

            this.publicScenariosAsyncs.deletePublicScenario(deleteCode).subscribe(
                (response: ResponseObject) => {
                    const successMessage = helpers.translateServerResponse(response.code);

                    console.log(successMessage);
                    this.showAlert(APP_NAME, successMessage);
                },
                (err: Error) => {
                    console.warn(err);
                    this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenarioDelete'));
                    this.appStoreActions.setShowError(true);
                }
            );

        });
    }

    public downloadScenario(path: string): void {
        location.href = 'http://www.localhost:3000/' + path;
    }

    public pdfTestFunctionality() {
        const doc = new this.windowService.nativeWindow.PDFDocument();
        const blobStream = this.windowService.nativeWindow.blobStream;

        const stream = doc.pipe(blobStream());
        doc.fontSize(25)
        .text('Here is some vector graphics...', 100, 80);

        // some vector graphics
        doc.save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

        doc.circle(280, 200, 50)
        .fill('#6600FF');

        // an SVG path
        doc.scale(0.6)
        .translate(470, 130)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

        // and some justified text wrapped into columns
        doc.text('And here is some wrapped text...', 100, 300)
        .font('Times-Roman', 13)
        .moveDown()
        .text('lorem', {
            width: 412,
            align: 'justify',
            indent: 30,
            columns: 2,
            height: 300,
            ellipsis: true
        });
        // end and display the document in the iframe to the right
        doc.end();
        stream.on('finish', function() {
          ///iframe.src = stream.toBlobURL('application/pdf');
            const objectUrl = stream.toBlobURL('application/pdf');
            const anchor = document.createElement('a');
            anchor.href = objectUrl;
            anchor.download = 'scelperGenerated';
            anchor.click();

        });
    }

}
