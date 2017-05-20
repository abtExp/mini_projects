var canv,cont,objs;
(()=>{

/* Getting the canvas ready */
  canv = document.getElementById("game_env");
  cont = canv.getContext('2d');
  objs = [];

  var timer = setInterval(()=>{
    console.log("New Obstacle");
    var obj = new Obj();
    if(obj.count > 10){
      clearInterval(timer);
    }
    objs.push(obj);
    console.log(objs);
    update_pos(objs);
  },100);


})();

var count = 0;

class Obj{
  constructor(){
    this._x = Math.floor((Math.random()*canv.width)/10);
    this._y = (canv.height)/1.1;
    this.width = Math.floor((Math.random()*canv.width)/5);
    this.height = Math.floor((Math.random()*canv.height)/5);
    this.count = count++;
    this.speed = Math.floor(Math.random()*canv.width)/1000;
  }
}

function update_pos(obstacles){
  obstacles.forEach((i)=>{
    draw();
    if(i._x < 0){
      objs.splice(objs.indexOf(i));
    }
    cont.fillStyle = "black";
    cont.fillRect(i._x,i._y,i.width,i.height);
    i._x -= i.speed;
  });
}

function draw(){
  cont.fillStyle = "#ddd";
  cont.fillRect(0,0,canv.width,canv.height);
}
