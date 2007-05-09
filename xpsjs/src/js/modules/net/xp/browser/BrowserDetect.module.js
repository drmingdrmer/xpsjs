new Module("net.xp.browser.BrowserDetect",
[
    "net.xp.core.*"
],function ($this, $name){return {
	$initialize : function (){
		var g = this.__();

		var ua = navigator.userAgent;
		g.IE = (navigator.appName == "Microsoft Internet Explorer");
		g.IE5 = g.IE && (ua.indexOf('MSIE 5') != -1);
		g["IE5.0"] = g.IE && (ua.indexOf('MSIE 5.0') != -1);
		g.IE6 = g.IE && (ua.indexOf('MSIE 6') != -1);
		g.IE7 = g.IE && (ua.indexOf('MSIE 7') != -1);
		g.Gecko = ua.indexOf('Gecko') != -1;
		g.Safari = ua.indexOf('Safari') != -1;
		g.Opera = ua.indexOf('Opera') != -1;
		g.Mac = ua.indexOf('Mac') != -1;
		g.NS7 = ua.indexOf('Netscape/7') != -1;
		g.NS71 = ua.indexOf('Netscape/7.1') != -1;
		if (g.Opera) {
			g.IE = true;
			g.Gecko = false;
			g.Safari = false;
		}

		window.$Br = $this;
	},

	$Alias : function (){
		Module.getHostWin().$Br = $this;
	},

	is : function (browser){
		return this.__()[browser];
	}
}});