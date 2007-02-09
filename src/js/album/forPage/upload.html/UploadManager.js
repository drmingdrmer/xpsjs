var u = window.UploadManager = function (dForm, fileManager, albumManager, listener, uploadUrl, params){
	this.dForm = dForm;
	this.fileManager = fileManager;
	this.albumManager = albumManager;
	this.listener = listener;
	
	this.uploadUrl = uploadUrl;
	this.albumId = "";
	
	this.uploadIndex = -1;
	this.curFile = null;
	this.uploaded = 0;
	this.total = 0;
	
	this.timeoutHandle = null;
	
	this.addEventListener("startUpload",listener);
	this.addEventListener("noValidFile",listener);
	this.addEventListener("finishAll",listener);
	this.addEventListener("finishOneSuccess",listener);
	this.addEventListener("finishOneFail",listener);
	this.addEventListener("canceled",listener);
	
	this.dForm.addErrorHandler(this);
	
	
	this.setDebug(true);
}
net.xp.util.Debuggable.mixTo(u);
net.xp.str.Properties.mixTo(u);
net.xp.event.EventDispatcher.mixTo(u);

var p ={
	uploadAll : function (albumId){
		this.uploaded = 0;
		this.total = this.fileManager.getValidFileAmount();
		this.uploadIndex = -1;
		this.albumId = albumId;
		
		if (this.total == 0) this.finishAll();
		
		this.onStartUpload();
		this.timeoutHandle = 1;
		this.uploadNext();
	},
	
	uploadNext : function (){
		if (this.timeoutHandle == null){
			return;
		}
		this.timeoutHandle = null;
		var o = this.fileManager.getNextValidFile(this.uploadIndex);
		if (o != null){
			this.curFile = o;
			this.uploadIndex = o.index;//move pointer for next upload.
			
			var urlParam = {album_id:this.albumManager.getSelectedAlbumId()};
			o.form.action = $util.urlParam(this.uploadUrl,urlParam);
			$util.$$("..title",o.form).value = o.name;
			
			var thiz = this;
			var cb = function (txt){thiz.finishUploadOneFile(txt);};
			this.dForm.postExistForm(o.form, cb);
		} else {
			this.dispatchEvent({type:"noValidFile",invalid:this.uploadIndex})
		}
			
		
	},
	
	onStartUpload : function (){
		this.dispatchEvent(this._i("startUpload"));
	},
	
	finishUploadOneFile : function (resultText){
		
		this.useSpaceDelimit(true);
		this.parseProperties(resultText);
		var o = this.getPropertyObj();
		
		this.uploaded++;
		if (o.operation.success == "1") {			
			this.dispatchEvent(this._i("finishOneSuccess",o));
		}else {
			this.dispatchEvent(this._i("finishOneFail",o));
		}
		
		if (this.uploaded >= this.total) 
			this.finishAll();
		else {		
			var thiz=this;
			this.timeoutHandle = window.setTimeout(function (){thiz.uploadNext();},50);
			this.alertE(this.timeoutHandle);
		}
	},
	
	finishAll : function (){
		this.dispatchEvent(this._i("finishAll"));
	},
	
	
	cancel : function (){
		
		var r = this.dForm.cancel();
		this.alertT(this.timeoutHandle);
		if (this.timeoutHandle != null){
			this.alertD("cleared timeout handle");
			window.clearTimeout(this.timeoutHandle);
			this.timeoutHandle = null;
		}
		this.dispatchEvent(this._i("canceled"));
	},
	
	//listen to dynamic form error events.
	onerror : function (evt){
		if (evt.data == "failSubmit") {
			this.cancel();
			app.dialog.alert("系统提示信息",
							 "发送表单失败，可能含有非法的文件路径",
							 "app.hideBlocker();");
			
		} else {
			alert("unknow error");
		}
	
	},
	
	_i : function (t,result){		
		return {
			type			: t,
			uploaded		: this.uploaded,
			total			: this.total,
			currentResponse : result,
			currentFile		: this.curFile
		};
	}
	
}

$util.cpAttr(u.prototype, p, true);