new Module("net.xp.util.dom.$",
[
	"net.xp.dom.DocRelative"
],{
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

		for (var i in io){
			if (io.constructor.prototype[i]) continue;
			e[i] = io[i];
		}

		return e;
	}
});