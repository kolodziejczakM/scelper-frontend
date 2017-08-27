import { Component, OnInit } from '@angular/core';
import { PublicScenarioRequest } from '../../interfaces';

import { AppStoreActions } from '../../app-store/app-store.actions';
import { PublicScenariosAsyncs } from '../public-scenarios.asyncs';

import { ERROR_MSG } from '../../app.constants';

@Component({
    selector: 'sce-public-scenarios-requests',
    templateUrl: './public-scenarios-requests.component.html'
})
export class PublicScenariosRequestsComponent implements OnInit {

    public scenariosRequests: PublicScenarioRequest[] = [];
    public fetchingScenariosRequests = true;

    constructor(
        private appStoreActions: AppStoreActions,
        private publicScenariosAsyncs: PublicScenariosAsyncs
    ) { }

    ngOnInit() {
        this.preparePublicScenariosRequests();
    }

    private preparePublicScenariosRequests(): void {
        this.fetchingScenariosRequests = true;

        this.publicScenariosAsyncs.getPublicScenariosRequests()
        .finally(() => this.fetchingScenariosRequests = false)
        .subscribe(
            (res: PublicScenarioRequest[]) => {
                this.scenariosRequests = res.map(this.stringifyScenarioRequest);
               // this.fetchingScenariosRequests = false;
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenariosRequestsDownload'));
                this.appStoreActions.setShowError(true);
               // this.fetchingScenariosRequests = false;
            }
        );
    }

    private stringifyScenarioRequest(scenarioRequest: PublicScenarioRequest): PublicScenarioRequest {
        scenarioRequest.type = scenarioRequest.type.label;
        scenarioRequest.genre = scenarioRequest.genre.label;

        return scenarioRequest;
    }

}
