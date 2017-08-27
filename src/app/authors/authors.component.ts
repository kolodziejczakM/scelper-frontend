import { Component } from '@angular/core';
import { ScelperAuthor } from '../interfaces';

@Component({
    selector: 'sce-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {

    public introTexts = [
        `Człowiek jest z natury dobry.`,
        `Lubimy pomagać, dzielić się doświadczeniem, wspierać w potrzebie.` ,
        `Scelper powstał bo wierzymy, że razem możemy więcej.` ,
        `Jeśli masz pasję, uwielbiasz tworzyć i chciałbyś nam pomóc w rozwoju aplikacji... Chętnie Cię poznamy :)`,
        `Tymczasem Ty poznaj nas, skromnych twórców tego serwisu:`
    ];
    public assetsBasePath = 'assets';

    public authors: ScelperAuthor[] = [
        {
            name: 'Marcin Kołodziejczak',
            imagePath: `${this.assetsBasePath}/ceo.jpg`,
            description: 'CEO, developer',
            email: 'ceo@scelper.com'
        },
        {
            name: 'Karolina Growiec',
            imagePath: `${this.assetsBasePath}/karolinaGrowiec.jpg`,
            description: 'Support',
            email: 'karolina.growiec@gmail.com'
        },
        {
            name: 'Tomek Sobieraj',
            imagePath: `${this.assetsBasePath}/tomekSobieraj.jpg`,
            description: 'Grafik, designer',
            email: 'cdo@scelper.com'
        }
    ];

}
