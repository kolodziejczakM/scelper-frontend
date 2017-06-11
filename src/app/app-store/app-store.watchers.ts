
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppStoreService } from './app-store.service';

import { SimpleInterviewQuestion, ScelperSymbol } from '../interfaces';

@Injectable()
export class AppStoreWatchers {

    constructor(
        private appStoreService: AppStoreService
    ) { }

    public watchShowError(): BehaviorSubject<boolean> {
        return this.appStoreService.getShowError();
    }

    public watchInterviewerQuestions(): BehaviorSubject<SimpleInterviewQuestion[]> {
        return this.appStoreService.getInterviewerQuestions();
    }

    public watchCurrentInterviewerQuestion(): BehaviorSubject<SimpleInterviewQuestion> {
        return this.appStoreService.getCurrentInterviewerQuestion();
    }

    public watchRandomSymbols(): BehaviorSubject<ScelperSymbol[]> {
        return this.appStoreService.getRandomSymbols();
    }

    public watchIsInterviewerTutorialVisible(): BehaviorSubject<boolean> {
        return this.appStoreService.getIsInterviewerTutorialVisible();
    }

}
