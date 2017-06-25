// tslint:disable:quotemark

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../interfaces';

@Component({
    selector: 'sce-breadcrumbs',
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {

    public separator = '>';

    public possiblePaths = {
        "interview": [{ label: 'Strona główna', href: '/' }] as Breadcrumb[],
        "interview/simple": [{ label: 'Strona główna', href: '/' }, { label: 'Wywiad', href: '/interview' }] as Breadcrumb[],
        "public-scenarios": [{ label: 'Strona główna', href: '/' }] as Breadcrumb[]
    };

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    public getCurrentUrlChilds() {
        const keyName = Object.keys(this.possiblePaths).find((key) => location.href.split('#').pop().slice(1) === key);
        return this.possiblePaths[keyName];
    }

}
