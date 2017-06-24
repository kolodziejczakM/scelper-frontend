import { Component } from '@angular/core';
import { STATIC_TEXTS } from './interview.constants';

@Component({
    selector: 'sce-interview',
    templateUrl: './interview.component.html'
})
export class InterviewComponent {

    public staticTexts: Map<string, string> = STATIC_TEXTS;

}
