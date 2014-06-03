(function (g) {
    var host = this;
    /**
    * @namespace GS
    */
    g = host[g] = (host && host[g]) || {};

    /**
    * 延迟函数 来源 underscore.js
    * @param	{Object}	fn		Description
    * @param	{Object}	timeout	Description
    * @returns	{Object}			Description
    */
    g.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function () {
            previous = options.leading === false ? 0 : new Date;
            timeout = null;
            result = func.apply(context, args);
        };
        return function () {
            var now = new Date;
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };


    /**
    * 过滤XSS一些代码(主要替换<>)
    * @param {string} v 过滤的字符串
    * @returns {string} 安全的字符串
    */
    g.xssFilter = function (v) {
        if (v == undefined) { return v; }
        v = v.replace(/</g, '&lt;', v);
        v = v.replace(/>/g, '&gt;', v);
        return v;
    }


})('GS');

(function ($) {

    /**
    * @description: placeholde插件, ie有效, ie6提交时需要判断下 value != placeholder
    * @author: chenwp@ctrip.com
    * @update: chenwp (2013-07-21 18:32)
    */

    $.fn.placeholder = function (opts) {
        var ck = 'placeholder' in document.createElement('input');
        if (ck) { return this; }

        opts = $.extend({
            incolor: '#aaa',
            outcolor: '#333',
            callback: function () { }
        }, opts);

        return this.each(function () {
            //不支持的做				
            var that = this;
            var $this = $(this);
            var p = $(this).attr('placeholder');
            var v = $(this).attr('value');
            var pstyle = { color: opts.incolor }
            if (v == '' || v == p) {
                $(this).val(p).css(pstyle);
            }
            $this.on('focusin', function (e) {
                if ($this.val() == p) {
                    $this.val('');
                }
            });
            $this.on('focusout', function (e) {
                if ($this.val() == '') {
                    $this.val(p).css(pstyle);
                } else {
                    $this.css({ color: '#333' });
                }
            });

            return this;
        });
    }


})(jQuery);

function getUrl(headurl) {
    var lct;
    var lformflag = null;
    try {
        lformflag = document.getElementById("lFormFlag");
        if (lformflag == undefined)
            lformflag = null;
    }
    catch (e) {
        lformflag = null;
    }

    lct = window.location.href.toLowerCase();
    if (lct.indexOf("signup/signup.aspx") != -1) lct = "/";
    //edit by hcdu 2011-3-8
    // window.location.href=headurl+"?returnurl="+lct.replace(".html","_htm").replace("?","$").replace("&","^");
    if (lformflag != null) {
        window.location.href = headurl + "?returnFlag=T&returnurl=" + lct.replace(".html", "_htm").replace("?", "$").replace(/&/g, "^");
    }
    else
        window.location.href = headurl + "?returnurl=" + lct.replace(".html", "_htm").replace("?", "$").replace(/&/g, "^");

}

function memberLogin() {

    var fobj;
    fobj = document.createElement("form");
    fobj.action = "/destmemberlogin.aspx";
    fobj.method = "post";
    fobj.innerHTML = "<input type=\"hidden\" name=\"backurl\" id=\"backurl\" value=\"" + window.location.href + "\" />";
    fobj.innerHTML += "<input type=\"hidden\" name=\"loginid\" id=\"loginid\" value=\"0\" />";
    document.body.appendChild(fobj);
    fobj.submit();
}
function CtripmemberLogin() {
    var isLoginPage;
    try {
        isLoginPage = document.getElementById("LvpingLoginframe").src;
    }
    catch (e) {
        isLoginPage = "";
    }
    if (isLoginPage == "") {
        var fobj;
        fobj = document.createElement("form");
        fobj.action = "/destmemberlogin.aspx";
        fobj.method = "post";
        fobj.innerHTML = "<input type=\"hidden\" name=\"backurl\" id=\"backurl\" value=\"" + window.location.href + "\" />";
        fobj.innerHTML += "<input type=\"hidden\" name=\"loginid\" id=\"loginid\" value=\"0\" />";
        fobj.innerHTML += "<input type=\"hidden\" name=\"logintoCtrip\" id=\"loginid\" value=\"1\" />";
        document.body.appendChild(fobj);
        fobj.submit();
    }
    else {
        GoCtripLogin();
    }
}

function memberCpLogin() {
    var fobj;
    var goUrl;
    try {
        goUrl = document.getElementById("gourl").value.replace("_m_e_m", "members").replace("$", "?").replace("^", "&")
    }
    catch (e) {
        goUrl = window.top.location.href;
    }

    fobj = document.createElement("form");
    fobj.action = "/members/rmemberlogin.aspx#login";
    fobj.method = "post";
    fobj.innerHTML = "<input type=\"hidden\" name=\"backurl\" id=\"backurl\" value=\"" + goUrl + "\" />";
    fobj.innerHTML += "<input type=\"hidden\" name=\"loginid\" id=\"loginid\" value=\"0\" />";
    fobj.innerHTML += "<input type=\"hidden\" name=\"logintoLvping\" id=\"logintoLvping\" value=\"3\" />";
    document.body.appendChild(fobj);
    fobj.submit();
}

function CtripmemberSharelogin() {
    try {
        var _form;
        _form = document.forms[0];
        _form.action = "/userlogin.aspx";
        _form.innerHTML += "<input type=\"hidden\" name=\"ori_url\" id=\"ori_url\" value=\"" + window.location.href + "\" />";
        _form.submit();
    }
    catch (e) { }
}
//专门用来显示页面上的
function showActiveTips(pageid) {
    if (pageid != "") {
        var lochref = "";
        lochref = window.location.href;
        if (lochref.indexOf('#active') != -1 || lochref.indexOf('#registed') != -1 || lochref.indexOf('#bindmsg') != -1 || lochref.indexOf('#emailsetting') != -1) {
            var innertext;
            innertext = jQuery("#lpmemberActiveTips").html();
            if (lochref.indexOf('#active') != -1)
                jQuery("#lpmemberActiveTips").html(innertext.replace("[]", "激活"));
            if (lochref.indexOf('#registed') != -1)
                jQuery("#lpmemberActiveTips").html(innertext.replace("[]", "注册"));
            if (lochref.indexOf('#bindmsg') != -1)
                jQuery("#lpmemberActiveTips").html(innertext.replace("[]", "验证"));
            if (lochref.indexOf('#emailsetting') != -1)
                jQuery("#lpmemberActiveTips").html(innertext.replace("[]", "设置"));
            jQuery("#lpmemberActiveTips").fadeIn("2000");
        }
    }
}

var yourProfile = "";
function dataBinding(profileurl, profileurlno) {
    if (yourProfile == "") {
        yourProfile = "<ul><li><a href='/members/" + profileurl + "'>主页</a></li>";
        yourProfile += "<li><a href='/members/" + profileurl + "/reviews'>旅行发现</a></li>";
        yourProfile += "<li><a href='/members/" + profileurlno + "/travelmap'>足迹</a></li>";
        yourProfile += "<li><a href='/members/" + profileurl + "/friends'>参谋团</a></li>";
        yourProfile += "<li><a href='/members/message/default.aspx?profileurlno=" + profileurlno + "'>留言</a></li>";
        yourProfile += "<li><a href='/members/" + profileurl + "/favorite'>行程收藏夹</a></li>";
        yourProfile += "<li><a href='/members/subscribe/default.aspx?profileurlno=" + profileurlno + "'>订阅跟踪</a></li></ul>";
        document.getElementById("yourProfile").innerHTML = yourProfile;
    }
}

