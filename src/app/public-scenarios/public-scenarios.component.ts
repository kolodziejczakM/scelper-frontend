import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ModalsService } from '../modals/modals.service';
import { PublicScenariosService } from './public-scenarios.service';

import * as helpers from '../app.helpers';
import { PublicScenario, PdfForm } from '../interfaces';
import { PUBLIC_SCENARIOS } from '../mocks';

import { EMAIL_PATTERN,
         SCENARIO_STATES,
         DEFAULT_SCENARIO_STATE,
         SCENARIO_ACCEPTABLE_MIMETYPE,
         SCENARIO_SIZE_LIMIT_KB,
         PDF_FORM_TXT,
         COMMON_MSG } from '../app.constants';

@Component({
    selector: 'app-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {

    @ViewChild('fileInputNode') fileInputNode: ElementRef;

    // endpoint = 'http://localhost:3000/api/v1/public-scenarios';

    emailFieldName = 'authorEmail';
    emailConfirmFieldName = 'authorEmailConfirm';

    filterArgs = { title: '' };

    pdfForm: FormGroup;
    formText: Map<string, string> = PDF_FORM_TXT;
    acceptableMimetype: string = SCENARIO_ACCEPTABLE_MIMETYPE;
    acceptableSize: number = SCENARIO_SIZE_LIMIT_KB;

    formVisible = false;
    emailPattern: RegExp = EMAIL_PATTERN;

    fileBlob: Blob;
    fileName = '';

    scenarioStates: Array<string> = SCENARIO_STATES;
    scenarios: Array<PublicScenario> = PUBLIC_SCENARIOS;

    constructor(
        // private http: Http,
        private publicScenariosService: PublicScenariosService,
        private formBuilder: FormBuilder,
        private modalsService: ModalsService
    ) {
        this.pdfForm = formBuilder.group({
            title: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            authorEmail: ['', Validators.compose([Validators.required,
                              Validators.pattern(this.emailPattern)])],
            authorEmailConfirm: ['', Validators.compose([Validators.required,
                              Validators.pattern(this.emailPattern)])],
            state : ['', Validators.required],
            description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])],
        });
    }

    ngOnInit() {
        // this.getPublicScenarios();
        this.preparePublicScenarios();
    }

    private getPublicScenarios(): Observable<Array<PublicScenario>> {
        return this.publicScenariosService.getPublicScenarios();

        // this.http.get(this.endpoint).map(res => res.json()).subscribe(response => {
        //     console.log(response);
        //     // console.log(helpers.translateServerResponse(response.code));
        //     this.scenarios = response;
        // },
        // (err: Response) => {
        //     console.warn(helpers.translateServerResponse(err.json().code));
        //     // TODO generic error should be visible with that message
        // });
    }

    private preparePublicScenarios(): void {
        this.getPublicScenarios().subscribe(response => {
            this.scenarios = response;
        }, err => console.log('Error w widoku: ', err));
       // this.getPublicScenarios
       // map modifyScenarioStates
    }

    private getStateStringFromId(stateId: number): string {
        return helpers.getStateStringFromId(stateId);
    }

    public filterScenarios(scenarios: Array<PublicScenario> = []): any {
        return scenarios.filter(scenario => scenario.title.indexOf(this.filterArgs['title']) !== -1);
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
            alert(PDF_FORM_TXT.get('fileSize'));
        }

        return isAcceptable;
    }

    private isAcceptableMimetype(fileFormat: string): boolean {
        const isAcceptable = (fileFormat === this.acceptableMimetype);

         if (!isAcceptable) {
            alert(PDF_FORM_TXT.get('fileFormat'));
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

    public submitPDF(submitted: PdfForm): void  {

        const formData = new FormData();

        const that = this;

        formData.append('title', submitted.title);
        formData.append('authorEmail', submitted.authorEmail);
        formData.append('state', submitted.state);
        formData.append('description', submitted.description);
        formData.append('file', that.fileBlob, that.fileName);

        this.postPublicScenario(formData).subscribe(response => {
            console.log('Success in creating scenario.');
        });

        // const url = this.endpoint;

        // this.http.post(url, formData).map(res => res.json()).subscribe(response => {
        //    console.log(response);
        //    console.log(helpers.translateServerResponse(response.code));
        // },
        // (err: Response) => {
        //     console.warn(err);
        // });
    }

    private postPublicScenario(scenario): Observable<Array<PublicScenario>> {
        return this.publicScenariosService.postPublicScenario(scenario);
    }

    private deletePublicScenario(scenario): Observable<any> {
        return this.publicScenariosService.deletePublicScenario(scenario);
    }

    public showNativeAlert(): void {
        alert(PDF_FORM_TXT.get('emailSent'));
    }

    public removeScenario(): void {
        this.showPrompt('Wprowadź kod usunięcia: ').subscribe((deleteCode) => {
            if (!deleteCode) {
                return;
            }

            this.deletePublicScenario(deleteCode).subscribe(response => {
                console.log('Usunięto z sukcesem!');
            });
            // const deleteUrl = `${this.endpoint}/${deleteCode}`;
            // this.http.delete(deleteUrl).map(res => res.json()).subscribe(response => {
            //     console.log(response);
            //     console.log(helpers.translateServerResponse(response.code));
            // },
            // (err: Response) => {
            //     console.warn(helpers.translateServerResponse(err.json().code));
            //     // TODO generic error should be visible with that message
            // });

        });
    }

    public downloadScenario(path: string): void {
        location.href = 'http://www.localhost:3000/' + path;
    }

}
