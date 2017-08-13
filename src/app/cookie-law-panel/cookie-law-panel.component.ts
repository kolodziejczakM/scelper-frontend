import { Component } from '@angular/core';

@Component({
    selector: 'sce-cookie-law-panel',
    templateUrl: './cookie-law-panel.component.html'
})
export class CookieLawPanelComponent {

    public visible = true;
    public text = `Używamy plików cookies i local storage aby ułatwić Ci korzystanie z naszego serwisu oraz do celów statystycznych.
    Jeśli nie blokujesz tych plików, to zgadzasz się na ich użycie oraz zapisanie w pamięci urządzenia.
    Pamiętaj, że możesz samodzielnie zarządzać cookies, zmieniając ustawienia przeglądarki.`;

    public hide(): void {
        this.visible = false;
    }
}
