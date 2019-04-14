function Sokoban(options){
    this.showArea = this.R(options.showArea);//展示区
    this.level = options.level;
    this.autohandlesavefunc = options.autohandlesavefunc;
    this.layoutDom = 
    '<div class="'+(this.level==1?'back':'backTwo')+'"></div>' ;//游戏区
    this.init();
  }
//ID选择器
Sokoban.prototype.R=function(id){
    return document.getElementById(id);
}

//初始化
Sokoban.prototype.init=function(data){
    var _this=this;
    _this.showArea.innerHTML = _this.layoutDom;

    // 渲染不同的关卡类型
    if(_this.level == 1){
      _this.initContentDomOne();
    }else if(_this.level == 2){
      _this.initContentDomTwo();
    }
}
// 关卡1
Sokoban.prototype.initContentDomOne = function() {
  var _this=this;
  var dom=document.createElement("div");
  dom.setAttribute("class", 'wall');
  _this.showArea.getElementsByClassName('back')[0].appendChild(dom);
  var boxdom=document.createElement("div");
  boxdom.setAttribute("class", 'box');
  _this.showArea.getElementsByClassName('back')[0].appendChild(boxdom);
  var targetdom=document.createElement("div");
  targetdom.setAttribute("class", 'target');
  _this.showArea.getElementsByClassName('back')[0].appendChild(targetdom);
  var peopledom=document.createElement("div");
  peopledom.setAttribute("class", 'people');
  peopledom.innerHTML='我';
  _this.showArea.getElementsByClassName('back')[0].appendChild(peopledom);
  var strhtml='<div class="directionBtn"><button code="up">上</button><button code="down">下</button><button code="left">左</button><button code="right">右</button></div>';
  var btns=_this.parseDom(strhtml)[0];
  var btn=btns.childNodes;
  for(var i=0;i<btn.length;i++){
    btn[i].onclick=function(e){
      var code=this.getAttribute('code');
      _this.btnClickEvent(e,code);
    }
  }
  _this.showArea.appendChild(btns);
}

// 关卡2
Sokoban.prototype.initContentDomTwo = function() {
  var _this=this;
  var dom=document.createElement("div");
  dom.setAttribute("class", 'wallTwo');
  _this.showArea.getElementsByClassName('backTwo')[0].appendChild(dom);
  
}
// 点击按钮
Sokoban.prototype.btnClickEvent = function(e,code) {
  console.log(code);
  var _this=this;
  var dom=_this.showArea.getElementsByClassName('back')[0];
  var peopledom=dom.getElementsByClassName('people')[0];
  var boxdom=dom.getElementsByClassName('box')[0];
  if(code=='up'){
    peopledom.style.top=parseInt(peopledom.style.top.split('%')[0])-30+'%';
    if(peopledom.style.top==boxdom.style.top&&peopledom.style.left==boxdom.style.left){
      // 判断有没有墙壁，没有做下面的操作
      boxdom.style.top=parseInt(boxdom.style.top.split('%')[0])-20+'%';
    }
  }else if(code=='down'){
    peopledom.style.top=parseInt(peopledom.style.top.split('%')[0])+30+'%';
    (peopledom.style.top==boxdom.style.top&&peopledom.style.left==boxdom.style.left)?boxdom.style.top=parseInt(boxdom.style.top.split('%')[0])+20+'%':null;
  }else if(code=='left'){
    peopledom.style.top=parseInt(peopledom.style.left.split('%')[0])-20+'%';
    (peopledom.style.top==boxdom.style.top&&peopledom.style.left==boxdom.style.left)?boxdom.style.top=parseInt(boxdom.style.left.split('%')[0])-20+'%':null;
  }else if(code=='right'){
    peopledom.style.top=parseInt(peopledom.style.left.split('%')[0])+20+'%';
    (peopledom.style.top==boxdom.style.top&&peopledom.style.left==boxdom.style.left)?boxdom.style.top=parseInt(boxdom.style.left.split('%')[0])+20+'%':null;
  }
}

// 字符串转 dom对象 
Sokoban.prototype.parseDom = function (arg) {
  var objE = document.createElement("div");
      objE.innerHTML = arg;
  return objE.childNodes;
}