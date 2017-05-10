import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-generic-error',
    templateUrl: './generic-error.component.html'
})
export class GenericErrorComponent implements OnInit {

    public refreshText = 'Odśwież stronę';

    @Input() header: string;
    @Input() message: string;

    constructor() { }

    ngOnInit() {
    }

    public refreshApp(): void {
        location.reload();
    }

}
