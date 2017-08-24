import { Component, Input, AfterViewInit } from '@angular/core';
import { WindowService } from '../../shared/window.service';

@Component({
    selector: 'sce-recaptcha',
    templateUrl: './recaptcha.component.html'
})
export class RecaptchaComponent implements AfterViewInit {

    @Input('customId')
    public customId: string;

    public siteKey = '6LcxPC0UAAAAAH2KIYODNOMl3UhB0kftjcqMxpgm';

    constructor(
        private windowService: WindowService
    ) { }

    ngAfterViewInit() {
        this.registerWidget();
    }

    public registerWidget(): void {
        this.windowService.nativeWindow.grecaptcha.render(this.customId, {
            sitekey: this.siteKey,
            callback: window[`${this.customId}Callback`],
            'expired-callback': window[`${this.customId}ExpiredCallback`]
        });
    }

    public isApproved(): boolean {
        return this.windowService.nativeWindow[this.customId];
    }
}
