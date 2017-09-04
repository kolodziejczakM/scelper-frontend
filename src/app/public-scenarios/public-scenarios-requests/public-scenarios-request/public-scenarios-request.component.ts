import { Component, Input, OnInit } from '@angular/core';

import * as helpers from '../../../app.helpers';
import { ResponseObject, PublicScenarioRequest } from '../../../interfaces';

import { PublicScenariosAsyncs } from '../../public-scenarios.asyncs';
import {AppStoreActions } from '../../../app-store/app-store.actions';
import { AppStoreService } from '../../../app-store/app-store.service';

import { DialogService } from 'ng2-bootstrap-modal';
import { ModalsService } from '../../../modals/modals.service';

import { AnalyticsService,
         GA_ACTIONS } from '../../../shared/analytics.service';

import { APP_NAME, ERROR_MSG, COMMON_MSG } from '../../../app.constants';

@Component({
    selector: 'sce-public-scenarios-request',
    templateUrl: './public-scenarios-request.component.html'
})
export class PublicScenariosRequestComponent extends ModalsService implements OnInit {

    @Input('scenarioRequest')
    public scenarioRequest: PublicScenarioRequest;

    public staticTexts = new Map([
        ['dot', '.'],
        ['and', 'i'],
        ['currency', 'zł'],
        ['added', 'Przypięto:'],
        ['authorPrefix', 'przez'],
        ['need', 'Potrzebuję scenariusza na'],
        ['filmSuffix', 'film'],
        ['have', 'Mam do dyspozycji'],
        ['actor', 'aktora(ów)'],
        ['actress', 'aktorkę(ek)'],
        ['vehiclesHave', 'Liczba pojazdów, którymi dysponuje:'],
        ['budgetHave', 'Mój budżet na potencjalny film:'],
        ['additionalDescription', 'Dodatkowy opis:']
    ]);

    constructor(
        private appStoreService: AppStoreService,
        private appStoreActions: AppStoreActions,
        public dialogService: DialogService,
        private modalsService: ModalsService,
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private analyticsService: AnalyticsService
    ) {
        super(dialogService);
    }

    ngOnInit() {
        console.log(this.scenarioRequest);
    }

    public removeScenarioRequest(): void {
        this.analyticsService.trackClick(GA_ACTIONS.get('deletePublicScenarioRequest'));
        super.showPrompt(COMMON_MSG.get('deletePrompt')).subscribe((deleteCode) => {
            if (!deleteCode) {
                return;
            }

            this.publicScenariosAsyncs.deletePublicScenarioRequest(deleteCode).subscribe(
                (response: ResponseObject) => {
                    const successMessage = helpers.translateServerResponse(response.code);
                    super.showAlert(APP_NAME, successMessage);
                    location.reload();
                },
                (err: Error) => {
                    console.warn(err);
                    this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenarioRequestDelete'));
                    this.appStoreActions.setShowError(true);
                }
            );

        });
    }
}
