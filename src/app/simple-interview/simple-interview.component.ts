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

    constructor(
        private appStoreActions: AppStoreActions,
        private simpleInterviewAsyncs: SimpleInterviewAsyncs
    ) { }

    ngOnInit() {
        this.setQuestions();
    }

    private setQuestions (): void {
        this.simpleInterviewAsyncs.getQuestions().subscribe(
            (response: SimpleInterviewQuestion[]) => {
                this.appStoreActions.setInterviewerQuestions(response);
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('questionsDownload'));
                this.appStoreActions.setShowError(true);
            }
        );
    }

}
