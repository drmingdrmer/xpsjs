new Module("net.xp.util.dom.$",
[
	"net.xp.dom.WindowRelative"
],function ($this, $name){ return {
	$initialize : function (){
		Module.getHostWin().$ = function (win){
			var m = $this.newInst();
			m.setWorkingWin(win);
			return m;
		}
	},



	$ : function (id, doc){
		return this.$Doc(doc).getElementById(id);
	},

	$n : function (name, doc){
		return this.$Doc(doc).getElementsByTagName(name);
	},

	/**
	 * create Element
	 * @param {Object} name
	 * @param {Object} doc
	 * @param {Object} io
	 */
	$ce : function (name, doc, io){
		name = name || "div";
		doc = this.$Doc(doc);
		io = io || {};
		var e = doc.createElement(name);

		for (var i in io)
			if (io.constructor.prototype[i] == null)
				e[i] = io[i];
		return e;
	}
}});