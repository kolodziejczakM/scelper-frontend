import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../../shared/window.service';

@Component({
    selector: 'sce-recaptcha',
    templateUrl: './recaptcha.component.html'
})
export class RecaptchaComponent implements OnInit {

    @Input('customId')
    public customId: string;

    public siteKey = '6LcxPC0UAAAAAH2KIYODNOMl3UhB0kftjcqMxpgm';

    constructor(
        private windowService: WindowService
    ) { }

    ngOnInit() {
        this.registerCallback();
        this.registerExpiredCallback();
        this.registerWidget();
    }

    public isApproved(): boolean {
        return this.windowService.nativeWindow[this.customId];
    }

    public reset(): void {
        this.onLoad().subscribe(() => this.windowService.nativeWindow.grecaptcha.reset());
    }

    private onLoad(): Observable<any> {
        return Observable.fromPromise(this.windowService.nativeWindow.recaptchasLoaded())
                         .catch((err) => Observable.throw(new Error(err)));
    }

    private registerExpiredCallback(): void {
        this.windowService.nativeWindow[`on${this.customId}Expired`] = () => {
            this.windowService.nativeWindow[this.customId] = false;
        };
    }

    private registerCallback(): void {
        this.windowService.nativeWindow[`on${this.customId}Clicked`] = () => {
            this.windowService.nativeWindow[this.customId] = true;
        };
    }

    private registerWidget(): void {
        this.windowService.nativeWindow[this.customId] = false;
        this.onLoad().subscribe(
            () => this.renderWidget(),
            () => setTimeout(this.registerWidget.bind(this), 0)
        );
    }

    private renderWidget(): void {
        this.windowService.nativeWindow.grecaptcha.render(this.customId, {
            sitekey: this.siteKey,
            callback: this.windowService.nativeWindow[`on${this.customId}Clicked`],
            'expired-callback': this.windowService.nativeWindow[`on${this.customId}Expired`]
        });
    }
}
