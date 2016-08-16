import { MybankUiPage } from './app.po';

describe('mybank-ui App', function() {
  let page: MybankUiPage;

  beforeEach(() => {
    page = new MybankUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
