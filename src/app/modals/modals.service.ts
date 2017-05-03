import { Injectable } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { PromptComponent } from './prompt/prompt.component';
import { AlertComponent } from './alert/alert.component';


@Injectable()
export class ModalsService {

    constructor(
        private dialogService: DialogService
    ) { }

    public showAlert(title, message): void {
        this.dialogService.addDialog(AlertComponent, { title, message });
    }

    public showPrompt(context, variableName, title): void {
        this.dialogService.addDialog(PromptComponent, { title, question: '' })
                          .subscribe((message) => {

            context[variableName] = message;
        });
    }

}
