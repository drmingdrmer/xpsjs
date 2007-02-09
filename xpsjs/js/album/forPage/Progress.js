var x = window.Progress = function (max, config){
	config = config || {};
	this.max = max;
	this.hasText = true;
	this.config = {};
	
	var defaultConfig = {
	};
	
	$util.cpAttr(this.config, config);
	$util.cpAttr(this.config, defaultConfig, false);
	
	
}

var p = {
	
	showText : function (t){
		this.hasText = t==true;
	},
	setMax : function (m){
		this.max = m;
	},
	getProgressHtml : function (cur){
		if (cur > this.max) cur = this.max;
		var e = $util.tempNode();
		var html = '<div style="border:1px solid #000; height:15px; width:150px;"><div style="height:100%; background-color:#fd0; width:'+cur/this.max*100+'%"></div></div>';
		if (this.hasText) html += "已完成" + cur + "/" + this.max;
		
		e.innerHTML = html;
		return e.innerHTML;
	}
}

$util.cpAttr(x.prototype,p);