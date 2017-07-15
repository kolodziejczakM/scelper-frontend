import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as helpers from '../../app.helpers';

import { PdfForm,
         ResponseObject,
         ScenarioGenre,
         ScenarioState } from '../../interfaces';

import { ModalsService } from '../../modals/modals.service';
import { AppStoreActions } from '../../app-store/app-store.actions';
import { PublicScenariosAsyncs } from '../public-scenarios.asyncs';

import { APP_NAME,
         ERROR_MSG,
         DEFAULT_SELECT_STATE } from '../../app.constants';

import { PDF_FORM_TXT,
         EMAIL_PATTERN,
         SCENARIO_ACCEPTABLE_MIMETYPE,
         SCENARIO_SIZE_LIMIT_KB,
         SCENARIO_TITLE_MIN_LENGTH,
         SCENARIO_GENRES,
         SCENARIO_STATES,
         SCENARIO_DESCRIPTION_MIN_LENGTH,
         SCENARIO_DESCRIPTION_MAX_LENGTH } from '../../public-scenarios/new-scenario-form/new-scenario-form.constants';

@Component({
    selector: 'sce-new-scenario-form',
    templateUrl: './new-scenario-form.component.html'
})
export class NewScenarioFormComponent implements OnInit {

    @Input('visibility') visibility: boolean;
    @ViewChild('fileInputNode') fileInputNode: ElementRef;

    public pdfForm: FormGroup;
    public formText: Map<string, string> = PDF_FORM_TXT;
    public acceptableMimetype: string = SCENARIO_ACCEPTABLE_MIMETYPE;
    private acceptableSize: number = SCENARIO_SIZE_LIMIT_KB;
    private emailPattern: RegExp = EMAIL_PATTERN;

    public fileBlob: Blob;
    public fileName = '';

    public scenarioStates: ScenarioState[] = SCENARIO_STATES;
    public scenarioGenres: ScenarioGenre[] = SCENARIO_GENRES;

    public selectedState;
    public selectedGenre;

    private emailFieldName = 'authorEmail';
    private emailConfirmFieldName = 'authorEmailConfirm';

    constructor(
        private modalsService: ModalsService,
        private appStoreActions: AppStoreActions,
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private formBuilder: FormBuilder
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
        this.setDefaultStateInForm();
        this.setDefaultGenreInForm();
    }

    public showAlert(title, message): void {
        this.modalsService.showAlert(title, message);
    }

    public hasError(controlName: string): boolean {

        if (controlName === this.emailConfirmFieldName) {
            return !this.isEmailConfirmed() || !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
        }
        return !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
    }

    private isEmailConfirmed(): boolean {
        return this.pdfForm.controls[this.emailConfirmFieldName].value === this.pdfForm.controls[this.emailFieldName].value;
    }

    public isDefaultOption(option: ScenarioState | ScenarioGenre): boolean {
        return option.label === DEFAULT_SELECT_STATE;
    }

    public triggerUpload(): void {
        this.fileInputNode.nativeElement.click();
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

    private isAcceptableMimetype(fileFormat: string): boolean {
        const isAcceptable = (fileFormat === this.acceptableMimetype);

        if (!isAcceptable) {
            this.showAlert(APP_NAME, PDF_FORM_TXT.get('fileFormat'));
        }

        return isAcceptable;
    }

    private isAcceptableSize(fileSize: number): boolean {
        const isAcceptable = (fileSize <= this.acceptableSize);

        if (!isAcceptable) {
            this.showAlert(APP_NAME, PDF_FORM_TXT.get('fileSize'));
        }

        return isAcceptable;
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
                this.showAlert(APP_NAME, successMessage);
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenarioAdd'));
                this.appStoreActions.setShowError(true);
            }
        );
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

    public resetForm(): void {
        this.pdfForm.reset();
        this.fileBlob = null;
        this.fileName = '';
        this.setDefaultStateInForm();
        this.setDefaultGenreInForm();
    }

    private setDefaultStateInForm(): void {
        this.selectedState = this.scenarioStates[0];
        this.pdfForm.controls['state'].setValue(this.scenarioStates[0]);
    }

    private setDefaultGenreInForm(): void {
        this.selectedGenre = this.scenarioGenres[0];
        this.pdfForm.controls['genre'].setValue(this.scenarioGenres[0]);
    }

}
