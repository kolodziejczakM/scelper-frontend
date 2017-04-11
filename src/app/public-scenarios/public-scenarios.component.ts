import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SCENARIO_STATES, PDF_FORM_MSG } from '../app.constants';
import { PublicScenario } from '../interfaces';
import { PUBLIC_SCENARIOS } from '../mocks';

@Component({
    selector: 'app-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {
   
    pdfForm : FormGroup; 
    formMessages = PDF_FORM_MSG;
    formHeader = 'Dodaj własny scenariusz';
    fileLabel = 'Plik PDF:';
    submitText = 'Dodaj';

    fileBase64 = '';
    scenarioStates: Array<string> = SCENARIO_STATES;
    scenarios: Array<PublicScenario> = PUBLIC_SCENARIOS;

    constructor(formBuilder:FormBuilder) {
        this.pdfForm = formBuilder.group({
            title: ["",Validators.compose([Validators.required, Validators.minLength(1)])],
            authorEmail: ["",Validators.compose([Validators.required,Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")])],
            state : ["", Validators.required],
            description: ["",Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(100)])],
        });
    }

    ngOnInit() {
    }

    hasError(controlName: string): boolean {
        return !this.pdfForm.controls[controlName].valid && this.pdfForm.controls[controlName].dirty;
    }

    fileChangeEvent(fileInput: any, context:any){
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e : any) {
                context.fileBase64 = e.target.result;
            }
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    submitPDF(submitted) {
        console.log(submitted);
    }

    showAlert(): void{
        alert('Na podany adres email wysłaliśmy ważne informacje. Dziękujemy za pomoc w rozwoju serwisu.');
    }

    deleteScenario() :void{
        confirm('Czy jesteś pewien?');
    }

}
