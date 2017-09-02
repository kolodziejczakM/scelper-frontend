import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sce-scene-estimator',
    templateUrl: './scene-estimator.component.html'
})
export class SceneEstimatorComponent implements OnInit {

    public estimationForm: FormGroup;
    private waitingForResponse = false;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.estimationForm = formBuilder.group({
            sceneText: [
                '',
                Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5000)])
                // maxLength needs to be verified!
            ]
        });
    }

    ngOnInit() {
    }

    public isFormValid(): boolean {
        return this.estimationForm.valid;
    }

    public submitEstimation(submitted): void {
        this.waitingForResponse = true;
        console.log('submitted estimation form! :)');
    }
}
