class Carousel {
	constructor(obj){
		this.wrap = obj.wrap;
		this.wrapId = obj.wrap.id;              //容器ID
		this.wrapWidth = this.wrap.offsetWidth; //容器宽
		this.activePage = 0;                    //轮播图当前页
		this.imgNumber = obj.urlArr.length;     //图片数
		this.settimeID;                         //定时器ID
		this.init(obj.urlArr, obj.details);     //初始化
	}

	init(urlArr, details) {                   //创建DOM结构
		this.wrap.className = "carousel";
		this.wrap.innerHTML = `<span id="${this.wrapId}_prev"></span>
                                <span id="${this.wrapId}_next"></span>
                                <div id="${this.wrapId}_page"></div>
                                <ul id="${this.wrapId}_container"></ul>`;

		const container = document.querySelector(`#${this.wrapId}_container`)
			,page = document.querySelector(`#${this.wrapId}_page`);
		let i = 0;
		container.innerHTML = `<img src="${urlArr[0]}">`;	//让一张图片撑起大小
		for (let value of urlArr) {            	//注入图片和方块
			container.innerHTML += `<li class="${this.wrapId}_img-item"><img src="${value}"></li>`;
			page.innerHTML += `<span class="${this.wrapId}_pagination">${i}</span>`;
			i++;
		}

		const img_items = document.querySelectorAll(`.${this.wrapId}_img-item`);
		if (details) {							//创建图片文本说明
			let j = 0;
			for (let value of details) {
				let para = document.createElement("p");
				para.textContent = value;
				if (img_items[j]) img_items[j].appendChild(para);
				j++;
			}
		}
		
		for (let i = 1; i < this.imgNumber; i++) {	//从第二种图片开始，隐藏到右侧
			img_items[i].style.left = this.wrapWidth + "px";
		}

		document.querySelectorAll(`.${this.wrapId}_pagination`)[this.activePage].id = this.wrapId + "_active";
		this.pageActiveColor();
		this.setTime();
		this.bindEvent();
	}
	pageActiveColor() {                         //绘制方块
		document.querySelector(`#${this.wrapId}_active`).id = "";
		document.querySelectorAll(`.${this.wrapId}_pagination`)[this.activePage].id = this.wrapId + "_active";
	}
	bindEvent() {                               //绑定事件
		let prevAngle = document.querySelector(`#${this.wrapId}_prev`)
			, nextAngle = document.querySelector(`#${this.wrapId}_next`)
			, pageUl = document.querySelector(`#${this.wrapId}_page`)
			, pages = pageUl.querySelectorAll(`.${this.wrapId}_pagination`);
		for (let key = 0; key < pages.length; key++) {
			pages[key].addEventListener("click", this.selectPage.bind(this, key));
		}
		this.wrap.addEventListener("mouseenter", this.claerTime.bind(this));
		this.wrap.addEventListener("mouseleave", this.setTime.bind(this));
		prevAngle.addEventListener("click", this.leftAngleclick.bind(this));
		nextAngle.addEventListener("click", this.rightAngleclick.bind(this));
	}
	leftAngleclick() {                          //点击左箭头
		const img_items = document.querySelectorAll(`.${this.wrapId}_img-item`);
		animate(img_items[this.activePage], {left: this.wrapWidth});
		--this.activePage < 0 ? this.activePage = this.imgNumber-1 : this.activePage;
		img_items[this.activePage].style.left = -this.wrapWidth + "px";
		animate(img_items[this.activePage], {left: 0});
		this.pageActiveColor();
	}
	rightAngleclick() {							//点击右箭头
		const img_items = document.querySelectorAll(`.${this.wrapId}_img-item`);
		animate(img_items[this.activePage], { left: -this.wrapWidth });
		++this.activePage > this.imgNumber-1 ? this.activePage = 0 : this.activePage;
		img_items[this.activePage].style.left = this.wrapWidth + "px";
		animate(img_items[this.activePage], { left: 0 });
		this.pageActiveColor();
	}
	selectPage(selectNum) {                     //点击方块定位到指定图片          
		const img_items = document.querySelectorAll(`.${this.wrapId}_img-item`);
		if (selectNum > this.activePage) {
			animate(img_items[this.activePage], {left: -this.wrapWidth});
			img_items[selectNum].style.left = this.wrapWidth + "px";
		} else if (selectNum < this.activePage) {
			animate(img_items[this.activePage], {left: this.wrapWidth});
			img_items[selectNum].style.left = -this.wrapWidth + "px";
		}
		this.activePage = selectNum;
		animate(img_items[this.activePage], { left: 0 });
		this.pageActiveColor();
	}
	setTime() {                                 //自动播放
		this.settimeID = setInterval(() => {
			document.querySelector(`#${this.wrapId}_next`).click();
		}, 4000);
	}
	claerTime() {                               //鼠标悬浮取消自动播放
		let theId = this.settimeID;             //解决this绑定丢失
		clearInterval(theId);
	}
}

function animate(obj, json) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		let flag = true;
		for (let attr in json) {
			let current = parseInt(window.getComputedStyle(obj,null)[attr]);
			let step = (json[attr] - current) /10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			obj.style[attr] = current + step + "px";
			if (current != json[attr]) flag = false;
		}
		if (flag) clearInterval(obj.timer);
	}, 25);
}