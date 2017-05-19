import { Component, OnInit } from '@angular/core';
import { SimpleInterviewAsyncs } from './simple-interview.asyncs';
import { SimpleInterview } from '../interfaces';

@Component({
    selector: 'sce-simple-interview',
    templateUrl: './simple-interview.component.html'
})
export class SimpleInterviewComponent implements OnInit {

    public interviewQuestions = [];

    constructor(
        private simpleInterviewAsyncs: SimpleInterviewAsyncs
    ) { }

    ngOnInit() {
        this.getQuestions();
    }

    private getQuestions () {
        this.simpleInterviewAsyncs.getQuestions().subscribe(
            (response: SimpleInterview[]) => {
                console.log('Success: ', response);
                this.interviewQuestions = response;
            },
            (err: Error) => {
                console.warn(err);
                console.log(' //TODO needs error handling :)');
                // this.appStoreActions.setErrorMessage(ERROR_MSG.get('scenariosDownload'));
                // this.appStoreActions.setShowError(true);
            }
        );
    }

}
