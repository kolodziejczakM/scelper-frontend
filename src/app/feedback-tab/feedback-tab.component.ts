import { Component, HostListener } from '@angular/core';
import { AnalyticsService,
         GA_ACTIONS } from '../shared/analytics.service';
@Component({
    selector: 'sce-feedback-tab',
    templateUrl: './feedback-tab.component.html'
})
export class FeedbackTabComponent {

    public expanded = false;
    public visibleText = 'BETA';

    public hiddenText = {
        question: 'Znalazłeś bug\'a?',
        mail: 'feedback@scelper.com'
    };

    constructor(
        private analyticsService: AnalyticsService
    ) {}

    @HostListener('document:click', [])
    public collapse(): void {
        this.expanded = false;
    }

    public expand($event): void {
        this.analyticsService.trackClick(GA_ACTIONS.get('expandFeedbackTab'));
        $event.stopPropagation();
        this.expanded = true;
    }

}