function lvpingJsCookieFn() {
    var lvpingJsCookie = {
        setTheCookie: function (name, value, time, isGlobal) {
            var sec = this.getCSeconds(time);
            var exp = new Date();
            var isGlobal = isGlobal || false;
            exp.setTime(exp.getTime() + sec * 1);
            document.cookie = name + "=" + escape(value) + ";path=" + (isGlobal ? '/' : '') + ";expires=" + exp.toGMTString();
        },
        getTheCookie: function (name) {
            var cookieName = name + "=";
            var start, end;
            if (document.cookie.length > 0) {
                start = document.cookie.indexOf(cookieName)
                if (start != -1) {
                    start += cookieName.length
                    end = document.cookie.indexOf(";", start)
                    if (end == -1) {
                        end = document.cookie.length
                    }
                    return unescape(document.cookie.substring(start, end))
                } else {
                    return null;
                }
            }
        },
        getCSeconds: function (s) {
            /*s:second
            h:hour
            d:day
            y:year
            eg:s20,h20,d20
            */
            if (!s) return;
            var t = s.substring(1, s.length) * 1,
            ttype = s.substring(0, 1);
            switch (ttype) {
                case 's':
                    return t * 1000;
                case 'h':
                    return t * 60 * 60 * 1000;
                case 'd':
                    return t * 24 * 60 * 60 * 1000;
                case 'y':
                    return t * 360 * 24 * 60 * 60 * 1000;
            }
        }
    };
    return lvpingJsCookie;
}

function OpenWindow(url) {
    window.open(url);
    //window.open(url, '', 'status=no,menubar=no,top=0,left=0,width=780,height=800,resizable=yes,scrollbars=yes');
}
function bindFriendTrendEvent() {
    jQuery('div.acquire_type_blk h6').each(function () {
        jQuery(this).click(function () {
            jQuery(this).addClass('current');
            jQuery(this).parent().children('.acquire_type_detail').show();
            jQuery(this).parent().siblings().children('h6').removeClass('current');
            jQuery(this).parent().siblings().children('.acquire_type_detail').hide();
        });
    });
}


function hSearchKeyword(elementId, typename,type) {

    /*
    var kw;
    if (elementId != null) kw = document.getElementById(elementId).value;
    else return false;

    if (kw != "") {
        var theIndex;
        kw = kw.substr(kw.search("[^ ]"));
        theIndex = kw.search(" $");
        while (theIndex != -1) {
            kw = kw.substring(0, theIndex);
            theIndex = kw.search(" $");
        }
        document.getElementById("hKword").value = kw;
        if (document.getElementById("hKword").value == "" || document.getElementById("hKword").value == "目的地、景点、酒店名" || document.getElementById("hKword").value == "目的地、景点、酒店名") {
            document.getElementById("hKword").value = "";
        }
        else {
            document.getElementById("hKword").value = document.getElementById("hKword").value.replace(/(^\s*)|(\s*$)/g, "");
            if (document.getElementById("Kword")) document.getElementById("Kword").value = document.getElementById("hKword").value;

            if (typename != null) {
                document.forms[0].action = "/search/index.aspx?typename=1&q=" + document.getElementById("hKword").value + '&qbox=1';
                window.location.href = "/search/index.aspx?typename=1&q=" + document.getElementById("hKword").value + '&qbox=1';
                if(type != null) {
                    document.forms[0].action = "/search/index.aspx?s=1&t=" + type + "&q=" + document.getElementById("hKword").value;
                    window.location.href = "/search/index.aspx?s=1&t=" + type + "&q=" + document.getElementById("hKword").value;
                }
            }
            else {
                document.forms[0].action = "/search/index.aspx?q=" + document.getElementById("hKword").value + '&qbox=1';
                window.location.href = "/search/index.aspx?q=" + document.getElementById("hKword").value + '&qbox=1';
            }

        }
    }
    */
}



/*

function hsetfastEnterfunc() {
    if (document.getElementById("txtfastsearch").value == '关键词：地名、酒店名、景点名、游记攻略等') {
        document.getElementById("txtfastsearch").value = '';

    }
}

function hclearfastEnterfunc() {
    if (document.getElementById("txtfastsearch").value == '') {
        document.getElementById("txtfastsearch").value = '关键词：地名、酒店名、景点名、游记攻略等';

    }

}
//end 
function hsetEnterfunc() {
    if (document.getElementById("hKword").value == '地名、酒店名、攻略关键词') {
        document.getElementById("hKword").value = '';
        document.getElementById("hKword").style.color = '#000';
    }
    else {
        document.getElementById("hKword").style.color = '#000';
    }
}

function hclearEnterfunc() {
    if (document.getElementById("hKword").value == '') {
        document.getElementById("hKword").value = '地名、酒店名、攻略关键词';
        document.getElementById("hKword").style.color = '#d3d3d3';
    }
    //document.onkeydown = "";
} (function (object, type, handler) {
    if (object.attachEvent) {
        object.attachEvent("on" + type, handler);
    }
    else if (object.addEventListener) {
        object.addEventListener(type, handler, false);
    }
    else {
        object[type] = handler;
    }
});

*/
function showRegisterInfor() {
    var e = arguments[0] ? arguments[0] : window.event;
    var tag = e.target ? e.target : e.srcElement;
    document.getElementById('register_infor_uplayer').style.display = 'block';
    document.getElementById('head_register_infor').className = 'head_register_down';
    document.getElementById('register_infor_uplayer').style.top = tag.offsetTop + tag.offsetHeight - 1 + 'px';
    document.getElementById('register_infor_uplayer').style.left = tag.offsetLeft + 'px';
}
function hideRegisterInfor() {
    document.getElementById('register_infor_uplayer').style.display = 'none';
    document.getElementById('head_register_infor').className = 'head_register_infor';
}

var adCnt = 0;
var adStr = '';
function adLoad() {
    if (adStr.length > 0) eval(adStr);
}
function adSet(u, w, h, t) {
    if (t == null) t = '_top';
    document.write('<div id=ad_' + (++adCnt) + ' style=width:' + w + ';height:' + h + '></div>');
    adStr += 'document.getElementById("ad_' + adCnt + '").innerHTML="<IFRAME MARGINHEIGHT=0 MARGINWIDTH=0 FRAMEBORDER=0 WIDTH=' + w + ' HEIGHT=' + h + ' SCROLLING=NO SRC=' + u + ' TARGET=' + t + '></IFRAME>";'
}

//add by kyliu
function setLogin(s) {
    if (s != null) {
        jQuery.ajax({
            url: '/members/Ajax/SetPagesStatus.ashx',
            type: 'post',
            dataType: "text",
            async: false,
            data: {
                r: Math.random(),
                EncPassword: escape(s.EncPassword),
                Time: s.Time,
                UID: s.UID
            },
            timeout: 5000,
            //async: false,
            error: function (data) {
                return;
            },
            success: function (data) {

                if (data != "") {
                    if (parent.window.document.getElementById("divloginId") != null) {
                        parent.window.document.getElementById("divloginId").innerHTML = data;
                        jQuery('#divloginId').html(data);
                        setTimeout(function () {
                            parent.window.mouseoveDropFn(parent.window.jQuery('span.has_nick'), parent.window.jQuery('.member_quick_links'), 14);
                        },
                        10)
                    }

                }

            }

        });
    }
}

function mouseoveDropFn(handle, item, toppx, otherFn) {/*dorp exeu fn*/
    var bindObj = {}, handleOffse, toppx = toppx || 14, otherFn = otherFn || false;
    if (!handle || !item || handle.length == 0 || item.length == 0) { return; }
    if (!handle.length) {
        handle = jQuery.makeArray(handle);
        item = jQuery.makeArray(item);
    }
    for (var i = 0; i < handle.length; i++) {
        if (!handle[i] || !item[i]) { continue; }
        handleBtn = handle[i];
        itemDiv = item[i];
        bindObj = {
            handlev: handleBtn,
            itemv: itemDiv
        };
        handleBtn.relatedItems = bindObj;
        itemDiv.relatedItems = bindObj;
        handleBtn.onmouseover = function () {
            if (!otherFn) {
                dataBinding(jQuery(this).attr("profileurl"), jQuery(this).attr("profileurlno"));
            }
            handleOffse = jQuery(this).offset();
            this.relatedItems.itemv.style.top = handleOffse.top + toppx + 'px';
            this.relatedItems.itemv.style.left = handleOffse.left + 'px';
            this.relatedItems.itemv.style.display = "block";
        };
        handleBtn.onmouseout = function (evt) {
            if (isMouseleave(evt, this) && isMouseleave(evt, this.relatedItems.itemv)) {
                this.relatedItems.itemv.style.display = "none";
            }
        };
        itemDiv.onmouseout = function (evt) {
            if (!isMouseleave(evt, this.relatedItems.handlev)) {
                return;
            }
            if (isMouseleave(evt, this)) {
                this.style.display = "none";
            }
        };
    }
}
/*mouseenter or mouseleave*/
function isMouseleave(e, handler) {
    var e = e || window.event;
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;
    var relatedTarget = e.relatedTarget ? e.relatedTarget : (e.type == 'mouseout' ? e.toElement : e.fromElement);
    while (relatedTarget && relatedTarget != handler) {
        relatedTarget = relatedTarget.parentNode;
    }
    return (relatedTarget != handler);
}

