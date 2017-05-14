
import { Injectable } from '@angular/core';
import { AppStoreService } from './app-store.service';
import { ScenarioSelectFilterOption } from '../interfaces';

@Injectable()
export class AppStoreActions {

    constructor(
        private appStoreService: AppStoreService
    ) { }

    public setShowError(value: boolean): void {
        this.appStoreService.getShowError().next(value);
    }

    public setErrorMessage(value: string): void {
        this.appStoreService.errorMessage = value;
    }

    public setScenarioFilterChoice(value: ScenarioSelectFilterOption): void {
        this.appStoreService.scenarioFilterChoice = value;
    }

    public scenarioFilterValue(value: string): void {
        this.appStoreService.scenarioFilterValue = value;
    }
}
