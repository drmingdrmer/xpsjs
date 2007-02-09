/******* App Js For Sohu Personal Portal Page **********/
//	Author: Todd Lee (www.todd-lee.com)
//	First Created: 2005-12-26
//	Last Update: 2006-12-29
//	Copyright: Sohu.com (www.sohu.com)
/*******************************************************/
var App = {
	version:'0.2',
	status:(isMyBlog() ? ((getUserType() == 3) ? 3 : 2) : 1),
	theme:(typeof _theme != 'undefined' ? _theme : 'default'),

	lang:(typeof lang != 'undefined' ? lang : 'zh'),
	Actions:Object.extend({imgPath:'http://img3.pp.sohu.com/ppp/blog/styles_ppp/images/',
		icoShortPath:'icons/',
		themePath:'http://img3.pp.sohu.com/ppp/blog/themes_ppp/',
		jsPath:'http://img3.pp.sohu.com/ppp/blog/js_ppp/',
		widgetLibPath:'http://img3.pp.sohu.com/ppp/blog/widgets/',
		userStyle:'/userStyle.jsp',
		userData:'/action/',
		newMod:'/manage/module.do',
		delMod:'/manage/module.do',
		editMod:'/manage/module.do',
		newPage:'/manage/page.do',
		delPage:'/manage/page.do',
		editPage:'/manage/page.do',
		editUserStyle:'/manage/module.do',
		theme:'/manage/theme.do',
		themeGW:'/manage/theme.do',
		linkMng:'/manage/link.do',
		greenWay:'http://act.blog.sohu.com/service/list_code.jsp',
		proxyURL:'/hp'}, (typeof Actions != 'undefined' ? Actions : {})),
	noCache:(typeof noCache != 'undefined' ? noCache : false),
	cacheTime:(typeof defaultCacheTime != 'undefined' ? defaultCacheTime : 30),
	maxWidgetLoadTime:(typeof maxWidgetLoadTime != 'undefined' ? maxWidgetLoadTime : 10000),
	colStyleLib:Object.extend({'25:25:25:25':'colStyle_25_25_25_25.gif',
		'25:50:25':'colStyle_25_50_25.gif',
		'25:25:50':'colStyle_25_25_50.gif',
		'50:25:25':'colStyle_50_25_25.gif',
		'50:50':'colStyle_50_50.gif',
		'25:75':'colStyle_25_75.gif',
		'75:25':'colStyle_75_25.gif'}, (typeof colStyleLib != 'undefined' ? colStyleLib : {})),
	icoLib:Object.extend([
			'none.gif',
			'anchor.gif',
			'attach.gif',
			'basket.gif',
			'bomb.gif',
			'book.gif',
			'book_addresses.gif',
			'book_open.gif',
			'brick.gif',
			'briefcase.gif',
			'bug.gif',
			'cake.gif',
			'calendar_view_day.gif',
			'calendar_view_month.gif',
			'camera.gif',
			'car.gif',
			'cd.gif',
			'chart_bar.gif',
			'chart_curve.gif',
			'chart_organisation.gif',
			'chart_pie.gif',
			'clock.gif',
			'clock_red.gif',
			'cog.gif',
			'coins.gif',
			'color_swatch.gif',
			'comment.gif',
			'computer.gif',
			'connect.gif',
			'creditcards.gif',
			'door.gif',
			'door_open.gif',
			'drink.gif',
			'drink_empty.gif',
			'email.gif',
			'email_open.gif',
			'email_open_image.gif',
			'emoticon_evilgrin.gif',
			'emoticon_grin.gif',
			'emoticon_happy.gif',
			'emoticon_smile.gif',
			'emoticon_surprised.gif',
			'emoticon_tongue.gif',
			'emoticon_unhappy.gif',
			'emoticon_waii.gif',
			'emoticon_wink.gif',
			'exclamation.gif',
			'eye.gif',
			'feed.gif',
			'flag_blue.gif',
			'flag_green.gif',
			'flag_orange.gif',
			'flag_pink.gif',
			'flag_purple.gif',
			'flag_red.gif',
			'flag_yellow.gif',
			'folder.gif',
			'heart.gif',
			'house.gif',
			'image.gif',
			'information.gif',
			'ipod.gif',
			'keyboard.gif',
			'layout.gif',
			'lightbulb.gif',
			'lightbulb_off.gif',
			'lock.gif',
			'lock_open.gif',
			'lorry.gif',
			'lorry_flatbed.gif',
			'magnifier.gif',
			'money.gif',
			'money_dollar.gif',
			'money_euro.gif',
			'money_pound.gif',
			'money_yen.gif',
			'monitor.gif',
			'mouse.gif',
			'music.gif',
			'new.gif',
			'note.gif',
			'page.gif',
			'page_copy.gif',
			'page_white.gif',
			'page_white_acrobat.gif',
			'page_white_code.gif',
			'page_white_compressed.gif',
			'page_white_excel.gif',
			'page_white_flash.gif',
			'page_white_php.gif',
			'page_white_picture.gif',
			'page_white_powerpoint.gif',
			'page_white_text.gif',
			'page_white_word.gif',
			'page_white_world.gif',
			'palette.gif',
			'paste_plain.gif',
			'pencil.gif',
			'phone.gif',
			'photo.gif',
			'picture.gif',
			'printer.gif',
			'printer_empty.gif',
			'rainbow.gif',
			'rosette.gif',
			'server.gif',
			'shield.gif',
			'sport_8ball.gif',
			'sport_basketball.gif',
			'sport_football.gif',
			'sport_golf.gif',
			'sport_raquet.gif',
			'sport_shuttlecock.gif',
			'sport_soccer.gif',
			'sport_tennis.gif',
			'star.gif',
			'stop.gif',
			'tag_blue.gif',
			'tag_green.gif',
			'tag_orange.gif',
			'tag_pink.gif',
			'tag_purple.gif',
			'tag_red.gif',
			'tag_yellow.gif',
			'telephone.gif',
			'television.gif',
			'thumb_down.gif',
			'thumb_up.gif',
			'trash.gif',
			'tux.gif',
			'user.gif',
			'user_female.gif',
			'user_gray.gif',
			'user_green.gif',
			'user_orange.gif',
			'user_red.gif',
			'user_suit.gif',
			'vcard.gif',
			'weather_clouds.gif',
			'weather_cloudy.gif',
			'weather_lightning.gif',
			'weather_rain.gif',
			'weather_snow.gif',
			'weather_sun.gif',
			'world.gif',
			'zoom.gif'
			], (typeof icoLib != 'undefined' ? icoLib : [])),

	highlightStyle:Object.extend({
		backgroundColor:'white',
		border:'1px solid #ccc',
		padding:'0'
	}, (typeof highlightStyle != 'undefined' ? highlightStyle : {})),

	unHighlightStyle:Object.extend({backgroundColor:'transparent',
		border:'none',
		padding:'1px'}, (typeof unHighlightStyle != 'undefined' ? unHighlightStyle : {})),
	colId_prefix:(typeof colId_prefix != 'undefined' ? colId_prefix : 'col_'),
	pageHash_prefix:(typeof pageHash_prefix != 'undefined' ? pageHash_prefix : 'tp_'),
	defaultColStyle:'33:33:33',
	createOnlyFirstPageMod:(typeof createOnlyFirstPageMod != 'undefined' ? createOnlyFirstPageMod : true),
	maxPageTabCount:(typeof maxPageTabCount != 'undefined' ? maxPageTabCount : 5),
	maxPerPageModCount:(typeof maxPerPageModCount != 'undefined' ? maxPerPageModCount : 15),
	cancelBubble:function(event) {
		Event.stop(event);
	}};
App.Permit = {
	resize:App.status == 2,
	editModule:App.status == 2,
	sortable:App.status == 2,
	editTheme:App.status == 2,
	editHead:App.status == 2,
	editPageTab:App.status == 2,
	ableViewPvtPageTab:(App.status == 2 || App.status == 3),
	ableToy:getUrlParam('t' + 'o' + 'y') == 'true',
	able3rdDev:getUrlParam('3' + 'r' + 'dD' + 'e' + 'v') == 'true',
	ableDemo:getUrlParam('p' + 'p' + 'pDe' + 'vel' + 'ope' + 'r') == 'true',
	ableLog:getUrlParam('l' + 'o' + 'g') == 'true'
};
App.Lib = {
	lib:Object.extend({
		Lang:App.Actions.jsPath + 'lang_' + App.lang + '.js',
		ScriptaculousEffects:App.Actions.jsPath + 'effects.js',
		ScriptaculousDragdrop:App.Actions.jsPath + 'dragdrop.js'
	}, (typeof lib != 'undefined' ? lib : {})),

	load:function() {
		$H(this.lib).each(function(f) {
			document.write('<scr' + 'ipt type="text/javascript" src="' + f.value + '"></scr' + 'ipt>');
		});
	}
};
App.Lib.load();
App.WidgetLib = {
	gallery:Object.extend([{
			key:'other',
			title:''
		}], (typeof widgetGallery != 'undefined' ? widgetGallery : [])),

	lib:Object.extend([], (typeof widgetLib != 'undefined' ? widgetLib : [])),

	getWidget:function(type) {
		return this.lib.find(function(w) {
			return(w && w.type && w.type == type);
		});
	},
	analyseAll:function() {
		var _lib = [];
		$A(this.lib).each(function(w) {
			var _w = this.getAnalysedWidget(w);
			if (_w) {
				_lib.push(_w);
			}
		}.bind(this));
		this.lib = _lib;
	},
	getAnalysedWidget:function(widget) {
		var result = Object.extend({title:'No Title',
			desc:'no description.',
			ico:App.Actions.imgPath + 'ico_widget.gif',
			author:'Todd Lee',
			site:'http://www.todd-lee.com',
			pubDate:'Sun, 16 May 1982 11:30:00 GMT',
			type:'',
			path:'',
			js:[],
			css:[],
			only:false,
			sys:false,
			ableDel:true,
			toy:false,
			dev:false,
			demo:false,
			private:false,
			gal:'other'}, (widget || {}));
		if (!result.type) {
			alert('Error: widget type is undefined.');
			return null;
		}
		if (!result.path) {
			alert('Error: path of widget [' + result.type + '] is undefined.');
			return null;
		}
		var baseWidgetPath = result.path;
		if (result.ico) {
			var ico = result.ico.trim();
			if (ico && ico.indexOf('http://') !== 0 && ico.indexOf('/') !== 0) {
				ico = baseWidgetPath + (ico || '');
			}
			result.ico = ico;
		}
		$A(result.js).each(function(f, i) {
			if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
				result.js[i] = baseWidgetPath + f;
			}
		});
		$A(result.css).each(function(f, i) {
			if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
				result.css[i] = baseWidgetPath + f;
			}
		});
		return(result);
	}};
