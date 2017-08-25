import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { WindowService } from '../../shared/window.service';

@Component({
    selector: 'sce-recaptcha',
    templateUrl: './recaptcha.component.html'
})
export class RecaptchaComponent implements OnInit, AfterViewInit, OnDestroy {

    public customId: string;
    public siteKey = '6LcxPC0UAAAAAH2KIYODNOMl3UhB0kftjcqMxpgm';

    constructor(
        private windowService: WindowService
    ) { }

    ngOnInit() {
        this.setCustomId();
    }

    ngAfterViewInit() {
        this.registerWidget();
    }

    ngOnDestroy() {
        this.windowService.nativeWindow.recaptchaRegister.push(this.customId);
    }

    public setCustomId(): void {
        this.customId = this.windowService.nativeWindow.recaptchaRegister.shift();
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
