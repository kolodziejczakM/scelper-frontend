import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

    @Input() show: boolean;
    @Input() text: string;
    @Input() logoVisible: boolean;

    constructor() { }

    ngOnInit() {
    }

}