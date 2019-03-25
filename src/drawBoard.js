/**
 * by zxg~
 */

 var drawingBoard = {
    bool:false,
    cavs:document.getElementById('cavs'),
    ctx : cavs.getContext('2d'),
    btn_container:document.getElementsByTagName('ul')[0],
    imgsArr:[],
    number : 2,
    init:function(){
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.fillStyle='#ffffff';
        this.ctx.fillRect(0,0,cavs.offsetWidth,cavs.offsetHeight);
        this.ctx.closePath();
        this.ctx.stroke();
        this.drawing();
        this.btnsAllFn();
        console.log(this.ctx);
    },
    drawing:function () {
        var self = this;
        cavs.onmousedown = function(e){
            self.c_left = cavs.offsetLeft,
            self.c_top = cavs.offsetTop;
            self.bool = true;
            var c_x = e.pageX- self.c_left,
                c_y = e.pageY - self.c_top;
                self.ctx.beginPath();
                self.ctx.moveTo(c_x,c_y)
                var img = self.ctx.getImageData(0,0,cavs.offsetWidth,cavs.offsetHeight);
                self.imgsArr.push(img);
        }
        cavs.onmousemove = function(e){
            if(self.bool){
                self.ctx.lineTo(e.pageX - self.c_left,e.pageY - self.c_top);
                if(self.number % 2 != 0 ){
                    self.ctx.lineWidth = lineRuler.value/3;
                }else{
                    self.ctx.lineWidth = lineRuler.value/8;
                }
                self.ctx.stroke();
            }
        }
        cavs.onmouseup = function(e){
            self.ctx.closePath();
            self.bool = false;
        }
        cavs.onmouseleave = function(e){
            self.ctx.closePath();
            self.bool = false;
        }
    },

    download:function(type){
        var imgdata = cavs.toDataURL(type);
        var fixtype = function (type) {
            type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        }
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
        var saveFile = function (data, filename) {
            var link = document.createElement('a');
            link.href = data;
            link.download = filename;
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        }
        var filename = new Date().toLocaleDateString() + '.' + type;
        saveFile(imgdata, filename);
    },

    btnsAllFn:function(){
        var self = this;
        this.btn_container.onclick = function(e){
            switch(e.target.id){
                case'cleanBoard':
                    //清屏
                    self.ctx.clearRect(0,0,cavs.offsetWidth,cavs.offsetHeight);
                    break;
                case'eraser':
                    //eraser
                    if(self.number % 2 == 0){
                        eraser.classList.toggle('active');
                        self.ctx.beginPath();
                        self.ctx.strokeStyle = '#ffffff';
                        self.ctx.lineWidth = lineRuler.value/5;
                        console.log(self.ctx.strokeStyle);
                        eraser.value = "使用画笔"
                        self.number ++;
                    }else{
                        eraser.classList.toggle('active');
                        self.ctx.beginPath();
                        self.ctx.strokeStyle = 'black';
                        eraser.value = "橡皮"
                        self.number ++; 
                    }
                    break;
                case 'rescind':
                    //撤销
                    if(self.imgsArr.length > 0){
                        self.ctx.putImageData(self.imgsArr.pop(),0,0);
                    }
                    break;
                case'save_canvas':
                    var type = 'jpg';
                    self.download(type);
            }
            colorChange.onchange = function(){
                self.ctx.beginPath();
                self.ctx.strokeStyle = this.value;
            }
            lineRuler.onchange = function(){
                return this.value;

            }
        }
    }
 }
 drawingBoard.init();
 