function hasNick() {
    jQuery('span.has_nick').hover(function () {
        jQuery('#divloginId ul.nick-list').show();
    },
    function () {
        jQuery('#divloginId ul.nick-list').hide();
    });

}



function memberSign() {
    document.getElementById("gourl").value = window.location.href.replace("?", "$").replace("&", "^");
    document.forms[0].method = "post";
    document.forms[0].action = "/members/signup/signup.aspx";
    document.forms[0].submit();
}


/*jQuery.sug = function (params, element) {
    this.params = params;
    this.element = element;
    this.defaultnotice = this.params.defaultValue || this.element.attr('default_notice') || '';
    this.defaultvalue = {};
    this.sugContents = function () { };
    this.addbox();
    this.sgtContainer = jQuery('#hKwordCon');
    this.sgtListcon = jQuery('#hKwordCon .sgt-address-list');
    this.setDefault();
    this.element.bind('focus', jQuery.proxy(this.inputFocus, this));
    this.element.bind('keydown', jQuery.proxy(this.onKeydown, this));
    this.element.bind('click', function (e) { e.stopPropagation(); });
    jQuery(document).bind('click', jQuery.proxy(this.inputBlur, this));
    this.element.bind('contextmenu', jQuery.proxy(this.inputFocus, this));
};
jQuery.sug.prototype = {
    oCache: {},
    gos: 0,
    oldValue: '',
    isHide: true,
    onTime: false,
    kCode: {
        ENTER: 13,
        UP: 38,
        DOWN: 40,
        ESC: 27
    },
    sgthtml: '<div class="sgt-address" id="hKwordCon"><div class="sgt-address-list">',
    addToCache: function (keyword, values) {
        this.oCache[keyword] = [];
        this.oCache[keyword] = values;
    },
    checkCache: function (keyword) {
        if (this.oCache[keyword]) {
            return true;
        }
    },
    getSuggestions: function (keyword) {
        this.oldValue = keyword;
        if (keyword != "" && keyword != this.defaultnotice) {
            var _this = this;
            if (this.checkCache(keyword) == true) {
                this.displayResults(this.oCache[keyword]);
            } else {
                jQuery.getJSON(this.params.addressUrl + '&Jsoncallback=?', { para: escape(keyword) }, function (obj) {
                    jQuery.proxy(_this.displayResults(obj), _this);
                    jQuery.proxy(_this.addToCache(keyword, obj), _this);
                });*/
                /*                jQuery.ajax({
                url: this.params.addressUrl,
                type: 'GET',
                dataType: "json",
                data: {
                para: escape(keyword)
                },
                timeout: 10000,
                success: function (obj) {
                jQuery.proxy(_this.displayResults(obj), _this);
                jQuery.proxy(_this.addToCache(keyword, obj), _this);

                }
                });*/
            /*}
        } else {
            jQuery.proxy(this.displayResults(this.defaultvalue), this);
        }
    },
    displayResults: function (obj) {
        this.clean();
        var _this = this;
        var d = '<div class="sgt-kq"><em class="fast-sgt-srh">搜索</em><a href="/search/?searchtype=all&query=' + _this.element.val() + '">搜索更多关于 <strong>' + _this.element.val() + '</strong></a></div>';
        if (_this.element.val() != '' && _this.element.val() != _this.defaultnotice && obj.success != -10) {
            d = this.sugContents(obj) + d;
            this.sgtListcon.append(d);
            this.setOffset(this.element, this.sgtContainer);
            //this.selected(this.sgtListcon.find('a').eq(0));
            this.sgtListcon.find('a').mousedown(
                function (e) {
                    var aa = _this.element.val();
                    jQuery.getJSON('http://you.ctrip.com/ajaxnew/SearchTipJson.ashx?rank=1', { keyWord: escape(aa), urlKeyWord: escape(jQuery(this).html().replace(/[<\/strong>]/ig, '').replace(/[<strong>]/ig, '')), url: jQuery(this).attr('href'), date: new Date() }, function (obj) { });
                });
            this.sgtContainer.show();
        } else {
            this.clearTime();
            this.sgtContainer.hide();
        }
    },
    inputFocus: function () {
        if (this.element.val() == this.defaultnotice || this.element.val() == '') {
            this.element.val('');
            this.element.removeClass('sgtgray').addClass('sgtblack');
        }
        if (this.params.isShow) {
            this.clearTime();
            this.setTime();
        }
    },
    inputBlur: function () {
        if (this.element.val() == this.defaultnotice || this.element.val() == '') {

            this.element.removeClass('sgtblack').addClass('sgtgray');
            this.element.val(this.defaultnotice);
        }
        this.sgtContainer.hide();
        this.clearTime();
    },
    onKeydown: function (A) {
        switch (A.keyCode) {
            case this.kCode.UP:
                var o = this.sgtListcon.find('a');
                if (o.length > 1) {
                    this.gos--;
                    if (this.gos == -1) {
                        this.gos = o.length - 1;
                    }
                    this.selected(o.eq(this.gos));
                } else if (o.length == 1) {
                    this.selected(o.eq(0));
                };
                return false;
            case this.kCode.DOWN:
                var o = this.sgtListcon.find('a');
                if (o.length > 1) {
                    this.gos++;
                    if (this.gos == 1 && !this.sgtListcon.find('a').hasClass('current')) {
                        this.gos = 0;
                    }
                    if (this.gos == o.length) {
                        this.gos = 0;
                    }
                    this.selected(o.eq(this.gos));
                } else if (o.length = 1) {
                    this.selected(o.eq(0));
                };
                return false;
            case this.kCode.ENTER:
                if (!this.params.isShow) {
                    this.params.callBack();
                }
                if (this.element.val() == this.oldValue) {
                    //this.chooseValue();
                    if (this.sgtListcon.find('a').hasClass('current')) {
                        window.location.href = this.sgtListcon.find('a').eq(this.gos).attr('href');
                    } else {
                        this.params.callBack();
                    }
                    this.clearTime();
                    this.oldValue = this.element.val();
                    this.sgtContainer.hide();
                }
                return false;
            case this.kCode.ESC:
                this.element.val('');
                this.sgtContainer.hide();
                return false;
            default:
                if (this.params.isShow) {
                    this.setTime();
                }
        }

    },
    selected: function (obj) {
        this.sgtListcon.find('a').removeClass("current");
        obj.addClass("current");
    },
    chooseValue: function () {
        if (this.sgtListcon.find('a').length > 0) {
            this.element.val(this.sgtListcon.find('a').eq(this.gos).children('strong').html());
            if (jQuery('input[hiddenforid="' + this.element.attr('id') + '"]').length) {
                jQuery('input[hiddenforid="' + this.element.attr('id') + '"]').val(this.sgtListcon.find('a').eq(this.gos).attr('code').replace(/[d]/ig, ''));
            }
            this.element.attr('ename', this.sgtListcon.find('a').eq(this.gos).children('span').html());
        } else {
            if (jQuery('input[hiddenforid="' + this.element.attr('id') + '"]').length) {
                jQuery('input[hiddenforid="' + this.element.attr('id') + '"]').val('');
            }
            this.element.attr('ename', '');
        }
    },
    clean: function () {
        this.gos = 0;
        this.sgtListcon.html('');
    },
    updateValue: function () {
        this;
    },
    setOffset: function (M, N) {
        var o = M.offset();
        var h = M.outerHeight();
        N.css({ top: o.top + h, left: o.left });
    },
    setDefault: function () {
        if (this.element.val() == '') {
            this.element.val(this.defaultnotice);
            this.element.removeClass('sgtblack').addClass('sgtgray');
        }
    },
    addCss: function (h) {
        var d = document.createElement('link');
        var c = { type: 'text/css', href: h, rel: "stylesheet" };
        for (var e in c) { d[e] = c[e]; };
        jQuery('head').append(d);
    },
    addbox: function () {
        jQuery('body').append(this.sgthtml);
    },
    checkValue: function () {
        if (this.element.val() != this.oldValue) {
            jQuery.proxy(this.getSuggestions(this.element.val()), this);
        }
        if (this.params.isShow) {
            this.clearTime();
            this.setTime();
        }
    },
    setTime: function () {
        this.timeOut = setTimeout(jQuery.proxy(this.checkValue, this), 200);
        this.onTime = true;
    },
    clearTime: function () {
        if (this.timeOut != 0) {
            clearTimeout(this.timeOut);
        }
        this.onTime = false;
    }
};


jQuery.fn.fastSuggest = function (e) {
    var suggest = new jQuery.sug(e, jQuery(this));
    suggest.defaultvalue = {};
    suggest.sugContents = function (obj) {
        var d = '';
        if (obj.destinations) {
            var a = [];
            var n = obj.destinations.length;
            if (n != 0) {
                for (var i = 0; i < n; i++) {
                    a.push('<a href="' + obj.destinations[i].url + '">' + obj.destinations[i].name + '</a>');
                }
            } else {
                a.push('<a href="javascript:void 0;">没有匹配到目的地</a>');
            }
            d = '<div class="sgt-kq"><em class="fast-sgt-des">目的地</em>' + a.join('') + '</div>';
        }
        if (obj.hotels) {
            var b = [];
            var m = obj.hotels.length;
            if (m != 0) {
                for (var i = 0; i < m; i++) {
                    b.push('<a href="' + obj.hotels[i].url + '">' + obj.hotels[i].name + '</a>');
                }
            } else {
                b.push('<a href="javascript:void 0;">没有匹配到酒店</a>');
            }
            d = d + '<div class="sgt-kq"><em class="fast-sgt-htl">酒店</em>' + b.join('') + '</div>';
        }
        if (obj.attractions) {
            var c = [];
            var l = obj.attractions.length;
            if (l != 0) {
                for (var i = 0; i < l; i++) {
                    c.push('<a href="' + obj.attractions[i].url + '">' + obj.attractions[i].name + '</a>');
                }
            } else {
                c.push('<a href="javascript:void 0;">没有匹配到景点</a>');            
            }
            d = d + '<div class="sgt-kq"><em class="fast-sgt-atn">景点</em>' + c.join('') + '</div>';
        }
        return d;
    }
};


    
function hSearchfastKeyword() {
    var searchURL = '/search/?searchtype=All&query=';
    var query = ( document.getElementById('hKword').value || '') ;        
    if (('搜索城市、景点、游记、问答')== query) {
        query = '';
    }
    window.location.href = searchURL + escape( query );     
}
*/

