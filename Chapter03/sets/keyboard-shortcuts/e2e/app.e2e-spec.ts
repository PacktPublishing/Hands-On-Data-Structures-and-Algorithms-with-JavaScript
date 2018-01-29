import { KeyboardShortcutsPage } from './app.po';

describe('keyboard-shortcuts App', () => {
  let page: KeyboardShortcutsPage;

  beforeEach(() => {
    page = new KeyboardShortcutsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
