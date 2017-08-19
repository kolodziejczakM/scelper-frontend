import { RecaptchaComponent } from './recaptcha.component';

describe('RecaptchaComponent', () => {
    let component,
        windowServiceMock,
        applicationRefMock;

    beforeEach(() => {
        windowServiceMock = {
            nativeWindow: {}
        };

        applicationRefMock = {
            tick() {}
        };

        component = new RecaptchaComponent(windowServiceMock, applicationRefMock);
    });

    describe('isApproved', () => {
        it('should return component.approved', () => {
            expect(component.isApproved()).toEqual(component.approved);
        });
    });
});
