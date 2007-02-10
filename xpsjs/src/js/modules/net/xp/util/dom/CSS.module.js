new Module("net.xp.util.dom.CSS",
[
    "net.xp.core.Core",
	"net.xp.util.dom.$",
	"net.xp.dom.WindowRelative"
],function ($this, $name) {
return {
	getRules : function (id){
		var doc = this.$Doc();
		var styleSheet = doc.styleSheets[id] || this.$(id,doc).sheet;
		return styleSheet.rules || styleSheet.cssRules;
	},
}});