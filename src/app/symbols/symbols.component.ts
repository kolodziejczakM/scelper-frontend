import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { AppStoreWatchers } from '../app-store/app-store.watchers';
import { ScelperSymbol } from '../interfaces';

@Component({
    selector: 'sce-symbols',
    templateUrl: './symbols.component.html'
})
export class SymbolsComponent implements OnInit {

    public randomSymbols: ScelperSymbol[] = [];

    constructor(
        private appStoreWatchers: AppStoreWatchers
    ) { }

    ngOnInit() {
        this.watchRandomSymbols();
    }

    private watchRandomSymbols(): void {
        this.appStoreWatchers.watchRandomSymbols().subscribe(storeVal => {
            this.randomSymbols = storeVal;
        });
    }

    public getSymbolPath(path: string): string {
        return environment.serverRoot + path;
    }
}
