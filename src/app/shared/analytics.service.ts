import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

export const GA_LABELS = new Map([
    ['publicScenarios', 'Public scenarios view'],
    ['simpleInterview', 'Simple interview view']
]);

export const GA_CATEGORIES = new Map([
    ['click', 'Button click']
]);

export const GA_ACTIONS = new Map([
    ['expandFeedbackTab', 'Feedback tab expanded'],
    ['playEstimationRecord', 'Estimation record played'],
    ['pauseEstimationRecord', 'Estimation record paused'],
    ['resetEstimation', 'Reset estimation clicked'],
    ['submitEstimation', 'Scene estimation submitted'],
    ['downloadPublicScenario', 'Download public scenario'],
    ['deletePublicScenario', 'Delete public scenario'],
    ['deletePublicScenarioRequest', 'Delete public scenario request'],
    ['toggleFormAddPublicScenario', 'Toogle form for adding public scenario'],
    ['toggleFormAddPublicScenarioRequest', 'Toogle form for adding public scenario request'],
    ['publishScenario', 'Publish scenario as public'],
    ['simpleInterviewNextQuestion', 'Go to next question on simple interview'],
    ['simpleInterviewPreviousQuestion', 'Go to previous question on simple interview'],
    ['simpleInterviewResults', 'Get results as PDF from simple interview'],
    ['simpleInterviewRestart', 'Restart simple interview'],
    ['simpleInterviewTutorialNextStep', 'Start tutorial on simple interview'],
    ['simpleInterviewTutorialPreviousStep', 'Finish tutorial on simple interview'],
    ['simpleInterviewTutorialClose', 'Close tutorial on simple interview']
]);

@Injectable()
export class AnalyticsService {

    constructor(
        private angulartics2: Angulartics2
    ) { }

    public trackClick (action: string): void {
        this.trackEvent(GA_CATEGORIES.get('click'), action);
    }

    public trackEvent(category: string, action: string, label?: string): void {
        this.angulartics2.eventTrack.next({
            action,
            properties: { category, label }
        });
    }
}
