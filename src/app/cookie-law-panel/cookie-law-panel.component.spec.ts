import { CookieLawPanelComponent } from './cookie-law-panel.component';

describe('CookieLawPanelComponent', () => {
    let component;
    beforeEach(() => {
        component = new CookieLawPanelComponent();
    });

    describe('hide', () => {
        it('should change component.visible to FALSE', () => {
            component.hide();
            expect(component.visible).toEqual(false);
        });
    });
});