App.WidgetLib.analyseAll();
App.PageLib = {lib:Object.extend([], (typeof pageLib != 'undefined' ? pageLib : [])),
	getPage:function(type) {
		return this.lib.find(function(p) {
			return(p && p.type && p.type == type);
		});
	},
	analyseAll:function() {
		var _lib = [];
		$A(this.lib).each(function(p) {
			var _p = this.getAnalysedPage(p);
			if (_p) {
				_lib.push(_p);
			}
		}.bind(this));
		this.lib = _lib;
	},getAnalysedPage:function(page) {
	var result = Object.extend({title:'',desc:'',ico:0,author:'Todd Lee',site:'http://www.todd-lee.com',pubDate:'Sun, 16 May 1982 11:30:00 GMT',type:'',hash:'',colStyle:App.defaultColStyle,widgets:[],permit:0,only:false,ableDel:true,ableSetOpt:true,ableSetTit:true,ableSetCol:true,ableSetIco:true,ableSetPer:true,toy:false,dev:false,demo:false}, (page || {}));
	if (!result.type) {
		alert('Error: page type is undefined.');
		return null;
	}
	if (!result.hash) {
		alert('Error: page hash is undefined.');
		return null;
	}
	return(result);
}};
App.PageLib.analyseAll();
App.ThemeLib = {group:Object.extend([{key:'sys',title:''}], (typeof themeGroup != 'undefined' ? themeGroup : [])),lib:Object.extend([], (typeof themeLib != 'undefined' ? themeLib : [])),getTheme:function(id) {
	return this.lib.find(function(t) {
		return(t && t.id && t.id == id);
	});
},analyseAll:function() {
	var _lib = [];
	$A(this.lib).each(function(t) {
		var _t = this.getAnalysedTheme(t);
		if (_t) {
			_lib.push(_t);
		}
	}.bind(this));
	this.lib = _lib;
},getAnalysedTheme:function(theme) {
	var result = Object.extend({id:'',grp:'sys',smp:'sample.jpg',path:'',code:'',name:''}, (theme || {}));
	if (!result.id) {
		alert('Error: theme id is undefined.');
		return null;
	}
	return(result);
},add:function(theme) {
	if (this.getTheme(theme.id)) {
		return;
	}
	this.lib.push(this.getAnalysedTheme(theme));
}};
App.ThemeLib.analyseAll();
App.ImpBase = function() {
};
App.ImpBase.prototype = {setOptions:function(options) {
	this.options = Object.extend({parameters:'',onFailure:this.reportError.bind(this),method:'get'}, options || {});
	if (App.noCache) {
		this.options.parameters = this.options.parameters ? this.options.parameters + '&c=' + timeStamp() : 'c=' + timeStamp();
	}
},reportError:function(request) {
	var str = App.Lang.error + ': ' + request.status + ' ' + (typeof request.statusText != 'undefined' ? request.statusText : '') + '\n\n';
	if (request.status == '404') {
		str += App.Lang.fileNotFound;
		str += ' ( ' + this.url + ' )\n';
	} else if (request.status == '500') {
		str += App.Lang.serverError;
		str += ' ( ' + this.url + ' )\n';
	} else if (request.status == '403') {
		str += App.Lang.noPermit;
		str += ' ( ' + this.url + ' )\n';
	} else if (request.status == '12007') {
		str += App.Lang.notConneted;
	} else if (request.status == '12029') {
		str += App.Lang.cannotGetConnetion;
		str += ' ( ' + this.url + ' )\n';
	} else {
		str += App.Lang.unknownError;
		str += ' ( ' + this.url + ' )\n';
	}
	if (request.status == '500') {
		str += App.Lang.contactAdmin + '\n';
	}
	LoadBar.hide();
	alert(str);
	return false;
},showError:function(text) {
	var opt4popWin = {type:'alert',title:App.Lang.info,content:text,width:'600'};
	var aa = new PopWin(opt4popWin);
}};
App.ImpFile = Class.create();
App.ImpFile.prototype = Object.extend(new App.ImpBase(), {initialize:function(_url, options) {
	_url = _url.trim();
	var url;
	this.setOptions(options);
	if (isLocalFile(_url)) {
		url = _url;
	} else {
		url = App.Actions.proxyURL;
		this.options.parameters += (this.options.parameters.length > 0 ? '&' : '') + 'url=' + encodeURIComponent(_url);
	}
	if (this.options.nocache) {
		this.options.parameters += (this.options.parameters.length > 0 ? '&' : '') + 'nocache=' + timeStamp();
	}
	this.url = url;
	var myAjax = new Ajax.Request(this.url, this.options);
}});
App.EditableText = Class.create();
App.EditableText.prototype = {initialize:function(obj, options) {
	this.obj = obj;
	this.options = Object.extend({able:true,type:'text',defaultValue:'',showBtn:false,overStyle:App.highlightStyle,outStyle:App.unHighlightStyle,maxSize:9999,maxLenght:9999,filter:function(str) {
		return str;
	}}, options || {});
	this.type = this.options.type;
	this.setOut();
	this.buildText();
	if (this.options.able) {
		Event.observe(this.obj, 'mouseover', this.setOver.bindAsEventListener(this));
		Event.observe(this.obj, 'mouseout', this.setOut.bindAsEventListener(this));
		this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
		Event.observe(this.obj, 'click', this.eventCancelBubble);
		Event.observe(this.obj, 'click', this.setToEditMode.bindAsEventListener(this));
	}
},buildText:function() {
	this.data = this.obj.innerHTML.convertHTMLToText().convertTextToHTML() || this.options.defaultValue;
	var str = '';
	if (this.type == 'text') {
		str += '<span>' + this.options.filter(this.data) + '</span>';
		str += '<span style="display:none"><input type="text" maxlength="' + this.options.maxLenght + '" /></span>';
		this.obj.innerHTML = str;
	} else if (this.type == 'area') {
		str += '<div>' + this.options.filter(this.data) + '</div>';
		str += '<div style="display:none">';
		str += '<textarea style="overflow:auto;" maxlength="' + this.options.maxLenght + '"></textarea>';
		str += '</div>';
		this.obj.innerHTML = str;
	}
	this.text = this.obj.firstChild;
	this.edit = this.text.nextSibling;
	this.inputElm = this.edit.firstChild;
},setOver:function() {
	if (this.editing) {
		return false;
	}
	Element.setStyle(this.obj, this.options.overStyle);
	this.obj.style.cursor = 'text';
},setOut:function() {
	if (this.editing) {
		return false;
	}
	Element.setStyle(this.obj, this.options.outStyle);
	this.obj.style.cursor = 'default';
},setToEditMode:function() {
	if (this.editing) {
		return false;
	}
	this.editing = true;
	this.setOver();
	this.initForm();
},initForm:function() {
	if (this.options.showBtn) {
		var str = '';
		str += '<span><input type="button" value="' + App.Lang.save + '" />';
		str += '<a href="javascript:void(0)">' + App.Lang.cancel + '</a></span>';
		var aa = new Insertion.After(this.obj, str);
		var opt = this.obj.nextSibling;
		var okBtn = opt.firstChild;
		var cancelBtn = opt.lastChild;
		Event.observe(okBtn, 'click', this.finish.bindAsEventListener(this));
		Event.observe(cancelBtn, 'click', this.cancel.bindAsEventListener(this));
	}
	var text = this.text;
	var edit = this.edit;
	var inputElm = this.inputElm;
	inputElm.className = this.options.editStyle;
	inputElm.style.border = 'none';
	Element.hide(text);
	Element.show(edit);
	if (this.type == 'text') {
		inputElm.value = this.data.convertHTMLToText();
		Field.activate(inputElm);
	} else if (this.type == 'area') {
		inputElm.value = this.data.convertHTMLToText();
		Field.setCursorToEnd(inputElm);
	}
	this.refreshSize();
	this.lastData = this.data;
	Event.observe(inputElm, 'keyup', this.refreshSize.bindAsEventListener(this));
	if (!this.options.showBtn) {
		Event.observe(inputElm, 'blur', this.finish.bindAsEventListener(this));
	}
	if (this.type == 'text') {
		Event.observe(inputElm, 'keydown', this.onEnterDown.bindAsEventListener(this));
	}
},finish:function() {
	if (!this.editing) {
		return false;
	}
	var _v = this.inputElm.value;
	if (this.type == 'text') {
		this.data = (_v === '') ? this.options.defaultValue || '' : _v.escapeHTML();
	} else if (this.type == 'area') {
		this.data = (_v === '') ? this.options.defaultValue || '' : _v.convertTextToHTML();
	}
	Element.hide(this.edit);
	this.text.innerHTML = this.options.filter(this.data);
	Element.show(this.text);
	Element.hide(this.edit);
	if (this.options.showBtn) {
		this.hideBtn();
	}
	this.editing = false;
	this.setOut();
	if (this.data != this.lastData && this.options.onChange) {
		(this.options.onChange)(this.data);
	}
},cancel:function() {
	if (!this.editing) {
		return false;
	}
	this.text.innerHTML = this.options.filter(this.lastData);
	Element.hide(this.edit);
	Element.show(this.text);
	this.hideBtn();
	this.editing = false;
	this.setOut();
},hideBtn:function() {
	Element.remove(this.obj.nextSibling);
},refreshSize:function() {
	if (!this.editing) {
		return false;
	}
	var text = this.text;
	var inputElm = this.inputElm;
	Element.show(text);
	if (this.type == 'text') {
		text.style.whiteSpace = 'nowrap';
		text.innerHTML = inputElm.value.escapeHTML();
		inputElm.style.width = Math.min((parseInt(text.offsetWidth) + 20), this.options.maxSize) + "px";
		inputElm.style.height = parseInt(text.offsetHeight) + 'px';
	} else if (this.type == 'area') {
		text.innerHTML = inputElm.value.convertTextToHTML();
		inputElm.style.width = parseInt(text.offsetWidth) - 4 + 'px';
		inputElm.style.height = Math.min((parseInt(text.offsetHeight) + 20), this.options.maxSize) + "px";
	}
	Element.hide(text);
},onEnterDown:function() {
	if (!this.editing) {
		return false;
	}
	if (window.event.keyCode == Event.KEY_RETURN) {
		this.finish();
	}
}};
App.Resizables = {resizes:[],activeResizable:null,register:function(resizable) {
	if (this.resizes.length === 0) {
		this.eventMouseUp = this.end.bindAsEventListener(this);
		this.eventMouseMove = this.resize.bindAsEventListener(this);
		this.eventKeypress = this.keyPress.bindAsEventListener(this);
		Event.observe(document, "mouseup", this.eventMouseUp);
		Event.observe(document, "mousemove", this.eventMouseMove);
		Event.observe(document, "keypress", this.eventKeypress);
	}
	this.resizes.push(resizable);
},unregister:function(resizable) {
	this.resizes = this.resizes.reject(function(r) {
		return r == resizable;
	});
	if (this.resizes.length === 0) {
		Event.stopObserving(document, "mouseup", this.eventMouseUp);
		Event.stopObserving(document, "mousemove", this.eventMouseMove);
		Event.stopObserving(document, "keypress", this.eventKeypress);
	}
},activate:function(resizable) {
	window.focus();
	this.activeResizable = resizable;
},deactivate:function(resizable) {
	this.activeResizable = null;
},resize:function(event) {
	if (!this.activeResizable) {
		return;
	}
	var pointer = [Event.pointerX(event),Event.pointerY(event)];
	if (this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) {
		return;
	}
	this._lastPointer = pointer;
	this.activeResizable.resize(event);
},end:function(event) {
	if (!this.activeResizable) {
		return;
	}
	this._lastPointer = null;
	this.activeResizable.end(event);
	this.activeResizable = null;
},keyPress:function(event) {
	if (this.activeResizable) {
		this.activeResizable.keyPress(event);
	}
}};
App.Resizable = Class.create();
App.Resizable.prototype = {initialize:function(element, options) {
	this.element = $(element);
	this.options = Object.extend({able:true,borderStart:0,border:10,zindex:1000,constraint:false,snap:false,defaultWidth:null,defaultHeight:null}, options || {});
	if (this.options.addons) {
		if (this.options.addons.constructor != Array) {
			var obj = this.options.addons;
			this.options.addons = [];
			this.options.addons.push(obj);
		}
		this.options.addons = $A(this.options.addons).map(function(o) {
			if (o && (typeof o == 'string')) {
				var addon = document.getElementsByClassName(o, this.element)[0];
			}
			if (!addon) {
				addon = $(o);
			}
			return(addon);
		}.bind(this));
	}
	Element.cleanWhitespace(this.element);
	if (options.defaultWidth || options.defaultHeight) {
		this.resizeTo(options.defaultWidth, options.defaultHeight);
	}
	this.eventMouseMove = this.over.bindAsEventListener(this);
	this.eventMouseDown = this.start.bindAsEventListener(this);
	Event.observe(this.element, 'mousemove', this.eventMouseMove);
	Event.observe(this.element, 'mousedown', this.eventMouseDown);
	App.Resizables.register(this);
},destroy:function() {
	Event.stopObserving(this.element, "mousemove", this.eventMouseMove);
	Event.stopObserving(this.element, "mousedown", this.eventMouseDown);
	if (this.options.addons) {
		this.options.addons.each(function(o) {
			o.style.width = o._originalWidth || '';
			o.style.height = o._originalHeight || '';
			o._originalWidth = null;
			o._originalHeight = null;
		}.bind(this));
	}
	App.Resizables.unregister(this);
},over:function(event) {
	if (!this.options.able) {
		return false;
	}
	if (App.Resizables.activeResizable) {
		return false;
	}
	var offset = this.getOffset(event);
	var size = [this.element.offsetWidth,this.element.offsetHeight];
	var ableXY = this.options.constraint ? [this.options.constraint == 'horizontal',this.options.constraint == 'vertical'] : [true,true];
	this.resizeXY = [0,1].map(function(i) {
		var _borderStart;
		if (this.options.borderStart instanceof Array) {
			_borderStart = this.options.borderStart[i];
		} else {
			_borderStart = this.options.borderStart;
		}
		return(ableXY[i] && (offset[i] < (size[i] - _borderStart)) && (offset[i] > (size[i] - _borderStart - this.options.border)));
	}.bind(this));
	this.element.style.cursor = (this.resizeXY[0] || this.resizeXY[1]) ? ((this.resizeXY[1] ? "s" : "") + (this.resizeXY[0] ? "e" : "") + "-resize") : "default";
},start:function(event) {
	if (!this.resizeXY || (!this.resizeXY[0] && !this.resizeXY[1])) {
		return;
	}
	var offset = this.getOffset(event);
	var dis = this.getDis(this.element);
	var size = [(parseInt(Element.getStyle(this.element, 'width')) || this.element.offsetWidth - dis[0]),(parseInt(Element.getStyle(this.element, 'height')) || this.element.offsetHeight - dis[1])];
	this.sm = [0,1].map(function(i) {
		return size[i] - offset[i];
	});
	if (this.options.addons) {
		this.options.addons.each(function(o) {
			o.addonDis = this.getDis(o);
			o.addonSize = [(parseInt(Element.getStyle(o, 'width')) || o.offsetWidth - o.addonDis[0]),(parseInt(Element.getStyle(o, 'height')) || o.offsetHeight - o.addonDis[1])];
			o.sm = [0,1].map(function(i) {
				return o.addonSize[i] - offset[i];
			});
		}.bind(this));
	}
	App.Resizables.activate(this);
},resize:function(event) {
	if (!this.resizing) {
		this.resizing = true;
		this.originalZ = parseInt(Element.getStyle(this.element, 'z-index') || 0);
		this.element.style.zIndex = this.options.zindex;
	}
	this.draw(event);
	if (this.options.change) {
		this.options.change(this);
	}
	App.cancelBubble(event);
},draw:function(event) {
	var offset = this.getOffset(event);
	var s = [0,1].map(function(i) {
		return(offset[i] + this.sm[i]);
	}.bind(this));
	if (this.options.snap) {
		if (typeof this.options.snap == 'function') {
			s = this.options.snap(this.element, s[0], s[1]);
		} else {
			if (this.options.snap instanceof Array) {
				s = s.map(function(v, i) {
					return Math.round(v / this.options.snap[i]) * this.options.snap[i];
				}.bind(this));
			} else {
				s = s.map(function(v) {
					return Math.round(v / this.options.snap) * this.options.snap;
				}.bind(this));
			}
		}
	}
	var c = [0,1].map(function(i) {
		return(s[i] - this.sm[i]);
	}.bind(this));
	if (this.options.addons) {
		this.options.addons.each(function(o) {
			if (this.resizeXY[0]) {
				o.style.width = Math.max(o.sm[0] + c[0], 0) + "px";
			}
			if (this.resizeXY[1]) {
				o.style.height = Math.max(o.sm[1] + c[1], 0) + "px";
			}
		}.bind(this));
	}
	if (this.resizeXY[0]) {
		this.element.style.width = Math.max(s[0], 0) + "px";
	}
	if (this.resizeXY[1]) {
		this.element.style.height = Math.max(s[1], 0) + "px";
	}
},end:function(event) {
	if (!this.resizing) {
		return;
	}
	this.resizing = false;
	if (this.options.zindex) {
		this.element.style.zIndex = this.originalZ;
	}
	App.Resizables.deactivate(this);
	if (this.options.update) {
		this.options.update(this);
	}
	App.cancelBubble(event);
},resizeTo:function(w, h) {
	var c = [w,h];
	var dis = this.getDis(this.element);
	var size = [(parseInt(Element.getStyle(this.element, 'width')) || Element.getDimensions(this.element).width - dis[0]),(parseInt(Element.getStyle(this.element, 'height')) || Element.getDimensions(this.element).height - dis[1])];
	var offset = [0,1].map(function(i) {
		return c[i] - size[i];
	});
	if (this.options.addons) {
		this.options.addons.each(function(o) {
			o.addonDis = this.getDis(o);
			o.addonSize = [(parseInt(Element.getStyle(o, 'width')) || Element.getDimensions(o).width - o.addonDis[0]),(parseInt(Element.getStyle(o, 'height')) || Element.getDimensions(o).height - o.addonDis[1])];
			o.ss = [0,1].map(function(i) {
				return o.addonSize[i] + offset[i];
			});
			o._originalWidth = o.style.width;
			o._originalHeight = o.style.height;
			if (c[0]) {
				o.style.width = o.ss[0] + 'px';
			}
			if (c[1]) {
				o.style.height = o.ss[1] + 'px';
			}
		}.bind(this));
	}
	if (c[0]) {
		this.element.style.width = Math.max(c[0], 0) + "px";
	}
	if (c[1]) {
		this.element.style.height = Math.max(c[1], 0) + "px";
	}
},adjustSize:function(w, h) {
	var fdis = this.getDis(this.element.firstChild);
	var fsize = [(parseInt(Element.getStyle(this.element.firstChild, 'width')) + fdis[0] || Element.getDimensions(this.element.firstChild).width),(parseInt(Element.getStyle(this.element.firstChild, 'height')) + fdis[1] || Element.getDimensions(this.element.firstChild).height)];
	var dis = this.getDisPadding(this.element);
	if (w) {
		this.element.style.width = fsize[0] + dis[0] + 'px';
	}
	if (h) {
		this.element.style.height = fsize[1] + dis[1] + 'px';
	}
},getOffset:function(event) {
	var pointer = [Event.pointerX(event),Event.pointerY(event)];
	var pos = Position.cumulativeOffset(this.element);
	var offset = [0,1].map(function(i) {
		return(pointer[i] - pos[i]);
	});
	return offset;
},getDisPadding:function(element) {
	var dis = [0 + (parseInt(Element.getStyle(element, 'padding-left')) || 0) + (parseInt(Element.getStyle(element, 'padding-right')) || 0),0 + (parseInt(Element.getStyle(element, 'padding-top')) || 0) + (parseInt(Element.getStyle(element, 'padding-top')) || 0)];
	return dis;
},getDisBorder:function(element) {
	var dis = [0 + (parseInt(Element.getStyle(element, 'border-left-width')) || 0) + (parseInt(Element.getStyle(element, 'border-right-width')) || 0),0 + (parseInt(Element.getStyle(element, 'border-top-width')) || 0) + (parseInt(Element.getStyle(element, 'border-bottom-width')) || 0)];
	return dis;
},getDis:function(element) {
	var dis = [0,1].map(function(i) {
		return(0 + this.getDisPadding(element)[i] + this.getDisBorder(element)[i]);
	}.bind(this));
	return dis;
},keyPress:function(event) {
	if (!event.keyCode == Event.KEY_ESC) {
		return;
	}
	this.end(event);
}};
App.Requester = {orderObj:null,floatObj:[],request:function(mode, obj) {
	switch (mode) {case'new':case'del':case'newPage':case'delPage':case'editPageTitle':case'editPageColStyle':case'editPageIco':case'editPagePermit':case'editPageMods':case'editPage':case'pageOrder':case'userStyle':case'theme':case'themeGW':case'userData':this.doSend(mode, obj);break;case'edit':if (!obj.options.id) {
		obj.endSave();
		return;
	}this.doSend(mode, obj);break;case'order':this.doSend(mode, obj);break;case'float':if (this.floatObj.length === 0) {
		this.eventSendFloat = this.sendFloatAll.bind(this);
		Event.observe(window, 'unload', this.eventSendFloat);
	}if (!$A(this.floatObj).include(obj.options.id)) {
		this.floatObj.push(obj.options.id);
	}break;default:return;}
},sendFloatAll:function() {
	$A(this.floatObj).each(function(id) {
		if ($(id)) {
			this.doSend('float', App.Modules.getObjByElement($(id)));
		}
	}.bind(this));
},doSend:function(mode, obj) {
	LoadBar.show();
	var url = '';
	var options = {};
	switch (mode) {case'userData':LoadBar.show(App.Lang.loadUserModule);url = App.Actions.userData + 'm_list-ebi_' + _ebi + '/module/';if (App.Permit.resize || App.Permit.editModule || App.Permit.sortable) {
		url += '?o=true';
	}options = {data:{okFun:App.UserData.response.bind(App.UserData)}};break;case'order':url = App.Actions.editMod;obj = obj || this.orderObj;options = {parameters:'m=update&id=' + obj.id + '&type=order&data=' + JSON.stringify(obj.data),
		method:'post'};break;case'new':url = App.Actions.newMod;options = {parameters:'m=save&type=' + obj.options.type + '&title=' + escape(obj.options.title) + '&data=' + escape(JSON.stringify(obj.options.data) || ''),
		data:{okFun:App.Modules.doNewMod.bind(App.Modules)},
		method:'post'};break;case'edit':url = App.Actions.editMod;options = {parameters:'m=update&id=' + obj.options.id + '&type=' + obj.options.type + '&title=' + escape(obj.options.title) + '&data=' + escape(JSON.stringify(obj.options.data) || ''),
		data:{okFun:obj.endSave.bind(obj)},
		method:'post'};break;case'del':url = App.Actions.delMod;options = {parameters:'m=delete&id=' + obj.options.id,
		data:{okFun:obj.doClose.bind(obj)}};break;case'newPage':url = App.Actions.newPage;options = {parameters:'m=save&type=' + obj.options.type + '&title=' + escape(obj.options.title) + '&ico=' + obj.options.ico + '&colStyle=' + obj.options.colStyle + '&permit=' + obj.options.permit + '&widget=' + JSON.stringify(obj.options.widgets),
		data:{okFun:App.PageTabs.analyseNewPageTab.bind(App.PageTabs)},
		method:'post'};break;case'delPage':url = App.Actions.delPage;options = {parameters:'m=delete&id=' + obj.options.id,
		data:{okFun:obj.doClose.bind(obj)}};break;case'editPageTitle':url = App.Actions.editPage;options = {parameters:'m=update&id=' + obj.options.id + '&type=' + obj.options.type + '&title=' + escape(obj.newTitle),
		data:{okFun:obj.doSaveTitle.bind(obj)},
		method:'post'};break;case'editPageColStyle':url = App.Actions.editPage;options = {parameters:'m=update&id=' + obj.options.id + '&colStyle=' + escape(obj.newColStyle),
		data:{okFun:obj.doSetColStyle.bind(obj)},
		method:'post'};break;case'editPageIco':url = App.Actions.editPage;options = {parameters:'m=update&id=' + obj.options.id + '&ico=' + escape(obj.newIco),
		data:{okFun:obj.doSetIcon.bind(obj)},
		method:'post'};break;case'editPagePermit':url = App.Actions.editPage;options = {parameters:'m=update&id=' + obj.options.id + '&permit=' + escape(obj.newPermit),
		data:{okFun:obj.doSetPermit.bind(obj)},
		method:'post'};break;case'editPageMods':url = App.Actions.editPage;options = {parameters:'m=update&id=' + obj.options.id + '&mods=' + JSON.stringify(obj.newMods),
		method:'post'};break;case'editPage':url = App.Actions.editPage;options = {parameters:'m=update&id=' + obj.options.id + '&title=' + escape(obj.options.title) + '&ico=' + obj.options.ico + '&colStyle=' + obj.options.colStyle + '&permit=' + obj.options.permit + '&mods=' + JSON.stringify(obj.options.mods),
		method:'post'};break;case'pageOrder':url = App.Actions.editPage;options = {parameters:'m=update&layout=' + JSON.stringify(obj.data),
		method:'post'};break;case'theme':url = App.Actions.theme;options = {parameters:'m=update&v=xml&theme=' + obj,
		data:{okFun:App.Themes.doSetTheme.bind(App.Themes)}};break;case'themeGW':url = App.Actions.themeGW;options = {parameters:'m=update&v=xml&greenThemeId=' + obj.themeCode + '&vcode=' + obj.vcode + '&vcodeEn=' + escape(obj.vcodeEn),
		data:{okFun:App.Framework.okSetThemeGW.bind(App.Framework),
			errorFun:App.Framework.errorSetThemeGW.bind(App.Framework)},
		method:'post'};break;case'userStyle':url = App.Actions.editUserStyle;options = {parameters:'m=update&style=' + obj,
		data:{okFun:App.UserStyle.doSetStyle.bind(App.UserStyle)},
		method:'post'};break;case'float':url = App.Actions.editMod;options = {parameters:'id=' + obj.options.id + '&floating=' + JSON.stringify(obj.options.floating)};break;case'expand':url = App.Actions.editMod;options = {parameters:'id=' + obj.options.id + '&isExpanded=' + JSON.stringify(obj.options.isExpanded)};break;}
	this.doRequest(url, options);
},
	doRequest:function(url, options) {
		options = Object.extend({method:'get',onSuccess:App.Response.analyse.bind(App.Response)}, (options || {}));
		var aa = new App.ImpFile(url, options);
	}};
