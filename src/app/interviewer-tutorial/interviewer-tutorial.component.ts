import { Component } from '@angular/core';
import { AppStoreActions } from '../app-store/app-store.actions';

@Component({
    selector: 'sce-interviewer-tutorial',
    templateUrl: './interviewer-tutorial.component.html'
})
export class InterviewerTutorialComponent {

    public abortBtnText = 'Pomiń';
    public backBtnText = 'Cofnij';
    public startBtnText = 'Rozpocznij';
    public nextBtnText = 'Dalej';

    private currentStep = 0;
    public tutorialTexts = [
        [
            'Jeśli jesteś tu pierwszy raz - polecamy skorzystać z krótkiego wprowadzenia.',
            'Pomoże Ci ono zrozumieć sposób w jaki prowadzony jest wywiad i objaśni interfejs.'
        ],
        [
            'Pośrodku ekranu widoczne jest aktualne pytanie umieszczone w specjalnym bloku:',
            'Po obu stronach pytania znajdują się strzałki:',
            'dzięki nim możesz nawigować pomiędzy pytaniami.'
        ]
    ];

    constructor(
        private appStoreActions: AppStoreActions
    ) { }

    public closeTutorial(): void {
        this.appStoreActions.setIsInterviewerTutorialVisible(false);
    }

    public isAtFirstStep(): boolean {
        return this.currentStep === 0;
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
