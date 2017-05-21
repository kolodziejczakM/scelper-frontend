import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStoreActions } from '../app-store/app-store.actions';
import { AppStoreWatchers } from '../app-store/app-store.watchers';

import { SimpleInterviewQuestion } from '../interfaces';
import { ANSWER_PLACEHOLDER } from './interviewer.constants';

@Component({
    selector: 'sce-interviewer',
    templateUrl: './interviewer.component.html'
})
export class InterviewerComponent implements OnInit {

    public answerPlaceholder = ANSWER_PLACEHOLDER;

    public interviewerQuestions: SimpleInterviewQuestion[] = [];
    public currentInterviewerQuestion = {} as SimpleInterviewQuestion;

    constructor(
        private appStoreActions: AppStoreActions,
        private appStoreWatchers: AppStoreWatchers,
        private router: Router
    ) { }

    ngOnInit() {
        this.watchInterviewerQuestions();
        this.watchCurrentInterviewerQuestion();
    }

    private watchInterviewerQuestions(): void {
        this.appStoreWatchers.watchInterviewerQuestions().takeUntil(this.router.events.pairwise()).subscribe(
            storeVal => {
                this.interviewerQuestions = storeVal;
                this.appStoreActions.setCurrentInteviewerQuestion(storeVal[0]);
            }
        );
    }

    private watchCurrentInterviewerQuestion(): void {
        this.appStoreWatchers.watchCurrentInterviewerQuestion().takeUntil(this.router.events.pairwise()).subscribe(
            storeVal => {
                this.currentInterviewerQuestion = storeVal;
                console.log('current is now: ', this.currentInterviewerQuestion);
            }
        );
    }

    public updateCurrentAnswer($event): void {
        this.interviewerQuestions[this.getCurrentQuestionIndex()].answer = $event.target.value;
    }

    private getCurrentQuestionIndex(): number {
       return this.interviewerQuestions.findIndex(el => el._id === this.currentInterviewerQuestion._id);
    }

    public goToNextQuestion(): void {
        if (!this.isLastQuestionActive()) {
             this.appStoreActions.setCurrentInteviewerQuestion(this.interviewerQuestions[this.getCurrentQuestionIndex() + 1]);
        }
    }

    public goToPreviousQuestion(): void {
        if (!this.isFirstQuestionActive()) {
           this.appStoreActions.setCurrentInteviewerQuestion(this.interviewerQuestions[this.getCurrentQuestionIndex() - 1]);
        }
    }

    private isLastQuestionActive() {
        if (this.getCurrentQuestionIndex() === (this.interviewerQuestions.length - 1)) {
            return true;
        }else {
            return false;
        }
    }

    private isFirstQuestionActive() {
        if (this.getCurrentQuestionIndex() === 0) {
            return true;
        }else {
            return false;
        }
    }

}
