new Module("net.xp.util.dom.CSS",
[
    "net.xp.core.*",
	"net.xp.util.dom.$",
	"net.xp.dom.WindowRelative"
],function ($this, $name) {
return {

	getRules : function (id){
		var doc = this.$Doc();
		var styleSheet = doc.styleSheets[id] || this.$(id,doc).sheet;
		return styleSheet.rules || styleSheet.cssRules;
	},

	getRuleText : function (rule) {
		return rule.cssText //gecho
				|| (rule.selectorText + "{" + rule.style.cssText + "}");//ie
	},

	getAllRulesText : function (id) {
		var rules = this.getRules(id);
		var str = "";
		for (var i=0; i<rules.length; i++){
			str += this.getRuleText(rules[i])+"\n";
		}
		return str;
	}
	
}});