$(function () {

    (function ($) {

        //闭包处理—邮件提示与快速入口
        var gsNotice = $("#gsNotice");
        var outTime = 500;
        var cTime = null;

        gsNotice.hover(function () {
            $(this).children('.glistbox').show();
            window.clearTimeout(cTime);
        }, function () {
            var that = $(this);
            cTime = window.setTimeout(function () {
                that.children('.glistbox').fadeOut('slow');
            }, outTime);
        });

        gsNotice.find('li').hover(function () {
            $(this).addClass('current');
        }, function () {
            $(this).removeClass('current');
        });

        gsNotice.find('a').click(function () {
            gsNotice.children('.glistbox').hide();
        });

    })(jQuery);




    //if (window.showActiveTips_flag) { showActiveTips(2001); }
    //hasNick();

    /*jQuery('#hKword').fastSuggest({
        isShow: true
        , addressUrl: '/ajaxnew/SearchTipJson.ashx?rank=1&para'
        , callBack: function () { hSearchfastKeyword(); }
    });


    jQuery('.gs-search .gs-search-btn').click(function () {
        hSearchfastKeyword();
        return false;
    });*/

    /*
    jQuery('.gs-search .gs-search-btn').click(function () {
    hSearchKeyword('hKword'); return false;
    });
    */

    fakeA('span.fake-a');
    fakeA('i.fake-a');
    fakeA('span.fake-ab', true);
    fakeA('span.w');
    fakeA('.logo span');
    jQuery('#lp-header-menu').delegate('li.h-s-m', 'mouseover', function () {
        jQuery(this).addClass("h");
    }).delegate('li.h-s-m', 'mouseout', function () {
        jQuery(this).removeClass("h");
    });

    hasHotelManagement();

    /*
    if (jQuery('#gov-sgs').length === 0) {
    jQuery('#lvping-logo .logo').addClass('cur').click(function () { window.location.href = '/' });
    }
    */

    //jQuery('#head-q-issue').hover(function () {
    //    jQuery(this).addClass('q-h');
    //}, function () {
    //    jQuery(this).removeClass('q-h');
    //});

    //adLoad();
    //$('<div>').attr('class', 'fixed-support').html('<div class="hd">意见反馈</div><div class="bd"><p>您的任何建议和意见都是对携程社区最大的帮助。我们会认真倾听。</p><p>欢迎您邮件至：</p><p> <i></i><a href="mailto:support@ctrip.com">support@ctrip.com</a> </p></div>').appendTo('body');
    //$('.fixed-support .hd').click(function () {
    //    $(this).siblings().toggle();
    //})    
    //是否弹出搬迁窗口
    //setMoveinfos();
    //携程头部广告
    //adheader();


    //YOU_CONFIG
    /*
    if (typeof YOU_CONFIG != "undefined" && typeof YOU_CONFIG.user != "undefined" && typeof YOU_CONFIG.type != "undefined") {
        switch (YOU_CONFIG.type) {
            case 1:
                $.popupbox.show({ id: 'headLayer1' });
                break;
            case 2:
                $.popupbox.show({ id: 'headLayer2' });
                break;
            case 3:
                $.popupbox.show({ id: 'headLayer3' });
                break;
        }
        $(".head-popbox a.close").click(function () {
            $.popupbox.close(function () { noShowNoticeTemp(YOU_CONFIG.user); });
        });
        $('.head-popbox a.gs_no_confirm').click(function () {
            $.popupbox.close(function () { noShowNotice(YOU_CONFIG.user); });
        });
    }
    */
});

function noShowNoticeTemp(user) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (30 * 60 * 1000));
    var key = "NO_SHOW_NOTICE_TEMP_" + user;
    var cookie = key + "=1; expires=" + expires.toGMTString() + "; domain=" + location.host + "; path=/;";
    document.cookie = cookie;
}

function noShowNotice(user) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (3650 * 24 * 3600 * 1000));
    var key = "NO_SHOW_NOTICE_" + user;
    var cookie = key + "=1; expires=" + expires.toGMTString() + "; domain=" + location.host + "; path=/;";
    document.cookie = cookie;
}

function hasHotelManagement() {
    jQuery('span.hotel_manage_hbg:has(div)').hover(
	function () {
	    jQuery(this).addClass('bg_dis');
	},
	function () {
	    jQuery(this).removeClass('bg_dis');
	}
	);
}

