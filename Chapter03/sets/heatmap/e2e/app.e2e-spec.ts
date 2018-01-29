import { HeatmapPage } from './app.po';

describe('heatmap App', () => {
  let page: HeatmapPage;

  beforeEach(() => {
    page = new HeatmapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
