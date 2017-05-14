import { Component, OnInit } from '@angular/core';
import { STATIC_TEXTS } from './interview.constants';

@Component({
    selector: 'sce-interview',
    templateUrl: './interview.component.html'
})
export class InterviewComponent implements OnInit {

    public staticTexts: Map<string, string> = STATIC_TEXTS;

    constructor() { }

    ngOnInit() {
    }

}
