function calc(){

  //**** checking 1 miniute movment****

  if(price[0] >last_price[0]){
  	on_min_weight.push(1)
  }
  else if(price[0] <last_price[0]){
  	on_min_weight.push(0)
  }
  last_price[0]=price[0];

  if(on_min_weight.length > 200){
  on_min_weight=	on_min_weight.slice(1);
  }

  if(on_min_weight.length > 3){
  	oneMin = 0;
  	for(let i = 0; i< on_min_weight.length;i++){
  		oneMin += on_min_weight[i];
  	}
  	//console.log(oneMin)
  }



  //=====================================



}
