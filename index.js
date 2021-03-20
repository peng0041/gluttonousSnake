function SnakeInit() {
    this.dom = {
        'btn' : document.getElementsByClassName('startGame')[0],
        'main' : document.getElementsByClassName('gameAera')[0],
        'actScore' : document.getElementsByClassName('actScore')[0],
    };
    this.timer1;
    this.bodyPosition = {x:[],y:[]};
    this.applePosition = {x:[],y:[]};
    this.detectPosition = {x:[],y:[]};
    this.currentDiret = "";   //Current direction of movement
    this.bindStartEvent();   //Bind keyboard, click event
    this.score = 0;
    //modified at github
    // modified at local-try - just change local username and email, push and pull by https or ssh 
}
SnakeInit.prototype.cashDectet = function () {
/*    
    1. Hit the wall
     2. When you encounter yourself, check whether the coordinates of the head are the same as the bodyPosition coordinates;*/
    var snakeHead = document.getElementById('snakeHead'),
        snakeBlock = document.getElementById('snakeBlock'),
        snakeBody = document.getElementsByClassName('snakeBody'),
        self = this;
    cashTimer = setInterval(function () {
        var x = parseInt(getComputedStyle(snakeHead).left),
            y = parseInt(getComputedStyle(snakeHead).top),
            Bx = parseInt(getComputedStyle(snakeBlock).left),
            BY = parseInt(getComputedStyle(snakeBlock).top),
            len = snakeBlock.children.length;
        if((x + Bx) < 0 || (x + Bx > 1200)){
            alert("Game Over! Your Score Is : " + self.score);
            clearInterval(self.timer1);
            clearInterval(cashTimer);
        }else if((y + BY) < 0 || (y + BY) > 560){
            alert("Game Over! Your Score Is : " + self.score);
            clearInterval(self.timer1);
            clearInterval(cashTimer);            
        }
        
        for(var i = 0; i < len; i++){
            self.detectPosition.x[i] = parseInt(getComputedStyle(snakeBlock.children[i]).left);
            self.detectPosition.y[i] = parseInt(getComputedStyle(snakeBlock.children[i]).top);
        }
        for(var i = 1; i < len; i++){
            if(x == self.detectPosition.x[i]){
                if(y == self.detectPosition.y[i]){
                    alert("Game Over! Your Score Is : " + self.score);
                    clearInterval(self.timer1);
                    clearInterval(cashTimer);  
                }
            }
        }
        

    },100)
        
        
}
SnakeInit.prototype.bindStartEvent = function () {
    var self = this;
    this.dom.btn.addEventListener('click',function () {
        this.style.display = "none" ;
        self.init('right');
    },false);  
}
SnakeInit.prototype.bindKeyEvent = function () {
    var snakeHead = document.getElementById('snakeHead'),
        snakeBody = document.getElementsByClassName('snakeBody'),
        snakeBlock = document.getElementById('snakeBlock'),
        len = snakeBody.length,
        self = this;
        document.addEventListener('keydown',function (e) {
        e.preventDefault();
        switch(e.key) {
            case 'ArrowDown' : 
                console.log(e.key);
                if(self.currentDiret == "up" || self.currentDiret == "down"){
                    break;
                }
                self.move("down"); break;
            case 'ArrowUp' : 
                if(self.currentDiret == "up" || self.currentDiret == "down"){
                    break;
                }               
                self.move("up"); break;
            case 'ArrowLeft' : 
                if(self.currentDiret == "left" || self.currentDiret == "right"){
                    break;
                }
                self.move("left"); break;
            case 'ArrowRight' :
                if(self.currentDiret == "left" || self.currentDiret == "right"){
                    break;
                } 
                self.move("right"); break;
        }
        return false;
    } )
}

