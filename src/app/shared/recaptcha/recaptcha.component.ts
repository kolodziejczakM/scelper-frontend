import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../../shared/window.service';

@Component({
    selector: 'sce-recaptcha',
    templateUrl: './recaptcha.component.html'
})
export class RecaptchaComponent implements OnInit, AfterViewInit {

    @Input('customId')
    public customId: string;

    public siteKey = '6LcxPC0UAAAAAH2KIYODNOMl3UhB0kftjcqMxpgm';

    constructor(
        private windowService: WindowService
    ) { }

    ngOnInit() {
        this.registerCallback();
        this.registerExpiredCallback();
    }

    ngAfterViewInit() {
        this.registerWidget();
    }

    public registerExpiredCallback(): void {
        this.windowService.nativeWindow[`on${this.customId}Expired`] = () => {
            this.windowService.nativeWindow[this.customId] = false;
        };
    }

    public registerCallback(): void {
        this.windowService.nativeWindow[`on${this.customId}Clicked`] = () => {
            this.windowService.nativeWindow[this.customId] = true;
        };
    }

    public registerWidget(): void {
        this.windowService.nativeWindow[this.customId] = false;

        const onLoad = Observable.fromPromise(this.windowService.nativeWindow.recaptchasLoaded())
                                 .catch((err) => Observable.throw(new Error(err)));

        onLoad.subscribe(() => this.renderWidget());
    }

    public renderWidget(): void {
        this.windowService.nativeWindow.grecaptcha.render(this.customId, {
            sitekey: this.siteKey,
            callback: this.windowService.nativeWindow[`on${this.customId}Clicked`],
            'expired-callback': this.windowService.nativeWindow[`on${this.customId}Expired`]
        });
    }

    public isApproved(): boolean {
        return this.windowService.nativeWindow[this.customId];
    }
}
