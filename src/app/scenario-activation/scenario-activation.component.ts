import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PublicScenariosAsyncs } from '../public-scenarios/public-scenarios.asyncs';
import { ResponseObject } from '../interfaces';

import { PARAM_NAME,
         LOADING_TEXT,
         SUCCESS_TEXT,
         ERROR_TEXT } from './scenario-activation.constants';

@Component({
    selector: 'sce-scenario-activation',
    templateUrl: './scenario-activation.component.html'
})
export class ScenarioActivationComponent implements OnInit {

    deleteCode: string;
    loading = true;

    loadingText: string = LOADING_TEXT;
    successText: string = SUCCESS_TEXT;
    errorText: string = ERROR_TEXT;

    visibleText = this.loadingText;

    constructor(
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.setDeleteCode();
        this.patchScenario();
    }

    private setDeleteCode() {
        this.deleteCode = this.activatedRoute.snapshot.params[PARAM_NAME];
    }

    private patchPublicScenario(deleteCode): Observable<ResponseObject | Error> {
        return this.publicScenariosAsyncs.patchPublicScenario(deleteCode);
    }

    private patchScenario() {
        this.loading = true;

        this.patchPublicScenario(this.deleteCode).subscribe(
            res => {
                const that = this;
                this.visibleText = this.successText;

                setTimeout(function(){
                    that.loading = false;
                    that.router.navigate(['public-scenarios']);
                }, 1000);

            },
            (err: Response) => {
                console.warn(err);
                this.loading = false;
                this.visibleText = this.errorText;
            }
        );
    }

}
