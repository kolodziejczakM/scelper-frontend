import { Component, OnInit } from '@angular/core';
import { PublicScenario } from '../interfaces';

@Component({
    selector: 'app-public-scenarios',
    templateUrl: './public-scenarios.component.html'
})
export class PublicScenariosComponent implements OnInit {

    scenarios: Array<PublicScenario> = [
        {
            title: 'W pustyni i w puszczy 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            author: 'Konrad Nieśmieszny',
            pages: 7,
            state: 'Ukończony'
        },
        {
            title: 'Jak poznalem papieza',
            description: 'To bylo latem 2008 roku i nawet nie wiedzialem w co sie pakuje tak naprawde... ',
            author: 'Mariusz Szymczak',
            pages: 12,
            state: 'Niekompletny'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

    showAlert(): void{
        alert('Na podany adres email wysłaliśmy ważne informacje. Dziękujemy za pomoc w rozwoju serwisu.');
    }

    deleteScenario() :void{
        confirm('Czy jesteś pewien?');
    }

}
