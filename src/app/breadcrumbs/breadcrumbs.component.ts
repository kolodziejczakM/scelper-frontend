// tslint:disable:quotemark

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../interfaces';

@Component({
    selector: 'sce-breadcrumbs',
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {

    public possiblePaths = {
        "interview": [{ iconName: 'fa fa-home', label: 'Strona główna', href: '/' }] as Breadcrumb[],
        "interview/simple": [{ iconName: 'fa fa-home', label: 'Strona główna', href: '/' }] as Breadcrumb[],
        "public-scenarios": [{ iconName: 'fa fa-home', label: 'Strona główna', href: '/' }] as Breadcrumb[],
        "public-scenarios/requests": [
            { iconName: 'fa fa-home', label: 'Strona główna', href: '/' },
            { iconName: 'fa fa-file-text-o', label: 'Publiczne scenariusze', href: '/public-scenarios' }
        ] as Breadcrumb[],
        "authors": [{ iconName: 'fa fa-home', label: 'Strona główna', href: '/' }] as Breadcrumb[]
    };

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    public getCurrentUrlChilds() {
        const keyName = Object.keys(this.possiblePaths).find((key) => location.href.split('#').pop().slice(1) === key);
        return this.possiblePaths[keyName];
    }
}
