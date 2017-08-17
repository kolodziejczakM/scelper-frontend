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
    ['downloadPublicScenario', 'Download public scenario'],
    ['deletePublicScenario', 'Delete public scenario'],
    ['toggleAddFormPublicScenario', 'Toogle form for adding public scenario'],
    ['publishScenario', 'Publish scenario as public'],
    ['simpleInterviewNextQuestion', 'Go to next question on simple interview'],
    ['simpleInterviewPreviousQuestion', 'Go to previous question on simple interview'],
    ['simpleInterviewResults', 'Get results as PDF from simple interview'],
    ['simpleInterviewRestart', 'Restart simple interview'],
    ['simpleInterviewTutorialNextStep', 'Start tutorial on simple interview'],
    ['simpleInterviewTutorialPreviousStep', 'Finish tutorial on simple interview'],
    ['simpleInterviewTutorialClose', 'Close tutorial on simple interview']
]);

export function report(category: string, action: string, label?: string): MethodDecorator {

    return (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const decoratedMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {

            if (!this.analyticsService) {
                console.warn('Cannot find analyticsService among current context.');
            }

            this.analyticsService.trackEvent(category, action, label);
            decoratedMethod.call(this, ...args);
        };

        return descriptor;
    };
}

export function reportClick(action: string): MethodDecorator {
    return report(GA_CATEGORIES.get('click'), action);
}

@Injectable()
export class AnalyticsService {

    constructor(
        private angulartics2: Angulartics2
    ) { }

    public trackEvent(category: string, action: string, label?: string): void {
        this.angulartics2.eventTrack.next({
            action,
            properties: { category, label }
        });
    }
}
