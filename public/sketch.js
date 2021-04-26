
var socket;
var price = new Array(10);
var last_price = new Array(10);
var coin_graph = [];
var on_min_weight = [];
var five_min_weight = [];
var oneMin = 0;
var fiveMin = 0;

var symbol = new Array(10);
var group1 = new Array(5);
var incomingData = new Array(10);


var data_list = new Array(5);
var coins = ["DOGE","ETH"];
var  keys=[];
var high = 0;
var low = 0;


var ethArr = [];
var dogeArr = [];
var eth,dog;
var objArr= new Array (10);

var bg;

for(let i = 0; i< price.length;i++){
	price[i]= 0;
	last_price[i] = 0;
  symbol[i]="";
	incomingData[i]=[];
}
for(let i = 0; i< data_list.length;i++){
data_list[i]="";
group1[i]= 0;
}


for(let i = 0; i< coin_graph.length;i++){

coin_graph[i]= 0;
}

function preload(){
	bg = loadImage('assets/bg1.jpg');
}

function setup() {
	createCanvas(windowWidth, windowHeight+150);
//	socket = io.connect('http://localhost:3000/')
// for(let i = 0; i < dogeUSDT.length;i++){
// 	dogeUSDT[i]= 0;
// }

  socket = io();

socket.on('msg',message);

function message(data){
	//var search = data.val();
//console.log(data.list[1])
	  keys = Object.keys(data.list[0].prev);
console.log(width)
data_list[0] = "volume";
data_list[1] = "change";
data_list[2] = "changePre";
data_list[3] = "high";
data_list[4] = "low";

//console.log(keys)
for(let i = 0; i< data.list.length;i++){
	incomingData[i].push(data.list[i].prev.symbol);
incomingData[i].push(float(data.list[i].prev.volume/1000,2));
incomingData[i].push(data.list[i].prev.priceChange);
incomingData[i].push(data.list[i].prev.priceChangePercent);
incomingData[i].push(data.list[i].prev.highPrice);
incomingData[i].push(data.list[i].prev.lowPrice);
}

//console.log(incomingData[0])
price[0] = data.list[0].Doge_price;
price[1] = data.list[1].Eth_price;
price[2] = data.list[2].Btc_price;
price[3] = data.list[3].Bch_price;
price[4] = data.list[4].Bnb_price;
price[5] = data.list[5].Ada_price;


image(bg,0,0,width,height);
let priceArr = [];

for(let i = 0; i< 3;i++){

objArr[i] = new Weights(
	100+(i*(width/4)),
	30,
	price[i],
	last_price[i],
	ethArr,
	priceArr,
	5,
	incomingData[i],
	data_list,
	0,0
);
}

for(let i = 3; i< 6;i++){

objArr[i] = new Weights(
	100+((i-3)*(width/4)),
	350,
	price[i],
	last_price[i],
	ethArr,
	priceArr,
	5,
	incomingData[i],
	data_list,0,0
);
}



for(let i = 0; i< data.list.length;i++){
objArr[i].getWeights();
objArr[i].displayData();

}

//calc();
last_price[0]=price[0];
last_price[1]=price[1];

for(let i = 0; i< data.list.length;i++){
incomingData[i]=[];
}


//fifteen.getWeights();

coin_graph.push(price[0])
//console.log(coin_graph)
	socket.emit('msg',"send");
}




}

function draw() {



// 	textSize(24);fill(255,165,0);
// 	text(symbol[0],30,40);
// 	text(symbol[1],300,40);
//   fill(0,255,0);textSize(18)
// 	text("price: "+nfc(price[0]*3.26,4)+" ILS",30,70)
// 	text("price: "+nfc(price[1]*3.26,4)+" ILS",300,70)
//
// textSize(16);fill(255);
// for(let i = 0;i< 5;i++){
// 	text(data_list[i],30,102+(i*25));
// 	text(group1[i],130,102+(i*25));
// }
// // drawing the graph
// for(let i= 0;i <coin_graph.length;i++){
//
// }
//
// // onMinute


}

function mousePressed(){


}
