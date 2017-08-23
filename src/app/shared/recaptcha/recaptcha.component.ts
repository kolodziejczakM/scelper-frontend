import { Component, OnInit, ApplicationRef } from '@angular/core';
import { WindowService } from '../../shared/window.service';

@Component({
    selector: 'sce-recaptcha',
    templateUrl: './recaptcha.component.html'
})
export class RecaptchaComponent implements OnInit {

    public siteKey = '6LcxPC0UAAAAAH2KIYODNOMl3UhB0kftjcqMxpgm';
    public approved = false;

    constructor(
        private windowService: WindowService,
        private applicationRef: ApplicationRef
    ) { }

    ngOnInit() {
        this.registerCallback();
        this.registerExpiredCallback();
    }

    public isApproved(): boolean {
        return this.approved;
    }

    public registerExpiredCallback(): void {
        this.windowService.nativeWindow.onRecaptchaExpired = () => {
            this.approved = false;
            this.applicationRef.tick();
        };
    }

    public registerCallback(): void {
        this.windowService.nativeWindow.onRecaptchaClicked = () => {
            this.approved = true;
            this.applicationRef.tick();
        };
    }

}
