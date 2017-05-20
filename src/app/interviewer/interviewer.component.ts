import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppStoreActions } from '../app-store/app-store.actions';
import { AppStoreWatchers } from '../app-store/app-store.watchers';

import { SimpleInterviewQuestion } from '../interfaces';

@Component({
    selector: 'sce-interviewer',
    templateUrl: './interviewer.component.html'
})
export class InterviewerComponent implements OnInit, OnDestroy {

    public interviewerQuestions: SimpleInterviewQuestion[] = [];
    public currentInterviewerQuestion = {} as SimpleInterviewQuestion;

    constructor(
        private appStoreActions: AppStoreActions,
        private appStoreWatchers: AppStoreWatchers
    ) { }

    ngOnInit() {
        this.watchInterviewerQuestions(); // needs unsubscribing after destroy.
        this.watchCurrentInterviewerQuestion(); // needs unsubscribing after destroy.
    }

    ngOnDestroy() {
        this.appStoreWatchers.watchInterviewerQuestions();
        this.appStoreWatchers.watchCurrentInterviewerQuestion().unsubscribe();
    }

    private watchInterviewerQuestions(): void {
        this.appStoreWatchers.watchInterviewerQuestions().subscribe(
            storeVal => {
                console.log('Start Watching 1');
                this.interviewerQuestions = storeVal;
                this.setCurrentQuestion(storeVal[0]);
            }
        );
    }

    private watchCurrentInterviewerQuestion(): void {
        this.appStoreWatchers.watchCurrentInterviewerQuestion().subscribe(
            storeVal => {
                console.log('Start Watching 2');
                this.currentInterviewerQuestion = storeVal;
            }
        );
    }

    private setCurrentQuestion(value): void {
        this.appStoreActions.setCurrentInteviewerQuestion(value);
    }

}
