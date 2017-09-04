import { Component } from '@angular/core';

@Component({
    selector: 'sce-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {

    private statuteLink = `https://scelper.com/documents/Scelper-regulamin.pdf`;

    public genesisTexts = new Map ([
        ['head', 'Stworzono z'],
        ['tail', 'do scenariopisarstwa i darmowego oprogramowania.']
    ]);

    public links = {
        statute: { label: 'Regulamin i polityka prywatności', href: this.statuteLink },
        authors: { label: 'Twórcy', href: '/authors' },
        changes: { label: 'Zaproponuj zmiany', href: 'https://goo.gl/forms/AtXsm7fKKO9ntdVy2' }
    };

}
