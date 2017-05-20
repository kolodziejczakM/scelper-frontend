import { Component, OnInit } from '@angular/core';

import { AppStoreActions } from '../app-store/app-store.actions';

import { SimpleInterviewAsyncs } from './simple-interview.asyncs';
import { SimpleInterviewQuestion } from '../interfaces';

import { ERROR_MSG } from '../app.constants';

@Component({
    selector: 'sce-simple-interview',
    templateUrl: './simple-interview.component.html'
})
export class SimpleInterviewComponent implements OnInit {

    public interviewQuestions: SimpleInterviewQuestion[] = [];

    constructor(
        private appStoreActions: AppStoreActions,
        private simpleInterviewAsyncs: SimpleInterviewAsyncs
    ) { }

    ngOnInit() {
        this.getQuestions();
    }

    private getQuestions () {
        this.simpleInterviewAsyncs.getQuestions().subscribe(
            (response: SimpleInterviewQuestion[]) => {

                this.interviewQuestions = response;
                console.log(this.interviewQuestions);
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('questionsDownload'));
                this.appStoreActions.setShowError(true);
            }
        );
    }

}
