import { KenHmdPage } from './app.po';

describe('ken-hmd App', () => {
  let page: KenHmdPage;

  beforeEach(() => {
    page = new KenHmdPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
