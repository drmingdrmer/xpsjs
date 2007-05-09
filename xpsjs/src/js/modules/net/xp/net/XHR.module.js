var x = new Module("net.xp.net.XHR",
[
	"net.xp.core.*",
	"net.xp.prototype.str.URL",
	"net.xp.util.Debuggable"
],function ($this, $name) {return {

	/**
	 * inited
	 * working
	 * finished
	 */
	getWorkingStatus : function () {
		return this._().status || "markInited";
	},


	getXHR : function () {
		var xhr;
		if (!xhr) try {
			xhr = new XMLHttpRequest();
		} catch(e) {
		}
		if (!xhr) try {
			xhr = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
		}
		if (!xhr) try {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (e) {
		}

		return xhr;
	},

	load : function (url, option) {
		if (this._().status == "working") throw new Error("inWorking");
		url = this.getFullUrl(url);
		this.setUrl(url);


		option = option || {};
		var defaultOption = {
			method		 : "GET",
			asyn		: true,
			data		: null,
			timeStamp	: false
		};
		$util.cpAttr(option, defaultOption, false);


		this.onStart(url);
		var xhr = this.getXHR();

		var thiz = this;
		xhr.onreadystatechange = function() {
			var rState = xhr.readyState;
			if (rState == 4) {
				setTimeout(function() {
					thiz._finishXHR(xhr);
				}, 10);
			}
		}
		xhr.open(option.method, url, true);
		if (option.header != null) {
			for (var i in option.header) {

				xhr.setRequestHeader(i, option.header[i]);
			}
		}
		xhr.send(option.data);

		this._().status = "working";
	},

	_finishXHR : function (xhr) {
		this._().status = "finished";
		var status = xhr.status;
		this.finish(xhr);
		if (status == 0 || status >= 200 && status < 300) {
			this.success(xhr);
		} else {
			this.fail(xhr);
		}
	},

	/**------------events----------------**\\\\\\
	 **/

	onStart: function (url) {
		//throw new Error("unimplement : "+this.getCurCall());
	},

	finish : function (xhr) {
		//throw new Error("unimplement : "+this.getCurCall());
	},

	success : function (xhr) {
		//throw new Error("unimplement : "+this.getCurCall());
	},

	fail : function (xhr) {
		//throw new Error("unimplement : "+this.getCurCall());
	}

	/**------------events----------------**//////

}});