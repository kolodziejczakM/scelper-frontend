import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface PromptModel {
  title: string;
  question: string;
}

@Component({
  selector: 'sce-prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <h4 class="modal-title">{{title || 'Prompt'}}</h4>
                   </div>
                   <div class="modal-body uk-margin">
                    <input type="text" placeholder="XXX-XXX-XXX-XXX-XXX" class="uk-input" [(ngModel)]="message" name="deleteCode"/>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="uk-button uk-button-primary" (click)="apply()">OK</button>
                     <button type="button" class="uk-button uk-button-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
                </div>`
})
export class PromptComponent extends DialogComponent<PromptModel, string> implements PromptModel {

    title: string;
    question: string;
    message = '';

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    apply() {
        this.result = this.message;
        this.close();
    }
}
