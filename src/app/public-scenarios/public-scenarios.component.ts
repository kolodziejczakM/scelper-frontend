import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { PublicScenario, PdfForm } from '../interfaces';
import { PUBLIC_SCENARIOS } from '../mocks';

import { EMAIL_PATTERN,
         SCENARIO_STATES,
         DEFAULT_SCENARIO_STATE,
         SCENARIO_ACCEPTABLE_EXTENSION,
         SCENARIO_SIZE_LIMIT_KB,
         PDF_FORM_TXT,
         COMMON_MSG } from '../app.constants';

@Component({
    selector: 'app-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent {

    @ViewChild('fileInputNode') fileInputNode: ElementRef;

    endpoint = 'http://localhost:3000/api/v1/public-scenarios';
    emailFieldName = 'authorEmail';
    emailConfirmFieldName = 'authorEmailConfirm';

    pdfForm: FormGroup;
    formText: Map<string, string> = PDF_FORM_TXT;
    acceptableExtension: string = SCENARIO_ACCEPTABLE_EXTENSION;
    acceptableSize: number = SCENARIO_SIZE_LIMIT_KB;

    formVisible = false;
    emailPattern = EMAIL_PATTERN;

    fileBlob: Blob;
    fileName = '';

    scenarioStates: Array<string> = SCENARIO_STATES;
    scenarios: Array<PublicScenario> = PUBLIC_SCENARIOS;

    constructor(
        private http: Http,
        private formBuilder: FormBuilder
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

            if (this.isAcceptableExtension(fileFormat) && this.isAcceptableSize(fileSize)) {

                context.fileName = fileInput.target.files[0].name;

                reader.onload = function (e: any) {
                    context.fileBlob = new Blob([e.target.result], { type: context.acceptableExtension });
                };
                reader.readAsArrayBuffer(fileInput.target.files[0]);
            }
        }
    }

    public showForm(): void {
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

    private isAcceptableExtension(fileFormat: string): boolean {
        const isAcceptable = (fileFormat === this.acceptableExtension);

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

        const url = this.endpoint;

        this.http.post(url, formData).map(res => res.json()).subscribe(response => {
            alert(response);
        },
        (err: Response) => {
            alert(err.text());
        });
    }

    public showAlert(): void {
        alert(PDF_FORM_TXT.get('emailSent'));
    }

    public deleteScenario(): void {
        confirm(COMMON_MSG.get('confirm'));
    }

}
