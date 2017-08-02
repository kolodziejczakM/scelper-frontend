import { Component, OnInit } from '@angular/core';

import { AppStoreActions } from '../app-store/app-store.actions';
import { PublicScenariosAsyncs } from './public-scenarios.asyncs';
import { PublicScenario } from '../interfaces';

import { ERROR_MSG, SCENARIO_FILTER_DROPDOWN_OPTIONS } from '../app.constants';
import { PDF_FORM_TXT } from './new-scenario-form/new-scenario-form.constants';

@Component({
    selector: 'sce-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {

    public formVisible = false;
    public formText: Map<string, string> = PDF_FORM_TXT;
    public selectFilterOptions = SCENARIO_FILTER_DROPDOWN_OPTIONS;
    public scenarios: PublicScenario[] = [];
    public fetchingScenarios = true;

    constructor(
        private appStoreActions: AppStoreActions,
        private publicScenariosAsyncs: PublicScenariosAsyncs
    ) { }

    ngOnInit() {
        this.preparePublicScenarios();
    }

    public toggleForm(): void {
        this.formVisible = !this.formVisible;
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

}
