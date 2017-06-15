import { Component } from '@angular/core';
import { AppStoreActions } from '../app-store/app-store.actions';
import { ANSWER_PLACEHOLDER, GENERATE_BTN_TEXT } from '../interviewer/interviewer.constants';

@Component({
    selector: 'sce-interviewer-tutorial',
    templateUrl: './interviewer-tutorial.component.html'
})
export class InterviewerTutorialComponent {

    public btnText = {
        abort: 'Pomiń',
        back: 'Cofnij',
        start: 'Rozpocznij',
        next: 'Dalej',
        finish: 'Zakończ tutorial'
    };

    public firstStep = 0;
    public currentStep = this.firstStep;
    public tutorialTexts = [
        [
            'Jeśli jesteś tu pierwszy raz - polecamy skorzystać z krótkiego wprowadzenia.',
            'Pomoże Ci ono zrozumieć sposób w jaki prowadzony jest wywiad i objaśni interfejs.'
        ],
        [
            'Pośrodku ekranu widoczne jest aktualne pytanie umieszczone w specjalnym bloku:',
            'Co tam słychać?'
        ],
        [
            'Po obu stronach pytania znajdują się strzałki:',
            'Dzięki nim możesz nawigować pomiędzy pytaniami.'
        ],
        [
            'Pod pytaniem znajdują się trzy symbole np.',
            'Symbole mają inspirować, naprowadzać na pomysły kiedy nic nie przychodzi do głowy.'
        ],
        [
            'Pod symbolami znajdziesz miejsce na swoją odpowiedź:',
            ANSWER_PLACEHOLDER
        ],
        [
            'Jeśli prawa strzałka zniknęła to znaczy, że widzisz ostatnie pytanie.',
            'Jeżeli odpowiedziano na co najmniej jedno pytanie - wyświetli się taki przycisk:',
            GENERATE_BTN_TEXT
        ]
    ];

    public lastStep = this.tutorialTexts.length - 1;

    constructor(
        private appStoreActions: AppStoreActions
    ) { }

    public closeTutorial(): void {
        this.appStoreActions.setIsInterviewerTutorialVisible(false);
    }

    public isAtFirstStep(): boolean {
        return this.currentStep === this.firstStep;
    }

    public isAtLastStep(): boolean {
        return this.currentStep === this.lastStep;
    }

    public nextStep(): void {
        if (this.currentStep < this.tutorialTexts.length - 1) {
            this.currentStep += 1;
        }
    }

    public previousStep(): void {
        if (this.currentStep >= 1) {
            this.currentStep -= 1;
        }
    }
}
