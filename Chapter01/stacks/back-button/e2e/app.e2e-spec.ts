import { BackButtonPage } from './app.po';

describe('back-button App', () => {
  let page: BackButtonPage;

  beforeEach(() => {
    page = new BackButtonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
