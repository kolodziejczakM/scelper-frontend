import { ScelperFrontendPage } from './app.po';

describe('scelper-frontend App', () => {
  let page: ScelperFrontendPage;

  beforeEach(() => {
    page = new ScelperFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
