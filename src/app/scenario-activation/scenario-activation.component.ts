import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { PublicScenariosAsyncs } from '../public-scenarios/public-scenarios.asyncs';

import { PARAM_NAME,
         LOADING_TEXT,
         SUCCESS_TEXT,
         ERROR_TEXT } from './scenario-activation.constants';

@Component({
    selector: 'sce-scenario-activation',
    templateUrl: './scenario-activation.component.html'
})
export class ScenarioActivationComponent implements OnInit {

    public deleteCode: string;
    public loading = true;

    private loadingText: string = LOADING_TEXT;
    private successText: string = SUCCESS_TEXT;
    private errorText: string = ERROR_TEXT;
    public visibleText = this.loadingText;

    public requestsTypeSegment = 'requests';

    constructor(
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.setDeleteCode();
        this.matchPatchingMethod();
    }

    private setDeleteCode() {
        this.deleteCode = this.activatedRoute.snapshot.params[PARAM_NAME];
    }

    private matchPatchingMethod(): void {
        if (this.router.url.includes(this.requestsTypeSegment)) {
            this.patchScenarioRequest();
        } else {
            this.patchScenario();
        }
    }

    private patchScenario(): void {
        this.loading = true;

        this.publicScenariosAsyncs.patchPublicScenario(this.deleteCode).subscribe(
            res => {
                this.visibleText = this.successText;
                setTimeout(this.router.navigate.bind(this, ['public-scenarios']), 1000);
            },
            this.errorHandler.bind(this)
        );
    }

    private patchScenarioRequest(): void {
        this.loading = true;

        this.publicScenariosAsyncs.patchPublicScenarioRequest(this.deleteCode).subscribe(
            res => {
                this.visibleText = this.successText;
                setTimeout(this.router.navigate.bind(this, ['public-scenarios/requests']), 1000);
            },
            this.errorHandler.bind(this)
        );
    }

    private errorHandler(): void {
        this.loading = false;
        this.visibleText = this.errorText;
    }
}
