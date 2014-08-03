var windowx,windowh;
var canvas,ctx,then;
var sa,wid,r,wise;
var ballv;
var bally;
var ballset=false;
var isStart=false;
var isOver=false;
var inGame=true;
var wid_now;
var count=0;
$(document).ready(function(){
	windowx=window.screen.width;
	windowh=window.screen.height;
	$("#index_body").css("width",windowx+"px").css("height",windowh+"px");
	
	touchFunc($("#index_body").get(0),"move",hehe);
	
	canvas = document.createElement("canvas");  
	ctx = canvas.getContext("2d");  
	canvas.width = 320;  
	canvas.height = 500; 
	document.body.appendChild(canvas);
	touchFunc(canvas,"start",beat);
	
	sa = new Array();
	wid = new Array();
	r = new Array();
	wise = new Array();
	
	reset();
	then = Date.now(); 
	setInterval(main, 1); 
	
});

function hehe(){
	return false;
};

function main(){ 
	if(isStart==false&&isOver==false){
		ctx.clearRect(0,0,windowx,windowh);
		ctx.fillStyle = "rgb(0, 0, 0)";  
	    ctx.font = "24px Microsoft YaHei";   
	    ctx.fillText("点击开始游戏", 60, 200);
	}
	else if(isStart==true&&isOver==false){
		if(inGame==false){
			isOver=true;
		}
		ctx.clearRect(0,0,windowx,windowh);
		ctx.fillStyle = "rgb(0, 0, 0)";  
		ctx.font = "24px Microsoft YaHei";    
		//ctx.fillText("Goblins caught: ", 32, 32);
		var now = Date.now();  
		var delta = now - then;
		update(delta / 1000);
		render();
    	then = now;
	}
	else if(isStart==true&&isOver==true){
		ctx.clearRect(0,0,windowx,windowh);
		ctx.fillStyle = "rgb(0, 0, 0)";  
	    ctx.font = "24px Microsoft YaHei";   
	    ctx.fillText("游戏结束你获得了"+count, 60, 130);
	    //ctx.fillText("�����ʼ��Ϸ", 60, 200);
	}
};  
//Update game objects  
function reset(){
	count=0;
	ballv=0;
	bally=250;
	wid_now=0.4;
	for (var i=0;i<3;i++){
		sa[i] = Math.random()*2*Math.PI;
		wid[i] = wid_now;
		r[i]=100*(i+2);
		wise[i]=parseInt(Math.random()*2);
		if(wise[i]==0)
			wise[i]=-1;
	}
	
};

function update(modifier) { 
	if(r[0]<=50){
		inGame=false;
	    return;
	}
	for (var i=0;i<3;i++){
		sa[i]+=2*modifier*wise[i];
		r[i]-=15*modifier;
		
		if(sa[i]<0){
			sa[i]+=2*Math.PI;
		}
		if(sa[i]>2*Math.PI){
			sa[i]-=2*Math.PI;
		}
	}
	bally-=ballv*modifier;
	//�ж�
	if(250-bally+14>r[0]){
		if(sa[0]<Math.PI*1.5 && sa[0]+wid[0]>Math.PI*1.5){
			ballv=0;
			bally=250;
			circleSwap();
			count++;
		}
		else{
			bally=250;
			ballv=0;
		}
	}
	
};
function circleSwap(){
		r[0]=r[1];
		r[1]=r[2];
		r[2]=r[2]+100;
		sa[0]=sa[1];
		sa[1]=sa[2];
		sa[2]=Math.random()*2*Math.PI;
		wid[0]=wid[1];
		wid[1]=wid[2];
		wid[2]=wid_now;
		wise[0]=wise[1];
		wise[1]=wise[2];
		wise[2]=parseInt(Math.random()*2);
		if(wise[2]==0)
			wise[2]=-1;
}
//Draw everything  
function render(){
    ctx.clearRect(0,0,windowx,windowh);
    ctx.lineWidth=14;
    //var sa=0/360 * Math.PI;//set 0 for circle
   // var ea=230/360 * 2 * Math.PI;//set 2 * Math.PI for circle

    var t=250;
    var l=160;
    var direction=true;//set false for anticlockwise
    
    for (var i=0;i<3;i++){
    	ctx.beginPath();
    	ctx.strokeStyle="rgb(0, 0, 0)";
    	ctx.arc(l,t,r[i],sa[i],sa[i]+wid[i],false);
    	ctx.stroke();
    
    	ctx.beginPath();
    	ctx.strokeStyle="rgb(200, 200, 200)";
    	ctx.arc(l,t,r[i],sa[i]+wid[i],sa[i],false);
    	ctx.stroke();
    }
    ctx.beginPath();
    ctx.strokeStyle="rgb(0, 0, 0)";
    ctx.arc(l,t,35,0,2*Math.PI,false);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.fillStyle="rgb(0, 0, 0)";
    ctx.arc(l,bally,10,0,2*Math.PI,false);
    ctx.closePath();
    ctx.fill();
    
    ctx.font = "24px Microsoft YaHei";   
    ctx.fillText("SCORE:"+count, 20, 350);
};

//touchFunc(imagearr[3],"start",beat);
function beat(){
	if(isStart==true&&isOver==false){
		ballv=300;
	}
	if(isStart==false&&isOver==false){
		isStart=true;
		inGame=true;
		then = Date.now();
	}
	if(isStart==true&&isOver==true){
		reset();
		//alert("sdjk");
		isStart=false;
		isOver=false;
	}
	
};