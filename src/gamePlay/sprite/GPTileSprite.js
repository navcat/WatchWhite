/**
 * 方块精灵
 * 
 * @author NavCat
 * @created 2015-8-3 22:48:25
 * 
 */
var TileType = {};
TileType.START_LINE = 0;    // 起跑线
TileType.TOUCH      = 1;    // 可以踩的[黑块]
TileType.DONT_TOUCH = 2;    // 不能踩的[白块]
TileType.BE_END     = 3;    // 快到终点的时候，变成绿色的块

var TileSprite = cc.Sprite.extend({
	type: TileType.DONT_TOUCH,		// 默认不能点击
	_callBackFunc: null,			// 回调函数
	_listener: null,				// 监听器
	ctor: function(size, callBackFunc){
		this._super();
		// 加载配置文件
		this.loadConfig(callBackFunc);
		// 初始化
		this.loadInit(size);
		return true;
	},
	/**
	 * 加载配置文件
	 * 
	 * @param callBackFunc function 回调函数
	 */
	loadConfig: function(callBackFunc){
		this._callBackFunc = callBackFunc;
	},
	/**
	 * 初始化
	 * 
	 * @param size cc.p
	 */
	loadInit: function(size){
		// 设置纹理
		this.setTextureRect(cc.rect(0, 0, size.width, size.height));
		this.setColor(cc.color.WHITE);		// 设置默认的方块颜色为白色
	},
	/**
	 * 加载事件
	 * @param gameLayer GamePlayLayer
	 */
	loadListener : function(gameLayer){
		var listener = cc.EventListener.create({
			event           : cc.EventListener.TOUCH_ONE_BY_ONE,
			target          : this,
			swallowTouches  : true,
			onTouchBegan    : this.onTouchBegan,
			onTouchMoved    : this.onTouchMoved,
			onTouchEnded    : this.onTouchEnded
		});
		cc.eventManager.addListener(listener, this);
	},
	onTouchBegan: function (touch, event) {
		var self = this.target;
		var locationInNode = self.convertToNodeSpace(touch.getLocation());
		var size = self.getContentSize();
		var rect = cc.rect(0, 0, size.width, size.height);
		// 是否被触摸到
		if (!cc.rectContainsPoint(rect, locationInNode)) {
			return false;
		}

		// 触摸处理
		self.onTouchDispose();
		return true;

	},
	onTouchMoved : function (touch, event) {
		//var self = this.target;
	},
	onTouchEnded : function (touch, event) {
		var self = this.target;
		// 移除.保证只能点击一次
		cc.eventManager.removeListeners(self);
	},
	/**
	 * 触摸事件处理
	 */
	onTouchDispose : function(){
		var self = this;
		cc.log('-----------', self.name);
		if(self.name === "start"){
			// 游戏[开始]
			cc.log(self.parent);
			self.parent.parent.onGameStart();
		}
		var callFun = cc.callFunc(function(){
			// 游戏是否结束[如果点击到白块，则游戏结束]
			var isGameOver = self.type == TileType.DONT_TOUCH ? true : false;
			// 调用回调函数
			(self._callBackFunc && typeof(self._callBackFunc) === "function") && self._callBackFunc(self, isGameOver);
		});

		var sacleAction = cc.scaleTo(0.1, 1);	// 缩放效果
		var blinkAction = cc.blink(0.4, 4);		// 闪烁效果
		var touchAction = cc.sequence(sacleAction, callFun);
		var dontTouchAction = cc.sequence(blinkAction, callFun);
		var action = (this.type == TileType.TOUCH) ? touchAction : dontTouchAction;

		// 根据当前类型指定颜色
		var color = (this.type == TileType.TOUCH) ? cc.color.GRAY :cc.color.RED;
		var scale = (this.type == TileType.TOUCH) ? 0.1 : 1;

		var subTile = new cc.Sprite();
		this.addChild(subTile);
		subTile.setPosition(this.width / 2, this.height / 2);
		subTile.setTextureRect(cc.rect(0, 0, this.width, this.height));
		subTile.scale = scale;
		subTile.color = color;
		subTile.runAction(action);
	},
	/**
	 * 根据步骤设置方块的颜色
	 * @param type
	 */
	setType : function(type){
		switch (type){
		// 就绪，设置第为黄色
		case TileType.START_LINE:
			this.setColor(cc.color.YELLOW);
			break;
		// 可以点击，设置为黑色
		case TileType.TOUCH:
			this.setColor(cc.color.BLACK);
			break;
		// 默认白色，不做设置
		case TileType.DONT_TOUCH:
			break;
		// 结束，设置为绿色
		case TileType.BE_END:
			this.setColor(cc.color.GREEN);
			this.setTextureRect(cc.rect(0, 0, this.width + 10, this.height));
			break;
		}
		this.type = type;
	}
	
});