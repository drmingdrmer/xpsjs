var x = new Module(
	"net.xp.error.ErrorHandle",
   {	
   		addErrorHandler : function (l){
			this.addEventListener("onerror",l);
		},
		
		
		dispatchError : function (e,data){
			var evn = {
				type		: "onerror", 
				error		: e, 
				data		: data == null ? "" : data,
				callStack	: Module.callStack.concat(),
				toString 	: function (){
								return "Error : "+this.error.message+"\n"
										+"CallStack : "+this.callStack;
							}
			}
			return this.dispatchEvent(evn);
		},
		
		__$handleError : function (e,data){
			var rs = this.dispatchError(e,data) || [];
			if (rs.length > 0) this.dealErrorHandleResult(rs);
		},
		
		handleError : function (e,data){
			this.__$handleError(e,data);
		},
		
		//override me
		dealErrorHandleResult : function (rs){
		}
		
	},[
	   "net.xp.event.EventDispatcher"
	   ],false);