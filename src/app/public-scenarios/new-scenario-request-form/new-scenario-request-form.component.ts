import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NumberValidator } from '../../shared/number.validator';
import { ScenarioGenre, ScenarioType } from '../../interfaces';

import { DEFAULT_SELECT_STATE } from '../../app.constants';

import { EMAIL_PATTERN,
         SCENARIO_GENRES,
         SCENARIO_DESCRIPTION_MIN_LENGTH,
         SCENARIO_DESCRIPTION_MAX_LENGTH } from '../new-scenario-form/new-scenario-form.constants';

import { SCENARIO_REQUEST_FORM_TXT,
         SCENARIO_TYPES } from './new-scenario-request-form.constants';

@Component({
    selector: 'sce-new-scenario-request-form',
    templateUrl: './new-scenario-request-form.component.html'
})
export class NewScenarioRequestFormComponent implements OnInit {

    @Input('visibility') visibility: boolean;

    public requestFormText: Map<string, string> = SCENARIO_REQUEST_FORM_TXT;
    public requestForm: FormGroup;
    private emailPattern: RegExp = EMAIL_PATTERN;
    public scenarioGenres: ScenarioGenre[] = SCENARIO_GENRES;
    public scenarioTypes: ScenarioType[] = SCENARIO_TYPES;

    public selectedGenre;
    public selectedType;

    private emailFieldName = 'requestAuthorEmail';
    private emailConfirmFieldName = 'requestAuthorEmailConfirm';

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.requestForm = formBuilder.group({
            genre: [
                '',
                Validators.required
            ],
            type: [
                '',
                Validators.required
            ],
            actorNumber: [
                '',
                Validators.compose([
                    Validators.required,
                    NumberValidator.range(0, 50)
                ])
            ],
            actressNumber: [
                '',
                Validators.compose([
                    Validators.required,
                    NumberValidator.range(0, 50)
                ])
            ],
            vehicleNumber: [
                '',
                Validators.compose([
                    Validators.required,
                    NumberValidator.range(0, 50)
                ])
            ],
            budget: [
                '',
                Validators.compose([
                    Validators.required,
                    NumberValidator.range(0, 50000000)
                ])
            ],
            description: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(SCENARIO_DESCRIPTION_MIN_LENGTH),
                    Validators.maxLength(SCENARIO_DESCRIPTION_MAX_LENGTH)
                ])
            ],
            requestAuthorEmail: [
                '',
                Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])
            ],
            requestAuthorEmailConfirm: [
                '',
                Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])
            ]
        });
    }

    ngOnInit() {
        this.setDefaultGenreInForm();
        this.setDefaultTypeInForm();
    }

    // copied - worth creating service
    public hasError(controlName: string): boolean {

        if (controlName === this.emailConfirmFieldName) {
            return !this.isEmailConfirmed() ||
                   !this.requestForm.controls[controlName].valid &&
                   this.requestForm.controls[controlName].dirty;
        }

        return !this.requestForm.controls[controlName].valid && this.requestForm.controls[controlName].dirty;
    }

    // copied - worth creating service
    public isDefaultOption(option: ScenarioType | ScenarioGenre): boolean {
        return option.label === DEFAULT_SELECT_STATE;
    }

    // copied - worth creating service
    private isEmailConfirmed(): boolean {
        return this.requestForm.controls[this.emailConfirmFieldName].value === this.requestForm.controls[this.emailFieldName].value;
    }

    // copied - worth creating service
    public resetForm(): void {
        this.requestForm.reset();
        this.setDefaultTypeInForm();
        this.setDefaultGenreInForm();
    }

    // copied - worth creating service
    public isFormValid(): boolean {
        const requirements = [
            this.requestForm.valid,
            this.isEmailConfirmed(),
            !this.isDefaultGenreInForm(),
            !this.isDefaultTypeInForm()
        ];

        return requirements.every(value => value);
    }

    private isDefaultGenreInForm(): boolean {
        if (!this.selectedGenre) {
            return true;
        }

        return this.selectedGenre.label === this.scenarioGenres[0].label;
    }

    private isDefaultTypeInForm(): boolean {
        if (!this.selectedType) {
            return true;
        }

        return this.selectedType.label === this.scenarioGenres[0].label;
    }

    private setDefaultGenreInForm(): void {
        this.selectedGenre = this.scenarioGenres[0];
        this.requestForm.controls['genre'].setValue(this.scenarioGenres[0]);
    }

    private setDefaultTypeInForm(): void {
        this.selectedType = this.scenarioTypes[0];
        this.requestForm.controls['type'].setValue(this.scenarioTypes[0]);
    }

    public submitRequest(submitted): void {
        console.log('request has been submitted: ', submitted);
    }

}