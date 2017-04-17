import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SCENARIO_STATES, DEFAULT_SCENARIO_STATE, PDF_FORM_MSG } from '../app.constants';
import { PublicScenario } from '../interfaces';
import { PUBLIC_SCENARIOS } from '../mocks';

@Component({
    selector: 'app-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {

    @ViewChild('fileInputNode') fileInputNode: ElementRef;

    pdfForm: FormGroup;
    formMessages = PDF_FORM_MSG;
    acceptableExtension = 'application/pdf';

    formVisible = false;
    addNewText = 'Dodaj własny scenariusz';
    uploadText = 'Upload PDF';
    submitText = 'Dodaj';
    resetText = 'Wyczyść dane';

    emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

    fileBase64 = '';
    fileName = '';

    scenarioStates: Array<any> = SCENARIO_STATES;
    scenarios: Array<PublicScenario> = PUBLIC_SCENARIOS;

    constructor(
        private http: Http,
        private formBuilder: FormBuilder
    ) {
        this.pdfForm = formBuilder.group({
            title: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            authorEmail: ['', Validators.compose([Validators.required,
                              Validators.pattern(this.emailPattern)])],
            state : ['', Validators.required],
            description: ['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(100)])],
        });
    }

    ngOnInit() {
    }

    public hasError(controlName: string): boolean {
        return !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
    }

    public fileChangeEvent(fileInput: any, context: any): void {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader(),
                  fileFormat = fileInput.target.files[0].type;

            if (fileFormat === context.acceptableExtension) {

                context.fileName = fileInput.target.files[0].name;

                reader.onload = function (e: any) {
                    context.fileBase64 = e.target.result;
                };
                reader.readAsDataURL(fileInput.target.files[0]);
            }else {
                alert(PDF_FORM_MSG.get('fileFormat'));
            }
        }
    }

    public showForm(): void {
        this.formVisible = !this.formVisible;
    }

    public isDefaultOption(option: string): boolean {
        return option === DEFAULT_SCENARIO_STATE;
    }

    public resetForm() {
        this.pdfForm.reset();
    }

    public isFormValid(): boolean {
        return this.pdfForm.valid && Boolean(this.fileBase64);
    }

    public triggerUpload(): void {
        this.fileInputNode.nativeElement.click();
    }

    public submitPDF(submitted): void  {
        // submitted.file = this.fileBase64;

        const formData = new FormData();
        const that = this;

        formData.append('title', submitted.title);
        formData.append('authorEmail', submitted.authorEmail);
        formData.append('state', submitted.state);
        formData.append('description', submitted.description);
        formData.append('file',that.fileBase64);

        const url = 'http://localhost:3000/new-scenario';
        this.http.post(url, formData).subscribe(response =>{
            console.log('Success response: ', response);
        },err => {
            console.warn(err);
        });
    }

    public showAlert(): void {
        alert('Na podany adres email wysłaliśmy ważne informacje. Dziękujemy za pomoc w rozwoju serwisu.');
    }

    public deleteScenario(): void {
        confirm('Czy jesteś pewien?');
    }

}
