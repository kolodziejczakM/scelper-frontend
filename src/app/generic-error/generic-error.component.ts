import { Component, Input } from '@angular/core';
import { BACK_BUTTON_TEXT } from '../app.constants';
import { AppStoreActions } from '../app-store/app-store.actions';

@Component({
    selector: 'sce-generic-error',
    templateUrl: './generic-error.component.html'
})
export class GenericErrorComponent {

    hideText = BACK_BUTTON_TEXT;

    @Input() header: string;
    @Input() message: string;

    constructor(
        private appStoreActions: AppStoreActions
    ) { }

    public hide(): void {
        this.appStoreActions.setShowError(false);
        location.reload();
    }
}
