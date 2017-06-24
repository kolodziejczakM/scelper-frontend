import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
    selector: 'sce-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {

    private statuteLink = `${environment.serverRoot}/documents/Scelper-regulamin.pdf`;

    public genesisTexts = new Map ([
        ['head', 'Stworzono z'],
        ['tail', 'do scenariopisarstwa i darmowego oprogramowania.']
    ]);

    public links = [
        { label: 'Regulamin i polityka prywatności', href: this.statuteLink },
        { label: 'Twórcy', href: '/authors' }
    ];

}
