

var GameOverLayer = cc.LayerColor.extend({
	_model       : -1,
	_playMethod  : -1,
	_count       : -1,
	_time        : -1,
	_isWin       : false,
	ctor:function (data) {
		this._super();
		this.loadConfig(data);
		this.loadInit();
		this.loadTitle();
		this.loadMenu();
		return true;
	},
	loadConfig : function(data){
		this._model      = data.model,
		this._playMethod = data.playMethod,
		this._count      = data.count,
		this._time       = data.time,
		this._isWin      = data.isWin
	},
	loadInit : function(){
		var color = this._isWin ? cc.color(0, 155, 45) : cc.color(180, 0, 0);
		this.setColor(color);
	},
	loadTitle : function(){

		var modelStr = GC.menuItem[this._model].title + "模式";
		var modelLabel = new cc.LabelTTF(modelStr, "Arial", 64);
		this.addChild(modelLabel);
		modelLabel.setPosition(GC.w2, GC.h - 200);

		var playMethodStr = GC.menuItem[this._model].subItem[this._playMethod];
		var playMethodLabel = new cc.LabelTTF(playMethodStr, "Arial", 24);
		this.addChild(playMethodLabel);
		playMethodLabel.setPosition(modelLabel.x + 120, modelLabel.y + 60);

		var winOrLoseStr = this._isWin ? "赢了！" : "输了!";
		var winOrLoseLabel = new cc.LabelTTF(winOrLoseStr, "Arial", 200);
		this.addChild(winOrLoseLabel);
		winOrLoseLabel.setPosition(GC.w2, GC.h2);
		winOrLoseLabel.setColor(cc.color.BLACK);

		// [正则表达式]获取小数点后三位
		var regex = /([0-9]+\.[0-9]{3})[0-9]*/;
		var timeStr = String(this._time);
		var finalStr = timeStr.replace(regex,"$1''");

		// TODO 数据存储
		var border =  5;    // 临时， 数据存储讲完后完善。
		var historyOrNewStr = (this._time > border) ? ("历史记录 " + finalStr) : ("新纪录 " + finalStr);
		var historyOrNewLabel = new cc.LabelTTF(historyOrNewStr, "Arial", 48);
		this.addChild(historyOrNewLabel);
		historyOrNewLabel.setPosition(GC.w2, GC.h2 - 150);
		historyOrNewLabel.setColor(cc.color.BLACK);
	},
	loadMenu : function(){
		var goLabel = new cc.LabelTTF("继续玩", "Arial", 48);
		var goMenuItem = new cc.MenuItemLabel(goLabel, function(){
			var scene = new cc.Scene();
			var layer = new GamePlayLayer(this._model, this._playMethod);
			scene.addChild(layer);
			cc.director.runScene(scene);
		}, this);

		var endLabel = new cc.LabelTTF("结束", "Arial", 48);
		var endMenuItem = new cc.MenuItemLabel(endLabel, function(){
			cc.director.runScene(new MainMenuScene());
		}, this);

		// 菜单属性配置
		var menu = new cc.Menu(goMenuItem,endMenuItem);
		this.addChild(menu);
		menu.setPosition(GC.w2, 200);
		menu.alignItemsHorizontallyWithPadding(30);
	}
});