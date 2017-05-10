import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppStoreService {

    public showError = new BehaviorSubject(false);
    public errorMessage = '';

    public getShowError(): BehaviorSubject<boolean> {
        return this.showError;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }
}
