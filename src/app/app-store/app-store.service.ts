import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SCENARIO_FILTER_DROPDOWN_OPTIONS } from '../app.constants';
import { ScenarioSelectFilterOption, SimpleInterviewQuestion, ScelperSymbol } from '../interfaces';

@Injectable()
export class AppStoreService {

    public showError = new BehaviorSubject(false);
    public errorMessage = '';

    public scenarioFilterChoice: ScenarioSelectFilterOption = SCENARIO_FILTER_DROPDOWN_OPTIONS[0];
    public scenarioFilterValue = '';

    public interviewerQuestions = new BehaviorSubject([{ id: 0, category: '', questionText: '' }] as SimpleInterviewQuestion[]);
    public currentInterviewerQuestion = new BehaviorSubject({} as SimpleInterviewQuestion);

    public randomSymbols = new BehaviorSubject([] as ScelperSymbol[]);
    public isInterviewerTutorialVisible = new BehaviorSubject(true);

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

    public getInterviewerQuestions() {
        return this.interviewerQuestions;
    }

    public getCurrentInterviewerQuestion() {
        return this.currentInterviewerQuestion;
    }

    public getRandomSymbols(): BehaviorSubject<ScelperSymbol[]> {
        return this.randomSymbols;
    }

    public getIsInterviewerTutorialVisible(): BehaviorSubject<boolean> {
        return this.isInterviewerTutorialVisible;
    }
}
