var ppt = {
	curIndex: 0,
	lastIndex: undefined,
	flag: true,
	len: $('.box').length,
	myWrapper: $('.wrapper'),
	nowTime: undefined,
	lastTime: undefined,

	init: function() {
		this.nowTime = new Date().getTime();
		this.lastTime = new Date().getTime();
		if(this.len > 1) {
			this.showBtn(this.len);
		}
		this.bindEvent();
	},
	showBtn: function(len) {
		var navArr = ['<ul>'],
			dirStr = '';
		for(var i = 0; i < len; i ++) {
			if(i == 0) {
				navArr.push('<li class = "choosedNav">' + (i + 1) + '</li>')
			}else {
				navArr.push('<li>' + (i + 1) + '</li>');
			}
		}
		navArr.push('</ul>');
		dirStr = '<span class="leftBtn"></span>\
				<span class="rightBtn"></span>'
		this.myWrapper.append(navArr.join('')).append(dirStr);
	},
	showPpt: function() {
		var _this = this;
		$('.choosedNav').removeClass('choosedNav');
		$('li').eq(_this.curIndex).addClass('choosedNav');
		$('.curPpt').fadeOut(300, function() {
			$(this).removeClass('curPpt');
			$('.text').add($('.photo')).css({'width': '0', 'heifht': '0', 'opacity': '0'});
			$('.box').eq(_this.curIndex).addClass('curPpt').fadeIn(300, function() {
				$('.text').add($('.photo')).animate({'width': '300', 'height': '200', 'opacity': '1'}, 500);
			});
		});
	},
	bindEvent: function(){
		var _this = this;
		$('.leftBtn').on('click', function() {
			_this.changeIndex('left')
		});
		$('.rightBtn').on('click', function() {
			_this.changeIndex('right')
		});
		$('li').on('click', function(e) {
			console.log(e.target);
			_this.changeIndex($(e.target).index())
		});
		var timer = setInterval(function() {
			_this.nowTime = new Date().getTime();
			if(_this.nowTime - _this.lastTime >= 5000) {
				_this.changeIndex('right', true);//true表示自动播放状态
			}
		}, 3000);
	},
	changeIndex: function(direction, autoFlag) {
		this.lastIndex = this.curIndex;
		if(typeof(direction) == 'number') {
			console.log('number');
			this.curIndex = direction;
		}else if(direction == 'left') {
			console.log('left');
			if(this.curIndex == 0) {
				this.curIndex = this.len - 1;
			}else {
				this.curIndex -= 1;
			}
		}else if(direction == 'right') {
			console.log('right');
			if(this.curIndex == this.len - 1) {
				this.curIndex = 0;
			}else {
				this.curIndex += 1;
			}
		}
		if(this.lastIndex != this.curIndex) {
			this.showPpt();
		}
		if(!autoFlag) {
			this.lastTime = new Date().getTime();
		}
	}
};

ppt.init();