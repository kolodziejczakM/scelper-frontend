import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sce-interviewer-tutorial',
    templateUrl: './interviewer-tutorial.component.html'
})
export class InterviewerTutorialComponent implements OnInit {

    public abortBtnText = 'Pomiń';
    public startBtnText = 'Rozpocznij';

    public currentTexts = [
        'Jeśli jesteś tu pierwszy raz - polecamy skorzystać z krótkiego wprowadzenia.',
        'Pomoże Ci ono zrozumieć sposób w jaki prowadzony jest wywiad i objaśni interfejs.'
    ];

    constructor() { }

    ngOnInit() {
    }
}
