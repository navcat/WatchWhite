/**
 * 游戏文件配置
 * @author NavCat
 * @created 2015-8-2 18:09:15
 * 
 */
var GC = GC || {};

// 游戏窗口的宽度和高度
GC.w = 640;	
GC.h = 960;

GC.size = cc.size(GC.w, GC.h);   // 设置大小

// 屏幕的中心位置
GC.w2 = GC.w / 2;
GC.h2 = GC.h / 2;

//黑白块间隔
GC.titleSpace = 1;

// 菜单配置
GC.menuItem = 
[
   {
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
   },{
	   title : "街机",
	   color : cc.color.BLACK,
	   labelColor  : cc.color.WHITE,
	   subItem : [
	              "正常",
	              "更快",
	              "逆行",
	              "5x5",
	              "6x6"
	              ]
   },{
	   title : "禅",
	   color : cc.color.BLACK,
	   labelColor  : cc.color.WHITE,
	   subItem : [
	              "15''",
	              "30''",
	              "不连续",
	              "5x5",
	              "6x6"
	              ]
   },{
	   title : "极速",
	   color : cc.color.WHITE,
	   labelColor  : cc.color.BLACK,
	   subItem : [
	              "正常",
	              "逆行",
	              "不连续",
	              "5x5",
	              "6x6"
	              ]
   },
   {
	   title : "接力",
	   color : cc.color.WHITE,
	   labelColor  : cc.color.BLACK,
	   subItem : [
	              "8''",
	              "10''",
	              "12''",
	              "5x5",
	              "6x6"
	              ]
   },{
	   title : "街机+",
	   color : cc.color.BLACK,
	   labelColor  : cc.color.WHITE,
	   subItem : [
	              "雷电",
	              "闪电",
	              "双黑",
	              "双层",
	              "迷雾",
	              "变速",
	              "旋转",
	              "震动",
	              "多云",
	              "移动",
	              "梦幻"
	              ]
   },{
	   title : "随机",
	   color : cc.color.BLACK,
	   labelColor  : cc.color.WHITE,
	   subItem : []
   },{
	   title : "更多",
	   color : cc.color.WHITE,
	   labelColor  : cc.color.BLACK,
	   subItem : []
   }
];