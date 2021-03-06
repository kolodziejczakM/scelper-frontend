import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnalyticsService,
         GA_ACTIONS } from '../shared/analytics.service';
import { AppStoreActions } from '../app-store/app-store.actions';
import { AppStoreWatchers } from '../app-store/app-store.watchers';

import { SimpleInterviewAsyncs } from '../simple-interview/simple-interview.asyncs';

import { PDFblob, SimpleInterviewQuestion, ScelperSymbol } from '../interfaces';
import { ERROR_MSG } from '../app.constants';
import { GENERATED_PDF_FILENAME,
         GENERATED_PDF_MIMETYPE,
         GENERATE_BTN_TEXT,
         RESTART_BTN_TEXT,
         MISSING_QUESTION_TEXT,
         ANSWER_PLACEHOLDER } from './interviewer.constants';

@Component({
    selector: 'sce-interviewer',
    templateUrl: './interviewer.component.html'
})
export class InterviewerComponent implements OnInit {

    public answerPlaceholder = ANSWER_PLACEHOLDER;
    public generateBtnText = GENERATE_BTN_TEXT;
    public restartBtnText = RESTART_BTN_TEXT;
    public missingQuestionText = MISSING_QUESTION_TEXT;

    public isInterviewerTutorialVisible = true;
    public interviewerQuestions: SimpleInterviewQuestion[] = [];
    public currentInterviewerQuestion = {} as SimpleInterviewQuestion;

    private currentIntervalID;

    constructor(
        private appStoreActions: AppStoreActions,
        private appStoreWatchers: AppStoreWatchers,
        private simpleInterviewAsyncs: SimpleInterviewAsyncs,
        private router: Router,
        private analyticsService: AnalyticsService
    ) { }

    ngOnInit() {
        this.watchInterviewerQuestions();
        this.watchCurrentInterviewerQuestion();
        this.watchIsInterviewerTutorialVisible();
    }

    private watchIsInterviewerTutorialVisible(): void {
        this.appStoreWatchers.watchIsInterviewerTutorialVisible().skip(1).takeUntil(this.router.events.pairwise()).subscribe(
            storeVal => {
                this.isInterviewerTutorialVisible = storeVal;
            }
        );
    }

    private watchInterviewerQuestions(): void {
        this.appStoreWatchers.watchInterviewerQuestions().skip(1).takeUntil(this.router.events.pairwise()).subscribe(
            storeVal => {
                this.interviewerQuestions = storeVal;
                this.appStoreActions.setCurrentInteviewerQuestion(this.interviewerQuestions[0]);
            }
        );
    }

    private watchCurrentInterviewerQuestion(): void {
        this.appStoreWatchers.watchCurrentInterviewerQuestion().skip(1).takeUntil(this.router.events.pairwise()).subscribe(
            storeVal => {
                this.currentInterviewerQuestion = storeVal;
                this.measureCurrentQuestionAnsweringTime();
                this.setRandomSymbols();
            }
        );
    }

    private measureCurrentQuestionAnsweringTime(): void {
        if (this.currentIntervalID) {
            clearInterval(this.currentIntervalID);
        }

        this.currentIntervalID = setInterval(this.incrementTimeOfAnswering.bind(this), 1000);
    }

    private incrementTimeOfAnswering(): void {
        this.currentInterviewerQuestion.timeOfAnswering += 1;
    }

    private setRandomSymbols(): void {
        this.simpleInterviewAsyncs.getRandomSymbols().subscribe(
            (response: ScelperSymbol[]) => {
                this.appStoreActions.setRandomSymbols(response);
            },
            (err: Error) => {
                console.warn(err);
            }
        );
    }

    public generatePDF(): void {
        this.analyticsService.trackClick(GA_ACTIONS.get('simpleInterviewResults'));

        this.simpleInterviewAsyncs.postInterviewAnswers(this.interviewerQuestions).subscribe(
            (response: PDFblob) => {

                const pdfBlob = new Blob([response], { type: GENERATED_PDF_MIMETYPE }),
                      anchor = document.createElement('a');

                anchor.href = URL.createObjectURL(pdfBlob);
                anchor.download = GENERATED_PDF_FILENAME;
                document.body.appendChild(anchor);
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
        this.analyticsService.trackClick(GA_ACTIONS.get('simpleInterviewRestart'));
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
        this.analyticsService.trackClick(GA_ACTIONS.get('simpleInterviewNextQuestion'));
        if (!this.isLastQuestionActive()) {
             this.appStoreActions.setCurrentInteviewerQuestion(this.interviewerQuestions[this.getCurrentQuestionIndex() + 1]);
        }
    }

    public goToPreviousQuestion(): void {
        this.analyticsService.trackClick(GA_ACTIONS.get('simpleInterviewPreviousQuestion'));
        if (!this.isFirstQuestionActive()) {
           this.appStoreActions.setCurrentInteviewerQuestion(this.interviewerQuestions[this.getCurrentQuestionIndex() - 1]);
        }
    }

    public isLastQuestionActive(): boolean {
        if (this.getCurrentQuestionIndex() === (this.interviewerQuestions.length - 1)) {
            return true;
        }else {
            return false;
        }
    }

    public isFirstQuestionActive(): boolean {
        if (this.getCurrentQuestionIndex() === 0) {
            return true;
        }else {
            return false;
        }
    }

}
