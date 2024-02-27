class ShareSaleException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ShareSaleException';
  }
}

class Portfolio {
    constructor() {
      this.shares = {};
    }
  
    getShares() {
      return this.shares;
    }

    isEmpty() {
      return Object.keys(this.shares).length === 0;
    }

    getStockCount() {
      return Object.keys(this.shares).length;
    }

    purchase(symbol, quantity) {
      if (!this.shares[symbol]) {
        this.shares[symbol] = quantity;
      } else {
        this.shares[symbol] += quantity;
      }
    }

    sell(symbol, quantity) {
      if (this.shares[symbol] < quantity) {
        throw new ShareSaleException('Attempted to sell more shares than owned');
      }
  
      this.shares[symbol] -= quantity;
      if (this.shares[symbol] <= 0) {
        delete this.shares[symbol];
      }
    }

    getSharesCount(symbol) {
      return this.shares[symbol] || 0;
   }

  }
  

  
  module.exports = { Portfolio, ShareSaleException };