function ShowDestInfo() {

    if (document.getElementById("hidendestguideInfoID")) {
        var destInfov = document.getElementById("hidendestguideInfoID").value.split('||');
        var pageType = destInfov[3];
        var strbuild = "";
        strbuild = " <span><a href=\"/tourism-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "</a><em></em></span>";
        strbuild += " <ul class=\"header-sub-menu\">";

        if (pageType == 400) {
            strbuild += " <li><a href=\"/tourism-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "旅游</a></li>";

            strbuild += " <li><a href=\"/journals-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "游记攻略</a></li>";

            strbuild += " <li><a href=\"/hotels-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "酒店排名</a></li>";
            strbuild += " <li><a href=\"/attractions-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "景点</a></li>";
            strbuild += " <li><a href=\"/restaurants-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "餐馆</a></li>";
            strbuild += " <li><a href=\"/allreviews-d" + destInfov[0] + "-" + destInfov[2] + ".html\">出行指南</a></li>";
            strbuild += " <li><a href=\"/localmaps-d" + destInfov[0] + "-" + destInfov[2] + ".html\">地图</a></li>";
            strbuild += " <li><a href=\"javascript:void(0);\" onclick=\"javascript:OpenWindow('/photos-d" + destInfov[0] + "-s4-o1/" + destInfov[2] + ".html');\" >照片</a></li>";
            strbuild += " <li><a href=\"javascript:void(0);\" onclick=\"javascript:OpenVideoWindow('/videos-d" + destInfov[0] + ".html');\" >视频</a></li>";
            strbuild += " <li><a href=\"/qa-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "问答</a></li>";
            strbuild += " <li><a href=\"/events-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "结伴游</a></li>";
            strbuild += " <li class=\"goBackdes\"><a href=\"/explore/\">返回目的地</a></li>";

        }
        else {
            strbuild += " <li><a href=\"/tourism-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "旅游</a></li>";
            strbuild += " <li><a href=\"/hotels-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "酒店排名</a></li>";
            strbuild += " <li><a href=\"/attractions-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "景点</a></li>";
            strbuild += " <li><a href=\"/restaurants-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "餐馆</a></li>";
            strbuild += " <li><a href=\"/qa-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "问答</a></li>";
            strbuild += " <li><a href=\"/events-d" + destInfov[0] + "-" + destInfov[2] + ".html\">" + destInfov[1] + "结伴游</a></li>";
            strbuild += " <li class=\"goBackdes\"><a href=\"/explore/\">返回目的地</a></li>";

        }
        strbuild += "</ul>";
        document.getElementById("LiteralMenuID").innerHTML = strbuild;
    }
}


function showAD(district, location, type) {
    jQuery.ajax({
        url: '/AjaxNew/GetAdCode.ashx',
        type: 'get',
        dataType: "text",
        data: "district=" + district + "&location=" + location + "&type=" + type,
        timeout: 50000,
        success: function (data) {
            if (data != " ") {
                document.getElementById("LvpingAD" + location).innerHTML = data;
                document.getElementById("LvpingAD" + location).style.display = "block";
                jQuery("#LvpingAD" + location).addClass("LvpingA-D");
            }
        }
    });
}

function fakeA(e, isblank) {
    jQuery(e).click(function () {
        var link = jQuery(this).attr('fhref');
        if (link) {
            if (isblank) {
                window.open(link);
            } else {
                window.location.href = link;
            }
        }
    });
}





var dataHowjounrals = ['<span title="关闭" class="close">不再显示<i></i></span>',
        '<div class="shadow" style="height:414px;"></div>',
        '<div class="new-vison-instro-content" style="height:404px;padding:0;">',
        '<a href="http://you.ctrip.com/minisite/survey/?s_g_uid=aab4bd86-7fec-4563-940f-8eee57a4812c" target="_blank" style="width:500px;height:404px; display:block; background:url(http://destres1.c-ctrip.com/img/others/banners/bg-howjounrals.png?v2)"></a>',
         '</div>'];



function setMoveinfos() {
    if ($('#pageTitle').length > 0) {
        var cdata = $('#pageTitle').attr('cdata');
        var title = $('#pageTitle').attr('title');
        var movelink = (cdata == 1) ? '<a href="/members/move.aspx">迁移</a>' : '';
        var moveInfos = jQuery('<div>').html('<div id="moveInfos"><div class="moveTitle">您曾在驴评网分享过旅行记录</div><p class="moveContent">为了更好地为广大用户提供一站式旅游服务，携程旅行社区即将迁移至携程攻略社区。您的旅行记录和分享已保存至携程社区。</p><p><span class="btn-check-moves">继续' + title + '</span>' + movelink + '</p></div>');
        if (cdata != 0) {
            jQuery('h1').LpPopupBox({ outurl: moveInfos, type: 'innerhtml', autoDisplay: true });
            jQuery('.btn-check-moves').on('click', function () {
                jQuery.fn.LpPopupBox.outerClose();
            });
        }
    }
}

function adheader(){
    var user = $('#banner').attr('mod_allyes_user');
    var bannerHtml = '<iframe marginheight="0" width="100%" height="100%" marginwidth="0" frameborder="0" scrolling="no" src="http:\/\/allyes.ctrip.com\/main\/adfshow?user=' + user + '&db=ctrip&border=0&local=yes"><\/iframe>';
    $('#banner').html(bannerHtml);
}


(function ($) {

    /* GSROLL */
    $.fn.gsrollnotice = function (opts) {
        var $this = $(this);
        var timeobj = null;
        var isCur = 0;
        var eqIndex = 0;
        var eqLen = 0;

        opts = $.extend({
            item: 'ul li',
            time: 3000
        }, opts);

        $this.find(opts.item).hide().eq(0).show();
        eqLen = $this.find(opts.item).length;

        if (eqLen > 1) {

            var roll = function (index) {
                $this.find('li').hide().eq(index).fadeIn();
            }
            $this.hover(function () {
                isCur = 1;
            }, function () {
                isCur = 0;
            });
            timeobj = window.setInterval(function () {
                if (isCur == 0) {
                    eqIndex++;
                    roll(eqIndex);
                    if (eqLen - 1 == eqIndex) {
                        eqIndex = -1;
                    }
                }
            }, opts.time);

        }

        //关闭_清除定时器
        $this.find('.close').on('click', function () {
            $this.css({ visibility: 'hidden' });
            window.clearInterval(timeobj);
        });


    }

    $(function () {
        //call 
        $('#gs_affiche').gsrollnotice();

    });


})(jQuery);


(function ($) {
    /**
    * 360合作注册
    * @param json参数
    * @returns this;
    */
    $.fn.gs360 = function (opts) {
        opts = $.extend({
            'url': 'https://accounts.ctrip.com/member/emailregist.aspx'
				, 'img': 'http://youresource.c-ctrip.com/img/common/980.jpg'
				, 'time': 7000
                , 'zindex' : 150
        }, opts);
        var that = $(this);
        function init(opts) {
            var html = $('<div class="ctrip360"><div class="inner"><a class="close360" href="javascript:void 0;">X</a><a class="a360" href="' + opts.url + '" target="_blank"><img src="' + opts.img + '" alt=""></a></div></div>');
            that.append(html);
        }
        init(opts);
        var ctrip360 = $('.ctrip360');
        ctrip360.find('.close360').on('click', function () {
            ctrip360.hide();
        });
        var xtime = window.setTimeout(function () {
            ctrip360.hide();
            xtime = null;
        }, opts.time);

        return this;
    }
})(jQuery);

/**
* 探测函数
* 来源于 swfobject项目
*/
gs_ua = function () {
    var UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    EXPRESS_INSTALL_ID = "SWFObjectExprInst",
    ON_READY_STATE_CHANGE = "onreadystatechange",
    win = window,
    doc = document,
    nav = navigator,
    w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
    u = nav.userAgent.toLowerCase(),
    p = nav.platform.toLowerCase(),
    windows = p ? /win/.test(p) : /win/.test(u),
    mac = p ? /mac/.test(p) : /mac/.test(u),
    webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
    // returns either the webkit version or false if not webkit
    ie = ! +"\v1",
    // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
    playerVersion = [0, 0, 0],
    d = null;
    if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
        d = nav.plugins[SHOCKWAVE_FLASH].description;
        if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
            plugin = true;
            ie = false; // cascaded feature detection for Internet Explorer
            d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
            playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
            playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
            playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
        }
    } else if (typeof win.ActiveXObject != UNDEF) {
        try {
            var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
            if (a) { // a will return null when ActiveX is disabled
                d = a.GetVariable("$version");
                if (d) {
                    ie = true; // cascaded feature detection for Internet Explorer
                    d = d.split(" ")[1].split(",");
                    playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                }
            }
        } catch (e) { }
    }
    return {
        w3: w3cdom,         //w3c
        pv: playerVersion,  //flash版本
        wk: webkit,         //web内核
        ie: ie,             //ie
        win: windows,       //win
        mac: mac            //max
    };
} ();


