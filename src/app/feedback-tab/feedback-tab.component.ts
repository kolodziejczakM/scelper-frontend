import { Component, HostListener } from '@angular/core';
import { AnalyticsService,
         reportClick,
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

    @reportClick(GA_ACTIONS.get('expandFeedbackTab'))
    public expand($event): void {
        $event.stopPropagation();
        this.expanded = true;
    }

}
