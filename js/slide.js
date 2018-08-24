class Carousel {
    constructor(obj) {
        this.wrap = obj.wrap;
        this.wrapId = obj.wrap.id;              //容器ID
        this.wrapWidth = this.wrap.offsetWidth; //容器宽
        this.activePage = 0;                    //轮播图当前页
        this.imgNumber = obj.urlArr.length;     //图片数
        this.settimeID;                         //定时器ID
        this.init(obj.urlArr);                  //初始化，创建dom
    }

    init(urlArr) {                              //创建DOM结构
        this.wrap.style.position = "relative";
        this.wrap.style.overflow = "hidden";
        this.wrap.innerHTML = `<span id="${this.wrapId}_pre" class="fa fa-angle-left fa-3x"></span>
                                <span> id="${this.wrapId}_next" class="fa fa-angle-right fa-3x"></span>
                                <ul id="${this.wrapId}_page"></ul>
                                <div id="${this.wrapId}_container"></div>`;

        let container = document.getElementById(this.wrapId + '_container')
            ,page = document.getElementById(this.wrapId + '_page');
        for (let value of urlArr) {             //构建方块
            container.innerHTML += `<div class="${this.wrapId}_img-item>
                                    <img src="${value}">
                                    </div>`;
            page.innerHTML += `<li class="${this.wrapId}_pagination"></li>`;
        }
        container.style.width = this.imgNumber + "00%";
        container.style.left = 0;

        const img_items = document.querySelectorAll(`.${this.wrapId}_img-item`);
        for (let value of img_items) {
            value.style.width = 100 / this.imgNumber + "%";
        }

        document.querySelectorAll(`.${this.wrapId}_pagination`)[this.activePage].id = this.wrapId + "_active";
        this.pageActiveColor();
        this.setTime();
        this.bindEvent();
    }
    pageActiveColor() {                         //绘制方块
        documnet.querySelector(`#${this.wrapId}_active`).id = "";
        document.querySelectorAll(`.${this.wrapId}_pagination`)[this.activePage].id = this.wrapId + "_active";
    }
    bindEvent() {                               //绑定事件
        let preAngle = document.querySelector(`#${this.wrapId}_pre`)
            , nextAngle = document.querySelector(`#${this.wrapId}_next`)
            , pageUl = document.querySelector(`#${this.wrapId}_page`)
            ,pages = document.querySelectorAll(`.${this.wrapId}_pagination`);
        for (let key = 0; key < pages.length; key++) {
            pages[key].addEventListener("click", this.selectPage.bind(this.key));
        }
        this.wrap.addEventListener("mouseenter", this.claerTime.bind(this));
        this.wrap.addEventListener("mouseleave", this.setTime.bind(this));
        preAngle.addEventListener("click", this.leftAngleclick.bind(this));
        nextAngle.addEventListener("click", this.rightAngleclick.bind(this));
    }
    leftAngleclick() {                          //点击左箭头
        let container = document.querySelector(`#${this.wrapId}_container`);
        if (this.activePage == 0) {             //判断是否到边缘
            this.activePage = this.imgNumber - 1;
        } else {
            this.activePage--;
        }
        container.style.left = `-${this.activePage}00%`;
        this.pageActiveColor();
    }
    rightAngleclick() {
        let container = document.querySelector(`#${this.wrapId}_container`);
        if (this.activePage == this.imgNumber - 1) {
            this.activePage = 0
        } else {
            this.activePage++;
        }
        container.style.left = `-${this.activePage}00%`;
        this.pageActiveColor();
    }
    selectPage(selectNum) {                     //点击方块定位到指定图片          
        this.activePage = selectNum;
        let container = document.querySelector(`#${this.wrapId}_container`);
        container.style.left = `-${this.activePage}00%`;
        this.pageActiveColor();
    }
    setTime() {                                 //自动播放
        this.settimeID = setInterval(() => {
            document.querySelector(`#${this.wrapId}_next`).click();
        }, 3000);
    }
    claerTime() {                               //鼠标悬浮取消自动播放
        let theId = this.settimeID;             //解决this绑定丢失
        clearInterval(theId);
    }
}