import { Component, OnInit, AfterViewInit, Input, ApplicationRef, ElementRef, ViewChild } from '@angular/core';
import { WindowService } from '../../shared/window.service';

@Component({
    selector: 'sce-recaptcha',
    templateUrl: './recaptcha.component.html'
})
export class RecaptchaComponent implements OnInit, AfterViewInit {

    @ViewChild('wrapperNode')
    public wrapperNode: ElementRef;

    @Input('siteKey')
    public siteKey: string;


    public approved = false;

    constructor(
        private windowService: WindowService,
        private applicationRef: ApplicationRef
    ) { }

    ngOnInit() {
        this.registerCallback();
        this.registerExpiredCallback();
    }

    ngAfterViewInit() {
        this.approved = (this.wrapperNode.nativeElement.height) ? false : true;
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
