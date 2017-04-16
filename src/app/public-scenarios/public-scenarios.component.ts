import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

    formHeader = 'Dodaj własny scenariusz';
    fileLabel = 'Plik PDF:';
    uploadText = 'Upload';
    submitText = 'Dodaj';
    resetText = 'Wyczyść dane';

    emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

    fileBase64 = '';
    fileName = '';

    scenarioStates: Array<any> = SCENARIO_STATES;
    scenarios: Array<PublicScenario> = PUBLIC_SCENARIOS;

    constructor(formBuilder: FormBuilder) {
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

    hasError(controlName: string): boolean {
        return !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
    }

    fileChangeEvent(fileInput: any, context: any): void {
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

    isDefaultOption(option: string): boolean {
        return option === DEFAULT_SCENARIO_STATE;
    }

    resetForm() {
        this.pdfForm.reset();
    }

    isFormValid(): boolean {
        return this.pdfForm.valid && Boolean(this.fileBase64);
    }

    triggerUpload(): void {
        this.fileInputNode.nativeElement.click();
    }

    submitPDF(submitted): void  {
        console.log(submitted);
    }

    showAlert(): void {
        alert('Na podany adres email wysłaliśmy ważne informacje. Dziękujemy za pomoc w rozwoju serwisu.');
    }

    deleteScenario(): void {
        confirm('Czy jesteś pewien?');
    }

}
