import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { AppStoreService } from '../../../app-store/app-store.service';
import { PublicScenarioRequest } from '../../../interfaces';
import { NO_RESULT_TEXT,
         MAYBE_YOU_TEXT } from '../../../app.constants';

@Component({
    selector: 'sce-public-scenarios-request-list',
    templateUrl: './public-scenarios-request-list.component.html'
})
export class PublicScenariosRequestListComponent {

    @Input('requestList')
    public requestList: PublicScenarioRequest[] = [];

    @Input('fetchingRequests')
    public fetchingRequests = true;

    @ViewChild('listNode')
    public listNode;

    public noResultsText = NO_RESULT_TEXT;
    public maybeYouText = MAYBE_YOU_TEXT;
    public sampleRequest: PublicScenarioRequest = {
        type: 'krótkometrażowy',
        genre: 'przygodowy',
        requestAuthorEmail: 'przykładowy@mail',
        updatedAt: '21/06/17',
        description: `Zależałoby mi aby role były dobrane do osób młodych.
        Pierwszą wersję potrzebowałbym na początek kwietnia. Nie musi być za darmo :)`,
        vehicleNumber: 1,
        actorNumber: 4,
        actressNumber: 1,
        budget: 1500
    };

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
