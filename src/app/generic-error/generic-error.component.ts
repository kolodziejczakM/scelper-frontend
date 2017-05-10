import { Component, Input, OnDestroy } from '@angular/core';
import { BACK_BUTTON_TEXT } from '../app.constants';
import { AppStoreActions } from '../app-store/app-store.actions';

@Component({
    selector: 'app-generic-error',
    templateUrl: './generic-error.component.html'
})
export class GenericErrorComponent implements OnDestroy {

    hideText = BACK_BUTTON_TEXT;

    @Input() header: string;
    @Input() message: string;

    constructor(
        private appStoreActions: AppStoreActions
    ) { }

    ngOnDestroy() {
        console.clear();
    }

    public hide(): void {
        this.appStoreActions.setShowError(false);
    }

}
