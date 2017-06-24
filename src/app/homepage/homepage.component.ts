import { Component } from '@angular/core';
import { STATIC_TEXTS } from './homepage.constants';

@Component({
    selector: 'sce-homepage',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    public staticTexts: Map<string, string> = STATIC_TEXTS;

}
