import { Component, OnInit } from '@angular/core';

import { GENERIC_ERROR_HEADER } from './app.constants';

import { AppStoreService } from './app-store/app-store.service';
import { AppStoreWatchers } from './app-store/app-store.watchers';

@Component({
    selector: 'sce-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public errorHeader = GENERIC_ERROR_HEADER;
    public currentErrorMsg = '';
    public errorsOccured = false;

    constructor(
        private appStoreService: AppStoreService,
        private appStoreWatchers: AppStoreWatchers) {}

    ngOnInit() {
        this.watchShowError();
    }

    private watchShowError(): void {
        this.appStoreWatchers.watchShowError().subscribe(storeVal => {

            this.errorsOccured = storeVal;
            this.currentErrorMsg = this.appStoreService.getErrorMessage();
        });
    }

}
