/**
 * 游戏入口文件
 * 即：主菜单文件
 * @author NavCat
 * @created 2015-8-2 18:09:15
 * 
 */

var MainMenuLayer = cc.Layer.extend({
	selectedIndex: -1,
    ctor:function () {
    	this._super();
    	// 加载主菜单
    	this.loadMainMenu();
    	return true;
    },
    /**
     * 加载主菜单
     */
    loadMainMenu : function(){
    	// 层级设置，遮挡后面的subItem。
    	var j = GC.menuItem.length;
    	cc.log('the menu size:', j)
    	for (var i = 0; i < GC.menuItem.length; i++){
    		// 菜单精灵
    		this.loadMenuItem(i);
    		j--;
    	}
    },
    /**
     * 添加首页的菜单项目
     * @param index
     * @param x
     * @param y
     * @returns MMMainMenuSprite
     */
    loadMenuItem: function(index){
    	var menuSprite = this.getChildByTag(index);
    	cc.log('menuSprite:', this.getChildrenCount(), menuSprite);
    	// 如果该菜单已经菜单，则删除
    	if(menuSprite !== null){
//    		this.removeChild(menuSprite);
    		menuSprite.removeAllChildren();
    		menuSprite.loadTitle();
    		cc.log('removed----');
    	}else{
    		menuSprite = new MMMainMenuSprite(index);
    		// 设置名称
    		if (index % 2 == 0){
    			menuSprite.x = menuSprite.width / 2;
    			menuSprite.y = GC.h - (index / 2 + 1) * menuSprite.height + menuSprite.height / 2;
    		}else{
    			menuSprite.x = menuSprite.width * 1.5;
    			menuSprite.y = GC.h - (index / 2 + 1) * menuSprite.height + menuSprite.height;
    		}
    		menuSprite.setTag(index);
    		this.addChild(menuSprite);
    	}
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

