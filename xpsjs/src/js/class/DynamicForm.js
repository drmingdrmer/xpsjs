var t = window.DynamicForm = function(){	
	this.callback = null;
	this.setDebug(true);
}

net.xp.util.Debuggable.mixTo(t);
net.xp.error.ErrorHandle.mixTo(t);
net.xp.net.DyForm.mixTo(t);

//net.xp.util.InstanceStatusManager.mixTo(t);

var p = {
	init : function(blankPage){
		this.initElement(blankPage);		
	},
	
	post : function (action, enctype, params, files, callback){
		if (!this.isInitFinished()){			
			thiz = this;
			window.setTimeout(function(){thiz.post(action, enctype, params, files, callback);},50);
		
			return;
		}
		this.callback = callback;
		this.createForm(action, enctype, params, files);
		//this.postForm();
	},
	
	postExistForm : function (form, callback){
		this.alertS("DynamicForm : postExistForm start");
		if (!this.isInitFinished()){			
			thiz = this;
			window.setTimeout(function(){thiz.postExistForm(form, callback);},50);
			this.alertT("delay DynamicForm : postExistForm");
			return;
		}
		this.callback = callback;
		this.postForm(form);
	},
	
	cancel : function (){
		this.alertS("DynamicForm : cancel start");
		if (!this.isInitFinished()){
			thiz = this;
			window.setTimeout(function(){thiz.cancel();},50);
			this.alertT("delay cancel")
			return;
		}
		return this.cancelPost();
	},
	
	
	//override
	onFormLoad : function (doc){
		this.callback(doc.body.innerHTML);
		this.clearReceiveIframe();
	},
	
	onFinishForm : function (){
		
	}
	
	
}


$util.cpAttr(t.prototype,p,true);