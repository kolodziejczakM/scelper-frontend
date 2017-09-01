import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PublicScenario, ResponseObject } from '../../interfaces';
import * as helpers from '../../app.helpers';

import { AnalyticsService,
         reportClick,
         GA_ACTIONS } from '../../shared/analytics.service';
import { AppStoreService } from '../../app-store/app-store.service';
import { AppStoreActions } from '../../app-store/app-store.actions';
import { ModalsService } from '../../modals/modals.service';
import { PublicScenariosAsyncs } from '../public-scenarios.asyncs';

import { environment } from '../../../environments/environment';
import { APP_NAME,
         ERROR_MSG,
         COMMON_MSG,
         SCENARIO_FILTER_DROPDOWN_OPTIONS,
         NO_RESULT_TEXT,
         MAYBE_YOU_TEXT } from '../../app.constants';

@Component({
    selector: 'sce-public-scenarios-table',
    templateUrl: './public-scenarios-table.component.html'
})
export class PublicScenariosTableComponent {

    @Input('scenarios') scenarios: PublicScenario[] = [];
    @Input('fetchingScenarios') fetchingScenarios = true;

    public noResultsText = NO_RESULT_TEXT;
    public maybeYouText = MAYBE_YOU_TEXT;
    public selectFilterOptions = SCENARIO_FILTER_DROPDOWN_OPTIONS;

    constructor(
        private appStoreService: AppStoreService,
        private appStoreActions: AppStoreActions,
        private modalsService: ModalsService,
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private analyticsService: AnalyticsService
    ) { }

    public showAlert(title, message): void {
        this.modalsService.showAlert(title, message);
    }

    public showPrompt(title): Observable<any> {
        return this.modalsService.showPrompt(title);
    }

    public filterScenarios(scenarios: PublicScenario[] = []): any {

        if (!scenarios.length) {
            return scenarios;
        }

        return scenarios.filter(scenario => scenario[this.appStoreService.getScenarioFilterChoice().category].toLowerCase()
                        .indexOf(this.appStoreService.getScenarioFilterValue().toLowerCase()) !== -1);
    }

    @reportClick(GA_ACTIONS.get('deletePublicScenario'))
    public removeScenario(): void {

        this.showPrompt(COMMON_MSG.get('deletePrompt')).subscribe((deleteCode) => {
            if (!deleteCode) {
                return;
            }

            this.publicScenariosAsyncs.deletePublicScenario(deleteCode).subscribe(
                (response: ResponseObject) => {
                    const successMessage = helpers.translateServerResponse(response.code);
                    this.showAlert(APP_NAME, successMessage);
                    location.reload();
                },
                (err: Error) => {
                    console.warn(err);
                    this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenarioDelete'));
                    this.appStoreActions.setShowError(true);
                }
            );

        });
    }

    @reportClick(GA_ACTIONS.get('downloadPublicScenario'))
    public downloadScenario(path: string): void {
        location.href = environment.serverRoot + path.replace('public', '');
    }

}
