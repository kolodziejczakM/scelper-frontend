
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppStoreService } from './app-store.service';

@Injectable()
export class AppStoreWatchers {

    constructor(
        private appStoreService: AppStoreService
    ) { }

    public watchShowError(): BehaviorSubject<boolean> {
        return this.appStoreService.getShowError();
    }

}
