var snakeMove,
    startGameBool = true,
    startPauseBool = true,
    speed = 200,
    snakescoreBox = document.getElementById('snakescore'),
    content = document.getElementById('content'),
    snakeloser = document.getElementById('snake-loser'),
    snakeloserScore = document.getElementById('snake-loserScore'),
    startPaush = document.getElementById('startPaush'),
    startBtn = document.getElementById('startBtn'),
    startpage = document.getElementById('startPage'),
    closeBtn = document.getElementById('snake-close');
    flag = true;
var snowStr = '<div class="snowWrapper">\
                    <div class="bell"><img class="bellImg" src = "img/zhifubao.jpg"></img></div>\
                    <div class="merry">\
                        <div class="cen">\
                            <span class="text">x</span>\
                            <span>w</span>\
                            <span>Y</span>\
                        </div>\
                    </div>\
                    <div class="christmas">\
                        <div class="cen">\
                            <span class="text">M</span>\
                            <span>E</span>\
                            <span>R</span>\
                            <span>R</span>\
                            <span>Y</span>\
                        </div>\
                        <div class="cen cenBottm">\
                            <span>C</span>\
                            <span>H</span>\
                            <span>R</span>\
                            <span>I</span>\
                            <span>S</span>\
                            <span>T</span>\
                            <span>M</span>\
                            <span>A</span>\
                            <span>S</span>\
                        </div>\
                    </div>\
                    <div class="box">\
                        <div class="boxTop"></div>\
                        <div class="boxBottom">Click Me</div>\
                    </div>\
                    <div class="snowClose"></div>\
            </div>\
            ';

init();
function init(){
    //中间运动区域的构建
    this.mapW = parseInt(window.getComputedStyle(content).width);
    this.mapH = parseInt(window.getComputedStyle(content).height);
    this.mapDiv = content;
    //食物的构建
    this.foodW = 40;
    this.foodH = 40;
    this.foodX = 0;
    this.foodY = 0;
    //谢婉仪的构建
    this.snake;
    this.snakeW = 40;
    this.snakeH = 40;
    this.snakeBody = [[3,0,'head'],[2,0,'body'],[1,0,'body']];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //score
    this.score = 0;
    snakescoreBox.innerHTML = this.score;
    bindEvent();
}
function startGame(){
    $('audio')[0].play();
    startPage.style.display = 'none';
    startPaush.style.display = 'block';
    food();
    snake();
    // xwy();
}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.borderRadius = '40%';
    this.foodX =   Math.floor(Math.random() * ((this.mapW )/ this.foodW));
    this.foodY =  Math.floor(Math.random() * ((this.mapH )/ this.foodH));
    food.style.left = this.foodX * this.foodW + 'px';
    food.style.top =  this.foodY * this.foodH + 'px';
    food.style.position = 'absolute';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.borderRadius = '50%';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 40 + 'px';
        snake.style.top = this.snakeBody[i][1] * 40 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)'
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)'
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}
function move(scorepoint){
    for(var i = this.snakeBody.length - 1;i > 0;i --){
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch(this.direct) {
        case'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] +=1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();

    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeTailX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeTailY = this.snakeBody[this.snakeBody.length - 1][1];
        this.snakeBody.push([snakeTailX,snakeTailY,'body']);
        this.score += 1;
        snakescoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }

    if(this.snakeBody[0][1] < 0||this.snakeBody[0][1] * this.snakeH >= this.mapH) {
        this.reloadGame();
    }
    if(this.snakeBody[0][0] < 0||this.snakeBody[0][0] * this.snakeW >= this.mapW) {
        this.reloadGame();
    }
    var snakeHeaderX = this.snakeBody[0][0];
    var snakeHeaderY = this.snakeBody[0][1];
    for(var i = 1;i<this.snakeBody.length;i++){
        var snakeBodyX = this.snakeBody[i][0];
        var snakeBodyY = this.snakeBody[i][1];
        if(snakeHeaderX == snakeBodyX && snakeHeaderY == snakeBodyY){
            this.reloadGame();
        }
    }
    if(flag && this.score == scorepoint){
        flag = false;
        $('.all').css("display","none");
        startAndPauseGame();
        $('body').append($(snowStr));
        $('.snowClose').on('click',function(){
            $('.all').css("display","block");
            $('.snowWrapper').css('display','none');
            $('audio')[1].pause();
            $('audio')[0].play();
        })
        $('audio')[0].pause();
        clickbox();
        $('audio')[1].play();
        }
}


function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    startPaush.innerHTML = 'start'
    this.snakeBody = [[3, 2, 'head'], [2, 2, 'body'], [1, 2, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    startPauseBool = true;
    startGameBool = true;
    snakeloserScore.innerHTML = this.score;
    snakeloser.style.display = 'block';
    snakescoreBox.innerHTML = this.score;
    this.score = 0;
    snakescoreBox.innerHTML = this.score;
    speed = 200;
    bitch = true;
}

function removeClass(className){
    var ele =document.getElementsByClassName(className);
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function bindEvent(){
    startBtn.onclick = function(){
        startAndPauseGame();
    }
    startPaush.onclick = function () {
        startAndPauseGame();
    }
    closeBtn.onclick = function () {
        snakeloser.style.display = 'none';
    }
}
//开始和暂停游戏
function startAndPauseGame(){
    if(!flag){
        if(this.score < 2){
            flag = true;
        }
    }
    if(startPauseBool){
        if(startGameBool) {
            startGame();
            startGameBool = false;
        }
        startPaush.innerHTML = 'stop';
        snakeMove = setInterval(function(){
            move(10);
        },speed);
        document.onkeydown = function(e){
            var code = e.keyCode;
            setDerict(code);
            e.preventDefault()
        };
        startPauseBool = false;
    }else{
        //暂停
        startPaush.innerHTML = 'start';
        clearInterval(snakeMove);
      
        document.onkeydown = function (e) {
            if (e && e.preventDefault) {
                //阻止默认浏览器动作(W3C) 
                e.preventDefault();
            }
            else {
                //IE中阻止函数器默认动作的方式 
                window.event.returnValue = false;
                return false;
            }
        };
        startPauseBool = true;
    }
}
//--------------------------------------------------------------------------奖品展示----------
function clickbox(){
    // 点击盒子
    $('.boxBottom').on('click',function(){
        $('.box').addClass('shake');
        setTimeout(function(){
            $('.box').removeClass('shake');
            $('.box').addClass('fly');
            $('.snowWrapper').addClass('show');
            snowCreat();
        },1000);
    })
}
function snowCreat() {
    // 生成一百个雪花
    for (var i = 0; i < 100; i++) {
        $('.snowWrapper').append(createSnow());
    }
}
// 随机数功能函数
function random(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}
function createSnow() {
    // 随机选中雪花样式
    var p = Math.random() > 0.5 ? 1 : 2;
    var snow = $('<div class="snow"><img src="./img/snow' + p + '.png"></div>');
    // 设置雪花样式   规定下落时间  和下落延迟时间
    snow.css({
        'left': random(0, 1500) + 'px',
        'animationDelay': random(0, 5) + 's',
        'animationDuration': random(4, 10) + 's',
    });
    return snow;
}
