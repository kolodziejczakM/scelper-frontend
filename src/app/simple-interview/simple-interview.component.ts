import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

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
        this.setMixedQuestions();
    }

    private setMixedQuestions (): void {
        this.simpleInterviewAsyncs.getQuestions().subscribe(
            (response: SimpleInterviewQuestion[]) => {

                this.extendSimpleInterviewQuestions(response);
                const reshuffled = _.shuffle(response);

                this.appStoreActions.setInterviewerQuestions(reshuffled);
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('questionsDownload'));
                this.appStoreActions.setShowError(true);
            }
        );
    }

    private extendSimpleInterviewQuestions(questionArr: SimpleInterviewQuestion[]): void {
        questionArr.forEach(questionObject => {
            questionObject.answer = '';
            questionObject.timeOfAnswering = 0;
        });
    }

}
