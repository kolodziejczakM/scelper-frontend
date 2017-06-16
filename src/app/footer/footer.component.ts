import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
    selector: 'sce-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    private statuteLink = `${environment.serverRoot}/documents/Scelper-regulamin.pdf`;

    public links = [
        { label: 'Regulamin i polityka prywatności', href: this.statuteLink },
        { label: 'Twórcy', href: '' },
        { label: 'Najbliższa przyszłość', href: '' }
    ];

    constructor() { }

    ngOnInit() {
    }

}
