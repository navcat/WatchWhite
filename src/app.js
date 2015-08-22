/**
 * 游戏入口文件
 * 即：主菜单文件
 * @author NavCat
 * @created 2015-8-2 18:09:15
 * 
 */

var MainMenuLayer = cc.Layer.extend({
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
    		var menuSprite = new MMMainMenuSprite(i);
    		if (i % 2 == 0){
    			menuSprite.x = menuSprite.width / 2;
    			menuSprite.y = GC.h - (i / 2 + 1) * menuSprite.height + menuSprite.height / 2;
    		}else{
    			menuSprite.x = menuSprite.width * 1.5;
    			menuSprite.y = GC.h - (i / 2 + 1) * menuSprite.height + menuSprite.height;
    		}
    		this.addChild(menuSprite, j, i);
    		j--;
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

