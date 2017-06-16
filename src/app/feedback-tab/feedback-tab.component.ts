import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'sce-feedback-tab',
    templateUrl: './feedback-tab.component.html'
})
export class FeedbackTabComponent implements OnInit {

    public expanded = false;

    @HostListener('document:click', [])
    public collapse(): void {
        this.expanded = false;
    }

    constructor() { }

    ngOnInit() {
    }

    public expand($event): void {
        $event.stopPropagation();
        this.expanded = true;
    }

}
