/**
 * 主菜单精灵
 * 
 * @author NavCat
 * @created 2015-8-2 18:09:15
 * 
 */
var MMMainMenuSprite = cc.Sprite.extend({
	_index : -1,
	_configs: null,       // 当前菜单项的配置数据
	scrollView: null,     // 滚动查看子项
	ctor: function(index){
		// 调用父类的构造方法
		this._super();
		// 加载配置项
		this.loadConfig(index);
		// 初始化
		this.loadInit();
		// 加载标题
		this.loadTitle();
		// 添加事件监控
		this.addListener();
	},
	/**
	 * 加载配置项
	 * @param index
	 * 
	 * _configs 格式 
	 * {
        title : "经典",
        color : cc.color.WHITE,
        labelColor  : cc.color.BLACK,
        subItem : [
            "25",
            "50",
            "不连续",
            "5x5",
            "6x6"
        ]
    }
	 */
	loadConfig: function(index){
		this._index = index;
		this._configs = GC.menuItem[this._index];
	},
	/**
	 * 初始化
	 */
	loadInit: function(){
		var size = cc.winSize;
		this.setTextureRect(cc.rect(0, 0, size.width / 2, size.height / 4));
		// 设置背景颜色
		this.setColor(this._configs.color);
	},
	/**
	 * 加载标题
	 */
	loadTitle: function(){
		var label = new cc.LabelTTF(this._configs.title, "Arial", 48);
		label.setPosition(this.width / 2, this.height / 2);
		label.setColor(this._configs.labelColor);
		this.addChild(label);
	},
	/**
	 * 添加事件监控
	 */
	addListener: function(){
		cc.eventManager.addListener({
			event           : cc.EventListener.TOUCH_ONE_BY_ONE,
			target          : this,
			swallowTouches  : true,
			onTouchBegan  : this.onTouchBegan,
			onTouchMoved  : this.onTouchMoved,
			onTouchEnded  : this.onTouchEnded
		}, this);
	},
	onTouchBegan: function (touch, event) {
		var target = this.target;
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var size = target.getContentSize();
		var rect = cc.rect(0, 0, size.width, size.height);
		if (!cc.rectContainsPoint(rect, locationInNode)) {
			return false;
		}
		// 加载子项目
		target.loadSubItem();

		cc.log("sss");
		return true;
	},
	onTouchMoved: function (touch, event) {

	},
	onTouchEnded: function (touch, event) {

	},
	loadSubItem: function(){
		// 记录当前选中的菜单，在点击其他菜单时，可以根据此记录，删除对应的subItem。
		this.parent.selectIndex = this._index;

		// 逻辑判断[如果没有子项,则不创建scrollView][即：随机-更多]
		if (this._configs.subItem.length == 0 ){
			// TODO
			return;
		}

		this.scrollView = new ccui.ScrollView();
		this.addChild(this.scrollView);
		this.scrollView.setTouchEnabled(true);
		this.scrollView.setBounceEnabled(true);
		this.scrollView.setContentSize(this.getContentSize());
		this.scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
		this.scrollView.y = this.scrollView.height;

		var scrollViewSize = this.scrollView.getContentSize();
		this.scrollView.setInnerContainerSize(cc.size(scrollViewSize.width, scrollViewSize.height / 3 * this._configs.subItem.length));

		var size = this.getContentSize();
		var j = this._configs.subItem.length;
		for (var i = 0; i < this._configs.subItem.length; i++){
			// 两个索引。用来获取GC.subItem.menuItem中的项，得到玩法。
			var node = new MMMainMenuItemSprite(this._index, i);
			node.x = size.width / 2;
			node.y = j * size.height / 3 - node.height / 2;
			this.scrollView.addChild(node);
			j--;
		}

		var actionMoveBy = cc.moveBy(0.2, cc.p(0, -size.height));
		var actionEaseSineIn = actionMoveBy.easing(cc.easeSineIn());
		this.scrollView.runAction(actionEaseSineIn);
	}
});