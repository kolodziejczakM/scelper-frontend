import { Component, OnInit } from '@angular/core';
import { AppStoreService } from './app-store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    currentErrorMsg = '';
    errorsOccured = false;

    constructor(
        private appStoreService: AppStoreService) {}

    ngOnInit() {
        this.watchErrors();
    }

    watchErrors() {
        this.appStoreService.showError.subscribe(storeVal => {
            this.errorsOccured = storeVal;
            this.currentErrorMsg = this.appStoreService.errorMessage;
        });
    }

}
