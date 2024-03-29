const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

    test('Viewing one stock: GET request to /api/stock-prices/', function(done) {
      chai.request(server)
       .get('/api/stock-prices?stock=GOOG')
       .end(function(err, res){
         assert.equal(res.status, 200);
         assert.property(res.body, 'stockData', 'res.body should contain stockData');
         assert.property(res.body.stockData, 'stock', 'stockData should contain stock');
         assert.property(res.body.stockData, 'price', 'stockData should contain price');
         assert.property(res.body.stockData, 'likes', 'stockData should contain likes');
         done();
       });
    });

    test('Viewing one stock and liking it: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
         .get('/api/stock-prices?stock=GOOG&like=true')
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.property(res.body, 'stockData', 'res.body should contain stockData');
           assert.property(res.body.stockData, 'stock', 'stockData should contain stock');
           assert.property(res.body.stockData, 'price', 'stockData should contain price');
           assert.property(res.body.stockData, 'likes', 'stockData should contain likes');
           assert.equal(res.body.stockData.likes, 1);
           done();
         });
      });

    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
         .get('/api/stock-prices?stock=GOOG&like=true')
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.property(res.body, 'stockData', 'res.body should contain stockData');
           assert.property(res.body.stockData, 'stock', 'stockData should contain stock');
           assert.property(res.body.stockData, 'price', 'stockData should contain price');
           assert.property(res.body.stockData, 'likes', 'stockData should contain likes');
           done();
         });
      });

    test('Viewing two stocks: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
         .get('/api/stock-prices?stock=GOOG&stock=MSFT')
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.property(res.body, 'stockData', 'res.body should contain stockData');
           assert.property(res.body.stockData[0], 'stock', 'stockData should contain stock');
           assert.property(res.body.stockData[0], 'price', 'stockData should contain price');
           assert.property(res.body.stockData[0], 'likes', 'stockData should contain likes');
           assert.property(res.body.stockData[1], 'stock', 'stockData should contain stock');
           assert.property(res.body.stockData[1], 'price', 'stockData should contain price');
           assert.property(res.body.stockData[1], 'likes', 'stockData should contain likes');
           done();
         });
      });

    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function(done) {
        chai.request(server)
         .get('/api/stock-prices?stock=GOOG&stock=MSFT&like=true')
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.property(res.body, 'stockData', 'res.body should contain stockData');
           assert.property(res.body.stockData[0], 'stock', 'stockData should contain stock');
           assert.property(res.body.stockData[0], 'price', 'stockData should contain price');
           assert.property(res.body.stockData[0], 'likes', 'stockData should contain likes');
           assert.property(res.body.stockData[1], 'stock', 'stockData should contain stock');
           assert.property(res.body.stockData[1], 'price', 'stockData should contain price');
           assert.property(res.body.stockData[1], 'likes', 'stockData should contain likes');
           assert.equal(res.body.stockData[0].likes, 1);
           assert.equal(res.body.stockData[1].likes, 1);
           done();
         });
      });
  
});
