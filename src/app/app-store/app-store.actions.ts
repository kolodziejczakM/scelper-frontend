
import { Injectable } from '@angular/core';
import { AppStoreService } from './app-store.service';

@Injectable()
export class AppStoreActions {

    constructor(
        private appStoreService: AppStoreService
    ) { }

    public setShowError(value: boolean): void {
        this.appStoreService.getShowError().next(value);
    }

    public setErrorMessage(value: string): void {
        this.appStoreService.errorMessage = value;
    }
}
