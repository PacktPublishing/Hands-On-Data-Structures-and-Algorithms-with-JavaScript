import { ParserPage } from './app.po';

describe('parser App', () => {
  let page: ParserPage;

  beforeEach(() => {
    page = new ParserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
