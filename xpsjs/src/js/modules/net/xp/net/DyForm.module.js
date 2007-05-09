var x = new Module(
	"net.xp.net.DyForm",
	{
		/** ---------------------- error definition ---------------------**\		
		*/
		
		getError_onWorking : function (){
			this._$m.e_onWorking = this._$m.e_onWorking || new Error("this form is still on working");
			return this[t];
		},
		
		getError_notOnWorking : function (){
			this._$m.e_notOnWorking = this._$m.e_notOnWorking || new Error("this form is not on working");
			return this[t];
		},
		
		/*
		\** ---------------------- error definition ---------------------**/
		
		
		
		
		_getHiddenDiv : function (){
			var doc = this.getWorkingDoc();
			var d = doc.getElementById("_$hide");
			if (!d) { 
				d = doc.createElement("div");
				d.style.display = "none"; 
				d.id = "_$hide";
				doc.body.appendChild(d);
			}
			return d;
		},
		
		/**
		* wait until the blank page loaded finished.
		*/
		initElement : function (bl){
			this.alertS("");
			this.setBlankPage(bl);
			var pf = this.getPostFrame();
			var rf = this.getReceiveFrame();
		},
		
		_finishInit : function (f){
			this.alertS("");
			if (f==this.getPostFrame()) {
				this._$m.initPostIframe=true;
			}
			if (f==this.getReceiveFrame()) {
				this.alertT("RECEIVE iframe finished init"+f.__id);
				this._$m.initReceiveIframe=true;
				
				
				var thiz = this;
				this.setIframeOnload(this.getReceiveFrame(),function (){thiz._onFormLoad();});
			}
			
			var t = this._$m.initedMark = (this._$m.initPostIframe && 	this._$m.initReceiveIframe);
			if (t) {
			
			}
		},
		
		isInitFinished : function (){
			return this._$m.initedMark == true;
		},
		
		
		
		//blank page is used to initialize post iframe to avoid domain error.
		setBlankPage : function (bl) {
			this._$m.blankUrl=bl;
		},
		
		getPostFrame : function (){
			var doc = this.getWorkingDoc();
			var f = doc.getElementById("_$post");
			if (!f) {
				this._$m.initPostIframe=false;
				this._$m.initedMark = false;
				
				f = doc.createElement("iframe"); 
				f.id = f.name = "_$post";				
				this._getHiddenDiv().appendChild(f);
				f.src=this._$m.blankUrl;
				
				var thiz=this;
				this.setIframeOnload(f,function (){
												 thiz.removeIframeOnload(f,arguments.callee);
												 thiz._finishInit(f);
												 });
			}
			return f;
		},
		
		getReceiveFrame : function (){
			this.alertS("func start");
			var doc = this.getWorkingDoc();
			var f = doc.getElementById("_$receive");
			if (!f) {
				this.alertT("create new RECEIVE iframe");
				this._$m.initReceiveIframe=false;
				this._$m.initedMark = false;
				
				var html = '<iframe id="_$receive" name="_$receive" style="width:400px;"></iframe>';
				var f = $util.nodeFromHtml(html);
				this._getHiddenDiv().appendChild(f);
				f.src=this._$m.blankUrl;
				
				var thiz = this;
				f.__onload = function (){
								thiz.removeIframeOnload(f,f.__onload);
								thiz._finishInit(f);
							 }
				this.setIframeOnload(f,f.__onload);
				this.alertT("created new iframe : "+f.__id);
			}
			return f;
		},
		
		
		
		isWorking : function (){
			return this._$m.working == true;
		},
		
		setWorking : function (f){
			this._$m.working = f == true;
		},
		
		
		
		createForm : function (action, enctype, params, files){			
			if (this.isWorking()) throw this.getError_onWorking();			
			
			this.getReceiveFrame();//create receive iframe.
			
			var pf = this.getPostFrame(),	pd = pf.contentWindow.document;
			var rf = this.getReceiveFrame(),	rd = rf.contentWindow.document;
					
			pd.body.innerHTML = "";
			rd.body.innerHTML = "";
			
			
			var enctypes = ["application/x-www-form-urlencoded","multipart/form-data","text/plain"];
			var em = {app:0, data:1, text:2};
			var enctype = isNaN(parseInt(enctype)) ? (em[enctype] != null ? enctypes[em[enctype]] : enctype) : em[enctype];
			var hasFile = (files !=null && files.length>0);
			if (hasFile) enctype = enctypes[1];
			
			var form = $util.nodeFromHtml('<form action="'+action+'" enctype="'+enctype+'" method="POST" target="_$receive"><input type="submit" /></form>', pd);
			pd.body.appendChild(form);
			 
			
			for (var i in params){
				var ipt = $util.nodeFromHtml('<input type="text" name="'+i+'" value="'+params[i]+'" />',pd);
				form.appendChild(ipt);
			}
			
			
			for (var i in files){
				var ipt = $util.nodeFromHtml('<input type="file" name="'+i+'" value="'+files[i]+'" />',pd);
				form.appendChild(ipt);
			}
			
			this._$m.form = form;
		},
		
		postForm : function (form){
			if (this.isWorking()) {
				this.alertW("still in working,throw~~```");
				throw this.getError_onWorking();
			}
			
			this.alertS("to post form");
			
			form = form || this._$m.form;
			form.target = "_$receive";
		
			
			this.setWorking(true);
			var thiz = this;
			this._$m.handle = setTimeout(function (){
									 try{
										form.submit();
										thiz.alertS("start to submit");
										
									 } catch (e){
										thiz.handleError(e, "failSubmit");
									 }
								 },50);
		},
		
		cancelPost : function (){
			this.alertS("func start");
			if (!this.isWorking()) {
				this.alertS("no working, quit this function");
				return false;
			}
			
			window.clearTimeout(this._$m.handle);
			
			this.alertS("to replace RECEIVE IFRAME with new one");
			this.clearReceiveIframe();
			
			this.finishForm();
			
			return true;
		},
		
		clearReceiveIframe : function (){
			var pf = this.getReceiveFrame();
			this.removeIframeOnload(pf,pf.__onload);
			this._getHiddenDiv().removeChild(pf);			
			this.getReceiveFrame();
		},
		
		finishForm : function (){
			this.alertS("");
			this.setWorking(false);
			this.onFinishForm();
		},
		
		onFinishForm : function (){
			
		},
		
		/**
		*
		*/
		_onFormLoad : function (){
			this.alertS("");
			this.finishForm();
			var rf = this.getReceiveFrame();
			var tarDoc = rf.contentWindow.document;
			this.alertS("to call onFormLoad");
			this.onFormLoad(tarDoc);
		},
		
		onFormLoad : function (doc){
			
		}
	},
	[
	"net.xp.prototype.str.URL",
	"net.xp.dom.DocRelative",
	"net.xp.dom.event.IframeOnload",
	"net.xp.event.EventDispatcher",
	"net.xp.error.ErrorHandle",
	"net.xp.util.Debuggable"
	]);