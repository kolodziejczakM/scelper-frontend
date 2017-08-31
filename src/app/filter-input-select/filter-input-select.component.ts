import { Component, OnInit, Input } from '@angular/core';
import { AppStoreActions } from '../app-store/app-store.actions';
import { STATIC_TEXTS } from './filter-input-select.constants';
import { ScenarioSelectFilterOption } from '../interfaces';

@Component({
    selector: 'sce-filter-input-select',
    templateUrl: './filter-input-select.component.html'
})
export class FilterInputSelectComponent implements OnInit {

    @Input('selectOptions')
    public selectOptions;

    @Input('actionName')
    public actionName;

    public selectedFilter: ScenarioSelectFilterOption;
    public filterValue: string;
    public staticTexts: Map<string, string> = STATIC_TEXTS;

    constructor(
        private appStoreActions: AppStoreActions
    ) { }

    ngOnInit() {
        this.setSelectedFilter();
    }

    private setSelectedFilter(): void {
        this.selectedFilter = this.selectOptions[0];
    }

    private clearInputField(): void {
        this.filterValue = '';
        this.appStoreActions[`set${this.actionName}Value`]('');
    }

    public onInputChange(): void {
        this.appStoreActions[`set${this.actionName}Value`](this.filterValue);
    }

    public onSelectChange(): void {
        this.appStoreActions[`set${this.actionName}Choice`](this.selectedFilter);
        this.clearInputField();
    }
}
