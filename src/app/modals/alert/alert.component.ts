import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface AlertModel {
    title: string;
    message: string;
}

@Component({
    selector: 'sce-alert',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{title || 'Alert!'}}</h4>
                    </div>
                    <div class="modal-body">
                        <p>{{message || 'TADAA-AM!'}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="uk-button uk-button-primary" (click)="close()">OK</button>
                    </div>
                </div>
                </div>`
})
export class AlertComponent extends DialogComponent<AlertModel, null> implements AlertModel {

    title: string;
    message: string;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }
}
