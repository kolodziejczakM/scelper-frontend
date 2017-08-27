import { Component, Input, OnInit } from '@angular/core';
import { PublicScenarioRequest } from '../../../interfaces';

@Component({
    selector: 'sce-public-scenarios-request',
    templateUrl: './public-scenarios-request.component.html'
})
export class PublicScenariosRequestComponent implements OnInit {

    @Input('scenarioRequest')
    scenarioRequest: PublicScenarioRequest;

    constructor() { }

    ngOnInit() {
        console.log(this.scenarioRequest);
    }

}
