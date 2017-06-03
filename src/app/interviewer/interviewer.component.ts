import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStoreActions } from '../app-store/app-store.actions';
import { AppStoreWatchers } from '../app-store/app-store.watchers';

import { SimpleInterviewAsyncs } from '../simple-interview/simple-interview.asyncs';

import { PDFblob, SimpleInterviewQuestion } from '../interfaces';
import { ERROR_MSG } from '../app.constants';
import { GENERATED_PDF_FILENAME, GENERATED_PDF_MIMETYPE, ANSWER_PLACEHOLDER } from './interviewer.constants';

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
        private simpleInterviewAsyncs: SimpleInterviewAsyncs,
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
            }
        );
    }

    public generatePDF(): void {
        this.simpleInterviewAsyncs.postInterviewAnswers(this.interviewerQuestions).subscribe(
            (response: PDFblob) => {

                const pdfBlob = new Blob([response], { type: GENERATED_PDF_MIMETYPE }),
                      anchor = document.createElement('a');

                anchor.href = URL.createObjectURL(pdfBlob);
                anchor.download = GENERATED_PDF_FILENAME;
                anchor.click();
            },
            (err: Error) => {
                console.warn(err);
                this.appStoreActions.setErrorMessage(ERROR_MSG.get('interviewSummaryGeneration'));
                this.appStoreActions.setShowError(true);
            }
        );
    }

    public listQuestionsWithAnswers(): String[] {
        return this.interviewerQuestions.filter(question => Boolean(question.answer)).map(question => question.questionText);
    }

    public listQuestionsWithoutAnswers(): String[] {
        return this.interviewerQuestions.filter(question => !Boolean(question.answer)).map(question => question.questionText);
    }

    public isInterviewInProgress(): boolean {
        return this.interviewerQuestions.some(question => Boolean(question.answer));
    }

    public restartInterview(): void {
        this.cleanInterview();
        this.goToFirstQuestion();
    }

    private cleanInterview(): void {
        this.interviewerQuestions.forEach((element: SimpleInterviewQuestion) => {
            element.answer = '';
        });
        this.appStoreActions.setInterviewerQuestions(this.interviewerQuestions);
    }

    private goToFirstQuestion(): void {
        this.appStoreActions.setCurrentInteviewerQuestion(this.interviewerQuestions[0]);
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

    private isLastQuestionActive(): boolean {
        if (this.getCurrentQuestionIndex() === (this.interviewerQuestions.length - 1)) {
            return true;
        }else {
            return false;
        }
    }

    private isFirstQuestionActive(): boolean {
        if (this.getCurrentQuestionIndex() === 0) {
            return true;
        }else {
            return false;
        }
    }

}
