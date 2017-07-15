import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { WindowService } from '../shared/window.service';
import { AppStoreService } from '../app-store/app-store.service';
import { AppStoreActions } from '../app-store/app-store.actions';

import { ModalsService } from '../modals/modals.service';
import { PublicScenariosAsyncs } from './public-scenarios.asyncs';

import * as helpers from '../app.helpers'; //
import { PublicScenario, ResponseObject } from '../interfaces';

import { APP_NAME,
         ERROR_MSG,
         COMMON_MSG,
         SCENARIO_FILTER_DROPDOWN_OPTIONS } from '../app.constants';

import { PDF_FORM_TXT } from './new-scenario-form/new-scenario-form.constants';
import { NO_RESULT_TEXT, MAYBE_YOU_TEXT } from './public-scenarios-table/public-scenarios-table.constants';

@Component({
    selector: 'sce-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {

    public formVisible = false;
    public formText: Map<string, string> = PDF_FORM_TXT;
    public scenarios: PublicScenario[] = [];
    public fetchingScenarios = true;

    public selectFilterOptions = SCENARIO_FILTER_DROPDOWN_OPTIONS;

    public noResultsText = NO_RESULT_TEXT;
    public maybeYouText = MAYBE_YOU_TEXT;

    constructor(
        private appStoreService: AppStoreService,
        private appStoreActions: AppStoreActions,
        private publicScenariosAsyncs: PublicScenariosAsyncs,
        private modalsService: ModalsService,
        private windowService: WindowService
    ) { }

    ngOnInit() {
        this.preparePublicScenarios();
    }

    public filterScenarios(scenarios: PublicScenario[] = []): any {

        if (!scenarios.length) {
            return scenarios;
        }

        return scenarios.filter(scenario => scenario[this.appStoreService.getScenarioFilterChoice().category].toLowerCase()
                        .indexOf(this.appStoreService.getScenarioFilterValue().toLowerCase()) !== -1);
    }

    private preparePublicScenarios(): void {
        this.fetchingScenarios = true;

        this.publicScenariosAsyncs.getPublicScenarios().subscribe(
            (res: PublicScenario[]) => {
                this.scenarios = res.map(this.stringifyScenario);
                this.fetchingScenarios = false;
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenariosDownload'));
                this.appStoreActions.setShowError(true);
                this.fetchingScenarios = false;
            }
        );
    }

    private stringifyScenario(scenario: PublicScenario): PublicScenario {
        scenario.state = scenario.state.label;
        scenario.genre = scenario.genre.label;
        scenario.pages = String(scenario.pages);
        return scenario;
    }

    public showAlert(title, message): void {
        this.modalsService.showAlert(title, message);
    }

    public showPrompt(title): Observable<any> {
        return this.modalsService.showPrompt(title);
    }

    public toggleForm(): void {
        this.formVisible = !this.formVisible;
    }

    public removeScenario(): void {

        this.showPrompt(COMMON_MSG.get('deleteScenarioPrompt')).subscribe((deleteCode) => {
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

    public downloadScenario(path: string): void {
        location.href = environment.serverRoot + path.replace('public', '');
    }

}