App.Response = {analyse:function(request, json, exData) {
	LoadBar.hide();
	if (!request) {
		return this.connetionError();
	}
	if (!request.responseText) {
		return this.connetionError();
	}
	if (request.responseText.indexOf('<?') !== 0) {
		return this.notWebFormed(request);
	}
	if (!request.responseXML) {
		return this.notWebFormed(request);
	}
	var xmlDom = request.responseXML;
	var code = Element.getChildValueByTagName(xmlDom, 'code')[0];
	var message = Element.getChildValueByTagName(xmlDom, 'message')[0].trim();
	if (typeof code == 'undefined' || typeof message == 'undefined') {
		return this.notWebFormed(request);
	}
	if (exData && exData.defaultFun && typeof exData.defaultFun == 'function') {
		exData.defaultFun(code, message);
	}
	if (code == '200') {
		var data = xmlDom.getElementsByTagName('data')[0];
		if (exData && exData.okFun && typeof exData.okFun == 'function') {
			exData.okFun(data);
		} else {
			return data;
		}
	} else {
		this.reportError(code, message);
		if (exData && exData.errorFun && typeof exData.errorFun == 'function') {
			exData.errorFun(code, message);
		}
	}
},connetionError:function() {
	var str = App.Lang.error + ': ' + App.Lang.connetionError + '\n\n';
	str += App.Lang.cannotGetConnetion + '\n';
	str += App.Lang.contactAdmin + '\n';
	alert(str);
	return null;
},notWebFormed:function(request) {
	var str = App.Lang.error + ': ' + App.Lang.analyseFileError + '\n\n';
	str += App.Lang.notWellFormed + '\n';
	str += App.Lang.contactAdmin + '\n';
	str += '-------------------------\n';
	str += (request.responseText.length <= 100) ? request.responseText : request.responseText.substring(0, 100) + '...';
	alert(str);
	return null;
},reportError:function(code, message) {
	if (code == '401') {
		var str = App.Lang.notLogon + '\n\n';
		str += App.Lang.pleaseLogon;
		if (confirm(str)) {
			location.href = 'http://blog.sohu.com/login/logon.do';
			return;
		}
	}
	if (code == '403') {
		var str = App.Lang.noPermitOrNotLogon + '\n\n';
		str += App.Lang.pleaseLogon;
		if (confirm(str)) {
			location.href = 'http://blog.sohu.com/login/logon.do';
			return;
		}
	} else {
		var str = '';
		str += Info.htmlInfo(unescape(message), 1, ' ');
		alert(str);
	}
	return null;
}};
App.Framework = {initialize:function() {
	if (App.Permit.ableLog) {
		$LT('App.Framework.initialize');
	}
	if (App.Permit.editHead) {
	}
	App.Framework.initNavBar();
	App.Framework.indiBtnCntn = $('op' + 'ti' + 'onN' + 'av');
	if (App.Permit.editTheme) {
		App.Framework.initThemeBtn();
	}
	App.UserData.load();
},initNavBar:function() {
	if (App.Permit.ableLog) {
		$LT('App.Framework.initNavBar');
	}
	this._mainNavBar = $('ma' + 'inN' + 'av');
	var arr = [];
	arr.push('<ul></ul>');
	this._mainNavBar.innerHTML = arr.join('');
	arr = null;
	this.elm_navBar = this._mainNavBar.firstChild;
},showNewPageBtn:function() {
	this.initNewPageBtn();
},initNewPageBtn:function() {
	if (App.Permit.ableLog) {
		$LT('App.Framework.initNewPageBtn');
	}
	var aNewPageBtn = document.createElement('a');
	this.elm_newPageBtn = aNewPageBtn;
	aNewPageBtn.id = 'newPageBtn';
	aNewPageBtn.title = App.Lang.newPageBtn;
	aNewPageBtn.href = 'javascript:void(0)';
	aNewPageBtn.innerHTML = '&nbsp;';
	this._mainNavBar.appendChild(aNewPageBtn);
	Event.observe(aNewPageBtn, 'click', App.cancelBubble.bindAsEventListener(this));
	Event.observe(aNewPageBtn, 'click', this.newPage.bindAsEventListener(this));
},getNewPageMenuData:function() {
	var arr = [];
	$A(App.PageLib.lib).each(function(p) {
		var disabled = false;
		var disabledSign = '';
		var disabledText = '';
		if (p.only && (App.PageTabs.getPTabByType(p.type).length > 0)) {
			disabled = true;
			disabledSign += '<img src="' + App.Actions.imgPath + 'ico_tick_small.gif" />';
			disabledText += App.Lang.alreadyInUse;
		}
		if (p.demo && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (p.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (p.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
			throw $continue;
		}
		var pInfo = {text:'<img src="' + (p.ico != 0 ? (App.Actions.imgPath + App.Actions.icoShortPath + App.icoLib[p.ico]) : (App.Actions.imgPath + 'spacer.gif')) + '" alt="' + p.title + '" /> ' + (p.title ? p.title : App.Lang.customPage) + disabledSign + (p.toy ? '*' : '') + (p.demo ? '**' : ''),title:p.desc + (disabled ? (' (' + disabledText + ')') : ''),action:App.PageTabs.newPageTab.bind(App.PageTabs),value:p.type,disabled:disabled};
		arr.push(pInfo);
	}.bind(this));
	return([{title:null,active:true,data:arr}]);
},newPage:function() {
	if (!this.newPageMenu) {
		var opt4newPage = {menuData:this.getNewPageMenuData(),title:null,clsBtn:false,autoCls:true,autoActive:false,btn:this.elm_newPageBtn,zIndex:1100,sDivCss:'menuSub-div menuSub-div-newPage'};
		this.newPageMenu = new WinMenu(opt4newPage);
	}
	if (!this.newPageMenu.showing) {
		this.newPageMenu.show();
	} else {
		this.newPageMenu.hide();
	}
},updateNewPageMenuContent:function() {
	if (!this.newPageMenu) {
		return;
	}
	this.newPageMenu.updateMenuData(this.getNewPageMenuData());
},initModContainer:function() {
	var _container = $('mai' + 'nWra' + 'pp' + 'er');
	var arr = [];
	arr.push('<div id="innerMainWrapper">');
	arr.push('<div style="display:none"></div>');
	arr.push('<div id="modContainer">');
	arr.push('</div>');
	arr.push('</div>');
	_container.innerHTML = arr.join('');
	this.elm_modCtnInfo = _container.firstChild.firstChild;
	this.elm_modCtn = _container.firstChild.lastChild;
},initThemeBtn:function() {
	if (App.Permit.ableLog) {
		$LT('App.Framework.initThemeBtn');
	}
	var liThemeBtn = document.createElement('li');
	this.elm_themeBtn = liThemeBtn;
	liThemeBtn.innerHTML = '<a href="javascript:void(0)" onfocus="this.blur()" class="navEditTheme">' + App.Lang.setTheme + '</a>';
	this.indiBtnCntn.insertBefore(liThemeBtn, this.indiBtnCntn.firstChild);
	Event.observe(liThemeBtn, 'click', this.setTheme.bindAsEventListener(this));
},initNewModBtn:function() {
	if (App.Permit.ableLog) {
		$LT('App.Framework.initNewModBtn');
	}
	var liNewModBtn = document.createElement('li');
	this.elm_newModBtn = liNewModBtn;
	liNewModBtn.innerHTML = '<a href="javascript:void(0)" onfocus="this.blur()" class="navNewMod">' + App.Lang.newModule + '</a>';
	this.indiBtnCntn.insertBefore(liNewModBtn, this.indiBtnCntn.firstChild);
	Event.observe(liNewModBtn, 'click', this.newMod.bindAsEventListener(this));
},getNewModMenuData:function() {
	var arr1 = [];
	$A(App.WidgetLib.gallery).each(function(g, i) {
		if (g.demo && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (g.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (g.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
			throw $continue;
		}
		var arr2 = [];
		$A(App.WidgetLib.lib).each(function(w) {
			if (w.gal != g.key) {
				throw $continue;
			}
			var disabled = false;
			var disabledSign = '';
			var disabledText = '';
			if (w.only && App.UserData.getModByType(w.type)) {
				disabled = true;
				disabledSign += '<img src="' + App.Actions.imgPath + 'ico_tick_small.gif" />';
				disabledText += App.Lang.alreadyInUse;
			}
			var activePage = App.PageTabs.getActivePTab();
			if (w.private && activePage && activePage.options.permit == 0) {
				disabled = true;
				disabledSign += '<img src="' + App.Actions.imgPath + 'ico_warn_small.gif" />';
				disabledText += App.Lang.onlyInPrivatePage;
			}
			if (w.demo && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (w.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
				throw $continue;
			}
			if (w.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
				throw $continue;
			}
			var wInfo = {text:'<img src="' + w.ico + '" alt="' + w.title + '" /> ' + w.title + disabledSign + (w.toy ? '<span>*</span>' : '') + (w.demo ? '**' : ''),title:w.desc + (disabled ? (' (' + disabledText + ')') : (w.sys ? (' (' + App.Lang.sysMod + ')') : '')),action:App.Modules.newMod.bind(App.Modules),value:w.type,disabled:disabled};
			arr2.push(wInfo);
		}.bind(this));
		arr1.push({title:g.title + (g.toy ? '*' : '') + (g.demo ? '**' : ''),active:(i == 0),data:arr2});
	}.bind(this));
	return arr1;
},newMod:function() {
	if (!this.newModMenu) {
		var opt4newMod = {menuData:this.getNewModMenuData(),title:App.Lang.newModule,autoActive:false,btn:this.elm_newModBtn,displace:[-190,0],noneInfo:App.Lang.noWidget,zIndex:500,sDivCss:'menuSub-div menuSub-div-newMod'};
		this.newModMenu = new WinMenu(opt4newMod);
	}
	if (!this.newModMenu.showing) {
		if (this.setThemeMenu && this.setThemeMenu.showing) {
			this.setThemeMenu.hide();
		}
		this.newModMenu.show();
	} else {
		this.newModMenu.hide();
	}
},updateNewModMenuContent:function() {
	if (!this.newModMenu) {
		return;
	}
	this.newModMenu.updateMenuData(this.getNewModMenuData());
},getGreenWaySubMenuData:function(index) {
	this.setThemeMenu.index = index;
	var divSubContent = document.createElement('div');
	divSubContent.className = 'menuInnerSub-div clearfix menuInnerSub-div-theme';
	var arr = [];
	arr.push('<form method="post" onsubmit="return false;">');
	arr.push('<table style="clear:both;" cellpadding="2" cellspacing="5">');
	arr.push('<tr><td width="55">');
	arr.push(App.Lang.greenWay + ':');
	arr.push('</td><td>');
	arr.push(App.Lang.blogworldSohuGWThemes);
	arr.push('</td></tr>');
	arr.push('<tr><td>');
	arr.push(App.Lang.gwCode + ':');
	arr.push('</td><td>');
	arr.push('<input type="text" name="themeCode" class="text" /> <span style="font-weight:bold; cursor:pointer; padding:0px 4px; border:1px solid #ccc;" title="' + App.Lang.whatisGW + '">?</span>');
	arr.push('</td></tr>');
	arr.push('<tr style="display:none"><td>&nbsp;</td><td>');
	arr.push('<div style="border:1px solid #ccc;padding:5px;background-color:#ffffe1;margin:0px;float:none;">');
	arr.push(App.Lang.gwInfoText);
	arr.push('</div>');
	arr.push('</td></tr>');
	arr.push('<tr style="display:none;"><td>');
	arr.push(App.Lang.vCode + ':');
	arr.push('</td><td>');
	arr.push('</td></tr>');
	arr.push('<tr><td>');
	arr.push('&nbsp;</td><td><input type="submit" class="button-submit" value="' + App.Lang.ok + '" />');
	arr.push('<span style="display:none;">' + App.Lang.loading + '</span>');
	arr.push('</td></tr>');
	arr.push('</table>');
	arr.push('<div className="clearfix" style="clear:both;"></div>');
	arr.push('</form>');
	divSubContent.innerHTML = arr.join('');
	this.setThemeMenu.gwForm = divSubContent.firstChild;
	this.setThemeMenu.gwCodeIpt = divSubContent.firstChild.firstChild.rows[1].cells[1].firstChild;
	this.setThemeMenu.gwInfoBtn = divSubContent.firstChild.firstChild.rows[1].cells[1].lastChild;
	this.setThemeMenu.gwInfoText = divSubContent.firstChild.firstChild.rows[2];
	this.setThemeMenu.gwVCodeBox = divSubContent.firstChild.firstChild.rows[3];
	this.setThemeMenu.gwCodeSubmitBtn = divSubContent.firstChild.firstChild.rows[4].cells[1].firstChild;
	this.setThemeMenu.gwCodeSubmitLoadText = divSubContent.firstChild.firstChild.rows[4].cells[1].lastChild;
	this.setThemeMenu.greenWaySubMenu = divSubContent.firstChild.lastChild;
	Event.observe(this.setThemeMenu.gwForm, 'submit', this.submitGreenWayCode.bindAsEventListener(this));
	Event.observe(this.setThemeMenu.gwCodeIpt, 'focus', this.showGreenWayVCode.bindAsEventListener(this));
	Event.observe(this.setThemeMenu.gwInfoBtn, 'click', function() {
		Element.toggle(this.setThemeMenu.gwInfoText);
	}.bind(this));
	setTimeout(this.loadGreenWayData.bind(this, index), 10);
	return divSubContent;
},showGreenWayVCode:function() {
	if (this.setThemeMenu.gwVCodeBox.lastChild.innerHTML != '') {
		return;
	}
	var arr = [];
	arr.push('<input name="vcode" type="text" class="text" id="vcode" value="" size="4" maxlength="4" />&nbsp;');
	arr.push('<span></span>&nbsp;');
	arr.push('<a href="javascript:void(0)">' + App.Lang.cannotSeeVCode + '</a>');
	this.setThemeMenu.gwVCodeBox.lastChild.innerHTML = arr.join('');
	this.setThemeMenu.gwVCodeCon = this.setThemeMenu.gwVCodeBox.lastChild.getElementsByTagName('span')[0];
	this.setThemeMenu.gwVCodeRefresh = this.setThemeMenu.gwVCodeBox.lastChild.lastChild;
	this.setThemeMenu.gwVCodeRefresh.onclick = function() {
		new VCode(this.setThemeMenu.gwVCodeCon);
	}.bind(this);
	new VCode(this.setThemeMenu.gwVCodeCon);
	Element.show(this.setThemeMenu.gwVCodeBox);
},submitGreenWayCode:function() {
	if (!Form.getInputs(this.setThemeMenu.gwForm, 'text', 'themeCode')[0].value) {
		alert(App.Lang.plsEnterGWCode);
		Form.getInputs(this.setThemeMenu.gwForm, 'text', 'themeCode')[0].focus();
		return false;
	}
	if (!Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].value) {
		alert(App.Lang.plsEnterVCode);
		Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].focus();
		return false;
	}
	this.setThemeMenu.gwCodeSubmitBtn.disabled = true;
	Element.show(this.setThemeMenu.gwCodeSubmitLoadText);
	App.Requester.request('themeGW', {themeCode:Form.getInputs(this.setThemeMenu.gwForm, 'text', 'themeCode')[0].value,vcode:Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].value,vcodeEn:Form.getInputs(this.setThemeMenu.gwForm, 'hidden', 'vcodeEn')[0].value});
	return false;
},okSetThemeGW:function(rData) {
	var themeId = Element.getChildValueByTagName(rData, 'theme')[0] || '';
	if (!themeId) {
		this.errorSetThemeGW();
	}
	App.Themes.doSetThemeGW(themeId);
	this.endSubmitGreenWayCode();
	this.setThemeMenu.gwCodeIpt.value = '';
	this.setThemeMenu.gwVCodeBox.lastChild.innerHTML = '';
	Element.hide(this.setThemeMenu.gwVCodeBox);
	this.setThemeMenu.hide();
	this.updateGreenWayData();
},errorSetThemeGW:function() {
	this.endSubmitGreenWayCode();
},endSubmitGreenWayCode:function() {
	if (Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0]) {
		Form.getInputs(this.setThemeMenu.gwForm, 'text', 'vcode')[0].value = '';
	}
	new VCode(this.setThemeMenu.gwVCodeCon);
	this.setThemeMenu.gwCodeSubmitBtn.disabled = false;
	Element.hide(this.setThemeMenu.gwCodeSubmitLoadText);
},updateGreenWayData:function() {
	this.loadGreenWayData(this.setThemeMenu.index);
},loadGreenWayData:function(index) {
	var url = App.Actions.greenWay + '?mail=' + getP() + '&nocache=' + timeStamp();
	new LinkFile(url, {type:'script',callBack:{variable:'gw_codes',onLoad:this.showGreenWayData.bind(this, index),onFailure:function() {
		this.greenWaySubMenu.innerHTML = '';
	}.bind(this)}});
},showGreenWayData:function(index) {
	if (gw_codes.length > 0) {
		if (!this.setThemeMenu.greenWaySubTitle) {
			var divSIT = document.createElement('div');
			this.setThemeMenu.greenWaySubTitle = divSIT;
			divSIT.style.clear = 'both';
			divSIT.style.styleFloat = 'none';
			divSIT.style.width = 'auto';
			divSIT.style.padding = '5px 0px';
			divSIT.style.margin = '0px 5px';
			divSIT.style.borderTop = '1px solid #ccc';
			this.setThemeMenu.greenWaySubMenu.parentNode.insertBefore(divSIT, this.setThemeMenu.greenWaySubMenu);
		}
		this.setThemeMenu.greenWaySubTitle.innerHTML = App.Lang.myGWTheme + ':';
	}
	this.setThemeMenu.greenWaySubMenu.innerHTML = '';
	gw_codes.each(function(s, i) {
		var th = {id:s.id,grp:'gw',code:s.code};
		App.ThemeLib.add(th);
		th = App.ThemeLib.getTheme(th.id);
		var si = {text:'<img src="' + (th.path || (App.Actions.themePath + th.id + '/')) + th.smp + '" alt="' + (th.name || th.id) + '" />',title:th.name || th.id,action:App.Themes.setTheme.bind(App.Themes),value:th.id,active:(App.theme == th.id)};
		var divSI = document.createElement('div');
		divSI.className = this.options.sOutCss;
		if (si.active) {
			Element.addClassName(divSI, this.options.sActiveCss);
		}
		if (si.disabled) {
			Element.addClassName(divSI, this.options.sDisableCss);
		}
		divSI.innerHTML = si.text;
		if (si.text) {
			divSI.title = (si.title || si.text);
		}
		Event.observe(divSI, 'mouseover', function() {
			if (si.disabled) {
				return;
			}
			Element.addClassName(divSI, this.options.sOverCss);
		}.bind(this));
		Event.observe(divSI, 'mouseout', function() {
			if (si.disabled) {
				return;
			}
			Element.removeClassName(divSI, this.options.sOverCss);
			Element.removeClassName(divSI, this.options.sDownCss);
		}.bind(this));
		Event.observe(divSI, 'mousedown', function() {
			if (si.disabled) {
				return;
			}
			Element.addClassName(divSI, this.options.sDownCss);
		}.bind(this));
		Event.observe(divSI, 'mouseup', function() {
			if (si.disabled) {
				return;
			}
			Element.removeClassName(divSI, this.options.sDownCss);
		}.bind(this));
		Event.observe(divSI, 'click', function() {
			if (si.disabled) {
				return;
			}
			if (this.options.autoActive) {
				this.activeItem(index, i);
			}
			(si.action)(si.value);
			if (this.options.click2cls) {
				this.hide();
			}
		}.bind(this));
		this.greenWaySubMenu.appendChild(divSI);
	}.bind(this.setThemeMenu));
},getSetThemeMenuData:function() {
	var arr1 = [];
	$A(App.ThemeLib.group).each(function(g, i) {
		if (g.demo && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (g.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (g.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
			throw $continue;
		}
		if (g.key == 'gw') {
			var arr2 = this.getGreenWaySubMenuData.bind(this);
		} else {
			var arr2 = [];
			$A(App.ThemeLib.lib).each(function(t) {
				if (t.grp != g.key) {
					throw $continue;
				}
				if (t.demo && !App.Permit.ableDemo) {
					throw $continue;
				}
				if (t.dev && !App.Permit.able3rdDev && !App.Permit.ableDemo) {
					throw $continue;
				}
				if (t.toy && !App.Permit.ableToy && !App.Permit.ableDemo) {
					throw $continue;
				}
				var tInfo = {text:'<img src="' + (t.path || (App.Actions.themePath + t.id + '/')) + t.smp + '" alt="' + (t.name || t.id) + '" />',title:t.name || t.id,action:App.Themes.setTheme.bind(App.Themes),value:t.code || t.id,active:(App.theme == t.id)};
				arr2.push(tInfo);
			}.bind(this));
		}
		arr1.push({title:g.title + (g.toy ? '*' : '') + (g.demo ? '**' : ''),active:(i == 0),isDivCssEx:'menuInnerSub-div-theme',data:arr2});
	}.bind(this));
	return arr1;
},setTheme:function() {
	if (!this.setThemeMenu) {
		var opt4setTheme = {menuData:this.getSetThemeMenuData(),title:App.Lang.setTheme,btn:this.elm_themeBtn,displace:[-285,0],zIndex:600,allInOne:true,sDivCss:'menuSub-div menuSub-div-theme'};
		this.setThemeMenu = new WinMenu(opt4setTheme);
	}
	if (!this.setThemeMenu.showing) {
		if (this.newModMenu && this.newModMenu.showing) {
			this.newModMenu.hide();
		}
		this.setThemeMenu.show();
	} else {
		this.setThemeMenu.hide();
	}
}};
getStart(App.Framework.initialize);
App.UserData = {userModulesData:[],userModulseOrder:null,loaded:false,load:function() {
	if (App.Permit.ableLog) {
		$LT('App.UserData.load');
	}
	this.userModulesData = [];
	this.userModulseOrder = null;
	Log._t_startLoadUserModulesXml = new Date().getTime();
	App.Requester.request('userData');
},response:function(rData) {
	if (App.Permit.ableLog) {
		Log._t_endLoadUserModulesXml = new Date().getTime();
		$LT('load user mod xml (' + (Log._t_endLoadUserModulesXml - Log._t_startLoadUserModulesXml) + ')');
		$LT('App.UserData.response');
	}
	this.analyse(rData);
},analyse:function(rData) {
	if (App.Permit.ableLog) {
		$LT('App.UserData.analyse');
	}
	if (!rData) {
		return;
	}
	var modList = rData.getElementsByTagName('mod');
	$A(modList).each(function(m) {
		var mod = this.getModData(m);
		if (mod.type == 'order') {
			this.userModulseOrder = mod;
		} else {
			this.userModulesData.push(mod);
		}
	}.bind(this));
	App.Framework.initModContainer();
	this.createPage();
},getModData:function(m) {
	var mod = {id:m.getAttribute('id') || '',
		type:m.getAttribute('type') || '',
		isExpanded:m.getAttribute('isExpanded') ? JSON.parse(m.getAttribute('isExpanded')) : true,share:m.getAttribute('share') ? JSON.parse(m.getAttribute('share')) : true,floating:m.getAttribute('floating') ? JSON.parse(m.getAttribute('floating')) : false,
		title:Element.getChildValueByTagName(m, 'title')[0] || '',
		data:Element.getChildValueByTagName(m, 'data')[0] ? (JSON.parse(Element.getChildValueByTagName(m, 'data')[0]) || Element.getChildValueByTagName(m, 'data')[0]) : ''
	};
	return mod;
},addMod:function(mod) {
	this.userModulesData.push(mod);
},delMod:function(mod) {
	this.userModulesData = this.userModulesData.reject(function(m) {
		return m.id == mod.id;
	});
},createPage:function() {
	if (App.Permit.ableLog) {
		Log._t_pageCreate = new Date().getTime();
		$LT('App.UserData.createPage');
	}
	LoadBar.show(App.Lang.createAllPages);
	var activePage = '';
	if (location.hash) {
		var hash = location.hash;
		if (hash.indexOf('#' + App.pageHash_prefix) == 0) {
			activePage = hash.substring(2);
		}
	}
	var alreadyHaveActive = false;
	$A(this.userModulseOrder.data).each(function(p, i) {
		if (!p.id) {
			throw $continue;
		}
		if (!App.Permit.ableViewPvtPageTab && p.permit != 0) {
			throw $continue;
		}
		if (activePage == null || activePage == '') {
			activePage = p.id;
		}
		var pl = App.PageLib.getPage(p.type);
		if (!pl) {
			pl = App.PageLib.getPage('0');
		}
		var isActive = false;
		if (activePage == p.id || activePage == pl.hash) {
			isActive = true;
		}
		var opt4pageTab = {id:p.id,type:p.type || '0',ico:p.ico || 58,title:p.title || App.Lang.defaultPageTitle,colStyle:p.colStyle || App.defaultColStyle,mods:p.mods || [],permit:p.permit || 0,isActive:(isActive && !alreadyHaveActive),createMods:(App.createOnlyFirstPageMod ? (isActive && !alreadyHaveActive) : true)};
		var aa = new App.PageTab(opt4pageTab);
		if (isActive) {
			alreadyHaveActive = true;
		}
	});
	LoadBar.hide();
	if (App.Permit.ableLog) {
		Log._t_pageCreateEnd = new Date().getTime();
		$LT('App.UserData.createPage end (' + (Log._t_pageCreateEnd - Log._t_pageCreate) + ')');
	}
	if (App.Permit.editPageTab) {
		App.Framework.showNewPageBtn();
		App.PageTabs.regPageTabObservers();
		App.Framework.initNewModBtn();
	}
	App.PageTabs.listenHash();
},getModByType:function(type) {
	return this.userModulesData.find(function(m) {
		return(m.type == type);
	});
}};
App.PageTabs = {pTabs:[],register:function(pTab) {
	$(pTab.options.placeIn).appendChild(pTab.element);
	this.pTabs.push(pTab);
},unregister:function(pTab) {
	var _index = 0;
	this.pTabs = this.pTabs.reject(function(m, i) {
		if (m == pTab) {
			_index = i;
		}
		return m == pTab;
	});
	_index--;
	if (_index < 0) {
		_index = 0;
	}
	if (_index >= this.pTabs.length) {
		_index = this.pTabs.length - 1;
	}
	this.pTabs[_index].active();
	App.Framework.updateNewPageMenuContent();
},disActiveAll:function() {
	this.pTabs.each(function(pTab) {
		pTab.disActive();
	});
},getActivePTab:function() {
	return this.pTabs.find(function(pTab) {
		return pTab.options.isActive;
	});
},getPrivateTabs:function() {
	return this.pTabs.findAll(function(pTab) {
		return(pTab.options.permit != 0);
	});
},getPublicTabs:function() {
	return this.pTabs.findAll(function(pTab) {
		return(pTab.options.permit == 0);
	});
},getProfileTabs:function() {
	return this.pTabs.findAll(function(pTab) {
		return(pTab.options.permit == 2);
	});
},getPTabByElement:function(element) {
	return this.pTabs.find(function(p) {
		return(p.element == element);
	});
},getPTabByType:function(type) {
	return this.pTabs.findAll(function(p) {
		return(p.options.type == type);
	});
},hideOptMenuAll:function() {
	this.pTabs.each(function(pTab) {
		pTab.hideOptMenu();
	});
},setHash:function(pTab) {
	this.stopListenHash();
	var id = '';
	if (pTab) {
		if (pTab.pl.type != '0' && pTab.pl.hash) {
			id = pTab.pl.hash;
		} else {
			id = pTab.options.id;
		}
	} else {
		var pt = this.pTabs.find(function(m) {
			return(m.options.isActive);
		});
		if (pt) {
			if (pt.pl.type != '0' && pt.pl.hash) {
				id = pt.pl.hash;
			} else {
				id = pt.options.id;
			}
		}
	}
	this.activePage = id;
	location.href = '#t' + id;
	this.listenHash();
},getHash:function() {
	var activePage = '';
	if (location.hash && location.hash.indexOf('#' + App.pageHash_prefix) == 0) {
		activePage = location.hash.substring(2);
	}
	if (activePage == App.profilePageHashId && this.getProfileTabs().length > 0) {
		activePage = this.getProfileTabs()[0].options.id;
	}
	if (activePage == this.activePage) {
		return;
	} else if (activePage) {
		var pt = this.pTabs.find(function(p) {
			var pl = App.PageLib.getPage(p.options.type);
			if (!pl) {
				pl = App.PageLib.getPage('0');
			}
			return(p.options.id == activePage || pl.hash == activePage);
		});
		if (typeof pt == 'undefined' || !pt) {
			pt = this.pTabs[0];
		}
		if (typeof pt != 'undefined' && pt) {
			pt.active(true);
		}
		this.activePage = activePage;
	}
},listenHash:function() {
	if (this.hashListener) {
		this.stopListenHash();
	}
	this.hashListener = setInterval(this.getHash.bind(this), 1000);
},stopListenHash:function() {
	if (!this.hashListener) {
		return;
	}
	clearInterval(this.hashListener);
	this.hashListener = null;
},getNewPageTabsOrder:function() {
	var arr = [];
	var pTabsAll = $A(App.Framework.elm_navBar.getElementsByTagName('li'));
	$A(pTabsAll).each(function(pTab) {
		if (pTab.id) {
			arr.push(pTab.id);
		}
	});
	return arr;
},savePageTabsOrder:function() {
	this.newOrder = this.getNewPageTabsOrder();
	if (JSON.stringify(this.newOrder) == JSON.stringify(this.oldOrder)) {
		return;
	}
	App.Requester.request('pageOrder', {data:this.newOrder});
	this.oldOrder = this.newOrder;
},regPageTabObservers:function() {
	if (App.Permit.ableLog) {
		Log._t_RegPTObs = new Date().getTime();
		$LT('App.PageTabs.regPageTabObservers');
	}
	if (!App.Permit.editPageTab) {
		return;
	}
	var opt4pageTabSortable = {tag:'li',targeting:true,overlap:'horizontal',constraint:'horizontal',ghosting:true,onUpdate:this.savePageTabsOrder.bind(this)};
	Sortable.create(App.Framework.elm_navBar, opt4pageTabSortable);
	this.regDrops();
	this.oldOrder = this.getNewPageTabsOrder();
	if (App.Permit.ableLog) {
		Log._t_RegPTObsEnd = new Date().getTime();
		$LT('App.PageTabs.regPageTabObservers end (' + (Log._t_RegPTObsEnd - Log._t_RegPTObs) + ')');
	}
},disRegPageTabObservers:function() {
	Sortable.destroy(App.Framework.elm_navBar);
},drag_snap:function(l, t) {
	var _l = Math.max(0, Math.min(l, screen.availWidth));
	var pos = Position.positionedOffset(App.Framework.elm_navBar);
	var _t = Math.max(pos[1], Math.min(t, pos[1] + App.Framework.elm_navBar.offsetHeight));
	return[_l,_t];
},regDrops:function() {
	this.pTabs.each(function(p) {
		p.regDrop();
	});
},showModCtnInfo:function(pTab) {
	if (!pTab.options.isActive) {
		return;
	}
	if (pTab.options.permit != 0) {
		if (pTab.pl && pTab.pl.info && pTab.pl.info.length > 0) {
			App.Framework.elm_modCtnInfo.innerHTML = pTab.pl.info;
		} else {
			App.Framework.elm_modCtnInfo.innerHTML = App.Lang.privatePageInfo;
		}
		App.Framework.elm_modCtnInfo.className = 'modCtnInfo-private clearfix';
		Element.show(App.Framework.elm_modCtnInfo);
	} else if (pTab.options.mods.flatten().length === 0) {
		if (App.Permit.editPageTab) {
			App.Framework.elm_modCtnInfo.innerHTML = App.Lang.goAddModPageInfo;
		} else {
			App.Framework.elm_modCtnInfo.innerHTML = App.Lang.noModPageInfo;
		}
		App.Framework.elm_modCtnInfo.className = 'modCtnInfo-noMod clearfix';
		Element.show(App.Framework.elm_modCtnInfo);
	}
},hideModCtnInfo:function() {
	Element.hide(App.Framework.elm_modCtnInfo);
},newPageTab:function(type) {
	if (!type) {
		return;
	}
	if (this.pTabs.length >= App.maxPageTabCount) {
		var opt4popWin = {type:'alert',title:App.Lang.error,content:App.Lang.tooManyPages};
		var aa = new PopWin(opt4popWin);
		return;
	}
	this.newPL = App.PageLib.getPage(type);
	this.newPW_all = [];
	this.newPW_okW = [];
	this.newPW_noW = [];
	this.newPW_noM = [];
	$A(this.newPL.widgets).each(function(col, i) {
		this.newPW_all.push([]);
		this.newPW_okW.push([]);
		this.newPW_noW.push([]);
		col.each(function(wt, j) {
			var w = App.WidgetLib.getWidget(wt);
			if (!w) {
				throw $continue;
			}
			if ((w.only || w.sys) && App.UserData.getModByType(wt)) {
				var mod = App.UserData.getModByType(wt);
				this.newPW_all[i].push(mod.id);
				this.newPW_noW[i].push(wt);
				this.newPW_noM.push(mod.id);
			} else {
				this.newPW_all[i].push(wt);
				this.newPW_okW[i].push(wt);
			}
		}.bind(this));
	}.bind(this));
	if (App.Permit.ableLog) {
		$LT('App.PageTabs.newPageTab\n');
		$LR('newPW_all: ' + JSON.stringify(this.newPW_all));
		$LR('newPW_okW: ' + JSON.stringify(this.newPW_okW));
		$LR('newPW_noW: ' + JSON.stringify(this.newPW_noW));
		$LR('newPW_noM: ' + JSON.stringify(this.newPW_noM));
	}
	if (this.newPW_noM.length > 0) {
		var str = '';
		str += App.Lang.beSboutToAddNewPage;
		str += '[' + this.newPL.title + '], ';
		str += App.Lang.itContaintMods + ':\n';
		$A(this.newPL.widgets.flatten()).each(function(mt, i) {
			str += '[' + App.WidgetLib.getWidget(mt).title + ']';
			if (i < this.newPL.widgets.flatten().length - 1) {
				str += ', ';
			}
		}.bind(this));
		str += '\n\n';
		str += App.Lang.hasUsingTheseMods + ':\n';
		$A(this.newPW_noW.flatten()).each(function(mt, i) {
			str += '[' + App.WidgetLib.getWidget(mt).title + ']';
			if (i < this.newPW_noW.flatten().length - 1) {
				str += ', ';
			}
		}.bind(this));
		str += '\n\n';
		str += App.Lang.whetherMoveMods;
		var opt4popWin = {type:'confirm',content:str,focus:false,width:'350',okText:App.Lang.moveMod,okAction:this.reqNewPageTab.bind(this),okData:true,cancelText:App.Lang.notMoveMod,cancelAction:this.reqNewPageTab.bind(this),cancelData:false,closeAction:Prototype.emptyFunction};
		var aa = new PopWin(opt4popWin);
	} else {
		this.reqNewPageTab(true);
	}
},reqNewPageTab:function(doMove) {
	this.opt4newPageTab = {type:this.newPL.type,title:this.newPL.title || App.Lang.aNewPage,ico:(this.newPL.ico != null ? this.newPL.ico : 0),colStyle:this.newPL.colStyle || App.defaultColStyle,permit:this.newPL.permit || 0,widgets:this.newPW_all || []};
	if (doMove) {
		$A(this.newPW_noM).each(function(id) {
			var mod = App.Modules.getObjById(id);
			if (!mod) {
				throw $contunue;
			}
			var page = mod.options.page;
			mod.destroy();
			page.saveModsOrder('noToServer');
		});
	} else {
		this.opt4newPageTab.widgets = this.newPW_okW || [];
	}
	App.Requester.request('newPage', {options:this.opt4newPageTab});
},analyseNewPageTab:function(rData) {
	if (App.Permit.ableLog) {
		$LT('App.PageTabs.analyseNewPageTab');
	}
	if (!rData) {
		return;
	}
	var modList = rData.getElementsByTagName('mod');
	this.newPageData = null;
	$A(modList).each(function(m) {
		var mod = App.UserData.getModData(m);
		if (mod.type == 'order') {
			this.newPageData = mod.data;
			App.UserData.userModulseOrder.data.push(mod.data);
		} else {
			App.UserData.userModulesData.push(mod);
		}
	}.bind(this));
	this.doNewPageTab();
},doNewPageTab:function() {
	var opt = {};
	if (this.newPageData) {
		opt = this.newPageData[0];
	}
	var opt4pageTab = Object.extend(this.opt4newPageTab, opt);
	var obj_newPageTab = new App.PageTab(opt4pageTab);
	this.regPageTabObservers();
	obj_newPageTab.active();
	App.Framework.updateNewPageMenuContent();
	if (this.newPL.ableSetTit) {
		obj_newPageTab.editTitle();
	}
}};
App.PageTab = Class.create();
App.PageTab.prototype = {initialize:function(options) {
	if (App.Permit.ableLog) {
		$LT('App.PageTab[id:' + options.id + '] initialize');
	}
	this.options = Object.extend({id:null,type:'0',ico:0,title:'',colStyle:null,mods:[],permit:0,isActive:false,createMods:false,placeIn:App.Framework.elm_navBar,sDivCss:'menuSub-div',imtDivCss:'subMenu-maintitle',itDivCss:'subMenu-title',isDivCss:'menuInnerSub-div',sOutCss:'menuSub-out',sOverCss:'menuSub-over',sDownCss:'menuSub-down',sDisableCss:'menuSub-disabled',sActiveCss:'menuSub-active'}, options || {});
	this.pl = App.PageLib.getPage(this.options.type);
	if (!this.pl) {
		this.pl = App.PageLib.getPage('0');
	}
	if (!this.pl.ableSetTit && this.pl.title) {
		this.options.title = this.pl.title;
	}
	if (!this.pl.ableSetCol && this.pl.colStyle) {
		this.options.colStyle = this.pl.colStyle;
	}
	if (!this.pl.ableSetIco && this.pl.ico) {
		this.options.ico = this.pl.ico;
	}
	if (!this.pl.ableSetPer) {
		this.options.permit = this.pl.permit;
	}
	this.build();
	App.PageTabs.register(this);
	if (App.Permit.editPageTab) {
		this.regDrop();
	}
	this.buildModCtn();
	if (this.options.createMods) {
		this.createMods();
	}
},destroy:function() {
	if (!this.element) {
		return;
	}
	this.disActive();
	this.disRegDrop();
	this.removeMods();
	this.modCtn.destroy();
	Element.remove(this.element);
	this.element = null;
	setTimeout(function() {
		App.PageTabs.unregister(this);
	}.bind(this), 10);
},build:function() {
	if (App.Permit.ableLog) {
		$LT('App.PageTab[id:' + this.options.id + '] build');
	}
	var liTab = document.createElement('li');
	this.element = liTab;
	liTab.id = this.options.id;
	if (this.options.permit != 0) {
		Element.addClassName(liTab, 'private');
	}
	if (this.options.isActive) {
		Element.addClassName(liTab, 'active');
	}
	App.PageTabs.showModCtnInfo(this);
	var arr = [];
	if (!this.options.ico) {
		this.options.ico = 0;
	}
	arr.push('<img class="pageIcon" src="' + (this.options.ico != 0 ? (App.Actions.imgPath + App.Actions.icoShortPath + App.icoLib[this.options.ico]) : (App.Actions.imgPath + 'spacer.gif')) + '" alt="' + (this.options.ico ? this.options.title : '') + '" />');
	arr.push('<span class="pageTitle"' + ((this.options.isActive && App.Permit.editPageTab && this.pl.ableSetTit) ? ' title="' + App.Lang.clk2chgPageName + '"' : '') + '>' + this.options.title + '</span>');
	if (App.Permit.editPageTab) {
		arr.push('<img class="pageCls" src="' + App.Actions.imgPath + 'spacer.gif" alt="' + App.Lang.delPage + '" title="' + App.Lang.delPage + '" />');
		arr.push('<img class="pageOpt" src="' + App.Actions.imgPath + 'spacer.gif" alt="' + App.Lang.setPageOpt + '" title="' + App.Lang.setPageOpt + '" />');
	}
	liTab.innerHTML = arr.join('');
	arr = null;
	this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
	this.elm_ico = liTab.firstChild;
	this.elm_title = liTab.childNodes[1];
	if (liTab.childNodes[2]) {
		this.elm_del = liTab.childNodes[2];
	}
	if (liTab.childNodes[3]) {
		this.elm_opt = liTab.childNodes[3];
	}
	if (this.options.ico == 0) {
		this.elm_ico.style.width = '1px';
	}
	if (!this.pl.ableDel && this.elm_del) {
		this.elm_del.style.visibility = 'hidden';
	}
	if (!this.pl.ableSetOpt && this.elm_opt) {
		this.elm_opt.style.visibility = 'hidden';
	}
	this.eventActive = function() {
		if (!this.options.isActive) {
			this.active();
		}
	}.bindAsEventListener(this);
	Event.observe(this.element, 'click', this.eventActive);
	if (App.Permit.editPageTab) {
		if (this.pl.ableSetTit) {
			Event.observe(this.elm_title, 'mouseover', function() {
				if (this.options.isActive) {
					Element.addClassName(this.elm_title, 'pageTitleHover');
				}
			}.bind(this));
			Event.observe(this.elm_title, 'mouseout', function() {
				if (this.options.isActive) {
					Element.removeClassName(this.elm_title, 'pageTitleHover');
				}
			}.bind(this));
			Event.observe(this.elm_title, 'mousedown', this.eventCancelBubble);
			this.eventEditTitle = function(e) {
				if (this.options.isActive) {
					this.editTitle();
					App.cancelBubble(e);
				}
			}.bindAsEventListener(this);
			Event.observe(this.elm_title, 'click', this.eventEditTitle);
		}
		Event.observe(this.elm_del, 'mouseover', function() {
			if (this.options.isActive) {
				Element.addClassName(this.elm_del, 'pageClsHover');
			}
		}.bind(this));
		Event.observe(this.elm_del, 'mouseout', function() {
			if (this.options.isActive) {
				Element.removeClassName(this.elm_del, 'pageClsHover');
			}
		}.bind(this));
		Event.observe(this.elm_del, 'mousedown', this.eventCancelBubble);
		this.eventClose = this.close.bindAsEventListener(this);
		Event.observe(this.elm_del, 'click', this.eventClose);
		Event.observe(this.elm_opt, 'mouseover', function() {
			if (this.options.isActive) {
				Element.addClassName(this.elm_opt, 'pageOptHover');
			}
		}.bind(this));
		Event.observe(this.elm_opt, 'mouseout', function() {
			if (this.options.isActive) {
				Element.removeClassName(this.elm_opt, 'pageOptHover');
			}
		}.bind(this));
		Event.observe(this.elm_opt, 'mousedown', this.eventCancelBubble);
		this.eventSetOpt = this.setOpt.bindAsEventListener(this);
		Event.observe(this.elm_opt, 'click', this.eventSetOpt);
		if (!this.options.isActive) {
			Element.hide(this.elm_del, this.elm_opt);
		}
	}
},buildModCtn:function() {
	var opt4modContainer = {colStyle:this.options.colStyle,isActive:this.options.isActive,placeIn:App.Framework.elm_modCtn};
	this.modCtn = new App.ModContainer(opt4modContainer);
	this.modCtn.pageTab = this;
},removeMods:function() {
	$A(App.Modules.modules).select(function(mod) {
		return(mod.options.page == this);
	}.bind(this)).each(function(mod) {
		App.UserData.delMod(mod.options);
		mod.destroy();
	});
	App.Framework.updateNewModMenuContent();
},createMods:function() {
	this.loaded = true;
	if (App.Permit.ableLog) {
		Log._t_createMods = {};
		Log._t_createMods[this.options.id] = new Date().getTime();
		$LT('App.PageTab[id:' + this.options.id + '] createMods');
	}
	LoadBar.show(App.Lang.createAllModules);
	var delay = 100;
	$A(this.options.mods).each(function(col, i) {
		$A(col).each(function(id, j) {
			$A(App.UserData.userModulesData).each(function(m) {
				if (m.id == id) {
					var extendOpt = {page:this,placeIn:(this.modCtn.cols[i] ? this.modCtn.cols[i] : this.modCtn.cols[this.modCtn.cols.length - 1]),fastLoad:j};
					var options = Object.extend(m, extendOpt);
					var aa = new App.Module(options, true);
					throw $break;
				}
			}.bind(this));
		}.bind(this));
	}.bind(this));
	LoadBar.hide();
	if (App.Permit.ableLog) {
		Log._t_createModsEnd = {};
		Log._t_createModsEnd[this.options.id] = new Date().getTime();
		$LT('App.PageTab[id:' + this.options.id + '] createMods end (' + (Log._t_createModsEnd[this.options.id] - Log._t_createMods[this.options.id]) + ')');
	}
	setTimeout(this.regModObservers.bind(this), delay);
	delay += 100;
},getPageTabData:function() {
	var pageTabData = {id:this.options.id,title:this.options.title,ico:this.options.ico,permit:this.options.permit,colStyle:this.options.colStyle,mods:this.getModsOrder()};
	return pageTabData;
},getModsOrder:function() {
	if (!this.loaded) {
		return this.options.mods;
	}
	var arr = [];
	var colsAll = $A(this.modCtn.cols);
	$A(colsAll).each(function(col) {
		var arr2 = [];
		$A(col.childNodes).each(function(mod) {
			if (mod.tagName && mod.tagName.toUpperCase() == 'div'.toUpperCase() && Element.hasClassName(mod, 'mod') && mod.id) {
				arr2.push(mod.id);
			}
		});
		arr.push(arr2);
	});
	return arr;
},saveModsOrder:function(toServer) {
	App.PageTabs.hideModCtnInfo();
	this.newMods = this.getModsOrder();
	if (toServer != 'doToServer' && JSON.stringify(this.newMods) == JSON.stringify(this.options.mods)) {
		return;
	}
	this.options.mods = this.newMods;
	if (toServer != 'noToServer') {
		App.Requester.request('editPageMods', this);
	}
	App.PageTabs.showModCtnInfo(this);
},regModObservers:function() {
	if (App.Permit.ableLog) {
		Log._t_RegModObs = {};
		Log._t_RegModObs[this.options.id] = new Date().getTime();
		$LT('App.PageTab[id:' + this.options.id + '] regModObservers');
	}
	if (!App.Permit.sortable) {
		return;
	}
	var opt4sortable = {tag:'div',handle:'t',handleTag:'td',only:'mod',dropOnEmpty:true,targeting:true,containment:this.modCtn.cols,constraint:false,snap:this.drag_snap,starteffect:function(element) {
		(Browser.ua.indexOf('ie') >= 0) ? new Effect.Opacity(element, {duration:0.0,from:1.0,to:0.7}) : new Effect.Opacity(element, {duration:0.2,from:1.0,to:0.7});
		var flashs = $A(element.getElementsByTagName('object'));
		var embeds = $A(element.getElementsByTagName('embed'));
		embeds = embeds.reject(function(e) {
			return(e.parentNode.tagName.toLowerCase() == 'object');
		});
		flashs = flashs.concat(embeds);
		var iframes = $A(element.getElementsByTagName('iframe'));
		var nho = flashs.concat(iframes);
		$A(nho).each(function(o) {
			var divNho = document.createElement('div');
			divNho.className = 'divFlashSpacer';
			var _w = o.width || o.offsetWidth;
			var _h = o.height || o.offsetHeight;
			divNho.style.width = isNaN(_w) ? _w : _w + 'px';
			divNho.style.height = isNaN(_h) ? _h : _h + 'px';
			divNho.style.overflow = 'hidden';
			o.parentNode.insertBefore(divNho, o);
			Element.hide(o);
		});
	},endeffect:function(element) {
		(Browser.ua.indexOf('ie') >= 0) ? new Effect.Opacity(element, {duration:0.0,from:0.7,to:1.0}) : new Effect.Opacity(element, {duration:0.2,from:0.7,to:1.0});
		var flashs = $A(element.getElementsByTagName('object'));
		var embeds = $A(element.getElementsByTagName('embed'));
		embeds = embeds.reject(function(e) {
			return(e.parentNode.tagName.toLowerCase() == 'object');
		});
		flashs = flashs.concat(embeds);
		var iframes = $A(element.getElementsByTagName('iframe'));
		var nho = flashs.concat(iframes);
		$A(nho).each(function(o) {
			Element.show(o);
		});
		$A(document.getElementsByClassName('divFlashSpacer', element, 'div')).each(function(d) {
			Element.remove(d);
		});
	}};
	$A(this.modCtn.cols).each(function(col) {
		opt4sortable = Object.extend(opt4sortable, {onUpdate:this.saveModsOrder.bind(this)});
		Sortable.create(col, opt4sortable);
	}.bind(this));
	if (App.Permit.ableLog) {
		Log._t_RegModObsEnd = {};
		Log._t_RegModObsEnd[this.options.id] = new Date().getTime();
		$LT('App.PageTab[id:' + this.options.id + '] regModObservers end (' + (Log._t_RegModObsEnd[this.options.id] - Log._t_RegModObs[this.options.id]) + ')');
	}
},disRegModObservers:function() {
	$A(this.modCtn.cols).each(function(col) {
		Sortable.destroy(col);
	});
},drag_snap:function(l, t) {
	var _l = Math.max(0, Math.min(l, screen.availWidth));
	var _t = Math.max(30, t);
	return[_l,_t];
},active:function(byHash) {
	if (this.options.isActive) {
		return;
	}
	App.PageTabs.disActiveAll();
	this.options.isActive = true;
	Element.addClassName(this.element, 'active');
	App.PageTabs.showModCtnInfo(this);
	if (this.pl.ableSetTit && App.Permit.editPageTab) {
		this.elm_title.title = App.Lang.clk2chgPageName;
	}
	if (this.elm_del && this.elm_opt) {
		Element.show(this.elm_del, this.elm_opt);
	}
	this.modCtn.active();
	if (!this.loaded) {
		this.createMods();
	}
	if (!byHash) {
		App.PageTabs.setHash(this);
	}
	App.Framework.updateNewModMenuContent();
},disActive:function() {
	if (!this.options.isActive) {
		return;
	}
	this.options.isActive = false;
	Element.removeClassName(this.element, 'active');
	App.PageTabs.hideModCtnInfo();
	this.elm_title.title = '';
	if (this.elm_del && this.elm_opt) {
		Element.hide(this.elm_del, this.elm_opt);
	}
	this.modCtn.disActive();
	this.hideOptMenu();
	this.saveTitle();
},editTitle:function() {
	Element.hide(this.elm_ico, this.elm_title, this.elm_del, this.elm_opt);
	var inputElm = document.createElement("input");
	this.elm_titleIpt = inputElm;
	inputElm.type = "text";
	inputElm.value = this.options.title;
	inputElm.style.width = ((this.options.title.length * 12) + 20) + 'px';
	this.element.appendChild(inputElm);
	inputElm.focus();
	inputElm.select();
	Event.observe(inputElm, 'keydown', this.onTitleEnterDown.bindAsEventListener(this));
	inputElm.onkeyup = function() {
		this.style.width = (this.value.length * 12) + 20 + "px";
	};
	Event.observe(inputElm, 'blur', this.saveTitle.bindAsEventListener(this));
	this.editingTitle = true;
},onTitleEnterDown:function(e) {
	if (Browser.ua != 'other') {
		if (e.keyCode == 13) {
			this.saveTitle();
		}
	}
},saveTitle:function() {
	if (!this.editingTitle) {
		return;
	}
	this.editingTitle = false;
	var value = this.elm_titleIpt.value;
	value = (value.trim() == '') ? this.options.title : value.convertTextToHTML();
	if (value == this.options.title) {
		this.endEditTitle();
		return;
	}
	if (getTureLength(value) > 12) {
		var str = App.Lang.pageTitleTooLong + '(' + getTureLength(value) + App.Lang.byte + ')';
		str += '\n' + App.Lang.reduceTo + '12' + App.Lang.word + '(6' + App.Lang.chsWord + ')';
		str += '\n\n';
		str += App.Lang.confirmToEdit;
		str += '\n';
		str += App.Lang.cannelThisOperation;
		if (confirm(str)) {
			this.elm_titleIpt.focus();
			this.elm_titleIpt.select();
			this.editingTitle = true;
		} else {
			this.endEditTitle();
		}
		return;
	}
	this.newTitle = value;
	App.Requester.request('editPageTitle', this);
},doSaveTitle:function(data) {
	var value = this.newTitle;
	if (data && Element.getChildValueByTagName(data, 'data')[0]) {
		var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
		if (opt.title) {
			value = opt.title;
		}
	}
	this.options.title = value;
	this.elm_title.innerHTML = value;
	if (this.elm_ico) {
		this.elm_ico.alt = value;
	}
	this.endEditTitle();
},endEditTitle:function() {
	Element.remove(this.elm_titleIpt);
	Element.show(this.elm_ico, this.elm_title);
	if (this.elm_del && this.elm_opt) {
		Element.show(this.elm_del, this.elm_opt);
	}
	this.editingTitle = false;
},hasNoDelMod:function() {
	var arr = [];
	$A(this.options.mods.flatten()).each(function(id) {
		var mod = App.Modules.getObjById(id);
		var w = App.WidgetLib.getWidget(mod.options.type);
		if (mod && w && !w.ableDel) {
			arr.push(mod);
		}
	}.bind(this));
	return arr;
},close:function() {
	if (App.PageTabs.pTabs.length <= 1) {
		var opt4popWin = {type:'alert',title:App.Lang.error,content:App.Lang.cannotDelOnlyPage};
		var aa = new PopWin(opt4popWin);
		return;
	}
	var pubPTabs = App.PageTabs.getPublicTabs();
	if (this.options.permit == 0 && pubPTabs.length <= 1) {
		var opt4popWin = {type:'alert',title:App.Lang.error,content:App.Lang.cannotDelOnlyPubPage};
		var aa = new PopWin(opt4popWin);
		return;
	}
	var noDelMods = this.hasNoDelMod();
	if (noDelMods.length > 0) {
		var str = '';
		str += App.Lang.hasNoDelMods;
		str += ':';
		noDelMods.each(function(m, i) {
			if (i != 0) {
				str += ',';
			}
			str += '[' + m.options.title + ']';
		});
		str += '\n';
		str += '\n';
		str += App.Lang.cannotDelNoDelModPage;
		var opt4popWin = {type:'alert',title:App.Lang.error,content:str};
		var aa = new PopWin(opt4popWin);
		return;
	}
	var opt4popWin = {type:'confirm',content:App.Lang.confirmDelPage,focus:false,okAction:this.acceptClose.bind(this)};
	var aa = new PopWin(opt4popWin);
},acceptClose:function() {
	App.Requester.request('delPage', this);
},doClose:function() {
	this.destroy();
},getPermitOpt:function() {
	var divSubContent = document.createElement('div');
	divSubContent.className = this.options.isDivCss + ' clearfix';
	var arr = [];
	arr.push('<ul>');
	arr.push('<li><label for="pagePub_' + this.options.id + '">');
	arr.push('<input type="radio" id="pagePub_' + this.options.id + '" name="pagePermit_' + this.options.id + '" value="0"' + (this.options.permit == 0 ? ' checked="checked"' : '') + ' />' + App.Lang.pagePublic);
	arr.push('</label></li>');
	arr.push('<li><label for="pagePri_' + this.options.id + '">');
	arr.push('<input type="radio" id="pagePri_' + this.options.id + '" name="pagePermit_' + this.options.id + '" value="1"' + (this.options.permit != 0 ? ' checked="checked"' : '') + ' />' + App.Lang.pagePrivate);
	arr.push('</label></li>');
	arr.push('</ul>');
	divSubContent.innerHTML = arr.join('');
	this.optPub = divSubContent.firstChild.childNodes[0].firstChild.firstChild;
	this.optPri = divSubContent.firstChild.childNodes[1].firstChild.firstChild;
	Event.observe(this.optPub, "click", function() {
		this.setPermit(0);
		if (this.optMenu) {
			this.optMenu.hide();
		}
	}.bind(this));
	Event.observe(this.optPri, "click", function() {
		this.setPermit(1);
		if (this.optMenu) {
			this.optMenu.hide();
		}
	}.bind(this));
	return divSubContent;
},setOpt:function() {
	if (!this.optMenu) {
		var opt4winMenu = {menuData:[],title:App.Lang.pageOpt,btn:this.element,sDivCss:'menuSub-div menuSub-div-colStyle'};
		if (this.pl.ableSetCol) {
			var menuData_colStyle = {title:App.Lang.pageLayout,active:true,isDivCssEx:'menuInnerSub-div-colStyle',data:[]};
			$H(App.colStyleLib).each(function(s) {
				menuData_colStyle.data.push({text:'<img src="' + App.Actions.imgPath + s.value + '" alt="' + s.key + '" />',title:s.key,action:this.setColStyle.bind(this),value:s.key,active:(this.options.colStyle == s.key)});
			}.bind(this));
			opt4winMenu.menuData.push(menuData_colStyle);
		}
		if (this.pl.ableSetIco) {
			var menuData_ico = {title:App.Lang.pageIcon,active:false,isDivCssEx:'menuInnerSub-div-ico',data:[]};
			$A(App.icoLib).each(function(ico, i) {
				menuData_ico.data.push({text:'<img src="' + App.Actions.imgPath + App.Actions.icoShortPath + ico + '" alt="' + '[' + i + ']:' + ico + '" />',title:'[' + i + ']:' + ico,action:this.setIcon.bind(this),value:i,active:(this.options.ico == i)});
			}.bind(this));
			opt4winMenu.menuData.push(menuData_ico);
		}
		if (this.pl.ableSetPer) {
			opt4winMenu.menuData.push({title:App.Lang.pagePermit,active:false,data:this.getPermitOpt.bind(this)});
		}
		this.optMenu = new WinMenu(opt4winMenu);
	}
	if (!this.optMenu.showing) {
		App.PageTabs.hideOptMenuAll();
		this.showOptMenu();
	} else {
		this.hideOptMenu();
	}
},showOptMenu:function() {
	if (!this.optMenu) {
		return;
	}
	this.optMenu.show();
},hideOptMenu:function() {
	if (!this.optMenu) {
		return;
	}
	this.optMenu.hide();
},setColStyle:function(colStyle) {
	if (!colStyle || colStyle == this.options.colStyle) {
		return;
	}
	this.newColStyle = colStyle;
	App.Requester.request('editPageColStyle', this);
},doSetColStyle:function(data) {
	var colStyle = this.newColStyle;
	if (data && Element.getChildValueByTagName(data, 'data')[0]) {
		var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
		if (opt.colStyle) {
			colStyle = opt.colStyle;
		}
	}
	this.options.colStyle = colStyle;
	this.modCtn.setColStyle(colStyle);
},setIcon:function(ico) {
	if (ico == this.options.ico) {
		return;
	}
	this.newIco = ico;
	App.Requester.request('editPageIco', this);
},doSetIcon:function(data) {
	var ico = this.newIco;
	if (data && Element.getChildValueByTagName(data, 'data')[0]) {
		var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
		if (opt.ico) {
			ico = opt.ico;
		}
	}
	this.options.ico = ico;
	if (this.options.ico == 0) {
		this.elm_ico.src = App.Actions.imgPath + 'spacer.gif';
		this.elm_ico.style.width = '1px';
	} else {
		this.elm_ico.src = App.Actions.imgPath + App.Actions.icoShortPath + App.icoLib[this.options.ico];
		this.elm_ico.style.width = '16px';
	}
},hasPrivateMod:function() {
	var arr = [];
	$A(this.options.mods.flatten()).each(function(id) {
		var mod = App.Modules.getObjById(id);
		if (mod && App.WidgetLib.getWidget(mod.options.type).private) {
			arr.push(mod);
		}
	}.bind(this));
	return arr;
},setPermit:function(permit) {
	if (permit == this.options.permit) {
		return;
	}
	if (permit == 0) {
		var priMods = this.hasPrivateMod();
		if (priMods.length > 0) {
			var str = '';
			str += App.Lang.hasPriveMods;
			str += ':';
			priMods.each(function(m, i) {
				if (i != 0) {
					str += ',';
				}
				str += '[' + m.options.title + ']';
			});
			str += '\n';
			str += '\n';
			str += App.Lang.cannotSetPublic;
			var opt4popWin = {type:'alert',title:App.Lang.error,content:str};
			var aa = new PopWin(opt4popWin);
			this.optPub.checked = false;
			this.optPri.checked = true;
			return;
		}
	} else {
		var priPT = App.PageTabs.getPrivateTabs();
		if (priPT.length == App.PageTabs.pTabs.length - 1) {
			var str = '';
			str += App.Lang.cannotAllPrivate;
			var opt4popWin = {type:'alert',title:App.Lang.error,content:str};
			var aa = new PopWin(opt4popWin);
			this.optPub.checked = true;
			this.optPri.checked = false;
			return;
		}
	}
	this.newPermit = permit;
	App.Requester.request('editPagePermit', this);
},doSetPermit:function(data) {
	var permit = this.newPermit;
	if (data && Element.getChildValueByTagName(data, 'data')[0]) {
		var opt = JSON.parse(Element.getChildValueByTagName(data, 'data')[0])[0];
		if (opt.permit) {
			permit = opt.permit;
		}
	}
	this.options.permit = permit;
	if (this.options.permit == 0) {
		Element.removeClassName(this.element, 'private');
	} else {
		Element.addClassName(this.element, 'private');
	}
	App.PageTabs.showModCtnInfo(this);
	App.Framework.updateNewModMenuContent();
},regDrop:function() {
	if (App.Permit.ableLog) {
		$LT('App.PageTab[id:' + this.options.id + '] regDrop');
	}
	var opt4drop = {accept:'mod',hoverclass:'hover',onHover:this.onHover.bind(this),onDrop:this.onDrop.bind(this)};
	Droppables.add(this.element, opt4drop);
},disRegDrop:function() {
	Droppables.remove(this.element);
},onHover:function(drag, droponElm) {
	var mod = App.Modules.getObjByElement(drag.element);
	if (mod.options.page.element == this.element) {
		Sortable.target(drag, drag.element.parentNode);
		Sortable.targetMark();
		return;
	}
	Sortable.untarget();
},onDrop:function(drag, droponElm, event) {
	var mod = App.Modules.getObjByElement(drag.element);
	var oldPTab = mod.options.page;
	if (oldPTab.element == this.element) {
		return;
	}
	if (App.WidgetLib.getWidget(mod.options.type).private && this.options.permit == 0) {
		var str = '';
		str += App.Lang.movePriMod2PubPage;
		str += '\n';
		str += App.Lang.cannotMovePriMod2PubPage;
		var opt4popWin = {type:'alert',title:App.Lang.error,content:str};
		var aa = new PopWin(opt4popWin);
		return;
	}
	if (this.loaded) {
		mod.options.page = this;
		this.modCtn.cols[0].insertBefore(drag.element, this.modCtn.cols[0].firstChild);
		oldPTab.saveModsOrder();
		this.saveModsOrder();
	} else {
		mod.destroy(true);
		this.options.mods[0].unshift(mod.options.id);
		this.saveModsOrder('doToServer');
	}
}};
App.ModContainers = {mCtns:[],register:function(mCtn) {
	$(mCtn.options.placeIn).appendChild(mCtn.element);
	this.mCtns.push(mCtn);
},unregister:function(mCtn) {
	this.mCtns = this.mCtns.reject(function(m) {
		return m == mCtn;
	});
}};
App.ModContainer = Class.create();
App.ModContainer.prototype = {initialize:function(options, isInit) {
	if (App.Permit.ableLog) {
		$LT('App.ModContainer.initialize');
	}
	this.options = Object.extend({colStyle:App.defaultColStyle,isActive:false,placeIn:document.body}, options || {});
	this.cols = [];
	this.build();
	App.ModContainers.register(this);
},destroy:function() {
	if (!this.element) {
		return;
	} else {
		Element.remove(this.element);
		this.element = null;
	}
	App.ModContainers.unregister(this);
},build:function() {
	var tableModContainer = document.createElement('table');
	this.element = tableModContainer;
	tableModContainer.id = 'modContainerTable';
	tableModContainer.cellSpacing = '0';
	tableModContainer.cellPadding = '0';
	if (!this.options.isActive) {
		Element.hide(tableModContainer);
	}
	var containerContent = this.element.insertRow(0);
	this.content = containerContent;
	this.doSetColStyle(true);
},setColStyle:function(colStyle) {
	if (colStyle && colStyle != App.colStyle) {
		this.options.colStyle = colStyle;
		this.doSetColStyle();
	}
},doSetColStyle:function(isInit) {
	this.colsRate = this.options.colStyle.split(':');
	var colsClone = this.cols;
	var changeCol = (this.colsRate.length != colsClone.length);
	var updateOrder = (this.colsRate.length < colsClone.length);
	$A((this.colsRate.length > colsClone.length) ? this.colsRate : colsClone).each(function(c, i) {
		if (this.colsRate[i] && !colsClone[i]) {
			this.addCol();
		}
		if (colsClone[i] && !this.colsRate[i]) {
			this.delCol();
		}
		if (colsClone[i] && this.colsRate[i]) {
			this.cols[i].style.width = (isNaN(this.colsRate[i]) ? 100 : this.colsRate[i]) + '%';
		}
	}.bind(this));
	if (Browser.ua == 'opera') {
		Element.hide(this.element);
		Element.show(this.element);
	}
	if (!isInit) {
		this.pageTab.regModObservers();
		if (updateOrder) {
			this.pageTab.saveModsOrder();
		}
	}
},addCol:function() {
	var id = this.cols.length;
	var col = document.createElement('td');
	col.className = 'col';
	col.id = App.colId_prefix + (id + 1);
	this.content.appendChild(col);
	this.cols.push(col);
},delCol:function() {
	var id = this.cols.length - 1;
	var col = this.cols[id];
	$A(col.childNodes).each(function(mod) {
		this.cols[id - 1].appendChild(mod);
	}.bind(this));
	Element.remove(col);
	this.cols = this.cols.reject(function(c) {
		return c == col;
	});
},active:function() {
	Element.show(this.element);
},disActive:function() {
	Element.hide(this.element);
}};
window.onunload = function() {
	try {
		App.PageTabs.stopListenHash();
		App.Modules.unregisterAll();
		delete App;
		App = null;
	} catch(e) {
	}
};
App.Modules = {modules:[],register:function(mod, isInit) {
	if (!mod.options.placeBefore) {
		$(mod.options.placeIn).appendChild(mod.element);
	} else if ($(mod.options.placeBefore)) {
		$(mod.options.placeIn).insertBefore(mod.element, $(mod.options.placeBefore));
	}
	if (mod.options.floating) {
		mod.element.style.position = 'absolute';
		mod.element.style.left = mod.options.floating[0] + 'px';
		mod.element.style.top = mod.options.floating[1] + 'px';
		mod.element.style.width = mod.options.floating[2] + 'px';
		var options4Resizable = {defaultWidth:mod.options.floating[2],defaultHeight:mod.options.floating[3]};
		this.registerResizable(mod, options4Resizable);
	}
	this.modules.push(mod);
	if (!isInit) {
		if (Browser.ua.indexOf('ie') < 0) {
			var aa = new Effect.Highlight(mod.element, {duration:0.3,queue:'front'});
			var aa = new Effect.Highlight(mod.element, {duration:0.5,queue:'end'});
			var aa = new Effect.Highlight(mod.element, {duration:1.0,queue:'end'});
		}
	}
},unregister:function(mod) {
	this.unregisterResizable(mod);
	this.modules = this.modules.reject(function(m) {
		return m == mod;
	});
},unregisterAll:function() {
	try {
		for (var i = 0; i < this.modules.length; i++) {
			this.modules[i].destroy();
			delete this.modules[i];
			this.modules[i] = null;
		}
	} catch(e) {
	}
},showAll:function() {
	this.modules.each(function(m, i) {
		m.swapShowHide(true);
	});
},hideAll:function() {
	this.modules.each(function(m) {
		m.swapShowHide(false);
	});
},registerResizable:function(mod, options) {
	if (!mod) {
		return;
	}
	if (mod.resizeObj) {
		return;
	}
	var options4Resizable = Object.extend({able:App.Permit.resize,addons:'modCon',snap:this.resize_snap,change:this.resize_change,update:function(resizeable) {
		App.Modules.getObjByElement(resizeable.element).setFloat();
	}}, options || {});
	mod.resizeObj = new App.Resizable(mod.element, options4Resizable);
},unregisterResizable:function(mod) {
	if (!mod) {
		return;
	}
	if (mod.resizeObj) {
		mod.resizeObj.destroy();
		mod.resizeObj = null;
	}
},resize_snap:function(element, w, h) {
	var _w = Math.max(180, Math.min(w, screen.availWidth));
	var _h = Math.max(20, Math.min(h, screen.availHeight));
	return([_w,_h]);
},resize_change:function(resizable) {
	var w = parseInt(Element.getStyle(resizable.element, 'width'));
	var h = parseInt(Element.getStyle(resizable.element, 'height'));
	var _w = Math.max(180, Math.min(w, screen.availWidth));
	var _h = Math.max(resizable.element.firstChild.offsetHeight, Math.min(h, screen.availHeight));
	resizable.element.style.width = _w + 'px';
	resizable.element.style.height = _h + 'px';
},getObjByElement:function(element) {
	return this.modules.find(function(o) {
		return(o.element == element);
	});
},getObjByType:function(type) {
	return this.modules.find(function(o) {
		return(o.options.type == type);
	});
},getObjById:function(id) {
	return this.modules.find(function(o) {
		return(o.options.id == id);
	});
},newMod:function(type) {
	if (App.PageTabs.getActivePTab()) {
		this.curPTab = App.PageTabs.getActivePTab();
	} else {
		this.curPTab = App.PageTabs.pTabs[0];
	}
	if (this.curPTab.options.mods.flatten().length >= App.maxPerPageModCount) {
		var opt4popWin = {type:'alert',title:App.Lang.info,content:App.Lang.tooManyModsInOnePage};
		var aa = new PopWin(opt4popWin);
		return;
	}
	this.opt4newMod = {type:type,title:''};
	App.Requester.request('new', {options:this.opt4newMod});
},doNewMod:function(data) {
	if (!data) {
		return;
	}
	var mod = data.getElementsByTagName('mod')[0];
	var opt4newModPre = {page:this.curPTab || App.PageTabs.pTabs[0],id:mod.getAttribute('id') || '',type:mod.getAttribute('type') || this.opt4newMod.type || '',title:Element.getChildValueByTagName(mod, 'title')[0] || this.opt4newMod.title || '',data:Element.getChildValueByTagName(mod, 'data')[0] ? JSON.parse(Element.getChildValueByTagName(mod, 'data')[0]) : this.opt4newMod.data || '',placeIn:this.curPTab.modCtn.cols[0],placeBefore:this.curPTab.modCtn.cols[0].firstChild};
	var aa = new App.Module(opt4newModPre);
	setTimeout(function() {
		this.curPTab.regModObservers();
		this.curPTab.saveModsOrder();
		App.Framework.updateNewModMenuContent();
	}.bind(this), 100);
}};
App.Module = Class.create();
App.Module.prototype = {initialize:function(options, isInit) {
	this.options = Object.extend({id:null,type:null,isExpanded:true,share:true,floating:false,title:'',data:null,page:null,placeIn:document.body,placeBefore:null,newMode:false}, options || {});
	Object.extend(this.options, {editMode:false,loaded:false,loadTime:0,maxLoadTime:App.maxWidgetLoadTime});
	this.build();
	this.m_content = this.getModuleContent();
	if (App.Permit.editModule) {
		this.m_edit = this.getEditContent();
		this.hideEditMode();
		this.hideEditBtn();
	}
	if (!this.options.newMode) {
		this.hideRefreshBtn();
	}
	this.setIco();
	this.options.isExpanded ? '' : this.swapShowHide(false, isInit);
	App.Modules.register(this, isInit);
	if (isInit) {
		this.waitToAttachContent();
	} else {
		App.UserData.addMod(this.options);
		this.attachContent();
	}
},destroy:function(noUnloadPage) {
	if (this.content && this.content.destroy) {
		try {
			this.content.destroy();
			this.content = null;
		} catch(e) {
		}
	}
	Element.remove(this.element);
	if (noUnloadPage) {
		this.options.page.saveModsOrder();
		App.Framework.updateNewModMenuContent();
	} else {
		this.options.page.saveModsOrder('noToServer');
	}
	App.Modules.unregister(this);
},build:function(event) {
	var divModule = document.createElement('div');
	this.element = divModule;
	divModule.className = 'mod';
	divModule.id = this.options.id;
	var arr = [];
	arr.push('<div class="modFrame">');
	arr.push('<table cellspacing="0" cellpadding="0" class="modTable">');
	arr.push('<thead><tr>');
	arr.push('<td class="mheader lt"></td>');
	arr.push('<td class="mheader t"><div class="modHeader clearfix"></div></td>');
	arr.push('<td class="mheader rt"></td>');
	arr.push('</tr></thead>');
	arr.push('<tbody>');
	if (!App.Permit.editModule) {
		arr.push('<tr style="display:none;">');
	} else {
		arr.push('<tr>');
	}
	arr.push('<td class="mneck l"></td>');
	arr.push('<td class="mneck ec"><div class="modEditCon"></div></td>');
	arr.push('<td class="mneck r"></td>');
	arr.push('</tr>');
	arr.push('<tr>');
	arr.push('<td class="mbody l"></td>');
	arr.push('<td class="mbody c"><div class="modCon">' + App.Lang.loading + '</div></td>');
	arr.push('<td class="mbody r"></td>');
	arr.push('</tr></tbody>');
	arr.push('<tfoot><tr>');
	arr.push('<td class="mfooter lb"></td>');
	arr.push('<td class="mfooter b"></td>');
	arr.push('<td class="mfooter rb"></td>');
	arr.push('</tr></tfoot>');
	arr.push('</table>');
	arr.push('</div>');
	divModule.innerHTML = arr.join('');
	arr = null;
	this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
	var divModuleHeader = this.getModTable().firstChild.firstChild.childNodes[1].firstChild;
	if (!this.options.newMode) {
		var divShowHide = document.createElement('div');
		this.elm_showHide = divShowHide;
		divShowHide.className = 'modShow';
		divShowHide.title = App.Lang.showHideModuleBtnTitle;
		Event.observe(divShowHide, 'mousedown', this.eventCancelBubble);
		this.eventSwapShowHide = this.swapShowHide.bindAsEventListener(this);
		Event.observe(divShowHide, 'click', this.eventSwapShowHide);
		divModuleHeader.appendChild(divShowHide);
	}
	if (App.Permit.editModule) {
		if (!this.options.newMode) {
			var divClose = document.createElement('div');
			this.elm_close = divClose;
			divClose.className = 'modCls';
			var clsAlt = '';
			if (App.WidgetLib.getWidget(this.options.type) && App.WidgetLib.getWidget(this.options.type).sys) {
				clsAlt = App.Lang.hideModuleBtnTitle;
			} else {
				clsAlt = App.Lang.delModuleBtnTitle;
			}
			divClose.title = clsAlt;
			Event.observe(divClose, 'mousedown', this.eventCancelBubble);
			this.eventClose = this.close.bindAsEventListener(this);
			Event.observe(divClose, 'click', this.eventClose);
			divModuleHeader.appendChild(divClose);
		}
		var divEdit = document.createElement('div');
		this.elm_edit = divEdit;
		divEdit.className = 'modEdit';
		divEdit.innerHTML = '<a href="javascript:void(0)">' + App.Lang.setBtn + '</a>';
		Event.observe(divEdit, 'mousedown', this.eventCancelBubble);
		this.eventSwapEdit = this.swapEditMode.bindAsEventListener(this);
		Event.observe(divEdit, 'click', this.eventSwapEdit);
		divModuleHeader.appendChild(divEdit);
	}
	if (!this.options.newMode) {
		var divRefresh = document.createElement('div');
		this.elm_refresh = divRefresh;
		divRefresh.className = 'modRfs';
		divRefresh.title = App.Lang.refreshModuleBtnTitle;
		Event.observe(divRefresh, 'mousedown', this.eventCancelBubble);
		this.eventRefresh = this.refresh.bindAsEventListener(this);
		Event.observe(divRefresh, 'click', this.eventRefresh);
		divModuleHeader.appendChild(divRefresh);
	}
	var divIco = document.createElement('div');
	this.elm_ico = divIco;
	divIco.className = 'modIco';
	divIco.innerHTML = '<img src="' + App.Actions.imgPath + 'spacer.gif" />';
	divModuleHeader.appendChild(divIco);
	var divTitle = document.createElement('div');
	this.elm_title = divTitle;
	divTitle.className = 'modTitle';
	divTitle.innerHTML = this.options.title || App.Lang.createModule;
	divModuleHeader.appendChild(divTitle);
},getModTable:function() {
	return(this.element.firstChild.firstChild);
},getEditPanel:function() {
	var mod_table = this.getModTable();
	var editPanel = mod_table.childNodes[1].firstChild;
	return editPanel;
},getContentPanel:function() {
	var mod_table = this.getModTable();
	var contentPanel = mod_table.childNodes[1].childNodes[1];
	return contentPanel;
},getEditContent:function() {
	var editPanel = this.getEditPanel();
	var editContent = editPanel.childNodes[1].firstChild;
	return editContent;
},getModuleContent:function() {
	var contentPanel = this.getContentPanel();
	var moduleContent = contentPanel.childNodes[1].firstChild;
	return moduleContent;
},setIco:function(src) {
	if (!src) {
		Element.hide(this.elm_ico);
		return;
	}
	var _img = this.elm_ico.firstChild;
	_img.src = src;
	_img.onload = function() {
		if (this.height > 16) {
			this.height = '16';
		}
	};
	Element.show(this.elm_ico);
},setTitle:function(title, cover) {
	if (!title) {
		return;
	}
	if (this.options.title && !cover) {
		return;
	}
	this.elm_title.innerHTML = title;
},getTitle:function() {
	return(this.elm_title.innerHTML);
},setFloat:function() {
	this.options.floating = [parseInt(Element.getStyle(this.element, 'left')),parseInt(Element.getStyle(this.element, 'top')),parseInt(Element.getStyle(this.element, 'width')),parseInt(Element.getStyle(this.element, 'height'))];
	App.Requester.request('float', this);
},showRefreshBtn:function() {
	Element.show(this.elm_refresh);
},hideRefreshBtn:function() {
	Element.hide(this.elm_refresh);
},refresh:function(event) {
	if (this.content && this.content.refresh && this.options.loaded) {
		this.options.loaded = false;
		this.content.refresh();
	}
},loaded:function() {
	this.options.loaded = true;
},showCloseBtn:function() {
	Element.show(this.elm_close);
},hideCloseBtn:function() {
	Element.hide(this.elm_close);
},close:function() {
	var opt4popWin = {type:'confirm',content:(App.WidgetLib.getWidget(this.options.type) && App.WidgetLib.getWidget(this.options.type).sys) ? App.Lang.confirmHideModule : App.Lang.confirmDelModule,focus:false,okAction:this.acceptClose.bind(this)};
	var aa = new PopWin(opt4popWin);
},acceptClose:function() {
	App.Requester.request('del', this);
},doClose:function() {
	App.UserData.delMod(this.options);
	this.destroy(true);
},swapShowHide:function(opr, isInit) {
	this.lastIsExpanded = this.options.isExpanded;
	if (typeof arguments[0] == 'boolean') {
		arguments[0] ? this.show() : this.hide();
	} else {
		this.options.isExpanded ? this.hide() : this.show();
	}
	if (App.Permit.editModule && !isInit && (typeof opr == 'undefined' || opr != this.lastIsExpanded)) {
		App.Requester.request('expand', this);
	}
},show:function(notSetOpt) {
	Element.show(this.getContentPanel());
	if (this.resizeObj) {
		(Browser.ua == 'opera') ? setTimeout((function() {
			this.resizeObj.adjustSize(false, true);
		}).bind(this), 10) : this.resizeObj.adjustSize(false, true);
		this.resizeObj.options.constraint = this.resizeObj.defaultConstraint;
	}
	if (Element.hasClassName(this.elm_showHide, 'modHide')) {
		Element.removeClassName(this.elm_showHide, 'modHide');
	}
	Element.addClassName(this.elm_showHide, 'modShow');
	if (!notSetOpt) {
		this.options.isExpanded = true;
	}
},hide:function(notSetOpt) {
	Element.hide(this.getContentPanel());
	if (this.resizeObj) {
		(Browser.ua == 'opera') ? setTimeout((function() {
			this.resizeObj.adjustSize(false, true);
		}).bind(this), 10) : this.resizeObj.adjustSize(false, true);
		this.resizeObj.defaultConstraint = this.resizeObj.options.constraint;
		this.resizeObj.options.constraint = 'horizontal';
	}
	if (Element.hasClassName(this.elm_showHide, 'modShow')) {
		Element.removeClassName(this.elm_showHide, 'modShow');
	}
	Element.addClassName(this.elm_showHide, 'modHide');
	if (!notSetOpt) {
		this.options.isExpanded = false;
	}
},showEditBtn:function() {
	Element.show(this.elm_edit);
},hideEditBtn:function() {
	Element.hide(this.elm_edit);
},swapEditMode:function() {
	this.options.editMode ? this.closeEdit() : this.edit();
},edit:function(event) {
	this.options.editMode = true;
	if (this.content && this.content.edit) {
		this.content.edit();
	}
	this.showEditMode();
	this.show();
},closeEdit:function(event) {
	this.options.editMode = false;
	if (this.content && this.content.onCloseEdit) {
		this.content.onCloseEdit();
	}
	this.hideEditMode();
},save:function(data, title) {
	if (!data && title === null) {
		return;
	}
	if (typeof data != 'undefined' && data) {
		this.options.data = data;
	}
	if (typeof title != 'undefined' && title !== null) {
		this.options.title = title;
	}
	App.Requester.request('edit', this);
},endSave:function() {
	if (this.content && this.content.endSave) {
		this.content.endSave();
	}
	this.closeEdit();
},showEditMode:function() {
	var editPanel = this.getEditPanel();
	Element.show(editPanel);
	if (this.resizeObj) {
		(Browser.ua == 'opera') ? setTimeout((function() {
			this.resizeObj.adjustSize(false, true);
		}).bind(this), 10) : this.resizeObj.adjustSize(false, true);
	}
	this.setCloseEditBtn();
},hideEditMode:function() {
	var editPanel = this.getEditPanel();
	Element.hide(editPanel);
	if (this.resizeObj) {
		(Browser.ua == 'opera') ? setTimeout((function() {
			this.resizeObj.adjustSize(false, true);
		}).bind(this), 10) : this.resizeObj.adjustSize(false, true);
	}
	this.setEditBtn();
},setEditBtn:function() {
	this.elm_edit.firstChild.innerHTML = App.Lang.setBtn;
},setCloseEditBtn:function() {
	this.elm_edit.firstChild.innerHTML = App.Lang.closeSetBtn;
},waitToAttachContent:function() {
	if (Browser.ua.indexOf('ie') >= 0 && !this.options.newMode) {
		if (this.options.page.loaded) {
			if (this.options.fastLoad == 0) {
				var rndWaitTime = Math.round(500 * Math.random());
			} else if (this.options.fastLoad == 1) {
				var rndWaitTime = Math.round(1000 * Math.random() + 500);
			} else {
				var rndWaitTime = Math.round(2000 * Math.random() + 1500);
			}
			setTimeout(this.attachContent.bind(this), rndWaitTime);
		} else {
			setTimeout(this.waitToAttachContent.bind(this), 100);
		}
	} else {
		this.attachContent();
	}
},attachContent:function() {
	if (!App.WidgetLib.getWidget(this.options.type)) {
		this.showWidgetError();
		return;
	}
	this.showWidgetLoading();
	if (App.Widgets[this.options.type]) {
		this.initWidget();
	} else {
		var aa = new App.Widget(this.options.type);
		this.waitForAttachContent();
	}
},waitForAttachContent:function() {
	if (!App.Widgets.hasRegistered(this.options.type)) {
	}
	if (App.Widgets[this.options.type]) {
		this.initWidget();
	} else if (this.options.loadTime < this.options.maxLoadTime) {
		this.options.loadTime += 100;
		setTimeout(this.waitForAttachContent.bind(this), 100);
	} else {
		App.Widgets.unregister(this.options.type);
		this.showWidgetInfo();
	}
},initWidget:function() {
	var widget = App.WidgetLib.getWidget(this.options.type);
	this.setWidgetData(widget);
	this.w_path = widget.path;
	this.content = new App.Widgets[this.options.type](this.options.data, this.m_content, this.m_edit, this.w_path);
	this.content.id = this.options.id;
	this.content.setIco = this.setIco.bind(this);
	this.content.setTitle = this.setTitle.bind(this);
	this.content.getTitle = this.getTitle.bind(this);
	if (App.Permit.editModule && typeof this.content.edit == 'function') {
		this.showEditBtn();
		this.content.save = this.save.bind(this);
		this.content.closeEdit = this.closeEdit.bind(this);
	}
	if (typeof this.content.refresh == 'function') {
		if (!this.options.newMode) {
			this.showRefreshBtn();
		}
		this.content.loaded = this.loaded.bind(this);
	}
	if (App.Permit.editModule && !this.options.newMode) {
		if (widget.ableDel) {
			this.showCloseBtn();
		} else {
			this.hideCloseBtn();
		}
	}
	this.content.initialize();
},showWidgetLoading:function() {
	var str = '';
	str += App.Lang.loadWidget;
	this.m_content.innerHTML = str;
},showWidgetError:function() {
	var str = '';
	str += App.Lang.widgetError + '[' + this.options.type + ']';
	this.m_content.innerHTML = str;
},setWidgetData:function(widget) {
	if (!this.options.title) {
		this.setTitle(widget.title || '');
	}
	if (!this.options.ico && widget.ico) {
		this.setIco(widget.ico);
	} else {
		this.setIco();
	}
	Element.addClassName(this.m_content, this.options.type + '-content');
	Element.addClassName(this.m_edit, this.options.type + '-edit');
	this.m_content.innerHTML = '';
},showWidgetInfo:function() {
	var str = '';
	str += App.Lang.loadTimeout;
	str += App.Lang.reloadPage;
	str += '<br /><br />' + App.Lang.loadWidgetTimeout + '[' + this.options.type + ']';
	this.m_content.innerHTML = str;
}};
App.Widgets = {registered:[],register:function(widget) {
	if (this.hasRegistered(widget.type)) {
		return;
	}
	this.registered.push(widget);
},hasRegistered:function(type) {
	return(this.registered.find(function(w) {
		return w.type == type;
	}) ? true : false);
},unregister:function(type) {
	this.registered = this.registered.reject(function(w) {
		return w.type == type;
	});
},getWidget:function(type) {
	return(this.registered.find(function(w) {
		return w.type == type;
	}));
}};
App.Widget = Class.create();
App.Widget.prototype = {initialize:function(type) {
	var widget;
	if (!(widget = App.WidgetLib.getWidget(type))) {
		return false;
	}
	if (App.Widgets.hasRegistered(type)) {
		return;
	}
	Object.extend(this, widget);
	this.analyse();
	App.Widgets.register(this);
},analyse:function(request) {
	var baseWidgetPath = this.path;
	var ico = this.ico.trim();
	if (ico && ico.indexOf('http://') !== 0 && ico.indexOf('/') !== 0) {
		ico = baseWidgetPath + (ico || '');
	}
	this.ico = ico;
	$A(this.js).each(function(f, i) {
		if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
			this.js[i] = baseWidgetPath + f;
		}
	}.bind(this));
	$A(this.css).each(function(f, i) {
		if (f.indexOf('http://') !== 0 && f.indexOf('/') !== 0) {
			this.css[i] = baseWidgetPath + f;
		}
	}.bind(this));
	this.loadLib();
},loadLib:function() {
	$A(this.css).each(function(c) {
		var aa = new LinkFile(c, {type:'css'});
	});
	$A(this.js).each(function(c) {
		(Browser.ua == 'opera') ? setTimeout(function() {
			var aa = new LinkFile(c, {type:'script'});
		}, 100) : new LinkFile(c, {type:'script'});
	});
}};
App.Themes = {setTheme:function(themeId) {
	if (!themeId) {
		return;
	}
	if (themeId == App.theme) {
		return;
	}
	var th = App.ThemeLib.getTheme(themeId);
	if (!th) {
		return;
	}
	App.Requester.request('theme', th.code || th.id);
	App.theme = themeId;
},doSetTheme:function(themeUrl) {
	if (themeUrl && typeof themeUrl == 'string') {
		var url = themeUrl;
	} else {
		var th = App.ThemeLib.getTheme(App.theme);
		if (!th) {
			return;
		}
		var url = App.Actions.themePath + (th.path || th.id) + '/style.css';
	}
	if ($('themeCss')) {
		$('themeCss').href = url;
	} else {
		this.element = new LinkFile(url, {type:'css'});
		this.element._link.id = 'themeCss';
	}
},doSetThemeGW:function(themeId) {
	if (themeId && typeof themeId == 'string') {
		var url = App.Actions.themePath + themeId + '/style.css';
	}
	if ($('themeCss')) {
		$('themeCss').href = url;
	} else {
		this.element = new LinkFile(url, {type:'css'});
		this.element._link.id = 'themeCss';
	}
}};
App.UserStyle = {styles:{pageWidth:''},getStyle:function(type) {
	switch (type) {case'pageWidth':return(Element.getStyle($('innerWrapper'), 'width') || ($('innerWrapper').offsetWidth + 'px'));break;default:return null;}
},setStyle:function(type, value) {
	var styleText = '';
	switch (type) {case'pageWidth':this.styles.pageWidth = value;styleText += '#innerWrapper{width:' + value + ';}';break;default:return;}
	if (styleText) {
		App.Requester.request('userStyle', styleText);
	}
},doSetStyle:function() {
	$H(this.styles).each(function(s) {
		switch (s.key) {case'pageWidth':if ($('innerWrapper') && s.value) {
			Element.setStyle($('innerWrapper'), {width:s.value});
		}break;default:return;}
	});
},getPageWidth:function() {
	var width = this.getStyle('pageWidth');
	if (width.lastIndexOf('px') == width.length - 2) {
		if (Math.abs(parseInt(width) - 800) < Math.abs(parseInt(width) - 1024)) {
			return(1);
		} else {
			return(2);
		}
	} else {
		return(0);
	}
},setPageWidth:function(w) {
	if (w == '1' && this.getPageWidth() != '1') {
		this.setStyle('pageWidth', '760px');
	} else if (w == '2' && this.getPageWidth() != '2') {
		this.setStyle('pageWidth', '950px');
	}
}};
var Feed = function(feed) {
	this.root = feed.responseXML.documentElement;
	this.type = (this.root.nodeName == 'feed') ? 1 : 0;
	var root = (this.type == 1) ? this.root : this.root.getElementsByTagName('channel')[0];
	var links = Element.getChildElementByTagName(root, 'link');
	if (this.type == 1) {
		$A(links).each(function(l) {
			if (l.getAttribute('type') == 'text/html' || links.length == 1) {
				this.htmlUrl = l.getAttribute('href');
			}
		}.bind(this));
	} else {
		this.htmlUrl = (links[0].firstChild) ? links[0].firstChild.nodeValue : '';
	}
	this.title = Element.getChildValueByTagName(root, 'title')[0] || this.htmlUrl;
	var desc = (this.type == 1) ? this.root.getElementsByTagName('tagline') : this.root.getElementsByTagName('description');
	this.description = (desc.length > 0) ? ((desc[0].firstChild) ? desc[0].firstChild.nodeValue : '') : '';
	this.items = [];
	var items = (this.type == 1) ? this.root.getElementsByTagName('entry') : this.root.getElementsByTagName('item');
	$A(items).each(function(it) {
		var obj = {};
		obj.node = it;
		obj.enclosures = it.getElementsByTagName('enclosure');
		var title = Element.getChildElementByTagName(it, 'title')[0];
		if (title && title.firstChild) {
			obj.title = title.firstChild.nodeValue;
		} else {
			var d = it.getElementsByTagName('description');
			if (d[0]) {
				var tmp = document.createElement("div");
				tmp.innerHTML = d[0].firstChild.nodeValue;
				obj.title = ((tmp.innerText) ? tmp.innerText.substring(0, 50) : '') + "...";
			} else {
				obj.title = '[...]';
			}
		}
		var dcDate = (Browser.ua.indexOf('ie') >= 0) ? it.getElementsByTagName('dc:date')[0] : it.getElementsByTagName('date')[0];
		if (it.getElementsByTagName('pubDate')[0]) {
			obj.date = (it.getElementsByTagName('pubDate')[0].firstChild) ? it.getElementsByTagName('pubDate')[0].firstChild.nodeValue : '';
		} else if (dcDate) {
			obj.date = dcDate.firstChild.nodeValue;
		} else if (it.getElementsByTagName('issued')[0]) {
			obj.date = it.getElementsByTagName('issued')[0].firstChild.nodeValue;
		}
		var links = Element.getChildElementByTagName(it, 'link');
		if (links.length > 0) {
			if (this.type == 1) {
				$A(links).each(function(l) {
					if (l.getAttribute("type") == 'text/html' || links.length == 1) {
						obj.link = l.getAttribute('href');
					}
				});
			} else {
				if (links[0] || links[0].firstChild) {
					obj.link = (links[0].firstChild) ? links[0].firstChild.nodeValue : '';
				} else if (it.getElementsByTagName('guid')[0].firstChild) {
					obj.link = it.getElementsByTagName('guid')[0].firstChild.nodeValue;
				}
			}
		} else {
			obj.link = this.htmlUrl;
		}
		if (this.type == 1) {
			obj.content = it.getElementsByTagName('content')[0];
			obj.description = it.getElementsByTagName('summary')[0];
		} else {
			obj.content = (Browser.ua.indexOf('ie') >= 0) ? it.getElementsByTagName('content:encoded')[0] : it.getElementsByTagName('encoded')[0];
			obj.description = it.getElementsByTagName('description')[0];
		}
		this.items.push(obj);
	}.bind(this));
};
function registerWidget(w) {
	App.Widgets[w] = eval(w);
}
var PopWins = {popWins:[],x:null,y:null,zIndex:2000,register:function(popWin) {
	this.popWins.push(popWin);
	if (Browser.ua.indexOf('ie') < 0) {
	}
},unregister:function(popWin) {
	this.popWins = this.popWins.reject(function(p) {
		return p == popWin;
	});
	this.x -= 10;
	this.y -= 10;
	if (this.popWins.length <= 0) {
		this.x = this.y = null;
		this.zIndex = 2000;
		Event.stopObserving(window, 'resize', this.eventResizeBgAll);
	}
},placeIt:function(popWin) {
	document.body.appendChild(popWin.element);
	popWin.element.style.position = 'absolute';
	popWin.element.style.zIndex = this.zIndex++;
	popWin.element.style.width = popWin.options.width + 'px';
	if (popWin.element.offsetHeight >= 500) {
		popWin.elm_content.style.height = '500px';
	}
	if (!this.x || !this.y) {
		this.x = (document.body.offsetWidth - popWin.element.offsetWidth) / 2;
		this.y = Math.ceil((document.documentElement.clientHeight - popWin.element.offsetHeight) / 2) * 0.6 + document.documentElement.scrollTop;
	} else {
		this.x += 10;
		this.y += 10;
	}
	popWin.element.style.left = this.x + "px";
	popWin.element.style.top = this.y + "px";
	popWin.dragObj = new Draggable(popWin.element, {handle:'t',zindex:this.zIndex});
	this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
	Event.observe(popWin.element, 'mousedown', this.eventCancelBubble);
	Event.observe(popWin.element, 'click', this.eventCancelBubble);
},placeBg:function(popWin) {
	document.body.appendChild(popWin.elm_bg);
	var _style = {background:'#666',position:'absolute',zIndex:this.zIndex++,left:'0px',top:'0px',width:document.body.offsetWidth + 'px',height:Math.max(document.body.offsetHeight, document.documentElement.clientHeight) + 'px'};
	Element.setStyle(popWin.elm_bg, _style);
	this.eventResizeBgAll = this.resizeBgAll.bindAsEventListener(this);
	Event.observe(window, 'resize', this.eventResizeBgAll);
	this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
	Event.observe(popWin.elm_bg, 'mousedown', this.eventCancelBubble);
	Event.observe(popWin.elm_bg, 'click', this.eventCancelBubble);
	if (Browser.ua.indexOf('ie') >= 0) {
		Element.setOpacity(popWin.elm_bg, 0.5);
	} else {
		Element.setOpacity(popWin.elm_bg, 0.0);
		var aa = new Effect.Opacity(popWin.elm_bg, {duration:0.3,from:0.0,to:0.5});
	}
},resizeBgAll:function() {
	this.popWins.each(function(w) {
		this.resizeBg(w);
	}.bind(this));
},resizeBg:function(popWin) {
	var _style = {width:document.body.offsetWidth + 'px',height:Math.max(document.body.offsetHeight, document.documentElement.clientHeight) + 'px'};
	Element.setStyle(popWin.elm_bg, _style);
}};
var PopWin = Class.create();
PopWin.prototype = {initialize:function(options) {
	this.options = Object.extend({name:'popWin',type:'pop',focus:true,title:'',ico:'info',content:'',html:true,width:'250',okText:App.Lang.ok,okAction:null,okData:null,cancelText:App.Lang.cancel,cancelAction:null,cancelData:null,closeAction:null,closeData:null}, options || {});
	this.options.ico = 'ico_' + this.options.ico + '.gif';
	if (this.options.type != 'pop') {
		this.buildBg();
		PopWins.placeBg(this);
	}
	this.build();
	if (this.options.content) {
		if (this.options.html) {
			this.elm_content.innerHTML = this.options.content.replace(/\n/ig, '<br />');
		} else {
			this.elm_content.innerHTML = this.options.content.convertTextToHTML().replace(/\n/ig, '<br />');
		}
	}
	PopWins.placeIt(this);
	if (this.options.type == 'alert' || this.options.type == 'confirm') {
		this.buildBtn();
		setTimeout(this.getFocus.bind(this), 10);
		this.eventGetFocus = this.getFocus.bindAsEventListener(this);
		Event.observe(this.elm_bg, 'click', this.eventGetFocus);
		Event.observe(this.element, 'click', this.eventGetFocus);
	}
	PopWins.register(this);
},destroy:function() {
	Element.remove(this.element);
	if (this.elm_bg) {
		Element.setOpacity(this.elm_bg, 1.0);
		Element.remove(this.elm_bg);
	}
	PopWins.unregister(this);
},build:function() {
	var divPopWin = document.createElement('div');
	this.element = divPopWin;
	divPopWin.id = this.options.name;
	divPopWin.className = 'popWin';
	var divInnerPopWin = document.createElement('div');
	divInnerPopWin.className = 'mod';
	divPopWin.appendChild(divInnerPopWin);
	var divPopWinFrame = document.createElement('div');
	this.elm_popWinFrame = divPopWinFrame;
	divPopWinFrame.className = 'modFrame';
	divInnerPopWin.appendChild(divPopWinFrame);
	var str = '';
	str += '<table cellspacing="0" cellpadding="0" class="modTable" height="100%">';
	str += '<thead><tr>';
	str += '<td class="mheader lt"></td>';
	str += '<td class="mheader t"><div class="modHeader"></div></td>';
	str += '<td class="mheader rt"></td>';
	str += '</tr></thead>';
	str += '<tbody><tr>';
	str += '<td class="mbody l"></td>';
	str += '<td class="mbody c" height="100%"><div class="modCon"></div></td>';
	str += '<td class="mbody r"></td>';
	str += '</tr></tbody>';
	str += '<tfoot><tr>';
	str += '<td class="mfooter lb"></td>';
	str += '<td class="mfooter b"></td>';
	str += '<td class="mfooter rb"></td>';
	str += '</tr></tfoot>';
	str += '</table>';
	divPopWinFrame.innerHTML = str;
	this.eventCancelBubble = App.cancelBubble.bindAsEventListener(this);
	var divClose = document.createElement('div');
	this.elm_close = divClose;
	divClose.className = 'modCls';
	divClose.title = App.Lang.close;
	Event.observe(divClose, 'mousedown', this.eventCancelBubble);
	this.eventClose = this.closeAction.bindAsEventListener(this);
	Event.observe(divClose, 'click', this.eventClose);
	var divIco = document.createElement('div');
	this.elm_ico = divIco;
	divIco.className = 'modIco';
	divIco.innerHTML = '<img src="' + App.Actions.imgPath + this.options.ico + '" />';
	var divTitle = document.createElement('div');
	this.elm_title = divTitle;
	divTitle.className = 'modTitle';
	divTitle.appendChild(document.createTextNode(this.options.title || App.Lang.info));
	var divPopWinHeader = document.getElementsByClassName('modHeader', divPopWinFrame)[0];
	divPopWinHeader.appendChild(divClose);
	divPopWinHeader.appendChild(divIco);
	divPopWinHeader.appendChild(divTitle);
	Element.cleanWhitespace(this.element);
	this.elm_content = this.getPopWinContent();
},getPopWinContent:function() {
	var popWin_table = this.element.firstChild.firstChild.firstChild;
	var popWinContent = popWin_table.rows[1].cells[1].firstChild;
	return popWinContent;
},close:function() {
	this.destroy();
},buildBg:function() {
	var divBg = document.createElement('div');
	this.elm_bg = divBg;
},buildBtn:function() {
	var divBtn = document.createElement('div');
	divBtn.className = 'divBtn';
	var btnOk = document.createElement('input');
	this.okBtn = btnOk;
	btnOk.className = 'button-submit';
	btnOk.type = 'button';
	btnOk.value = this.options.okText;
	this.eventOkAction = this.okAction.bindAsEventListener(this);
	Event.observe(btnOk, 'click', this.eventOkAction);
	divBtn.appendChild(btnOk);
	if (this.options.type == 'confirm') {
		var btnCancel = document.createElement('input');
		this.cancelBtn = btnCancel;
		btnCancel.className = 'button';
		btnCancel.type = 'button';
		btnCancel.value = this.options.cancelText;
		this.eventCancelAction = this.cancelAction.bindAsEventListener(this);
		Event.observe(btnCancel, 'click', this.eventCancelAction);
		divBtn.appendChild(btnCancel);
	}
	this.elm_content.parentNode.appendChild(divBtn);
},
	okAction:function() {
		this.close();
		if (this.options.okAction) {
			(this.options.okData) ? (this.options.okAction)(this.options.okData) : (this.options.okAction)(true);
		}
	},
	cancelAction:function() {
		this.close();
		if (this.options.cancelAction) {
			(this.options.cancelData) ? (this.options.cancelAction)(this.options.cancelData) : (this.options.cancelAction)(false);
		}
	},
	closeAction:function() {
		if (this.options.closeAction) {
			this.close();
			(this.options.closeData) ? (this.options.closeAction)(this.options.closeData) : (this.options.closeAction)(true);
		} else if (this.options.type == 'confirm') {
			this.cancelAction();
		} else if (this.options.type == 'alert') {
			this.okAction();
		} else {
			this.close();
		}
	},
	getFocus:function() {
		if (this.options.type != 'alert' && this.options.type != 'confirm') {
			return;
		}
		if (this.options.focus === false) {
			this.cancelBtn.focus();
		} else {
			this.okBtn.focus();
		}
	}
};
App.ToolTip = function(node, txt, w, align, ev) {
	var offsetxpoint = 0;
	var offsetypoint = 20;
	var enabletip = false;
	var autoHide;
	var tipobj;
	if ($('tooltip')) {
		tipobj = $('tooltip');
	} else {
		tipobj = document.createElement('div');
		tipobj.id = 'tooltip';
		tipobj.className = 'mod';
		tipobj.style.position = 'absolute';
		document.body.appendChild(tipobj);
	}
	if (!w) {
		w = 200;
	}
	if (!align) {
		align = "center";
	}
	function ietruebody() {
		return(document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
	}
	this.display = function(node, txt, w, align) {
		positiontip(window.event);
		Event.observe(document, 'mousemove', positiontip);
		Event.observe(node, 'mouseout', this.hide, false);
		tipobj.style.textAlign = align;
		tipobj.innerHTML = '<div class="modFrame">' + txt + '</div>';
		Element.show(tipobj);
		if (tipobj.offsetWidth > w) {
			tipobj.style.width = w + "px";
		}
		enabletip = true;
		autoHide = setTimeout(this.hide, 10000);
	};
	function positiontip(event) {
		if (enabletip) {
			var curX = (Browser.ua.indexOf('ie') >= 0) ? Event.pointerX(event) : Event.pointerX(event);
			var curY = (Browser.ua.indexOf('ie') >= 0) ? Event.pointerY(event) : Event.pointerY(event);
			var rightedge = (Browser.ua.indexOf('ie') >= 0 && Browser.ua != 'opera') ? ietruebody().clientWidth - Event.pointerX(event) + ietruebody().scrollLeft - offsetxpoint : window.innerWidth - Event.pointerX(event) + window.pageXOffset - offsetxpoint - 20;
			var bottomedge = (Browser.ua.indexOf('ie') >= 0 && Browser.ua != 'opera') ? ietruebody().clientHeight - Event.pointerY(event) + ietruebody().scrollTop - offsetypoint : window.innerHeight - Event.pointerY(event) + window.pageYOffset - offsetypoint - 20;
			var leftedge = (offsetxpoint < 0) ? offsetxpoint * (-1) : -1000;
			if (rightedge < tipobj.offsetWidth) {
				tipobj.style.left = (Browser.ua.indexOf('ie') >= 0) ? Event.pointerX(event) - tipobj.offsetWidth + "px" : Event.pointerX(event) - tipobj.offsetWidth + "px";
			} else if (curX < leftedge) {
				tipobj.style.left = "5px";
			} else {
				tipobj.style.left = curX + offsetxpoint + "px";
			}
			if (bottomedge < tipobj.offsetHeight) {
				var d = (Browser.ua == 'safari') ? 0 : window.pageYOffset;
				tipobj.style.top = (Browser.ua.indexOf('ie') >= 0) ? Event.pointerY(event) - tipobj.offsetHeight - offsetypoint + "px" : Event.pointerY(event) - tipobj.offsetHeight - offsetypoint + "px";
			} else {
				tipobj.style.top = curY + offsetypoint + "px";
			}
		}
	}
	this.hide = function() {
		clearTimeout(autoHide);
		Event.stopObserving(document, 'ousemove', positiontip);
		enabletip = false;
		Element.hide(tipobj);
	};
	this.display(node, txt, w, align);
};