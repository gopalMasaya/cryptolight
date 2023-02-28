


var express = require('express');
var app = express();
app.set('trust proxy', 1)
var server = app.listen(process.env.PORT || 4000,res);
var socket = require('socket.io');
var io = socket(server);
app.use(express.static('public'));
// const ccxt = require('ccxt')
// const axios = require('axios')
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'your api key',
  APISECRET: 'your api secret'
});




function res(){
  var host = server.address().address;
   var port = server.address().port;
  console.log("starting.....")
  console.log(port)
}

io.sockets.on('connection',onConnection);


function onConnection(socket){
  console.log("new connection"+socket.id);
  socket.on('msg',message);

  function message(data){
   //console.log(data);

  // socket.broadcast.emit('msg',data);


  }
socket.on('disconnect', function(){
  console.log("refresh")

});
}


let prev = [];
let balance;
let price=[];
for(let i = 0;i< 6;i++){
  price[i]=0;
  prev[i] = 0;
}


const tick = async()=>{
const getData = await Promise.all([
  //https://api.binance.com/


// binance.balance((error, balances) => {
//   if ( error ) return console.error(error);
// //  console.info("balances()", balances);
// //  console.info("ETH balance: ", balances);
//   balance = balances;
// //  console.log(balance.BTC);
//   for(let i = 0; i< 10;i++){
//   //  console.log(balance[i])
//   }
// }),

binance.prevDay("DOGEUSDT", (error, prevDay, symbol) => {
prev[0] = prevDay;

}),
binance.prices('DOGEUSDT', (error, ticker) => {
price[0] = ticker.DOGEUSDT;
}),

  binance.prevDay("ETHUSDT", (error, prevDay, symbol) => {
  prev[1] = prevDay;

  }),
  binance.prices('ETHUSDT', (error, ticker) => {
  price[1] = ticker.ETHUSDT;

}),

    binance.prevDay("BTCUSDT", (error, prevDay, symbol) => {
    prev[2] = prevDay;

    }),
    binance.prices('BTCUSDT', (error, ticker) => {
    price[2] = ticker.BTCUSDT;
//console.log(price[2])
}),

binance.prevDay("BCHUSDT", (error, prevDay, symbol) => {
prev[3] = prevDay;

}),
binance.prices('BCHUSDT', (error, ticker) => {
price[3] = ticker.BCHUSDT;
//console.log(price[2])
}),

binance.prevDay("BNBUSDT", (error, prevDay, symbol) => {
prev[4] = prevDay;

}),
binance.prices('BNBUSDT', (error, ticker) => {
price[4] = ticker.BNBUSDT;
//console.log(price[2])
}),

binance.prevDay("ADAUSDT", (error, prevDay, symbol) => {
prev[5] = prevDay;

}),
binance.prices('ADAUSDT', (error, ticker) => {
price[5] = ticker.ADAUSDT;
//console.log(price[2])
}),



//   binance.depositHistory((error, response) => {
//   //console.info(response);
//   //io.sockets.emit('msg', response);
//
//   deposit_history = response;
// });




])


_message = {

  "list":  [
    { "prev":prev[0], "Doge_price":price[0]},
    { "prev":prev[1], "Eth_price":price[1] },
    { "prev":prev[2], "Btc_price":price[2] },
    { "prev":prev[3], "Bch_price":price[3] },
    { "prev":prev[4], "Bnb_price":price[4] },
    { "prev":prev[5], "Ada_price":price[5] }
  ]
 }


io.sockets.emit('msg', _message);
}


//console.log(latest_BTC[0])



  const config = {
    asset: 'BTC',
    base: 'USDT',
    tickInterval: 5000
  }

//setInterval(tick,config.tickInterval)
setInterval(function(){ tick(); }, 5000);
		tick();
