const { Portfolio, ShareSaleException } = require('./portfolio');

test('Portfolio is created with an empty list of shares and ticker symbols', () => {
  const portfolio = new Portfolio();
  expect(portfolio.getShares()).toEqual({});
});

test('Empty portfolio', () => {
  const portfolio = new Portfolio();
  expect(portfolio.isEmpty()).toBe(true);
});

test('2 stocks', () => {
  const portfolio = new Portfolio();
  portfolio.purchase('GME', 5);
  portfolio.purchase('RBLX', 10);

  expect(portfolio.getStockCount()).toBe(2);
});

test('Purchase', () => {
  const portfolio = new Portfolio();
  portfolio.purchase('RBLX', 10);

  expect(portfolio.getShares()).toEqual({ 'RBLX': 10 });
});

test('Sale', () => {
  const portfolio = new Portfolio();
  portfolio.purchase('RBLX', 5);
  portfolio.purchase('GME', 5);
  portfolio.sell('RBLX', 5);

  expect(portfolio.getShares()).toEqual({ 'GME': 5 });
});

test('Shares per symbol', () => {
  const portfolio = new Portfolio();
  portfolio.purchase('RBLX', 10);
  portfolio.purchase('RBLX', 10);

  expect(portfolio.getSharesCount('RBLX')).toBe(20);
});

test('Raise ShareSaleException', () => {
  const portfolio = new Portfolio();
  portfolio.purchase('AAPL', 10);

  expect(() => portfolio.sell('AAPL', 15)).toThrowError(ShareSaleException);
});
