import { TypeaheadPage } from './app.po';

describe('typeahead App', () => {
  let page: TypeaheadPage;

  beforeEach(() => {
    page = new TypeaheadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
