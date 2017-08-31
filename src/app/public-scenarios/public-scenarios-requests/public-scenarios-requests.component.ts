import { Component, OnInit } from '@angular/core';
import { ScenarioRequestSelectFilterOption,
         PublicScenarioRequest } from '../../interfaces';

import { AppStoreActions } from '../../app-store/app-store.actions';
import { PublicScenariosAsyncs } from '../public-scenarios.asyncs';

import { SCENARIO_REQUEST_FILTER_DROPDOWN_OPTIONS,
         ERROR_MSG } from '../../app.constants';

@Component({
    selector: 'sce-public-scenarios-requests',
    templateUrl: './public-scenarios-requests.component.html'
})
export class PublicScenariosRequestsComponent implements OnInit {

    public selectFilterOptions: ScenarioRequestSelectFilterOption[] = SCENARIO_REQUEST_FILTER_DROPDOWN_OPTIONS;
    public scenariosRequests: PublicScenarioRequest[] = [];

    public requestsMock = [
        {
            type: 'pełnometrażowy',
            genre: 'western',
            requestAuthorEmail: 'tonieja@ijateznie.com',
            updatedAt: '21/mock/17',
            createdAt: '21/mock/17',
            description: 'Opis mockowy niezbyt długi',
            vehicleNumber: 4,
            actorNumber: 2,
            actressNumber: 4,
            budget: 30
        },
        {
            type: 'krótkometrażowy',
            genre: 'dramat',
            requestAuthorEmail: 'polska@dlapolakow.com',
            updatedAt: '21/mock/17',
            createdAt: '21/mock/17',
            description: 'Film propagandowy',
            vehicleNumber: 2,
            actorNumber: 0,
            actressNumber: 7,
            budget: 16
        },
        {
            type: 'krótkometrażowy',
            genre: 'komedia',
            requestAuthorEmail: 'mock@mockandroll.com',
            updatedAt: '14/06/17',
            createdAt: '9/mock/17',
            description: 'Opis mockowy niezbyt długi',
            vehicleNumber: 5,
            actorNumber: 1,
            actressNumber: 1,
            budget: 23
        }, {
            type: 'pełnometrażowy',
            genre: 'animacja',
            requestAuthorEmail: 'storoczykiwychodza@mockandroll.com',
            updatedAt: '21/08/17',
            createdAt: '21/mock/17',
            description: 'Relacje damsko męskie w krzywym zwierciadle. Kobieta zabija męża a potem siebie. W kolejnym życiu spotyka...',
            vehicleNumber: 4,
            actorNumber: 2,
            actressNumber: 4,
            budget: 30
        }
        , {
            type: 'krótkometrażowy',
            genre: 'thriller',
            requestAuthorEmail: 'niemamocnych@a.com',
            updatedAt: '07/08/17',
            createdAt: '21/mock/17',
            description: 'O problemach ludzi współczesnych. O ich marzeniach i o przeszłości. O tym co nas czeka',
            vehicleNumber: 42,
            actorNumber: 13,
            actressNumber: 9,
            budget: 540
        }
        , {
            type: 'pełnometrażowy',
            genre: 'horror',
            requestAuthorEmail: 'alajda22@mockandroll.com',
            updatedAt: '05/05/17',
            createdAt: '21/mock/17',
            description: '...',
            vehicleNumber: 4,
            actorNumber: 2,
            actressNumber: 4,
            budget: 30000000
        }
        , {
            type: 'Krótkometrażowy',
            genre: 'przygodowy',
            requestAuthorEmail: 'januszParzewski222.grol@mockandroll.com',
            updatedAt: '21/mock/17',
            createdAt: '21/mock/17',
            description: 'Życie bywa złudne, trudne i czasem nie wiem co począć.',
            vehicleNumber: 0,
            actorNumber: 0,
            actressNumber: 0,
            budget: 0
        }
        , {
            type: 'pełnometrażowy',
            genre: 'akcji',
            requestAuthorEmail: 'fajnarzecz@mockandroll.com',
            updatedAt: '26/mock/17',
            createdAt: '23/mock/17',
            description: 'O ludziach z marzeniami',
            vehicleNumber: 34,
            actorNumber: 22,
            actressNumber: 14,
            budget: 3000
        }
    ];

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
        this.scenariosRequests = this.requestsMock.map(this.stringifyScenarioRequest);

        // this.publicScenariosAsyncs.getPublicScenariosRequests()
        // .finally(() => this.fetchingScenariosRequests = false)
        // .subscribe(
        //     (res: PublicScenarioRequest[]) => {
        //         this.scenariosRequests = res.map(this.stringifyScenarioRequest);
        //     },
        //     (err: Error) => {
        //         console.warn(err);
        //         this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenariosRequestsDownload'));
        //         this.appStoreActions.setShowError(true);
        //     }
        // );
    }

    private stringifyScenarioRequest(scenarioRequest: PublicScenarioRequest): PublicScenarioRequest {
        scenarioRequest.type = scenarioRequest.type.toLowerCase();
        scenarioRequest.genre = scenarioRequest.genre.toLowerCase();
        // scenarioRequest.updatedAt = new Date(scenarioRequest.updatedAt).toLocaleString().split(',')[0];

        scenarioRequest.actorNumber = String(scenarioRequest.actorNumber);
        scenarioRequest.actressNumber = String(scenarioRequest.actressNumber);
        scenarioRequest.vehicleNumber = String(scenarioRequest.vehicleNumber);
        scenarioRequest.budget = String(scenarioRequest.budget);

        return scenarioRequest;
    }

    // private stringifyScenarioRequest(scenarioRequest: PublicScenarioRequest): PublicScenarioRequest {
    //     scenarioRequest.type = scenarioRequest.type.label.toLowerCase();
    //     scenarioRequest.genre = scenarioRequest.genre.label.toLowerCase();
    //     scenarioRequest.updatedAt = new Date(scenarioRequest.updatedAt).toLocaleString().split(',')[0];

    //     scenarioRequest.actorNumber = String(scenarioRequest.actorNumber);
    //     scenarioRequest.actressNumber = String(scenarioRequest.actressNumber);
    //     scenarioRequest.vehicleNumber = String(scenarioRequest.vehicleNumber);
    //     scenarioRequest.budget = String(scenarioRequest.budget);

    //     return scenarioRequest;
    // }
}
