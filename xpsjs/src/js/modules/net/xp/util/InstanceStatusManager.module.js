/**
* manage all instance's status of a class.
*/
var x = new Module(
	"net.xp.util.InstanceStatusManager",
   {
		  statusInc : function (status){
			  var pr = "__$module.net.xp.util.InstanceStatusManager.prefix.";
			  var s = this.constructor.prototype[pr + status];
			  if (s == null) s = this.constructor.prototype[pr + status] = [];
			  s[s.length] = this;
		  },
		  
		  statusDec : function (status){
			  var pr = "__$module.net.xp.util.InstanceStatusManager.prefix.";
			  var s = this.constructor.prototype[pr + status];
			if (s == null) throw new Error ("no instance in this status");
			for (var i=0; i<s.length; i++) {
				if (s[i] == this) {
					for (var j=i; j<s.length-1; j++) s[j] = s[j+1];
					return;
				}
			}			
		  },
		  
		  getStatusAmount : function (status){
			  var pr = "__$module.net.xp.util.InstanceStatusManager.prefix.";
			  return (this.constructor.prototype[pr + status] || []).length;
		  }
		  
	});