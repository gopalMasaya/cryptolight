

class Weights{

constructor(xpos,ypos,price,last,arr,priceArr,time,data,list,high,low){
this.x = xpos;
this.y = ypos;
this.price = price;
this.time  = time;
this.last = last;
this.arr = arr;
this.priceArr = priceArr;
this.data = data;
this.list = list;
this.high = high;
this.low = low;

}

getWeights(){
//background(0)



//    console.log(this.data)
this.priceArr.push(this.price);

  if(this.price > this.last ){
  	this.arr.push(1)
  }
  else if(this.price < this.last ){
  this.arr.push(0)
  }
  //this.last = this.price;

  //console.log(this.arr);


  if(this.arr.length > this.time*20){
  this.arr =	this.arr.slice(1);
  }


  if(this.arr.length > 3){
    for(let i = 0; i< this.arr.length;i++){
      this.high += this.arr[i];
      this.low = this.arr.length - this.high
}


}

}

displayData(){
stroke(65);

fill(80,80); rect(this.x,this.y,width*0.22,300,10);
noStroke();
fill(255,160,0,200);textSize(width*0.02);
text(this.data[0],this.x+20,this.y+30)
textSize(width*0.016);fill(200,200)
this.price = this.price*3.26;
text(nfc(this.price,4),this.x+20,this.y+55)

for(let i = 1; i< this.data.length;i++){

  text(nfc(this.data[i],2),this.x+150,this.y+80+(i*25));
}

textSize(width*0.014);
for(let i = 0; i< this.list.length;i++){
  text(this.list[i],this.x+20,this.y+105+(i*25));

}


fill(255);text(this.high+"  "+this.low,this.x+15,this.y+250);

}
}
