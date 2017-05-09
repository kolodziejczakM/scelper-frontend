import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppStoreService {

    showError = new BehaviorSubject(false);
    errorMessage = '';
}
