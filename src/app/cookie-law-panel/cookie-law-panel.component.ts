import { Component, OnInit } from '@angular/core';

export const COOKIE_LAW_STORAGE_NAME = 'cookie_law_seen';
@Component({
    selector: 'sce-cookie-law-panel',
    templateUrl: './cookie-law-panel.component.html'
})
export class CookieLawPanelComponent implements OnInit {

    public visible: boolean;
    public text = `Używamy plików cookies i local storage aby ułatwić Ci korzystanie z naszego serwisu oraz do celów statystycznych.
    Jeśli nie blokujesz tych plików, to zgadzasz się na ich użycie oraz zapisanie w pamięci urządzenia.
    Pamiętaj, że możesz samodzielnie zarządzać cookies, zmieniając ustawienia przeglądarki.`;

    ngOnInit() {
        this.setVisibility();
    }

    public setVisibility(): void {
        if (localStorage.getItem('COOKIE_LAW_STORAGE_NAME')) {
            this.visible = false;
        } else {
            this.visible = true;
        }
    }

    public hide(): void {
        localStorage.setItem('COOKIE_LAW_STORAGE_NAME', '1');
        this.visible = false;
    }
}
