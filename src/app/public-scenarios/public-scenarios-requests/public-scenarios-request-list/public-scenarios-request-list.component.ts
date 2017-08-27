import { Component, Input, OnInit } from '@angular/core';
import { PublicScenarioRequest } from '../../../interfaces';
@Component({
    selector: 'sce-public-scenarios-request-list',
    templateUrl: './public-scenarios-request-list.component.html'
})
export class PublicScenariosRequestListComponent implements OnInit {

    @Input('requestList')
    requestList: PublicScenarioRequest[] = [];

    constructor() { }

    ngOnInit() {
    }

}
