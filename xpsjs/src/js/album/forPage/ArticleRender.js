var x = window.ArticleRender = function (holder, templator){
	this.holder = holder;
	this.templator = templator;
}


var p = {
	render : function (ar){
		this.holder.innerHTML = "";
		for (var i = 0; i<ar.length; i++){
			var a = ar[i];
			var o = {
				id 			: a.$.article_id,
				title		: a.$.name,
				picAmount	:a.limit.$.current,
				createTime	:a.$.createTime,
				url			:a.links.listPics.$.address
			}
			var e = this.templator.renderAsElement(o);
			this.holder.appendChild(e);
			e.o = o;
			
			this.addEvent(e);
		}
	}
}

$util.cpAttr(x.prototype, p);