(function () {
    /* ubt */
    var slist=document.getElementsByTagName('script') || [];
    var reg=/_bfa\.min\.js/i;
    for(var i=0;i<slist.length;i++){
        if(reg.test(slist[i].src)){
            return;
        }
    }
    if(window.$_bf || window.$LAB || window.CtripJsLoader){
        return;
    }
    var d=new Date();
    var v='?v='+d.getFullYear()+d.getMonth()+'_'+d.getDate()+'.js';
    var bf = document.createElement('script');
    bf.type = 'text/javascript';
    bf.charset = 'utf-8';
    bf.async = true;
    try {
        var p = 'https:' == document.location.protocol;
    } catch (e) {
        var p = 'https:' == document.URL.match(/[^:]+/) + ":";
    }
    bf.src=(p?"https://s.c-ctrip.com/_bfa.min.js"+v:'http://webresource.c-ctrip.com/code/ubt/_bfa.min.js'+v);
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(bf, s);
    
})();

/*
(function() {
    try {
        var viz = document.createElement('script');
        viz.type = 'text/javascript';
        viz.async = true;
        viz.src = ('https:' == document.location.protocol ?'https://ssl.vizury.com' : 'http://serv3.vizury.com')+ '/analyze/pixel.php?account_id=VIZVRM839';

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(viz, s);
        viz.onload = function() {
            try{
                pixel.parse();
            } catch (i) {
            }
        };
        viz.onreadystatechange = function() {
            if (viz.readyState == "complete" || viz.readyState == "loaded") {
                try{
                    pixel.parse();
                } catch (i) {
                }
            }
        };
    } catch (i) {
    }
})();
*/


