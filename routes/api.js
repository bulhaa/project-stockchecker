'use strict';
const mongoose = require('mongoose')
const Database = require('../src/database');
const LikeModel = require('../src/models/like');
const { createHash } = require('crypto');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      let stock = req.query.stock;
      if(stock.constructor !== Array){
        stock = [stock];
      }

      var hash = createHash('sha256').update(req.socket.remoteAddress).digest('base64');
       
      // like
      if(req.query.like === 'true'){
        await createLike(stock[0])

        if(stock.length === 2){
          const success = await createLike(stock[1])
          if(success === 0){
            res.send('already liked')
            return
          }
        }
      } else {
        await LikeModel.deleteMany()
      }

      await generateResponse(stock)


      async function fetchData(stock) {
        const json = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`, {})
          .then(response => response.json())

        const likes = await LikeModel.find({stock: stock})
  
        return {
          stock: json.symbol,
          price: json.latestPrice,
          rel_likes: 0,
          likes: likes.length,
        }

      }

      async function createLike(stock) {
        const doc = await LikeModel.findOne({ip_addr_hash: hash, stock: stock})

        if(doc){
          return 0
        }

        await LikeModel.create({ip_addr_hash: hash, stock: stock})
        return 1
      }

      async function generateResponse() {
        let stockData = []
  
        // API fetch
        let data = await fetchData(stock[0])
        stockData.push( data )
  
        if(stock.length === 2){
          data = await fetchData(stock[1])
          stockData.push( data )
        }
  
        if(stockData.length === 1){
          stockData = stockData[0]
        }
        
        let output = {
          stockData: stockData
        }
        
        res.send(output)
      }
    });
    
};