SnakeInit.prototype.move = function (direction) {
    if(this.timer1){
        clearInterval(this.timer1);
    }
    var snakeBlock = document.getElementById('snakeBlock'),
    snakeHead = document.getElementById('snakeHead'),
    snakeBody = document.getElementsByClassName('snakeBody'),
    x = parseInt(getComputedStyle(snakeHead).left),
    y = parseInt(getComputedStyle(snakeHead).top),
    self = this;

    this.timer1 = setInterval(function () {
        var len = snakeBlock.children.length;
        for(var i = 0; i < len; i++){
            self.bodyPosition.x[i] = parseInt(getComputedStyle(snakeBlock.children[i]).left);
            self.bodyPosition.y[i] = parseInt(getComputedStyle(snakeBlock.children[i]).top);
        }
        if(document.getElementsByClassName('apple')){                         //Determine if food appears in the game
            var apple = document.getElementsByClassName('apple'),
                appleNum = apple.length;
            for(var i = 0; i < appleNum; i++ ){
                self.applePosition.x[i] = parseInt(getComputedStyle(apple[i]).left);
                self.applePosition.y[i] = parseInt(getComputedStyle(apple[i]).top);
            }
        }
        switch(direction) {
            case "right" : 
                snakeHead.style.left = self.bodyPosition.x[0] + 40 + "px";
                snakeHead.style.transform = "rotateZ(0deg)";
                self.currentDiret = "right";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
            case "left" :
                snakeHead.style.left = self.bodyPosition.x[0] - 40 + "px";
                snakeHead.style.transform = "rotateZ(180deg)" ;
                self.currentDiret = "left";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
            case "up" :
                snakeHead.style.top = self.bodyPosition.y[0] - 40 + "px";
                snakeHead.style.transform = "rotateZ(-90deg)" ;
                self.currentDiret = "up";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
            case "down" :
                snakeHead.style.top = self.bodyPosition.y[0] + 40 + "px";
                snakeHead.style.transform = "rotateZ(90deg)";
                self.currentDiret = "down";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
        }
        if(apple){
            var mapX = parseInt(getComputedStyle(snakeHead).left) + parseInt(getComputedStyle(snakeBlock).left),
                mapY = parseInt(getComputedStyle(snakeHead).top) + parseInt(getComputedStyle(snakeBlock).top);
            for(var i =0; i < appleNum; i++){
                if(mapX == self.applePosition.x[i] && mapY == self.applePosition.y[i]){
                    self.addBody(mapX,mapY);
                }
            }
        }
        self.dom.actScore.innerHTML = self.score;
    },200)
}
SnakeInit.prototype.addBody = function (x,y) {
    //  Delete the apple and add the new apple to lengthen the body
    var apple = document.getElementsByClassName('apple');
    var n = apple.length,
        snakeBody = document.createElement('div'),
        snakeBlock = document.getElementById('snakeBlock');
        len = snakeBlock.children.length;
    for(var i = 0; i < n; i++){
        if(x == this.applePosition.x[i]){
            var index = i;
            this.dom.main.removeChild(apple[i]);
            break;
        }
    }
    snakeBody.className = "snakeBody"
    snakeBody.style.left = this.bodyPosition.x[len-1] +"px";
    snakeBody.style.top = this.bodyPosition.y[len-1] + "px" ;
    snakeBlock.appendChild(snakeBody);
    this.appleShow();
    this.score++;
}
SnakeInit.prototype.appleShow = function () {
    var apple = document.getElementsByClassName('apple');
    var n = Math.floor(Math.random()*2 + 1);   // Make sure to randomly generate 1 or 2 fruits
    if(apple.length >= 1){                          //Ensure that only two fruits can exist at the same time
        this.generate(1);
    }else{
        this.generate(n);            
    }
    
}
SnakeInit.prototype.generate = function (n) {
    for(var i = 0; i < n; i++){
        var apple = document.createElement('div'),
            x = Math.floor(Math.random()*30) * 40;
            y = Math.floor(Math.random()*15) * 40;
        apple.className = "apple";
        apple.style.left = x + "px";
        apple.style.top = y + "px";
        this.dom.main.appendChild(apple);
    }
}
SnakeInit.prototype.init = function (direction) {
    var self = this,
        bodyPositionX = 40,
        bodyPositionY = 40;
    var positionX = Math.floor(Math.random() * 12 + 3) * 40,
        positionY = Math.floor(Math.random() *15) * 40,
        moveLeft = positionX;
    var snakeBlock = document.createElement('div'),
        snakeHead = document.createElement('div');
    snakeBlock.id = 'snakeBlock';
    snakeBlock.style.left = positionX + "px";
    snakeBlock.style.top = positionY + "px";
    snakeHead.id = 'snakeHead';
    snakeBlock.appendChild(snakeHead);
    for(var i = 0; i < 3; i++) {
       var snakeBody = document.createElement('div');
       snakeBody.className = 'snakeBody';
       snakeBody.style.left = -bodyPositionX + 'px';
       bodyPositionX += 40;
       snakeBlock.appendChild(snakeBody);
    }
    this.dom.main.appendChild(snakeBlock);
    this.move('right');
    this.currentDiret = direction;
    this.bindKeyEvent();
    this.cashDectet();      //Detect whether it hits a wall or hit itself
    this.appleShow();

}

var snake = new SnakeInit();
