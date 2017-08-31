import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { AppStoreService } from '../../../app-store/app-store.service';
import { PublicScenarioRequest } from '../../../interfaces';
@Component({
    selector: 'sce-public-scenarios-request-list',
    templateUrl: './public-scenarios-request-list.component.html'
})
export class PublicScenariosRequestListComponent {

    @Input('requestList')
    public requestList: PublicScenarioRequest[] = [];

    @ViewChild('listNode')
    public listNode;

    constructor(
        private appStoreService: AppStoreService
    ) { }

    @HostListener('mousewheel', ['$event'])
    public scrollHorizontally(event) {
        this.listNode.nativeElement.scrollLeft -= (event.wheelDelta);
    }

    public filterScenariosRequests(requestList: PublicScenarioRequest[] = []): any {

        if (!requestList.length) {
            return requestList;
        }

        return requestList.filter(request => request[this.appStoreService.getScenarioRequestFilterChoice().category].toLowerCase()
                          .indexOf(this.appStoreService.getScenarioRequestFilterValue().toLowerCase()) !== -1);
    }
}
