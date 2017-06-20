import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sce-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent implements OnInit {

    public introTexts = [
        `Człowiek jest z natury dobry.`,
        `Lubimy pomagać, dzielić się doświadczeniem, wspierać w potrzebie.` ,
        `Scelper powstał bo wierzymy, że razem możemy więcej.` ,
        `Jeśli masz pasję, uwielbiasz tworzyć i chciałbyś nam pomóc w rozwoju aplikacji... Chętnie Cię poznamy :)`,
        `Tymczasem Ty poznaj nas, skromnych twórców tego serwisu:`
    ];
    public assetsBasePath = 'assets';

    public authors = [
        {
            name: 'Marcin Kołodziejczak',
            imagePath: `${this.assetsBasePath}/ceo.jpg`,
            description: 'CEO, Programista'
        },
        {
            name: 'Tomek Sobieraj',
            imagePath: `${this.assetsBasePath}/tomekSobieraj.jpg`,
            description: 'Grafik, designer'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
