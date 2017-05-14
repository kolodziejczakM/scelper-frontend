import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppStoreService } from '../app-store/app-store.service';
import { AppStoreActions } from '../app-store/app-store.actions';

import { ModalsService } from '../modals/modals.service';
import { PublicScenariosAsyncs } from './public-scenarios.asyncs';

import * as helpers from '../app.helpers';
import { PublicScenario, PdfForm, ResponseObject } from '../interfaces';

import { APP_NAME,
         ERROR_MSG,
         COMMON_MSG } from '../app.constants';

import { PDF_FORM_TXT,
         EMAIL_PATTERN,
         SCENARIO_STATES,
         DEFAULT_SCENARIO_STATE,
         SCENARIO_ACCEPTABLE_MIMETYPE,
         SCENARIO_SIZE_LIMIT_KB, } from '../public-scenarios/new-scenario-form/new-scenario-form.constants';

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

    public scenarioStates: Array<string> = SCENARIO_STATES;
    public scenarios: Array<PublicScenario> = [];

    public selectOptions = SCENARIO_FILTER_DROPDOWN_OPTIONS;

    private static getStateStringFromId(stateId: number): string {
        return helpers.getStateStringFromId(stateId);
    }

    constructor(
        private appStoreService: AppStoreService,
        private appStoreActions: AppStoreActions,
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private formBuilder: FormBuilder,
        private modalsService: ModalsService
    ) {

        this.pdfForm = formBuilder.group({
            title: [
                '',
                Validators.compose([Validators.required, Validators.minLength(1)])
            ],
            authorEmail: [
                '',
                Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])
            ],
            authorEmailConfirm: [
                '',
                Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])
            ],
            state : [
                '',
                Validators.required
            ],
            description: [
                '',
                Validators.compose([Validators.required, Validators.minLength(10),
                Validators.maxLength(100)])
            ],
        });
    }

    ngOnInit() {
        this.preparePublicScenarios();
    }

    public filterScenarios(scenarios: Array<PublicScenario> = []): any {

        if (!scenarios.length) {
            return scenarios;
        }

        return scenarios.filter(scenario => scenario[this.appStoreService.getScenarioFilterChoice().category].toLowerCase()
                        .indexOf(this.appStoreService.getScenarioFilterValue().toLowerCase()) !== -1);
    }

    private preparePublicScenarios(): void {
        this.getPublicScenarios().subscribe(
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

    private getPublicScenarios(): Observable<PublicScenario[] | Error> {
        return this.publicScenariosAsyncs.getPublicScenarios();
    }

    private stringifyScenario(scenario: PublicScenario): PublicScenario {
        scenario.state = PublicScenariosComponent.getStateStringFromId(scenario.stateId);
        scenario.pages = String(scenario.pages); // for filtering purposes
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

    public isDefaultOption(option: string): boolean {
        return option === DEFAULT_SCENARIO_STATE;
    }

    public resetForm(): void {
        this.pdfForm.reset();
        this.fileBlob = null;
        this.fileName = '';
    }

    public isFormValid(): boolean {
        return this.pdfForm.valid && Boolean(this.fileBlob) && this.isEmailConfirmed();
    }

    public triggerUpload(): void {
        this.fileInputNode.nativeElement.click();
    }

    public submitPDF(submitted: PdfForm): void {

        const formData = new FormData();

        const that = this;

        formData.append('title', submitted.title);
        formData.append('authorEmail', submitted.authorEmail);
        formData.append('state', submitted.state);
        formData.append('description', submitted.description);
        formData.append('file', that.fileBlob, that.fileName);

        this.postPublicScenario(formData).subscribe(
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

    private postPublicScenario(scenario): Observable<ResponseObject | Error> {
        return this.publicScenariosAsyncs.postPublicScenario(scenario);
    }

    public removeScenario(): void {

        this.showPrompt(COMMON_MSG.get('deleteScenarioPrompt')).subscribe((deleteCode) => {
            if (!deleteCode) {
                return;
            }

            this.deletePublicScenario(deleteCode).subscribe(
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

    private deletePublicScenario(scenario): Observable<ResponseObject | Error> {
        return this.publicScenariosAsyncs.deletePublicScenario(scenario);
    }

    public downloadScenario(path: string): void {
        location.href = 'http://www.localhost:3000/' + path;
    }

}
