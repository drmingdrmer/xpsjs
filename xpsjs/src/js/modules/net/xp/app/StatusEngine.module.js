new Module(
	"net.xp.app.StatusEngine",
	[	"net.xp.core.Enumerable",
		"net.xp.event.EventDispatcher"
	],
	{
		
		$initialize : function (){
			this._$m.errors = {
				noStatus		: new Error ("no status with the name"),
				noCurrent		: new Error ("current status is null")
			}
		},
		
		getStatusHolder : function (){
			this._$m.holder = this._$m.holder || {};
			return this._$m.holder;
		},
		
		getStatus : function (name){
			var st = this.getStatusHolder()[name];
			if (st == null) throw new Error("no Status with name : "+name);
			return st;
		},
		
		setStatus : function (name){
			var h = this.getStatusHolder();
			h[name] = h[name] || {name:name, desc:{}};
			return h[name];
		},
		
		appendDescStatus : function (name,desc){
			var st = this.getStatus(name);
			if (st == null) throw this._$m.noStatus;
			
			for (var i=0; i<desc.length; i++)
				st.desc[desc[i]] = this.setStatus(desc[i]);			
			return st;
		},
		
		createStatus : function (name,desc){
			var st = this.getStatus(name) || this.setStatus(name);			
			st = this.appendDescStatus(name,desc);			
			return st;
		},
		
		isDescAllow : function (name,descName){
			var st = this.getStatus(name);
			if (st == null) throw new Error("source status doesnt exist : "+name);
			if (this.getStatus(descName) == null) throw new Error ("destination status doesnt exist : "+descName);
			return st.desc[descName] != null;
		},
		
		setCurrentStatus : function (name){
			var st = this.getStatus(name);
			if (!st) throw this._$m.errors.noStatus;
			if (this.getCurrentStatus()!=null) throw new Error ("current status hs already been set");
			
			this._$m.currentStatus = st;
			return st;
		},
		
		getCurrentStatus : function (){
			return this._$m.currentStatus;
		},
		
		/**
		 * 
		 * @param {String} name
		 * @return (boolean) 
		 */
		switchStatus : function (name){
			var cur = this.getCurrentStatus();
			if (!cur) throw this._$m.errors.noCurrent;
			
			if (isDescAllow(cur.name,name)){
				var st = this.setCurrentStatus(name);
				this.dispatchEvent({
					type		: "switchStatus",
					oldStatus	: cur,
					newStatus	: st
				});
			} else {
				return false;
			}
		}
	});