/* cookie  */
; (function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
    }

    function unRfc2068(value) {
        if (value.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        return value;
    }

    function fromJSON(value) {
        return config.json ? JSON.parse(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? null : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = fromJSON(cookie);
                break;
            }

            if (!key) {
                result[name] = fromJSON(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);



/**
* 最新搜索框控件
* yi.z 
* 2013-09-06
*/
jQuery.sug = function (params, element) {
    this.params = params;
    this.element = element;
    this.defaultnotice = this.params.defaultValue || this.element.attr('default_notice') || '';
    this.defaultvalue = {};
    this.sugContents = function () { };
    this.addbox();
    this.sgtContainer = jQuery('#hKwordCon');
    this.sgtListcon = jQuery('#hKwordCon ul');
    this.setDefault();
    this.element.bind('focus', jQuery.proxy(this.inputFocus, this));
    this.element.bind('keydown', jQuery.proxy(this.onKeydown, this));
    this.element.bind('click', function (e) { e.stopPropagation(); });
    jQuery(document).bind('click', jQuery.proxy(this.inputBlur, this));
    this.element.bind('contextmenu', jQuery.proxy(this.inputFocus, this)); 
    var me = this;
    $(window).resize(function () {
        me.setOffset(me.element, me.sgtContainer);
    });
};
jQuery.sug.prototype = {
    oCache: {},
    gos: 0,
    oldValue: '',
    isHide: true,
    onTime: false,
    kCode: {
        ENTER: 13,
        UP: 38,
        DOWN: 40,
        ESC: 27
    },
    sgthtml: '<div id="hKwordCon" class="search-box"><ul></ul></div>',
    addToCache: function (keyword, values) {
        this.oCache[keyword] = [];
        this.oCache[keyword] = values;
    },
    checkCache: function (keyword) {
        if (this.oCache[keyword]) {
            return true;
        }
    },
    getSuggestions: function (keyword) {
        this.oldValue = keyword;
        if (keyword != "" && keyword != this.defaultnotice) {
            var _this = this;
            if (this.checkCache(keyword) == true) {
                this.displayResults(this.oCache[keyword]);
            } else {
                jQuery.getJSON(this.params.addressUrl + "?Jsoncallback=?", { keyword: escape(keyword) }, function (obj) {
                    jQuery.proxy(_this.displayResults(obj), _this);
                    jQuery.proxy(_this.addToCache(keyword, obj), _this);
                });
            }
        } else {
            jQuery.proxy(this.displayResults(this.defaultvalue), this);
        }
    },
    displayResults: function (obj) {
        this.clean();
        var _this = this;
        if (_this.element.val() != '' && _this.element.val() != _this.defaultnotice && obj.success != -10) {
            var htmlStr = this.sugContents(obj);
            this.sgtListcon.append(htmlStr);
            this.setOffset(this.element, this.sgtContainer);
            this.sgtContainer.show();
        } else {
            this.clearTime();
            this.sgtContainer.hide();
        }
    },
    inputFocus: function () {
        if (this.element.val() == this.defaultnotice || this.element.val() == '') {
            this.element.val('');
            this.element.removeClass('sgtgray').addClass('sgtblack');
        }
        if (this.params.isShow) {
            this.clearTime();
            this.setTime();
        }
    },
    inputBlur: function () {
        if (this.element.val() == this.defaultnotice || this.element.val() == '') {

            this.element.removeClass('sgtblack').addClass('sgtgray');
            this.element.val(this.defaultnotice);
        }
        this.sgtContainer.hide();
        this.clearTime();
    },
    onKeydown: function (A) {
        switch (A.keyCode) {
            case this.kCode.UP:
                var o = this.sgtListcon.find('a');
                if (o.length > 1) {
                    this.gos--;
                    if (this.gos == -1) {
                        this.gos = o.length - 1;
                    }
                    this.selected(o.eq(this.gos));
                } else if (o.length == 1) {
                    this.selected(o.eq(0));
                };
                return false;
            case this.kCode.DOWN:
                var o = this.sgtListcon.find('a');
                if (o.length > 1) {
                    this.gos++;
                    if (this.gos == 1 && !this.sgtListcon.find('a').hasClass('current')) {
                        this.gos = 0;
                    }
                    if (this.gos == o.length) {
                        this.gos = 0;
                    }
                    this.selected(o.eq(this.gos));
                } else if (o.length = 1) {
                    this.selected(o.eq(0));
                };
                return false;
            case this.kCode.ENTER:
                if (!this.params.isShow) {
                    this.params.callBack();
                }
                if (this.element.val() == this.oldValue) {
                    if (this.sgtListcon.find('a').hasClass('current')) {
                        window.location.href = this.sgtListcon.find('a').eq(this.gos).attr('href');
                    } else {
                        this.params.callBack();
                    }
                    this.clearTime();
                    this.oldValue = this.element.val();
                    this.sgtContainer.hide();
                }
                return false;
            case this.kCode.ESC:
                this.element.val('');
                this.sgtContainer.hide();
                return false;
            default:
                if (this.params.isShow) {
                    this.setTime();
                }
        }

    },
    selected: function (obj) {
        this.sgtListcon.find('a').removeClass("current");
        obj.addClass("current");
    },
    clean: function () {
        this.gos = 0;
        this.sgtListcon.html('');
    },
    setOffset: function (M, N) {
        var o = M.offset();
        var h = M.outerHeight();
        N.css({ top: o.top + h, left: o.left - 32.8 });
    },
    setDefault: function () {
        if (this.element.val() == '') {
            this.element.val(this.defaultnotice);
            this.element.removeClass('sgtblack').addClass('sgtgray');
        }
    },
    addCss: function (h) {
        var d = document.createElement('link');
        var c = { type: 'text/css', href: h, rel: "stylesheet" };
        for (var e in c) { d[e] = c[e]; };
        jQuery('head').append(d);
    },
    addbox: function () {
        jQuery('body').append(this.sgthtml);
    },
    checkValue: function () {
        if (this.element.val() != this.oldValue) {
            jQuery.proxy(this.getSuggestions(this.element.val()), this);
        }
        if (this.params.isShow) {
            this.clearTime();
            this.setTime();
        }
    },
    setTime: function () {
        this.timeOut = setTimeout(jQuery.proxy(this.checkValue, this), 200);
        this.onTime = true;
    },
    clearTime: function () {
        if (this.timeOut != 0) {
            clearTimeout(this.timeOut);
        }
        this.onTime = false;
    }
};


jQuery.fn.fastSuggest = function (e) {
    var suggest = new jQuery.sug(e, jQuery(this));
    suggest.defaultvalue = {};
    suggest.sugContents = function (obj) {
        var html = '';
        var keywordVal = GS.xssFilter( this.element.val() ); //过滤XSS
		/* 目的地、景点、餐馆、购物、娱乐、景点列表 */
		var typeClassArr = ["icon_des", "icon_attr", "icon_rest", "icon_shop", "icon_amus", "icon_attr_list"];
		if(obj.List){
			var listArr = obj.List,
				len = listArr.length,
				i = 0;
			if(len != 0){
				for(; i < len; i++){
					var li = [],
						item = listArr[i],
                        name = item.Name,
						type = parseInt(item.Type, 10),
						url = item.Url;
						type = type >= 101 ? type - 96 : type - 1;
					var typeClass = typeClassArr[type];
					name = name || "";
                    matchName = name.match(new RegExp(keywordVal,"i"));
                    name = name.replace(matchName, '<span class="keyword">'+ matchName +'</span>');
					if (item.DestName != null && item.DestName != "") {
                        name += "，" + item.DestName;    
                    }
					li.push('<li>');
					li.push('	<a href="'+ url +'">');
					li.push('		<i class="'+ typeClass +'"></i>');
					li.push(		name);
					li.push('	</a>');
					li.push('</li>');
					html += li.join('');
				}
				html += '<li class="divider"></li>';
			}		
		}
		/*游记*/
		if (obj.TravelsUrl) {
			var li = [];
            li.push('<li>');
			li.push('	<a href="'+ obj.TravelsUrl +'">');
			li.push('		搜索 “<span class="keyword text_flow">'+ keywordVal +'</span>” 的相关游记');
			li.push('	</a>');
            li.push('</li>'); 
            html = html + li.join(''); 
		}
		/*问答*/
        if (obj.QAUrl) {
            var li = [];
            li.push('<li>');
			li.push('	<a href="'+ obj.QAUrl +'">');
			li.push('		搜索 “<span class="keyword text_flow">'+ keywordVal +'</span>” 的相关问答');
			li.push('	</a>');
            li.push('</li>'); 
            html = html + li.join(''); 
        }
		/*搜索更多*/
        if (obj.SearchUrl) {
			var li = [];
			li.push('<li class="divider"></li>');
            li.push('<li>');
			li.push('	<a href="'+ obj.SearchUrl +'">');
			li.push('		搜索 “<span class="keyword text_flow">'+ keywordVal +'</span>” 更多相关内容');
			li.push('	</a>');
            li.push('</li>'); 
            html = html + li.join(''); 
        }
        return html;
    }
};
/**
*  最新搜索框使用
*  yi.z
*  2013-09-05 
*/
$(function () {
    jQuery('.gs-search-2 .btn-search').click(function () {
        hSearchfastKeyword();
        return false;
    });
    jQuery('#gsSearch').placeholder();
    jQuery("#gsSearch").attr("autocomplete", "off");
    jQuery('#gsSearch').fastSuggest({
        isShow: true
        , addressUrl: '/SearchSite/Service/Tip2'
        , callBack: function () { hSearchfastKeyword(); }
    });

    function hSearchfastKeyword() {
        var searchURL = '/SearchSite/?query=';
        var query = ($('#gsSearch').val() || '');
        if (('搜索城市、景点、游记、问答、用户') == query) {
            query = '';
        }
        if (query != "") {
            window.location.href = searchURL + escape(query);
        }
    }
    
    //有些没有id
    jQuery('.gs-nav li').eq(6).append('<span class="gs_newicon"></span>');
    if ($('.gs-nav li').children('.gstips_supcount').length > 0) {
        $('.gs-nav li').children('.gstips_supcount').wrap("<span class='tipsbox_outer'></span>");
    }

});




$(function () {

    //无线弹出层注入
    var AppFloat = {
        config: {
            jsUrl: "http://webresource.c-ctrip.com/ResCRMOnline/r10/js/float/float.min.js?ws_www20140121.js",
            cssUrl: "",
            reg: {
                baidu: "/baidu.com/"
            }
        },
        func: {
            addCookie: function (objName, objValue, objHours) {//添加cookie
                var str = objName + "=" + escape(objValue);
                if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
                    var date = new Date();
                    var ms = objHours * 3600 * 1000;
                    date.setTime(date.getTime() + ms);
                    str += "; expires=" + date.toGMTString();
                }
                document.cookie = str;
            },
            getCookie: function (objName) {
                var arrStr = document.cookie.split("; ");
                for (var i = 0; i < arrStr.length; i++) {
                    var temp = arrStr[i].split("=");
                    if (temp[0] == objName) {
                        temp.shift();
                        return unescape(temp.join().replace(/,/g, "="));
                    }
                }
            },
            loadJs: function () {
                var script = document.createElement('script');
                script.async = true;
                script.src = AppFloat.config.jsUrl,
			script.charset = "utf-8";
                document.getElementsByTagName('head')[0].appendChild(script);
            },
            loadCss: function () {
                var style = document.createElement('link');
                style.async = true;
                style.href = AppFloat.config.cssUrl;
                style.type = "text/css";
                style.media = "all";
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        },
        init: function (type) {
            window.AppFloatType = type;
            var allianceID = this.getAllianceID();
            var ref = this.getRef();
            var cnt = this.getCnt();
            this.checkFloat(allianceID, ref, cnt);
        },
        getAllianceID: function () {
            var Union = this.func.getCookie("Union");
            if (Union) {
                var arr = Union.split("&");
                for (var i = 0, j = arr.length; i < j; i++) {
                    if (arr[i].indexOf("AllianceID") + 1 > 0) {
                        return arr[i].split("=")[1];
                    }
                }
            }
        },
        getRef: function () {
            return document.referrer;
        },
        getCnt: function () {
            return this.func.getCookie("appFloatCnt") || 0;
        },
        checkFloat: function (id, ref, cnt) {
            this.func.loadJs();
            try {
                if (id == "4897" && ref.match(eval(AppFloat.config.reg.baidu)) && parseInt(cnt, 10) < 5) {
                    // this.func.loadCss();
                    this.func.loadJs();
                    this.func.addCookie("appFloatCnt", parseInt(cnt, 10) + 1, 1440);
                    $('#float_level').show();
                }
            } catch (e) { }
        }
    }

    //取环境
    function get_ent_domain() {
        var i, ent = [
                '.dev.sh.ctriptravel.com',
                '.testp.sh.ctriptravel.com',
                '.uat.sh.ctriptravel.com',
                '.ctripcorp.com',
                '.ctrip.com'
            ];
        for (i = 0; i < ent.length; i++) {
            if (window.location.hostname.indexOf(ent[i]) > 0) {
                return ent[i];
            }
        }
        return '.c-ctrip.com';
    }

    var siteDomain = '',
        curDomain = get_ent_domain();

    switch (curDomain) {
        case '.testp.sh.ctriptravel.com':
            siteDomain = 'testp.sh.ctriptravel';
            break;
        case '.uat.sh.ctriptravel.com':
            siteDomain = 'uat.sh.ctriptravel';
            break;
        default:
            siteDomain = 'ctrip';
            break
    }

    var _w = [];
    _w.push('<input type="hidden" id="siteDomain" value="' + siteDomain + '"/>');
    _w.push('	<div id="float_level" class="app_wrap" style="display:none">');
    _w.push('   <div class="app_box">');
    _w.push('	<a href="javascript:;" class="app_close" id="app_close" title="关闭">&times;</a>');
    _w.push('			<div class="pic_phone"></div>');
    _w.push('			<div class="app_text">');
    _w.push('				<p class="t2">旅游攻略<strong>随身带</strong></p>');
    _w.push('				<p class="c2">手机预订&nbsp;低至<span>5</span>折</p>');
    _w.push('				<p class="c3">———————&nbsp;&nbsp;更多返现积分等你拿</p>');
    _w.push('			</div>');
    _w.push('			<div class="app_cont">');
    _w.push('				<div class="app_form">');
    _w.push('					<div class="t">下载携程旅行手机版<a target="_blank" href="http://app.ctrip.com"><span>Pad</span>及手机网络版 &gt;</a></div>');
    _w.push('					<p>发送下载地址至手机</p>');
    _w.push('					<p class="s_item"><input id="phone_num" type="text" placeholder="请输入11位手机号" pl="请输入11位手机号"/><a href="javascript:;" id="send_msg" class="btn01" title="" >免费获取</a></p>');
    _w.push('					<p id="show_msg" class="app_tip" style="display:none"><span class="ico_success"></span>发送成功，请注意查收短信</p>');
    _w.push('					<p>直接下载</p>');
    _w.push('					<div class="app_download">');
    _w.push('						<a target="_blank" href="http://itunes.apple.com/cn/app/xie-cheng-wu-xian-jiu-dian/id379395415?mt=8" class="btn_d">iPhone</a><a href="javascript:;" class="btn_d" id="android_popup">Android</a>');
    _w.push('					</div>');
    _w.push('				</div>');
    _w.push('				<div class="app_code">');
    _w.push('					<p>扫描二维码下载</p>');
    _w.push('						<img src="http://pic.c-ctrip.com/index/qr_community.png" />');
    _w.push('				</div>');
    _w.push('			</div>');
    _w.push('		</div>');
    _w.push('		<div class="app_collect">收藏Ctrip.com，以便下次快速访问<a href="javascript:popUp.addfavor(&#39;http://www.ctrip.com/?s3&#39;,&#39;携程旅行网&#39;)" class="s_btn">点击收藏</a>');
    _w.push('		</div>');
    _w.push('	</div>');

    $('body').append($(_w.join('')));

    //启动无线弹出层js功能
    AppFloat.init("community");

});

(function ($) {
    /**
    * 底层弹出注册弹出层组件 , 需要 cookie 与 jquery 支持
    * @param json参数
    * @returns this;
    */
    $.fn.gsBottomRegister = function (opts) {

        opts = $.extend({
            'reg_url': 'https://accounts.ctrip.com/member/emailregist.aspx'
            , 'login_url': 'https://accounts.ctrip.com/member/login.aspx?BackURL=' + escape(window.location.href)
            , 'time': 10000 //延迟几移弹出
            , 'cookieName': 'is_open_bottom_reg'
            , 'cookieDay': 1  //1天
        }, opts);

        var isIE6 = $.browser.version == 6.0 && $.browser.msie;
        if (isIE6) { return false; }

        var that = $(this);
        //初始化
        function init() {
            var _html = [], i = 0;
            _html.push('<div class="gs_bottom_pop_blk" id="regGuide">');
            _html.push('	<div class="gs_bottom_pop_inforout">');
            _html.push('        <a class="gs_bottom_pop_close" href="javascript:void(0);"></a>');
            _html.push('	    <div class="gs_bottom_pop_inforin cf">');
            _html.push('    	    <div class="gs_bottom_pop_left">');
            _html.push('    	        <div class="gs_pop_animation_show">');
            _html.push('    	            <span class="gs_bpop_wd"></span><span class="gs_bpop_jd"></span><span class="gs_bpop_yj"></span><span class="gs_bpop_gl"></span><span class="gs_bpop_mdd"></span><span class="gs_bpop_ms"></span><span class="gs_bpop_yl"></span><span class="gs_bpop_qt"></span>');
            _html.push('    	        </div>');
            _html.push('    	    </div>');
            _html.push('    	    <div class="gs_bottom_pop_mid">');
            _html.push('    	        <a href="' + opts.reg_url + '" class="regbutton" target="_blank">注册</a><a href="' + opts.login_url + '" class="loginbutton" target="_blank">登录</a>');
            _html.push('    	    </div>');
            _html.push('    	    <div class="gs_bottom_pop_right">');
            _html.push('    	        <span class="gs_micromes"></span><a href="http://weibo.com/ctripyou" title="关注我们" target="_blank" class="gs_focus_us"></a>');
            _html.push('    	    </div>');
            _html.push('        </div>');
            _html.push('    </div>');
            _html.push('</div>');
            that.append(_html.join(''));
        }
        //操作动作
        function show() {
            var regGuide = $('#regGuide');
            regGuide.find('.gs_bottom_pop_close').on('click', function () {
                regGuide.hide();
                //写入cookie
                $.cookie(opts.cookieName, 1, { expires: opts.cookieDay, path: '/' });
            });
            var xtime = window.setTimeout(function () {
                var float_level = $('#float_level').css('display');

                //判断一下无线弹出层
                if (float_level == undefined || float_level == 'none') {
                    regGuide.show();
                }
                xtime = null;
            }, opts.time);
        }
        $.cookie.raw = true;
        if (!$.cookie(opts.cookieName) && !$.cookie('CtripUserInfo')) {
            init(opts);
            show();
        }
        return this;
    }
})(jQuery);


$(function () {
    //直接启动
    $('body').gsBottomRegister();
});

/**
*  footer 展开收起JS
*  rzou
*  2014-3-26
*/
//跑马灯组件
(function ($) {
    $.fn.FooterSeoScroll = function (options) {
        var defaults = {
            speed: 1
        }
        //获取参数
        var options = $.extend(defaults, options);
        //定义对象
        var obj = $(this);
        var obj_ul = $(obj).find('ul');
        var obj_li = $(obj_ul).find('li');
        //判断是否需要滚动
        if (obj_li.outerWidth() * obj_li.length < obj.innerWidth()) return;
        //复制内容，重建对象
        obj_li.clone().appendTo(obj_ul);
        obj_li = $(obj_ul).find('li');
        //设定宽度  
        obj_ul.css('width', obj_li.outerWidth() * obj_li.length);
        var scroll_offset = 1;
        var scroll_time = options.speed;
        var t = setInterval(scroll_do, scroll_time);
        //滚动  
        function scroll_do() {
            if (obj.scrollLeft() >= obj_ul.outerWidth() / 2 || obj.scrollLeft() >= (obj_ul.outerWidth() - obj.innerWidth())) {
                obj.scrollLeft(0);
            } else {
                obj.scrollLeft(obj.scrollLeft() + scroll_offset);
            }
        }
        //鼠标悬停
        obj_ul.hover(
            function () { clearInterval(t); },
            function () { t = setInterval(scroll_do, scroll_time); }
        );
    }
})(jQuery);  
$(function () {
    $('.footerseo .seojs2line .more').toggle(function () {
        $(this).html("-收起");
        $(this).parent().next('.seojscon').css('height', 'auto');
    }, function () {
        $(this).html("+更多");
        $(this).parent().next('.seojscon').css('height', '36px');
    });
    $('.footerseo .seojs3line .more').toggle(function () {
        $(this).html("-收起");
        $(this).parent().next('.seojscon').css('height', 'auto');
    }, function () {
        $(this).html("+更多");
        $(this).parent().next('.seojscon').css('height', '54px');
    });
    if ($('#footerseo_marquee').length > 0) {
        $('#footerseo_marquee').FooterSeoScroll({
            speed: 20
        });
    }
});


