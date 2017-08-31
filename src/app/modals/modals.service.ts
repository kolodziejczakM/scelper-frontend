import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DialogService } from 'ng2-bootstrap-modal';
import { PromptComponent } from './prompt/prompt.component';
import { AlertComponent } from './alert/alert.component';


@Injectable()
export class ModalsService {

    constructor(
        public dialogService: DialogService
    ) { }

    public showAlert(title, message): void {
        this.dialogService.addDialog(AlertComponent, { title, message });
    }

    public showPrompt(title): Observable<any> {
        return this.dialogService.addDialog(PromptComponent, { title, question: '' });
    }

}
