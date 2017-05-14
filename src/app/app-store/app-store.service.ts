import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SCENARIO_FILTER_DROPDOWN_OPTIONS } from '../app.constants';
import { ScenarioSelectFilterOption } from '../interfaces';

@Injectable()
export class AppStoreService {

    public showError = new BehaviorSubject(false);
    public errorMessage = '';

    public scenarioFilterChoice: ScenarioSelectFilterOption = SCENARIO_FILTER_DROPDOWN_OPTIONS[0];
    public scenarioFilterValue = '';

    public getShowError(): BehaviorSubject<boolean> {
        return this.showError;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }

    public getScenarioFilterChoice(): ScenarioSelectFilterOption {
        return this.scenarioFilterChoice;
    }

    public getScenarioFilterValue(): string {
        return this.scenarioFilterValue;
    }
}
