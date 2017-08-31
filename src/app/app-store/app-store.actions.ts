
import { Injectable } from '@angular/core';
import { AppStoreService } from './app-store.service';
import { ScenarioSelectFilterOption, SimpleInterviewQuestion, ScelperSymbol } from '../interfaces';

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

    public setScenarioRequestFilterChoice(value: ScenarioSelectFilterOption): void {
        this.appStoreService.scenarioRequestFilterChoice = value;
    }

    public setScenarioRequestFilterValue(value: string): void {
        this.appStoreService.scenarioRequestFilterValue = value;
    }

    public setScenarioFilterChoice(value: ScenarioSelectFilterOption): void {
        this.appStoreService.scenarioFilterChoice = value;
    }

    public setScenarioFilterValue(value: string): void {
        this.appStoreService.scenarioFilterValue = value;
    }

    public setInterviewerQuestions(value: SimpleInterviewQuestion[]): void {
        this.appStoreService.getInterviewerQuestions().next(value);
    }

    public setCurrentInteviewerQuestion(value: SimpleInterviewQuestion): void {
        this.appStoreService.getCurrentInterviewerQuestion().next(value);
    }

    public setRandomSymbols(value: ScelperSymbol[]): void {
        this.appStoreService.getRandomSymbols().next(value);
    }

    public setIsInterviewerTutorialVisible(value: boolean): void {
        this.appStoreService.getIsInterviewerTutorialVisible().next(value);
    }
}
