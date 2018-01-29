import { CreditCardPage } from './app.po';

describe('credit-card App', () => {
  let page: CreditCardPage;

  beforeEach(() => {
    page = new CreditCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
