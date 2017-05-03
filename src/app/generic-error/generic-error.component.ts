import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-generic-error',
    templateUrl: './generic-error.component.html'
})
export class GenericErrorComponent implements OnInit {

    @Input() show: boolean;
    @Input() message: string;

    constructor() { }

    ngOnInit() {
    }

}
