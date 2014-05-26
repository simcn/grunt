;(function(a) {
    
    a('body').append('<div id="gsn_alert_box" class="gsn-layer" style="display:none">\
                     <a class="close" href="javascript:$.popupbox.close()"></a>\
                     <div class="gsn-form">\
                     <h3 style="font-weight: normal; line-height: 2em; margin: 0;"></h3>\
                     <div class="gsn-inputbox gsn-buttonbox" style="text-align: right;"><a class="gsn-btn-2" href="javascript:$.popupbox.close()">确定</a></div>\
                     </div>');
        

    
    //var gs-alert-box = '<div class="gsn-layer" id="gs-alert-box"><a data-close="gsn_frame_report" class="close" href="javascript:gs_report_close();"></a><div class="gsn-form"><h3>举报</h3></div></div>'
    
    
    var hideAlertTimer = null;
    a.extend({
        gs_alert:function(opts){
            
            opts = a.extend({
                 'text':'默认提示文字'
                ,'id':'gsn_alert_box'
                ,'width':'300'
                ,'zindex':140
                ,'callback':''
                ,'hasCloseBtn':true //是否显示close 关闭按钮
                ,'hasDetermineBtn':true //是否显示确定按钮
                ,'time': 0  //自动关闭的定时器
            },opts);                
            
            a('#'+ opts.id)
                .css({
                    width:opts.width
                })


            var $win = a('#'+ opts.id);
            clearTimeout(hideAlertTimer);
            $win.find('h3').html(opts.text);
            
            if (opts.hasCloseBtn) {
                $win.find('a.close').show();
            }else{
                $win.find('a.close').hide();
            }
            if (opts.hasDetermineBtn) {
                $win.find('.gsn-inputbox').show();
            }else{
                $win.find('.gsn-inputbox').hide();
            }
            if (opts.time) {
                function hideAlert() {
                    $.popupbox.close();
                }
                hideAlertTimer = setTimeout(hideAlert, opts.time);  
            }
            
            
            a.popupbox.show({id:opts.id,zIndex:opts.zindex,callback:opts.callback});
            
            
            //console.log(opts);
            
        }   
    });
    
    
    a.extend({
        popupbox: {
            openID: "",
            position: "",
            mt: "",
            parentIsLoad: true,
            init: function(b,zIndex) {
                if (b == undefined) b = "gs_box";
                if (this.parentIsLoad) {
                    a('<div id="' + b + '"></div>').appendTo("body");
                    a('<div class="gs_SHUCOVER_V1 gs_hide" id="gs_SHUCOVER_V1" style="z-index:'+zIndex+'"><iframe class="gs_SHUCOVER_IFRAME_V1" id="gs_SHUCOVER_IFRAME_V1" src="about:blank"></iframe></div>').appendTo("body");
                    this.parentIsLoad = false
                }
            },
            show: function(b) {
                var c = {
                    'overlay': {color: "#fff",opacity: 0.5},
                    'position': "fixed",
                    'zIndex': 140,
                    'mt': "200px",
                    'layerContainer': "gs_LAYER_PARENT_FRAME_V1"
                };
                c = a.extend(c, b);
                if (!document.getElementById(c.id)) {
                    alert("noid:" + c.id);
                    return false
                }
                this.init(c.layerContainer,c.zIndex);
                this.position = c.position;
                this.mt = c.mt;
                this.openID = b.id;
                this.setpos(a("#" + this.openID),c.zIndex);
                this.is6FIX("100%");
                a("#" + this.openID).prependTo(a("#" + c.layerContainer));
                a("#" + this.openID).fadeIn('fast');
                a("#gs_SHUCOVER_V1").css({
                    "background-color": c.overlay.color,
                    opacity: c.overlay.opacity
                }).show();
                
                if (typeof b.callback === 'function') {
                    b.callback();
                }
                
            },
            setpos: function(b,zindex) {
                b.addClass("gs_LAYER_PARENT_V1");
                var c = b.outerHeight(),
                d = b.outerWidth();


                b.css({
                    "margin-left": d / 2 * -1,
                    "margin-top": c / 2 * -1,
                    'z-index':zindex + 1
                });
                if (c > (document.body.clientHeight == 0 ? document.body.clientHeight: document.documentElement.clientHeight) || this.position === "absolute") b.css({
                    top: this.mt,
                    position: "absolute",
                    marginTop: "0"
                })
            },
            close: function(callback) {
                clearTimeout(hideAlertTimer);
                a("#" + this.openID).fadeOut('slow');
                a("#" + this.openID).removeClass("gs_LAYER_PARENT_V1");
                a("#gs_SHUCOVER_V1").fadeOut('fast');
                this.is6FIX("auto");                
                if (typeof callback === 'function') {
                    callback();
                }
            },
            is6FIX: function(b) {
                if (a.browser.msie && a.browser.version == "6.0") {
                    a("html").css({
                        height: b
                    });
                    a("body").css({
                        height: b,
                        backgroundImage: "url(about:blank)",
                        backgroundAttachment: "fixed"
                    })
                }
            }
        }
    })
})(jQuery);
function ShowPdfDownbyDistrict(d, t) {




    var ajaxData = { d: d, type: t, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/gspdfdownbyDistrict.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {

            $('.cityguide').hide();
        },
        success: function (data) {
            //   alert(data);
            if (data == "") {
                $('.cityguide').hide();
                $('.relateddes').hide();

            }

            $('#gspdfhtml').html(data);
        }
    });

}

//
function ShowWeather(district) {
    var ajaxData = { district: district, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/SoaWeather.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) { },
        success: function (data) {

            if (data == "")
                $('#weatherid').hide();
            else
                $('#weatherid').show();
            $('#weatherid').html(data);
        }
    });
}
function showSoaHotelLocationZone(district) {
    var ajaxData = { district: district, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/SoaHotelLocationZone.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) { },
        success: function (data) {

            //            if (data == "")
            //                $('#weatherid').hide();
            //            else
            //                $('#weatherid').show();
            $('.keyword_search').html(data);

            $('.address_hot_abb2 li').click(function () {
                var index = $(this).index('.address_hot_abb2 > li');
                $(this).addClass("hot_selected2").siblings().removeClass("hot_selected2");
                $('.area_list').find('dd').hide().eq(index).show();
            });

            $('#hotel_position').click(function () {
                var hotel_popbox = $('.keyword_search');
                var that = $(this);
                hotel_popbox.show();
                $(document)
                                    .click(function (e) {
                                        e = e || window.event;
                                        if (e.target.nodeName == 'BODY' || e.target.nodeName == 'FROM') {
                                            hotel_popbox.hide();
                                        }
                                    });
            });

            $('.keyword_search dl.area_list').on('click', 'a', function (e) {
                var data = $(this).attr('data') || $(this).attr('metrodata');
                // alert(data); //txthidenID txthideLocationZoneType |漕河泾开发区|29|z 

                var retString = data;
                if (data != "") {
                    var arry = retString.split('|');
                    $('#hotel_position').val(arry[1]);
                    $('#txthideLocationZoneType').val(arry[3]);
                    $('#txthidenID').val(arry[2]);
                }



                $('.keyword_search').hide();
            });
        }
    });
}

function showNearHotelByLat(sight) {
    var ajaxData = { sight: sight, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/gsNearHotelByLat.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) { },
        success: function (data) {


            $('#nearhotelid').html(data);
        }
    });
}



//显示目的地月度推荐
function ShowDestMonth(m) {


    var ajaxData = { m: m, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/gsMonthDistrict.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) { },
        success: function (data) {
            //   alert(data);
            $('#desmonthhtml').html(data);
        }
    });

}
//ClickWent

function ClickWent() {


    var district = jQuery('#wentClickID').attr('data-cat');
    var typeName = jQuery('#wantClickID').attr('data_type');
    var resource = jQuery('#wentClickID').attr('dataresource-cat');

    if (typeName == "district") {
        var ajaxData = { type: "addgone", mapid: "-1", district: district, shareSoon: "0", rank: Math.random() };
        jQuery.ajax({
            url: '/ajaxnew/DoMapData.ashx',
            data: ajaxData,
            type: "get",
            dateType: "text",
            success: function (data) {
                jQuery("#wentClickID").attr("class", "gsn-btn-25");
                ShowGoWantStatus();
            }

        });
    }
    else if (typeName == "sight") {
        var ajaxData = { goneFlag: 1, resource: resource, busiType: 1, rank: Math.random() };
        jQuery.ajax({
            url: '/ajaxnew/NewAddPlanGone.ashx',
            data: ajaxData,
            type: "get",
            dateType: "text",
            success: function (data) {
                jQuery("#wentClickID").attr("class", "gsn-btn-25");
                ShowGoWantStatus();
            }

        });
    }
    else if (typeName == "res") {
        var ajaxData = { goneFlag: 1, resource: resource, busiType: 2, rank: Math.random() };
        jQuery.ajax({
            url: '/ajaxnew/NewAddPlanGone.ashx',
            data: ajaxData,
            type: "get",
            dateType: "text",
            success: function (data) {
                jQuery("#wentClickID").attr("class", "gsn-btn-25");
                ShowGoWantStatus();
            }

        });
    }
}

function ClickWant() {


    var district = jQuery('#wentClickID').attr('data-cat');
    var typeName = jQuery('#wantClickID').attr('data_type');
    var resource = jQuery('#wentClickID').attr('dataresource-cat');
    if (typeName == "district") {
        var ajaxData = { type: "toplan", mapid: "-1", district: district, shareSoon: "0", rank: Math.random() };
        jQuery.ajax({
            url: '/ajaxnew/DoMapData.ashx',
            data: ajaxData,
            type: "get",
            dateType: "text",
            success: function (data) {

                jQuery("#wantClickID").attr("class", "gsn-btn-25");
                ShowGoWantStatus();
                // jQuery(".status").html("想去");
            }

        });
    }
    else if (typeName == "sight") {
        var ajaxData = { planFlag: 1, resource: resource, busiType: 1, rank: Math.random() };
        jQuery.ajax({
            url: '/ajaxnew/NewAddPlanGone.ashx',
            data: ajaxData,
            type: "get",
            dateType: "text",
            success: function (data) {
                //jQuery(".status").html("想去");
                jQuery("#wantClickID").attr("class", "gsn-btn-25");
                ShowGoWantStatus();
            }

        });
    }
    else if (typeName == "res") {
        var ajaxData = { planFlag: 1, resource: resource, busiType: 2, rank: Math.random() };
        jQuery.ajax({
            url: '/ajaxnew/NewAddPlanGone.ashx',
            data: ajaxData,
            type: "get",
            dateType: "text",
            success: function (data) {
                //  jQuery(".status").html("想去");
                jQuery("#wantClickID").attr("class", "gsn-btn-25");
                ShowGoWantStatus();
            }

        });
    }
}
//显示想去去过状态  window.location.reload();
function ShowGoWantStatus() {

    var typeName = jQuery('#wentClickID').attr('data_type'); //类型district sight res
    var district = jQuery('#wantClickID').attr('data-cat');
    var resource = jQuery('#wentClickID').attr('dataresource-cat');
    if (typeName == "district")
        resource = district;
    var ajaxData = { resource: resource, typeName: typeName, rank: Math.random() };
    jQuery.ajax({
        url: '/ajaxnew/gsAjaxShowGoWantStatus.ashx',
        data: ajaxData,
        type: "get",
        dateType: "text",
        success: function (data) {
           
            //1,1,1,1去过，想去
            var v = data.split(',');
            if (v.length > 3) {
                if (v[0] > 0) {
                    //改按钮样式为灰色
                    jQuery("#wentClickID").attr("class", "gsn-btn-25");
                }
                if (v[1] > 0) {
                    jQuery("#wantClickID").attr("class", "gsn-btn-25");
                }
                if (v[2] > 0) {
                    //jQuery('#gonespantitleid').attr("title", "共" + v[2] + "人去过");

                    jQuery('#gonespantitleid').html("去过<s>(" + v[2] + ")</s>");
                }
                if (v[3] > 0) {
                    //jQuery('#wantClickID').attr("title", "共" + v[3] + "人想去");
                    jQuery('#planspantitleid').html("想去<s>(" + v[3] + ")</s>");
                }
            }


        }

    });
}
function ClickCss(s) {
    if (s == 'photo') {
        jQuery("#cbdmapid").hide();
        jQuery("#cbdphotoid").show();
    }
    if (s == 'map') {
        jQuery("#cbdmapid").show();
        jQuery("#cbdphotoid").hide();
    }
}

//city,商区行政区类型，商区行政区值，名称，星级，入离时间
//  showSoaHotelList(<%=districtEntity.DistrictID%>,"zone",0,"",0,"2013-04-22","2013-04-23");
function showSoaHotelList(city, zonetype, zonevalue, hotelname, star, checkInDate, checkOutDate) {


    jQuery(".quarterlist").html("<li> <div class=\"gs_loading\"><p>加载中，请稍等...</p></div></li>");
    var ajaxData = { city: city, zonetype: zonetype, zonevalue: zonevalue, star: star, hotelname: escape(hotelname), checkInDate: checkInDate, checkOutDate: checkOutDate, rank: Math.random() };
    jQuery.ajax({
        url: '/ajaxnew/SoaHotelList.ashx',
        data: ajaxData,
        type: "get",
        dateType: "text",
        error: function (data) {
            jQuery(".quarterlist").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有住宿信息，你可以<a target=\"_blank\" href=\"http://hotels.ctrip.com/\">查看更多酒店</a></p></div>");
        },
        success: function (data) {

            if (data != "")
                jQuery(".quarterlist").html(data);
            else {
                // jQuery(".quarterlist").html("<div class=\"eachquarter\"> <ul>暂无数据</ul>   </div> ");

                jQuery(".quarterlist").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有住宿信息，你可以<a target=\"_blank\" href=\"http://hotels.ctrip.com/\">查看更多酒店</a></p></div>");



            }
        }

    });
}


$("#spanOpen").click(function () {
    jQuery("#AllOpenContent").show();
    jQuery("#hideOpenContent").hide();
});
$("#spanHide").click(function () {
    jQuery("#hideOpenContent").show();
    jQuery("#AllOpenContent").hide();
});

var numtype = false;
var goListtype = false;
var isVacation = false;
function showGoLists(d) {
    var ajaxData = { d: d, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/gsShowGoLists.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {
            $('.itineraryitems').hide();
            $('#itliadid').hide();
        },
        success: function (data) {


            $('.itineraryitems').html(data);
            if (data == "") {

                $('.itineraryitems').hide();
                $('#itliadid').hide();
            }
            else {
                jQuery("#itliadid").show();
                if (!numtype) {

                    jQuery("#itliadid").addClass("current");
                    $("#itliadid").siblings().removeClass("current");
                    $tabs("#cityTitle li", "#cityCon > div");
                    goListtype = true;
                }

            }
            //jQuery(".itineraryitems").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有推荐行程</p></div>");

        }
    });
}
function ShowFlight(district) {
    jQuery("#jipiaoad").html("<div class=\"gs_loading\"><p>加载中，请稍等...</p></div>");
    var ajaxData = { ACity: district, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/SoaFlightProxy.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {
            jQuery("#jipiaoad").hide();
            jQuery("#jpliadid").hide();
            //            showHotelAd(district);
            //            showGoLists(district);
            //jQuery("#jipiaoad").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有特价机票，你可以<a target=\"_blank\" href=\"http://flights.ctrip.com/\">查看更多特价机票</a></p></div>");
        },
        success: function (data) {

            jQuery("#jipiaoad").html(data);
            if (data == "") {
                jQuery("#jipiaoad").hide();
                jQuery("#jpliadid").hide();

            }
            else {
                jQuery("#jpliadid").show();
                if (!numtype && !goListtype) {
                    jQuery("#jpliadid").addClass("current");

                    $("#jpliadid").siblings().removeClass("current");
                    $tabs("#cityTitle li", "#cityCon > div");
                }

//                var previewUrl = document.referrer;
//               
//                if (previewUrl.indexOf('.so.com') > -1) {
//                    jQuery("#jpliadid").addClass("current");
//                  
//                    $("#jpliadid").siblings().removeClass("current");
//                    $tabs("#cityTitle li", "#cityCon > div");
//                }

            }

            // jQuery("#jipiaoad").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有特价机票，你可以<a target=\"_blank\" href=\"http://flights.ctrip.com/\">查看更多特价机票</a></p></div>");
        }
    });
}
function showHotelAd(d) {

    jQuery("#hotelad").html("<div class=\"gs_loading\"><p>加载中，请稍等...</p></div>");
    var ajaxData = { district: d, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/gsHotelAd.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {
            jQuery("#hotelad").hide();
            jQuery("#hotelliadid").hide();
            //jQuery("#hotelad").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有特价酒店，你可以<a target=\"_blank\" href=\"http://hotels.ctrip.com/\">查看更多酒店</a></p></div>");
        },
        success: function (data) {

            $('#hotelad').html(data);
            if (data == "") {
                jQuery("#hotelad").hide();
                jQuery("#hotelliadid").hide();

            }
            else {
                jQuery("#hotelliadid").show();
                if (!numtype && !goListtype) {
                    jQuery("#hotelliadid").addClass("current");

                    $("#hotelliadid").siblings().removeClass("current");
                    $tabs("#cityTitle li", "#cityCon > div");
                }
            }
            //jQuery("#hotelad").html("<div class=\"gs_list_load\"><i class=\"listface\"></i>这里暂时没有特价酒店，你可以<a target=\"_blank\" href=\"http://hotels.ctrip.com/\">查看更多酒店</a></p></div>");

        }
    });
}


///1为列表 2为详情
function ShowVacationAd(district,sight, pageType) {
    if (pageType == 1)
        jQuery("#vacationad").html("<div class=\"gs_loading\"><p>加载中，请稍等...</p></div>");
    var ajaxData = { ACity: district,sight:sight, type: pageType, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/SoaVacations.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {
            jQuery("#vacationad").hide();
            jQuery("#vacationliadid").hide();
        },
        success: function (data) {
            //
            jQuery("#vacationad").html(data);

            //
            if (pageType == 1) {
                if (data == "") {
                    jQuery("#vacationad").hide();
                    jQuery("#vacationliadid").hide();

                }
                else {
                    isVacation = true;
                    jQuery("#vacationliadid").show();
                    if (!numtype && !goListtype) {


                        jQuery("#vacationliadid").addClass("current");

                        $("#vacationliadid").siblings().removeClass("current");
                        $tabs("#cityTitle li", "#cityCon > div");
                    }

                }
            }
            //
            var previewUrl = document.referrer;

            if (isVacation) {
                if (previewUrl.indexOf('.so.com') > -1) {
                    jQuery("#vacationliadid").addClass("current");

                    $("#vacationliadid").siblings().removeClass("current");
                    $tabs("#cityTitle li", "#cityCon > div");
                    numtype = true;
                }
                if (previewUrl.indexOf('.baidu.com') > -1) {
                    jQuery("#vacationliadid").addClass("current");


                    $("#vacationliadid").siblings().removeClass("current");
                    $tabs("#cityTitle li", "#cityCon > div");
                    numtype = true;
                }
            }
        }
    });
}

function __SSO_submit(a, t) {

    if (a == "wentClickID") {
        ClickWent();
    }

    if (a == "wantClickID") {
        ClickWant();
    }
    if (a == "writereviewid") {
        //window.location.reload();
        window.location.hash = "fbcomment";
    }
    if (a == "btn-setanswer") {

        Submitinfo();
    }
}

function showCountryDestMonth() {
    var ajaxData = { rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/ajaxShowMonthDistrict.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {

            $('#showMonthListID').html("");
        },
        success: function (data) {

            $('#showMonthListID').html(data);
        }
    });
    jQuery.ajax({
        url: '/AjaxNew/ajaxShowHotTopic.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {

            $('#hotdestulID').html("");
        },
        success: function (data) {

            $('#hotdestulID').html(data);
        }
    });
    jQuery.ajax({
        url: '/AjaxNew/ajaxShowCountry.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) {

            $('.countrylist').html("");
        },
        success: function (data) {

            $('.countrylist').html(data);
        }
    });
}

function ShowSightPhoto(sight) {


    var ajaxData = { sight: sight, rank: Math.random() };
    jQuery.ajax({
        url: '/AjaxNew/gsShowSightPhoto.ashx',
        type: 'GET',
        dataType: "text",
        data: ajaxData,
        timeout: 10000,
        error: function (data) { },
        success: function (data) {

            $('#photomain').html(data);
        }
    });

}
(function (g) {
    var host = this;
    /**
    * @namespace GS
    */
    g = host[g] = (host && host[g]) || {};

    /**
    * 延迟函数 来源 underscore.js
    * @param    {Object}    fn      Description
    * @param    {Object}    timeout Description
    * @returns  {Object}            Description
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
                    li.push('   <a href="'+ url +'">');
                    li.push('       <i class="'+ typeClass +'"></i>');
                    li.push(        name);
                    li.push('   </a>');
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
            li.push('   <a href="'+ obj.TravelsUrl +'">');
            li.push('       搜索 “<span class="keyword text_flow">'+ keywordVal +'</span>” 的相关游记');
            li.push('   </a>');
            li.push('</li>'); 
            html = html + li.join(''); 
        }
        /*问答*/
        if (obj.QAUrl) {
            var li = [];
            li.push('<li>');
            li.push('   <a href="'+ obj.QAUrl +'">');
            li.push('       搜索 “<span class="keyword text_flow">'+ keywordVal +'</span>” 的相关问答');
            li.push('   </a>');
            li.push('</li>'); 
            html = html + li.join(''); 
        }
        /*搜索更多*/
        if (obj.SearchUrl) {
            var li = [];
            li.push('<li class="divider"></li>');
            li.push('<li>');
            li.push('   <a href="'+ obj.SearchUrl +'">');
            li.push('       搜索 “<span class="keyword text_flow">'+ keywordVal +'</span>” 更多相关内容');
            li.push('   </a>');
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
    _w.push('   <div id="float_level" class="app_wrap" style="display:none">');
    _w.push('   <div class="app_box">');
    _w.push('   <a href="javascript:;" class="app_close" id="app_close" title="关闭">&times;</a>');
    _w.push('           <div class="pic_phone"></div>');
    _w.push('           <div class="app_text">');
    _w.push('               <p class="t2">旅游攻略<strong>随身带</strong></p>');
    _w.push('               <p class="c2">手机预订&nbsp;低至<span>5</span>折</p>');
    _w.push('               <p class="c3">———————&nbsp;&nbsp;更多返现积分等你拿</p>');
    _w.push('           </div>');
    _w.push('           <div class="app_cont">');
    _w.push('               <div class="app_form">');
    _w.push('                   <div class="t">下载携程旅行手机版<a target="_blank" href="http://app.ctrip.com"><span>Pad</span>及手机网络版 &gt;</a></div>');
    _w.push('                   <p>发送下载地址至手机</p>');
    _w.push('                   <p class="s_item"><input id="phone_num" type="text" placeholder="请输入11位手机号" pl="请输入11位手机号"/><a href="javascript:;" id="send_msg" class="btn01" title="" >免费获取</a></p>');
    _w.push('                   <p id="show_msg" class="app_tip" style="display:none"><span class="ico_success"></span>发送成功，请注意查收短信</p>');
    _w.push('                   <p>直接下载</p>');
    _w.push('                   <div class="app_download">');
    _w.push('                       <a target="_blank" href="http://itunes.apple.com/cn/app/xie-cheng-wu-xian-jiu-dian/id379395415?mt=8" class="btn_d">iPhone</a><a href="javascript:;" class="btn_d" id="android_popup">Android</a>');
    _w.push('                   </div>');
    _w.push('               </div>');
    _w.push('               <div class="app_code">');
    _w.push('                   <p>扫描二维码下载</p>');
    _w.push('                       <img src="http://pic.c-ctrip.com/index/qr_community.png" />');
    _w.push('               </div>');
    _w.push('           </div>');
    _w.push('       </div>');
    _w.push('       <div class="app_collect">收藏Ctrip.com，以便下次快速访问<a href="javascript:popUp.addfavor(&#39;http://www.ctrip.com/?s3&#39;,&#39;携程旅行网&#39;)" class="s_btn">点击收藏</a>');
    _w.push('       </div>');
    _w.push('   </div>');

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
            _html.push('    <div class="gs_bottom_pop_inforout">');
            _html.push('        <a class="gs_bottom_pop_close" href="javascript:void(0);"></a>');
            _html.push('        <div class="gs_bottom_pop_inforin cf">');
            _html.push('            <div class="gs_bottom_pop_left">');
            _html.push('                <div class="gs_pop_animation_show">');
            _html.push('                    <span class="gs_bpop_wd"></span><span class="gs_bpop_jd"></span><span class="gs_bpop_yj"></span><span class="gs_bpop_gl"></span><span class="gs_bpop_mdd"></span><span class="gs_bpop_ms"></span><span class="gs_bpop_yl"></span><span class="gs_bpop_qt"></span>');
            _html.push('                </div>');
            _html.push('            </div>');
            _html.push('            <div class="gs_bottom_pop_mid">');
            _html.push('                <a href="' + opts.reg_url + '" class="regbutton" target="_blank">注册</a><a href="' + opts.login_url + '" class="loginbutton" target="_blank">登录</a>');
            _html.push('            </div>');
            _html.push('            <div class="gs_bottom_pop_right">');
            _html.push('                <span class="gs_micromes"></span><a href="http://weibo.com/ctripyou" title="关注我们" target="_blank" class="gs_focus_us"></a>');
            _html.push('            </div>');
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



/***
 * 右下角返回顶部，问题反馈，在线客服链接
 * 封装方法, 不支持IE6
 */
$(function () {
    var isIE6 = ($.browser.msie) && ($.browser.version == "6.0");

    if (!isIE6) {
        var fb_html = '<div id="gs_feedback_gotop"><div class="side_fixed">\
            <a class="to_top" title="回到顶端" href="#top" id="gotop2" style="visibility: visible;">&nbsp;</a>\
            <a target="_blank" class="c_fq" href="http://my.ctrip.com/adv/uxp/Community/CommunityAdvice.aspx">反馈建议</a>\
            </div></div>';
        $('body').append($(fb_html));
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#gotop2').fadeIn();
            } else {
                $('#gotop2').fadeOut();
            }
        });
    }
}); 
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\
(function(n){var e,t,r="0.4.2",f="hasOwnProperty",i=/[\.\/]/,o="*",u=function(){},l=function(n,e){return n-e},s={n:{}},p=function(n,r){n+="";var f,i=t,o=Array.prototype.slice.call(arguments,2),u=p.listeners(n),s=0,a=[],c={},h=[],d=e;e=n,t=0;for(var g=0,v=u.length;v>g;g++)"zIndex"in u[g]&&(a.push(u[g].zIndex),0>u[g].zIndex&&(c[u[g].zIndex]=u[g]));for(a.sort(l);0>a[s];)if(f=c[a[s++]],h.push(f.apply(r,o)),t)return t=i,h;for(g=0;v>g;g++)if(f=u[g],"zIndex"in f)if(f.zIndex==a[s]){if(h.push(f.apply(r,o)),t)break;do if(s++,f=c[a[s]],f&&h.push(f.apply(r,o)),t)break;while(f)}else c[f.zIndex]=f;else if(h.push(f.apply(r,o)),t)break;return t=i,e=d,h.length?h:null};p._events=s,p.listeners=function(n){var e,t,r,f,u,l,p,a,c=n.split(i),h=s,d=[h],g=[];for(f=0,u=c.length;u>f;f++){for(a=[],l=0,p=d.length;p>l;l++)for(h=d[l].n,t=[h[c[f]],h[o]],r=2;r--;)e=t[r],e&&(a.push(e),g=g.concat(e.f||[]));d=a}return g},p.on=function(n,e){if(n+="","function"!=typeof e)return function(){};for(var t=n.split(i),r=s,f=0,o=t.length;o>f;f++)r=r.n,r=r.hasOwnProperty(t[f])&&r[t[f]]||(r[t[f]]={n:{}});for(r.f=r.f||[],f=0,o=r.f.length;o>f;f++)if(r.f[f]==e)return u;return r.f.push(e),function(n){+n==+n&&(e.zIndex=+n)}},p.f=function(n){var e=[].slice.call(arguments,1);return function(){p.apply(null,[n,null].concat(e).concat([].slice.call(arguments,0)))}},p.stop=function(){t=1},p.nt=function(n){return n?RegExp("(?:\\.|\\/|^)"+n+"(?:\\.|\\/|$)").test(e):e},p.nts=function(){return e.split(i)},p.off=p.unbind=function(n,e){if(!n)return p._events=s={n:{}},void 0;var t,r,u,l,a,c,h,d=n.split(i),g=[s];for(l=0,a=d.length;a>l;l++)for(c=0;g.length>c;c+=u.length-2){if(u=[c,1],t=g[c].n,d[l]!=o)t[d[l]]&&u.push(t[d[l]]);else for(r in t)t[f](r)&&u.push(t[r]);g.splice.apply(g,u)}for(l=0,a=g.length;a>l;l++)for(t=g[l];t.n;){if(e){if(t.f){for(c=0,h=t.f.length;h>c;c++)if(t.f[c]==e){t.f.splice(c,1);break}!t.f.length&&delete t.f}for(r in t.n)if(t.n[f](r)&&t.n[r].f){var v=t.n[r].f;for(c=0,h=v.length;h>c;c++)if(v[c]==e){v.splice(c,1);break}!v.length&&delete t.n[r].f}}else{delete t.f;for(r in t.n)t.n[f](r)&&t.n[r].f&&delete t.n[r].f}t=t.n}},p.once=function(n,e){var t=function(){return p.unbind(n,t),e.apply(this,arguments)};return p.on(n,t)},p.version=r,p.toString=function(){return"You are running Eve "+r},"undefined"!=typeof module&&module.exports?module.exports=p:"undefined"!=typeof define?define("eve",[],function(){return p}):n.eve=p})(this);(function(){function t(e){if(t.is(e,"function"))return m?e():eve.on("raphael.DOMload",e);if(t.is(e,N))return t._engine.create[F](t,e.splice(0,3+t.is(e[0],Y))).add(e);var n=Array.prototype.slice.call(arguments,0);if(t.is(n[n.length-1],"function")){var r=n.pop();return m?r.call(t._engine.create[F](t,n)):eve.on("raphael.DOMload",function(){r.call(t._engine.create[F](t,n))})}return t._engine.create[F](t,arguments)}function e(t){if(Object(t)!==t)return t;var n=new t.constructor;for(var r in t)t[k](r)&&(n[r]=e(t[r]));return n}function n(t,e){for(var n=0,r=t.length;r>n;n++)if(t[n]===e)return t.push(t.splice(n,1)[0])}function r(t,e,r){function i(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=i.cache=i.cache||{},u=i.count=i.count||[];return o[k](s)?(n(u,s),r?r(o[s]):o[s]):(u.length>=1e3&&delete o[u.shift()],u.push(s),o[s]=t[F](e,a),r?r(o[s]):o[s])}return i}function i(){return this.hex}function a(t,e){for(var n=[],r=0,i=t.length;i-2*!e>r;r+=2){var a=[{x:+t[r-2],y:+t[r-1]},{x:+t[r],y:+t[r+1]},{x:+t[r+2],y:+t[r+3]},{x:+t[r+4],y:+t[r+5]}];e?r?i-4==r?a[3]={x:+t[0],y:+t[1]}:i-2==r&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[i-2],y:+t[i-1]}:i-4==r?a[3]=a[2]:r||(a[0]={x:+t[r],y:+t[r+1]}),n.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return n}function s(t,e,n,r,i){var a=-3*e+9*n-9*r+3*i,s=t*a+6*e-12*n+6*r;return t*s-3*e+3*n}function o(t,e,n,r,i,a,o,u,l){null==l&&(l=1),l=l>1?1:0>l?0:l;for(var h=l/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;c>g;g++){var x=h*f[g]+h,v=s(x,t,n,i,o),m=s(x,e,r,a,u),y=v*v+m*m;d+=p[g]*j.sqrt(y)}return h*d}function u(t,e,n,r,i,a,s,u,l){if(!(0>l||l>o(t,e,n,r,i,a,s,u))){var h,c=1,f=c/2,p=c-f,d=.01;for(h=o(t,e,n,r,i,a,s,u,p);O(h-l)>d;)f/=2,p+=(l>h?1:-1)*f,h=o(t,e,n,r,i,a,s,u,p);return p}}function l(t,e,n,r,i,a,s,o){if(!(D(t,n)<z(i,s)||z(t,n)>D(i,s)||D(e,r)<z(a,o)||z(e,r)>D(a,o))){var u=(t*r-e*n)*(i-s)-(t-n)*(i*o-a*s),l=(t*r-e*n)*(a-o)-(e-r)*(i*o-a*s),h=(t-n)*(a-o)-(e-r)*(i-s);if(h){var c=u/h,f=l/h,p=+c.toFixed(2),d=+f.toFixed(2);if(!(+z(t,n).toFixed(2)>p||p>+D(t,n).toFixed(2)||+z(i,s).toFixed(2)>p||p>+D(i,s).toFixed(2)||+z(e,r).toFixed(2)>d||d>+D(e,r).toFixed(2)||+z(a,o).toFixed(2)>d||d>+D(a,o).toFixed(2)))return{x:c,y:f}}}}function h(e,n,r){var i=t.bezierBBox(e),a=t.bezierBBox(n);if(!t.isBBoxIntersect(i,a))return r?0:[];for(var s=o.apply(0,e),u=o.apply(0,n),h=~~(s/5),c=~~(u/5),f=[],p=[],d={},g=r?0:[],x=0;h+1>x;x++){var v=t.findDotsAtSegment.apply(t,e.concat(x/h));f.push({x:v.x,y:v.y,t:x/h})}for(x=0;c+1>x;x++)v=t.findDotsAtSegment.apply(t,n.concat(x/c)),p.push({x:v.x,y:v.y,t:x/c});for(x=0;h>x;x++)for(var m=0;c>m;m++){var y=f[x],b=f[x+1],_=p[m],w=p[m+1],k=.001>O(b.x-y.x)?"y":"x",B=.001>O(w.x-_.x)?"y":"x",S=l(y.x,y.y,b.x,b.y,_.x,_.y,w.x,w.y);if(S){if(d[S.x.toFixed(4)]==S.y.toFixed(4))continue;d[S.x.toFixed(4)]=S.y.toFixed(4);var C=y.t+O((S[k]-y[k])/(b[k]-y[k]))*(b.t-y.t),F=_.t+O((S[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);C>=0&&1>=C&&F>=0&&1>=F&&(r?g++:g.push({x:S.x,y:S.y,t1:C,t2:F}))}}return g}function c(e,n,r){e=t._path2curve(e),n=t._path2curve(n);for(var i,a,s,o,u,l,c,f,p,d,g=r?0:[],x=0,v=e.length;v>x;x++){var m=e[x];if("M"==m[0])i=u=m[1],a=l=m[2];else{"C"==m[0]?(p=[i,a].concat(m.slice(1)),i=p[6],a=p[7]):(p=[i,a,i,a,u,l,u,l],i=u,a=l);for(var y=0,b=n.length;b>y;y++){var _=n[y];if("M"==_[0])s=c=_[1],o=f=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,c,f,c,f],s=c,o=f);var w=h(p,d,r);if(r)g+=w;else{for(var k=0,B=w.length;B>k;k++)w[k].segment1=x,w[k].segment2=y,w[k].bez1=p,w[k].bez2=d;g=g.concat(w)}}}}}return g}function f(t,e,n,r,i,a){null!=t?(this.a=+t,this.b=+e,this.c=+n,this.d=+r,this.e=+i,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function p(){return this.x+P+this.y+P+this.width+" × "+this.height}function d(t,e,n,r,i,a){function s(t){return((c*t+h)*t+l)*t}function o(t,e){var n=u(t,e);return((d*n+p)*n+f)*n}function u(t,e){var n,r,i,a,o,u;for(i=t,u=0;8>u;u++){if(a=s(i)-t,e>O(a))return i;if(o=(3*c*i+2*h)*i+l,1e-6>O(o))break;i-=a/o}if(n=0,r=1,i=t,n>i)return n;if(i>r)return r;for(;r>n;){if(a=s(i),e>O(a-t))return i;t>a?n=i:r=i,i=(r-n)/2+n}return i}var l=3*e,h=3*(r-e)-l,c=1-l-h,f=3*n,p=3*(i-n)-f,d=1-f-p;return o(t,1/(200*a))}function g(t,e){var n=[],r={};if(this.ms=e,this.times=1,t){for(var i in t)t[k](i)&&(r[Q(i)]=t[i],n.push(Q(i)));n.sort(le)}this.anim=r,this.top=n[n.length-1],this.percents=n}function x(e,n,r,i,a,s){r=Q(r);var o,u,l,h,c,p,g=e.ms,x={},v={},m={};if(i)for(_=0,w=sn.length;w>_;_++){var y=sn[_];if(y.el.id==n.id&&y.anim==e){y.percent!=r?(sn.splice(_,1),l=1):u=y,n.attr(y.totalOrigin);break}}else i=+v;for(var _=0,w=e.percents.length;w>_;_++){if(e.percents[_]==r||e.percents[_]>i*e.top){r=e.percents[_],c=e.percents[_-1]||0,g=g/e.top*(r-c),h=e.percents[_+1],o=e.anim[r];break}i&&n.attr(e.anim[e.percents[_]])}if(o){if(u)u.initstatus=i,u.start=new Date-u.ms*i;else{for(var B in o)if(o[k](B)&&(ee[k](B)||n.paper.customAttributes[k](B)))switch(x[B]=n.attr(B),null==x[B]&&(x[B]=te[B]),v[B]=o[B],ee[B]){case Y:m[B]=(v[B]-x[B])/g;break;case"colour":x[B]=t.getRGB(x[B]);var S=t.getRGB(v[B]);m[B]={r:(S.r-x[B].r)/g,g:(S.g-x[B].g)/g,b:(S.b-x[B].b)/g};break;case"path":var C=Ie(x[B],v[B]),F=C[1];for(x[B]=C[0],m[B]=[],_=0,w=x[B].length;w>_;_++){m[B][_]=[0];for(var L=1,A=x[B][_].length;A>L;L++)m[B][_][L]=(F[_][L]-x[B][_][L])/g}break;case"transform":var P=n._,I=ze(P[B],v[B]);if(I)for(x[B]=I.from,v[B]=I.to,m[B]=[],m[B].real=!0,_=0,w=x[B].length;w>_;_++)for(m[B][_]=[x[B][_][0]],L=1,A=x[B][_].length;A>L;L++)m[B][_][L]=(v[B][_][L]-x[B][_][L])/g;else{var R=n.matrix||new f,q={_:{transform:P.transform},getBBox:function(){return n.getBBox(1)}};x[B]=[R.a,R.b,R.c,R.d,R.e,R.f],je(q,v[B]),v[B]=q._.transform,m[B]=[(q.matrix.a-R.a)/g,(q.matrix.b-R.b)/g,(q.matrix.c-R.c)/g,(q.matrix.d-R.d)/g,(q.matrix.e-R.e)/g,(q.matrix.f-R.f)/g]}break;case"csv":var j=E(o[B])[M](b),D=E(x[B])[M](b);if("clip-rect"==B)for(x[B]=D,m[B]=[],_=D.length;_--;)m[B][_]=(j[_]-x[B][_])/g;v[B]=j;break;default:for(j=[][T](o[B]),D=[][T](x[B]),m[B]=[],_=n.paper.customAttributes[B].length;_--;)m[B][_]=((j[_]||0)-(D[_]||0))/g}var z=o.easing,O=t.easing_formulas[z];if(!O)if(O=E(z).match(U),O&&5==O.length){var V=O;O=function(t){return d(t,+V[1],+V[2],+V[3],+V[4],g)}}else O=ce;if(p=o.start||e.start||+new Date,y={anim:e,percent:r,timestamp:p,start:p+(e.del||0),status:0,initstatus:i||0,stop:!1,ms:g,easing:O,from:x,diff:m,to:v,el:n,callback:o.callback,prev:c,next:h,repeat:s||e.times,origin:n.attr(),totalOrigin:a},sn.push(y),i&&!u&&!l&&(y.stop=!0,y.start=new Date-g*i,1==sn.length))return un();l&&(y.start=new Date-y.ms*i),1==sn.length&&on(un)}eve("raphael.anim.start."+n.id,n,e)}}function v(t){for(var e=0;sn.length>e;e++)sn[e].el.paper==t&&sn.splice(e--,1)}t.version="2.1.0",t.eve=eve;var m,y,b=/[, ]+/,_={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},w=/\{(\d+)\}/g,k="hasOwnProperty",B={doc:document,win:window},S={was:Object.prototype[k].call(B.win,"Raphael"),is:B.win.Raphael},C=function(){this.ca=this.customAttributes={}},F="apply",T="concat",L="createTouch"in B.doc,A="",P=" ",E=String,M="split",I="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[M](P),R={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},q=E.prototype.toLowerCase,j=Math,D=j.max,z=j.min,O=j.abs,V=j.pow,X=j.PI,Y="number",G="string",N="array",W=Object.prototype.toString,$=(t._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),H={NaN:1,Infinity:1,"-Infinity":1},U=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,Z=j.round,Q=parseFloat,J=parseInt,K=E.prototype.toUpperCase,te=t._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},ee=t._availableAnimAttrs={blur:Y,"clip-rect":"csv",cx:Y,cy:Y,fill:"colour","fill-opacity":Y,"font-size":Y,height:Y,opacity:Y,path:"path",r:Y,rx:Y,ry:Y,stroke:"colour","stroke-opacity":Y,"stroke-width":Y,transform:"transform",width:Y,x:Y,y:Y},ne=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,re={hs:1,rg:1},ie=/,?([achlmqrstvxz]),?/gi,ae=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,se=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,oe=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,ue=(t._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,{}),le=function(t,e){return Q(t)-Q(e)},he=function(){},ce=function(t){return t},fe=t._rectPath=function(t,e,n,r,i){return i?[["M",t+i,e],["l",n-2*i,0],["a",i,i,0,0,1,i,i],["l",0,r-2*i],["a",i,i,0,0,1,-i,i],["l",2*i-n,0],["a",i,i,0,0,1,-i,-i],["l",0,2*i-r],["a",i,i,0,0,1,i,-i],["z"]]:[["M",t,e],["l",n,0],["l",0,r],["l",-n,0],["z"]]},pe=function(t,e,n,r){return null==r&&(r=n),[["M",t,e],["m",0,-r],["a",n,r,0,1,1,0,2*r],["a",n,r,0,1,1,0,-2*r],["z"]]},de=t._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return pe(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return pe(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return fe(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return fe(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return fe(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return fe(e.x,e.y,e.width,e.height)}},ge=t.mapPath=function(t,e){if(!e)return t;var n,r,i,a,s,o,u;for(t=Ie(t),i=0,s=t.length;s>i;i++)for(u=t[i],a=1,o=u.length;o>a;a+=2)n=e.x(u[a],u[a+1]),r=e.y(u[a],u[a+1]),u[a]=n,u[a+1]=r;return t};if(t._g=B,t.type=B.win.SVGAngle||B.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==t.type){var xe,ve=B.doc.createElement("div");if(ve.innerHTML='<v:shape adj="1"/>',xe=ve.firstChild,xe.style.behavior="url(#default#VML)",!xe||"object"!=typeof xe.adj)return t.type=A;ve=null}t.svg=!(t.vml="VML"==t.type),t._Paper=C,t.fn=y=C.prototype=t.prototype,t._id=0,t._oid=0,t.is=function(t,e){return e=q.call(e),"finite"==e?!H[k](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||W.call(t).slice(8,-1).toLowerCase()==e},t.angle=function(e,n,r,i,a,s){if(null==a){var o=e-r,u=n-i;return o||u?(180+180*j.atan2(-u,-o)/X+360)%360:0}return t.angle(e,n,a,s)-t.angle(r,i,a,s)},t.rad=function(t){return t%360*X/180},t.deg=function(t){return 180*t/X%360},t.snapTo=function(e,n,r){if(r=t.is(r,"finite")?r:10,t.is(e,N)){for(var i=e.length;i--;)if(r>=O(e[i]-n))return e[i]}else{e=+e;var a=n%e;if(r>a)return n-a;if(a>e-r)return n-a+e}return n},t.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=0|16*j.random(),n="x"==t?e:8|3&e;return n.toString(16)}),t.setWindow=function(e){eve("raphael.setWindow",t,B.win,e),B.win=e,B.doc=B.win.document,t._engine.initWin&&t._engine.initWin(B.win)};var me=function(e){if(t.vml){var n,i=/^\s+|\s+$/g;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),n=a.body}catch(s){n=createPopup().document.body}var o=n.createTextRange();me=r(function(t){try{n.style.color=E(t).replace(i,A);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(r){return"none"}})}else{var u=B.doc.createElement("i");u.title="Raphaël Colour Picker",u.style.display="none",B.doc.body.appendChild(u),me=r(function(t){return u.style.color=t,B.doc.defaultView.getComputedStyle(u,A).getPropertyValue("color")})}return me(e)},ye=function(){return"hsb("+[this.h,this.s,this.b]+")"},be=function(){return"hsl("+[this.h,this.s,this.l]+")"},_e=function(){return this.hex},we=function(e,n,r){if(null==n&&t.is(e,"object")&&"r"in e&&"g"in e&&"b"in e&&(r=e.b,n=e.g,e=e.r),null==n&&t.is(e,G)){var i=t.getRGB(e);e=i.r,n=i.g,r=i.b}return(e>1||n>1||r>1)&&(e/=255,n/=255,r/=255),[e,n,r]},ke=function(e,n,r,i){e*=255,n*=255,r*=255;var a={r:e,g:n,b:r,hex:t.rgb(e,n,r),toString:_e};return t.is(i,"finite")&&(a.opacity=i),a};t.color=function(e){var n;return t.is(e,"object")&&"h"in e&&"s"in e&&"b"in e?(n=t.hsb2rgb(e),e.r=n.r,e.g=n.g,e.b=n.b,e.hex=n.hex):t.is(e,"object")&&"h"in e&&"s"in e&&"l"in e?(n=t.hsl2rgb(e),e.r=n.r,e.g=n.g,e.b=n.b,e.hex=n.hex):(t.is(e,"string")&&(e=t.getRGB(e)),t.is(e,"object")&&"r"in e&&"g"in e&&"b"in e?(n=t.rgb2hsl(e),e.h=n.h,e.s=n.s,e.l=n.l,n=t.rgb2hsb(e),e.v=n.b):(e={hex:"none"},e.r=e.g=e.b=e.h=e.s=e.v=e.l=-1)),e.toString=_e,e},t.hsb2rgb=function(t,e,n,r){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(n=t.b,e=t.s,t=t.h,r=t.o),t*=360;var i,a,s,o,u;return t=t%360/60,u=n*e,o=u*(1-O(t%2-1)),i=a=s=n-u,t=~~t,i+=[u,o,0,0,o,u][t],a+=[o,u,u,o,0,0][t],s+=[0,0,o,u,u,o][t],ke(i,a,s,r)},t.hsl2rgb=function(t,e,n,r){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(n=t.l,e=t.s,t=t.h),(t>1||e>1||n>1)&&(t/=360,e/=100,n/=100),t*=360;var i,a,s,o,u;return t=t%360/60,u=2*e*(.5>n?n:1-n),o=u*(1-O(t%2-1)),i=a=s=n-u/2,t=~~t,i+=[u,o,0,0,o,u][t],a+=[o,u,u,o,0,0][t],s+=[0,0,o,u,u,o][t],ke(i,a,s,r)},t.rgb2hsb=function(t,e,n){n=we(t,e,n),t=n[0],e=n[1],n=n[2];var r,i,a,s;return a=D(t,e,n),s=a-z(t,e,n),r=0==s?null:a==t?(e-n)/s:a==e?(n-t)/s+2:(t-e)/s+4,r=60*((r+360)%6)/360,i=0==s?0:s/a,{h:r,s:i,b:a,toString:ye}},t.rgb2hsl=function(t,e,n){n=we(t,e,n),t=n[0],e=n[1],n=n[2];var r,i,a,s,o,u;return s=D(t,e,n),o=z(t,e,n),u=s-o,r=0==u?null:s==t?(e-n)/u:s==e?(n-t)/u+2:(t-e)/u+4,r=60*((r+360)%6)/360,a=(s+o)/2,i=0==u?0:.5>a?u/(2*a):u/(2-2*a),{h:r,s:i,l:a,toString:be}},t._path2string=function(){return this.join(",").replace(ie,"$1")},t._preload=function(t,e){var n=B.doc.createElement("img");n.style.cssText="position:absolute;left:-9999em;top:-9999em",n.onload=function(){e.call(this),this.onload=null,B.doc.body.removeChild(this)},n.onerror=function(){B.doc.body.removeChild(this)},B.doc.body.appendChild(n),n.src=t},t.getRGB=r(function(e){if(!e||(e=E(e)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:i};if("none"==e)return{r:-1,g:-1,b:-1,hex:"none",toString:i};!(re[k](e.toLowerCase().substring(0,2))||"#"==e.charAt())&&(e=me(e));var n,r,a,s,o,u,l=e.match($);return l?(l[2]&&(a=J(l[2].substring(5),16),r=J(l[2].substring(3,5),16),n=J(l[2].substring(1,3),16)),l[3]&&(a=J((o=l[3].charAt(3))+o,16),r=J((o=l[3].charAt(2))+o,16),n=J((o=l[3].charAt(1))+o,16)),l[4]&&(u=l[4][M](ne),n=Q(u[0]),"%"==u[0].slice(-1)&&(n*=2.55),r=Q(u[1]),"%"==u[1].slice(-1)&&(r*=2.55),a=Q(u[2]),"%"==u[2].slice(-1)&&(a*=2.55),"rgba"==l[1].toLowerCase().slice(0,4)&&(s=Q(u[3])),u[3]&&"%"==u[3].slice(-1)&&(s/=100)),l[5]?(u=l[5][M](ne),n=Q(u[0]),"%"==u[0].slice(-1)&&(n*=2.55),r=Q(u[1]),"%"==u[1].slice(-1)&&(r*=2.55),a=Q(u[2]),"%"==u[2].slice(-1)&&(a*=2.55),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(n/=360),"hsba"==l[1].toLowerCase().slice(0,4)&&(s=Q(u[3])),u[3]&&"%"==u[3].slice(-1)&&(s/=100),t.hsb2rgb(n,r,a,s)):l[6]?(u=l[6][M](ne),n=Q(u[0]),"%"==u[0].slice(-1)&&(n*=2.55),r=Q(u[1]),"%"==u[1].slice(-1)&&(r*=2.55),a=Q(u[2]),"%"==u[2].slice(-1)&&(a*=2.55),("deg"==u[0].slice(-3)||"°"==u[0].slice(-1))&&(n/=360),"hsla"==l[1].toLowerCase().slice(0,4)&&(s=Q(u[3])),u[3]&&"%"==u[3].slice(-1)&&(s/=100),t.hsl2rgb(n,r,a,s)):(l={r:n,g:r,b:a,toString:i},l.hex="#"+(16777216|a|r<<8|n<<16).toString(16).slice(1),t.is(s,"finite")&&(l.opacity=s),l)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:i}},t),t.hsb=r(function(e,n,r){return t.hsb2rgb(e,n,r).hex}),t.hsl=r(function(e,n,r){return t.hsl2rgb(e,n,r).hex}),t.rgb=r(function(t,e,n){return"#"+(16777216|n|e<<8|t<<16).toString(16).slice(1)}),t.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},n=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,0>=e.s&&(this.getColor.start={h:0,s:1,b:e.b})),n.hex},t.getColor.reset=function(){delete this.start},t.parsePathString=function(e){if(!e)return null;var n=Be(e);if(n.arr)return Ce(n.arr);var r={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},i=[];return t.is(e,N)&&t.is(e[0],N)&&(i=Ce(e)),i.length||E(e).replace(ae,function(t,e,n){var a=[],s=e.toLowerCase();if(n.replace(oe,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(i.push([e][T](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)i.push([e][T](a));else for(;a.length>=r[s]&&(i.push([e][T](a.splice(0,r[s]))),r[s]););}),i.toString=t._path2string,n.arr=Ce(i),i},t.parseTransformString=r(function(e){if(!e)return null;var n=[];return t.is(e,N)&&t.is(e[0],N)&&(n=Ce(e)),n.length||E(e).replace(se,function(t,e,r){var i=[];q.call(e),r.replace(oe,function(t,e){e&&i.push(+e)}),n.push([e][T](i))}),n.toString=t._path2string,n});var Be=function(t){var e=Be.ps=Be.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var n in e)e[k](n)&&n!=t&&(e[n].sleep--,!e[n].sleep&&delete e[n])}),e[t]};t.findDotsAtSegment=function(t,e,n,r,i,a,s,o,u){var l=1-u,h=V(l,3),c=V(l,2),f=u*u,p=f*u,d=h*t+3*c*u*n+3*l*u*u*i+p*s,g=h*e+3*c*u*r+3*l*u*u*a+p*o,x=t+2*u*(n-t)+f*(i-2*n+t),v=e+2*u*(r-e)+f*(a-2*r+e),m=n+2*u*(i-n)+f*(s-2*i+n),y=r+2*u*(a-r)+f*(o-2*a+r),b=l*t+u*n,_=l*e+u*r,w=l*i+u*s,k=l*a+u*o,B=90-180*j.atan2(x-m,v-y)/X;return(x>m||y>v)&&(B+=180),{x:d,y:g,m:{x:x,y:v},n:{x:m,y:y},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},t.bezierBBox=function(e,n,r,i,a,s,o,u){t.is(e,"array")||(e=[e,n,r,i,a,s,o,u]);var l=Me.apply(null,e);return{x:l.min.x,y:l.min.y,x2:l.max.x,y2:l.max.y,width:l.max.x-l.min.x,height:l.max.y-l.min.y}},t.isPointInsideBBox=function(t,e,n){return e>=t.x&&t.x2>=e&&n>=t.y&&t.y2>=n},t.isBBoxIntersect=function(e,n){var r=t.isPointInsideBBox;return r(n,e.x,e.y)||r(n,e.x2,e.y)||r(n,e.x,e.y2)||r(n,e.x2,e.y2)||r(e,n.x,n.y)||r(e,n.x2,n.y)||r(e,n.x,n.y2)||r(e,n.x2,n.y2)||(e.x<n.x2&&e.x>n.x||n.x<e.x2&&n.x>e.x)&&(e.y<n.y2&&e.y>n.y||n.y<e.y2&&n.y>e.y)},t.pathIntersection=function(t,e){return c(t,e)},t.pathIntersectionNumber=function(t,e){return c(t,e,1)},t.isPointInsidePath=function(e,n,r){var i=t.pathBBox(e);return t.isPointInsideBBox(i,n,r)&&1==c(e,[["M",n,r],["H",i.x2+10]],1)%2},t._removedFactory=function(t){return function(){eve("raphael.log",null,"Raphaël: you are calling to method “"+t+"” of removed object",t)}};var Se=t.pathBBox=function(t){var n=Be(t);if(n.bbox)return e(n.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Ie(t);for(var r,i=0,a=0,s=[],o=[],u=0,l=t.length;l>u;u++)if(r=t[u],"M"==r[0])i=r[1],a=r[2],s.push(i),o.push(a);else{var h=Me(i,a,r[1],r[2],r[3],r[4],r[5],r[6]);s=s[T](h.min.x,h.max.x),o=o[T](h.min.y,h.max.y),i=r[5],a=r[6]}var c=z[F](0,s),f=z[F](0,o),p=D[F](0,s),d=D[F](0,o),g=p-c,x=d-f,v={x:c,y:f,x2:p,y2:d,width:g,height:x,cx:c+g/2,cy:f+x/2};return n.bbox=e(v),v},Ce=function(n){var r=e(n);return r.toString=t._path2string,r},Fe=t._pathToRelative=function(e){var n=Be(e);if(n.rel)return Ce(n.rel);t.is(e,N)&&t.is(e&&e[0],N)||(e=t.parsePathString(e));var r=[],i=0,a=0,s=0,o=0,u=0;"M"==e[0][0]&&(i=e[0][1],a=e[0][2],s=i,o=a,u++,r.push(["M",i,a]));for(var l=u,h=e.length;h>l;l++){var c=r[l]=[],f=e[l];if(f[0]!=q.call(f[0]))switch(c[0]=q.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-i).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;d>p;p++)c[p]=+(f[p]-(p%2?i:a)).toFixed(3)}else{c=r[l]=[],"m"==f[0]&&(s=f[1]+i,o=f[2]+a);for(var g=0,x=f.length;x>g;g++)r[l][g]=f[g]}var v=r[l].length;switch(r[l][0]){case"z":i=s,a=o;break;case"h":i+=+r[l][v-1];break;case"v":a+=+r[l][v-1];break;default:i+=+r[l][v-2],a+=+r[l][v-1]}}return r.toString=t._path2string,n.rel=Ce(r),r},Te=t._pathToAbsolute=function(e){var n=Be(e);if(n.abs)return Ce(n.abs);if(t.is(e,N)&&t.is(e&&e[0],N)||(e=t.parsePathString(e)),!e||!e.length)return[["M",0,0]];var r=[],i=0,s=0,o=0,u=0,l=0;"M"==e[0][0]&&(i=+e[0][1],s=+e[0][2],o=i,u=s,l++,r[0]=["M",i,s]);for(var h,c,f=3==e.length&&"M"==e[0][0]&&"R"==e[1][0].toUpperCase()&&"Z"==e[2][0].toUpperCase(),p=l,d=e.length;d>p;p++){if(r.push(h=[]),c=e[p],c[0]!=K.call(c[0]))switch(h[0]=K.call(c[0]),h[0]){case"A":h[1]=c[1],h[2]=c[2],h[3]=c[3],h[4]=c[4],h[5]=c[5],h[6]=+(c[6]+i),h[7]=+(c[7]+s);break;case"V":h[1]=+c[1]+s;break;case"H":h[1]=+c[1]+i;break;case"R":for(var g=[i,s][T](c.slice(1)),x=2,v=g.length;v>x;x++)g[x]=+g[x]+i,g[++x]=+g[x]+s;r.pop(),r=r[T](a(g,f));break;case"M":o=+c[1]+i,u=+c[2]+s;default:for(x=1,v=c.length;v>x;x++)h[x]=+c[x]+(x%2?i:s)}else if("R"==c[0])g=[i,s][T](c.slice(1)),r.pop(),r=r[T](a(g,f)),h=["R"][T](c.slice(-2));else for(var m=0,y=c.length;y>m;m++)h[m]=c[m];switch(h[0]){case"Z":i=o,s=u;break;case"H":i=h[1];break;case"V":s=h[1];break;case"M":o=h[h.length-2],u=h[h.length-1];default:i=h[h.length-2],s=h[h.length-1]}}return r.toString=t._path2string,n.abs=Ce(r),r},Le=function(t,e,n,r){return[t,e,n,r,n,r]},Ae=function(t,e,n,r,i,a){var s=1/3,o=2/3;return[s*t+o*n,s*e+o*r,s*i+o*n,s*a+o*r,i,a]},Pe=function(t,e,n,i,a,s,o,u,l,h){var c,f=120*X/180,p=X/180*(+a||0),d=[],g=r(function(t,e,n){var r=t*j.cos(n)-e*j.sin(n),i=t*j.sin(n)+e*j.cos(n);return{x:r,y:i}});if(h)B=h[0],S=h[1],w=h[2],k=h[3];else{c=g(t,e,-p),t=c.x,e=c.y,c=g(u,l,-p),u=c.x,l=c.y;var x=(j.cos(X/180*a),j.sin(X/180*a),(t-u)/2),v=(e-l)/2,m=x*x/(n*n)+v*v/(i*i);m>1&&(m=j.sqrt(m),n=m*n,i=m*i);var y=n*n,b=i*i,_=(s==o?-1:1)*j.sqrt(O((y*b-y*v*v-b*x*x)/(y*v*v+b*x*x))),w=_*n*v/i+(t+u)/2,k=_*-i*x/n+(e+l)/2,B=j.asin(((e-k)/i).toFixed(9)),S=j.asin(((l-k)/i).toFixed(9));B=w>t?X-B:B,S=w>u?X-S:S,0>B&&(B=2*X+B),0>S&&(S=2*X+S),o&&B>S&&(B-=2*X),!o&&S>B&&(S-=2*X)}var C=S-B;if(O(C)>f){var F=S,L=u,A=l;S=B+f*(o&&S>B?1:-1),u=w+n*j.cos(S),l=k+i*j.sin(S),d=Pe(u,l,n,i,a,0,o,L,A,[S,F,w,k])}C=S-B;var P=j.cos(B),E=j.sin(B),I=j.cos(S),R=j.sin(S),q=j.tan(C/4),D=4/3*n*q,z=4/3*i*q,V=[t,e],Y=[t+D*E,e-z*P],G=[u+D*R,l-z*I],N=[u,l];if(Y[0]=2*V[0]-Y[0],Y[1]=2*V[1]-Y[1],h)return[Y,G,N][T](d);d=[Y,G,N][T](d).join()[M](",");for(var W=[],$=0,H=d.length;H>$;$++)W[$]=$%2?g(d[$-1],d[$],p).y:g(d[$],d[$+1],p).x;return W},Ee=function(t,e,n,r,i,a,s,o,u){var l=1-u;return{x:V(l,3)*t+3*V(l,2)*u*n+3*l*u*u*i+V(u,3)*s,y:V(l,3)*e+3*V(l,2)*u*r+3*l*u*u*a+V(u,3)*o}},Me=r(function(t,e,n,r,i,a,s,o){var u,l=i-2*n+t-(s-2*i+n),h=2*(n-t)-2*(i-n),c=t-n,f=(-h+j.sqrt(h*h-4*l*c))/2/l,p=(-h-j.sqrt(h*h-4*l*c))/2/l,d=[e,o],g=[t,s];return O(f)>"1e12"&&(f=.5),O(p)>"1e12"&&(p=.5),f>0&&1>f&&(u=Ee(t,e,n,r,i,a,s,o,f),g.push(u.x),d.push(u.y)),p>0&&1>p&&(u=Ee(t,e,n,r,i,a,s,o,p),g.push(u.x),d.push(u.y)),l=a-2*r+e-(o-2*a+r),h=2*(r-e)-2*(a-r),c=e-r,f=(-h+j.sqrt(h*h-4*l*c))/2/l,p=(-h-j.sqrt(h*h-4*l*c))/2/l,O(f)>"1e12"&&(f=.5),O(p)>"1e12"&&(p=.5),f>0&&1>f&&(u=Ee(t,e,n,r,i,a,s,o,f),g.push(u.x),d.push(u.y)),p>0&&1>p&&(u=Ee(t,e,n,r,i,a,s,o,p),g.push(u.x),d.push(u.y)),{min:{x:z[F](0,g),y:z[F](0,d)},max:{x:D[F](0,g),y:D[F](0,d)}}}),Ie=t._path2curve=r(function(t,e){var n=!e&&Be(t);if(!e&&n.curve)return Ce(n.curve);for(var r=Te(t),i=e&&Te(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e){var n,r;if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in{T:1,Q:1})&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][T](Pe[F](0,[e.x,e.y][T](t.slice(1))));break;case"S":n=e.x+(e.x-(e.bx||e.x)),r=e.y+(e.y-(e.by||e.y)),t=["C",n,r][T](t.slice(1));break;case"T":e.qx=e.x+(e.x-(e.qx||e.x)),e.qy=e.y+(e.y-(e.qy||e.y)),t=["C"][T](Ae(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][T](Ae(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][T](Le(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][T](Le(e.x,e.y,t[1],e.y));break;case"V":t=["C"][T](Le(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][T](Le(e.x,e.y,e.X,e.Y))}return t}),u=function(t,e){if(t[e].length>7){t[e].shift();for(var n=t[e];n.length;)t.splice(e++,0,["C"][T](n.splice(0,6)));t.splice(e,1),c=D(r.length,i&&i.length||0)}},l=function(t,e,n,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),n.bx=0,n.by=0,n.x=t[s][1],n.y=t[s][2],c=D(r.length,i&&i.length||0))},h=0,c=D(r.length,i&&i.length||0);c>h;h++){r[h]=o(r[h],a),u(r,h),i&&(i[h]=o(i[h],s)),i&&u(i,h),l(r,i,a,s,h),l(i,r,s,a,h);var f=r[h],p=i&&i[h],d=f.length,g=i&&p.length;a.x=f[d-2],a.y=f[d-1],a.bx=Q(f[d-4])||a.x,a.by=Q(f[d-3])||a.y,s.bx=i&&(Q(p[g-4])||s.x),s.by=i&&(Q(p[g-3])||s.y),s.x=i&&p[g-2],s.y=i&&p[g-1]}return i||(n.curve=Ce(r)),i?[r,i]:r},null,Ce),Re=(t._parseDots=r(function(e){for(var n=[],r=0,i=e.length;i>r;r++){var a={},s=e[r].match(/^([^:]*):?([\d\.]*)/);if(a.color=t.getRGB(s[1]),a.color.error)return null;a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),n.push(a)}for(r=1,i=n.length-1;i>r;r++)if(!n[r].offset){for(var o=Q(n[r-1].offset||0),u=0,l=r+1;i>l;l++)if(n[l].offset){u=n[l].offset;break}u||(u=100,l=i),u=Q(u);for(var h=(u-o)/(l-r+1);l>r;r++)o+=h,n[r].offset=o+"%"}return n}),t._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)}),qe=(t._tofront=function(t,e){e.top!==t&&(Re(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},t._toback=function(t,e){e.bottom!==t&&(Re(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},t._insertafter=function(t,e,n){Re(t,n),e==n.top&&(n.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},t._insertbefore=function(t,e,n){Re(t,n),e==n.bottom&&(n.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},t.toMatrix=function(t,e){var n=Se(t),r={_:{transform:A},getBBox:function(){return n}};return je(r,e),r.matrix}),je=(t.transformPath=function(t,e){return ge(t,qe(t,e))},t._extractTransform=function(e,n){if(null==n)return e._.transform;n=E(n).replace(/\.{3}|\u2026/g,e._.transform||A);var r=t.parseTransformString(n),i=0,a=0,s=0,o=1,u=1,l=e._,h=new f;if(l.transform=r||[],r)for(var c=0,p=r.length;p>c;c++){var d,g,x,v,m,y=r[c],b=y.length,_=E(y[0]).toLowerCase(),w=y[0]!=_,k=w?h.invert():0;"t"==_&&3==b?w?(d=k.x(0,0),g=k.y(0,0),x=k.x(y[1],y[2]),v=k.y(y[1],y[2]),h.translate(x-d,v-g)):h.translate(y[1],y[2]):"r"==_?2==b?(m=m||e.getBBox(1),h.rotate(y[1],m.x+m.width/2,m.y+m.height/2),i+=y[1]):4==b&&(w?(x=k.x(y[2],y[3]),v=k.y(y[2],y[3]),h.rotate(y[1],x,v)):h.rotate(y[1],y[2],y[3]),i+=y[1]):"s"==_?2==b||3==b?(m=m||e.getBBox(1),h.scale(y[1],y[b-1],m.x+m.width/2,m.y+m.height/2),o*=y[1],u*=y[b-1]):5==b&&(w?(x=k.x(y[3],y[4]),v=k.y(y[3],y[4]),h.scale(y[1],y[2],x,v)):h.scale(y[1],y[2],y[3],y[4]),o*=y[1],u*=y[2]):"m"==_&&7==b&&h.add(y[1],y[2],y[3],y[4],y[5],y[6]),l.dirtyT=1,e.matrix=h}e.matrix=h,l.sx=o,l.sy=u,l.deg=i,l.dx=a=h.e,l.dy=s=h.f,1==o&&1==u&&!i&&l.bbox?(l.bbox.x+=+a,l.bbox.y+=+s):l.dirtyT=1}),De=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},ze=t._equaliseTransform=function(e,n){n=E(n).replace(/\.{3}|\u2026/g,e),e=t.parseTransformString(e)||[],n=t.parseTransformString(n)||[];for(var r,i,a,s,o=D(e.length,n.length),u=[],l=[],h=0;o>h;h++){if(a=e[h]||De(n[h]),s=n[h]||De(a),a[0]!=s[0]||"r"==a[0].toLowerCase()&&(a[2]!=s[2]||a[3]!=s[3])||"s"==a[0].toLowerCase()&&(a[3]!=s[3]||a[4]!=s[4]))return;for(u[h]=[],l[h]=[],r=0,i=D(a.length,s.length);i>r;r++)r in a&&(u[h][r]=a[r]),r in s&&(l[h][r]=s[r])}return{from:u,to:l}};t._getContainer=function(e,n,r,i){var a;return a=null!=i||t.is(e,"object")?e:B.doc.getElementById(e),null!=a?a.tagName?null==n?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:n,height:r}:{container:1,x:e,y:n,width:r,height:i}:void 0},t.pathToRelative=Fe,t._engine={},t.path2curve=Ie,t.matrix=function(t,e,n,r,i,a){return new f(t,e,n,r,i,a)},function(e){function n(t){return t[0]*t[0]+t[1]*t[1]}function r(t){var e=j.sqrt(n(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}e.add=function(t,e,n,r,i,a){var s,o,u,l,h=[[],[],[]],c=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],p=[[t,n,i],[e,r,a],[0,0,1]];for(t&&t instanceof f&&(p=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),s=0;3>s;s++)for(o=0;3>o;o++){for(l=0,u=0;3>u;u++)l+=c[s][u]*p[u][o];h[s][o]=l}this.a=h[0][0],this.b=h[1][0],this.c=h[0][1],this.d=h[1][1],this.e=h[0][2],this.f=h[1][2]},e.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new f(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},e.clone=function(){return new f(this.a,this.b,this.c,this.d,this.e,this.f)},e.translate=function(t,e){this.add(1,0,0,1,t,e)},e.scale=function(t,e,n,r){null==e&&(e=t),(n||r)&&this.add(1,0,0,1,n,r),this.add(t,0,0,e,0,0),(n||r)&&this.add(1,0,0,1,-n,-r)},e.rotate=function(e,n,r){e=t.rad(e),n=n||0,r=r||0;var i=+j.cos(e).toFixed(9),a=+j.sin(e).toFixed(9);this.add(i,a,-a,i,n,r),this.add(1,0,0,1,-n,-r)},e.x=function(t,e){return t*this.a+e*this.c+this.e},e.y=function(t,e){return t*this.b+e*this.d+this.f},e.get=function(t){return+this[E.fromCharCode(97+t)].toFixed(4)},e.toString=function(){return t.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},e.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},e.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},e.split=function(){var e={};e.dx=this.e,e.dy=this.f;var i=[[this.a,this.c],[this.b,this.d]];e.scalex=j.sqrt(n(i[0])),r(i[0]),e.shear=i[0][0]*i[1][0]+i[0][1]*i[1][1],i[1]=[i[1][0]-i[0][0]*e.shear,i[1][1]-i[0][1]*e.shear],e.scaley=j.sqrt(n(i[1])),r(i[1]),e.shear/=e.scaley;var a=-i[0][1],s=i[1][1];return 0>s?(e.rotate=t.deg(j.acos(s)),0>a&&(e.rotate=360-e.rotate)):e.rotate=t.deg(j.asin(a)),e.isSimple=!(+e.shear.toFixed(9)||e.scalex.toFixed(9)!=e.scaley.toFixed(9)&&e.rotate),e.isSuperSimple=!+e.shear.toFixed(9)&&e.scalex.toFixed(9)==e.scaley.toFixed(9)&&!e.rotate,e.noRotation=!+e.shear.toFixed(9)&&!e.rotate,e
},e.toTransformString=function(t){var e=t||this[M]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:A)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:A)+(e.rotate?"r"+[e.rotate,0,0]:A)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(f.prototype);var Oe=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);y.safari="Apple Computer, Inc."==navigator.vendor&&(Oe&&4>Oe[1]||"iP"==navigator.platform.slice(0,2))||"Google Inc."==navigator.vendor&&Oe&&8>Oe[1]?function(){var t=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){t.remove()})}:he;for(var Ve=function(){this.returnValue=!1},Xe=function(){return this.originalEvent.preventDefault()},Ye=function(){this.cancelBubble=!0},Ge=function(){return this.originalEvent.stopPropagation()},Ne=function(){return B.doc.addEventListener?function(t,e,n,r){var i=L&&R[e]?R[e]:e,a=function(i){var a=B.doc.documentElement.scrollTop||B.doc.body.scrollTop,s=B.doc.documentElement.scrollLeft||B.doc.body.scrollLeft,o=i.clientX+s,u=i.clientY+a;if(L&&R[k](e))for(var l=0,h=i.targetTouches&&i.targetTouches.length;h>l;l++)if(i.targetTouches[l].target==t){var c=i;i=i.targetTouches[l],i.originalEvent=c,i.preventDefault=Xe,i.stopPropagation=Ge;break}return n.call(r,i,o,u)};return t.addEventListener(i,a,!1),function(){return t.removeEventListener(i,a,!1),!0}}:B.doc.attachEvent?function(t,e,n,r){var i=function(t){t=t||B.win.event;var e=B.doc.documentElement.scrollTop||B.doc.body.scrollTop,i=B.doc.documentElement.scrollLeft||B.doc.body.scrollLeft,a=t.clientX+i,s=t.clientY+e;return t.preventDefault=t.preventDefault||Ve,t.stopPropagation=t.stopPropagation||Ye,n.call(r,t,a,s)};t.attachEvent("on"+e,i);var a=function(){return t.detachEvent("on"+e,i),!0};return a}:void 0}(),We=[],$e=function(t){for(var e,n=t.clientX,r=t.clientY,i=B.doc.documentElement.scrollTop||B.doc.body.scrollTop,a=B.doc.documentElement.scrollLeft||B.doc.body.scrollLeft,s=We.length;s--;){if(e=We[s],L){for(var o,u=t.touches.length;u--;)if(o=t.touches[u],o.identifier==e.el._drag.id){n=o.clientX,r=o.clientY,(t.originalEvent?t.originalEvent:t).preventDefault();break}}else t.preventDefault();var l,h=e.el.node,c=h.nextSibling,f=h.parentNode,p=h.style.display;B.win.opera&&f.removeChild(h),h.style.display="none",l=e.el.paper.getElementByPoint(n,r),h.style.display=p,B.win.opera&&(c?f.insertBefore(h,c):f.appendChild(h)),l&&eve("raphael.drag.over."+e.el.id,e.el,l),n+=a,r+=i,eve("raphael.drag.move."+e.el.id,e.move_scope||e.el,n-e.el._drag.x,r-e.el._drag.y,n,r,t)}},He=function(e){t.unmousemove($e).unmouseup(He);for(var n,r=We.length;r--;)n=We[r],n.el._drag={},eve("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,e);We=[]},Ue=t.el={},Ze=I.length;Ze--;)(function(e){t[e]=Ue[e]=function(n,r){return t.is(n,"function")&&(this.events=this.events||[],this.events.push({name:e,f:n,unbind:Ne(this.shape||this.node||B.doc,e,n,r||this)})),this},t["un"+e]=Ue["un"+e]=function(t){for(var n=this.events||[],r=n.length;r--;)if(n[r].name==e&&n[r].f==t)return n[r].unbind(),n.splice(r,1),!n.length&&delete this.events,this;return this}})(I[Ze]);Ue.data=function(e,n){var r=ue[this.id]=ue[this.id]||{};if(1==arguments.length){if(t.is(e,"object")){for(var i in e)e[k](i)&&this.data(i,e[i]);return this}return eve("raphael.data.get."+this.id,this,r[e],e),r[e]}return r[e]=n,eve("raphael.data.set."+this.id,this,n,e),this},Ue.removeData=function(t){return null==t?ue[this.id]={}:ue[this.id]&&delete ue[this.id][t],this},Ue.getData=function(){return e(ue[this.id]||{})},Ue.hover=function(t,e,n,r){return this.mouseover(t,n).mouseout(e,r||n)},Ue.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var Qe=[];Ue.drag=function(e,n,r,i,a,s){function o(o){(o.originalEvent||o).preventDefault();var u=B.doc.documentElement.scrollTop||B.doc.body.scrollTop,l=B.doc.documentElement.scrollLeft||B.doc.body.scrollLeft;this._drag.x=o.clientX+l,this._drag.y=o.clientY+u,this._drag.id=o.identifier,!We.length&&t.mousemove($e).mouseup(He),We.push({el:this,move_scope:i,start_scope:a,end_scope:s}),n&&eve.on("raphael.drag.start."+this.id,n),e&&eve.on("raphael.drag.move."+this.id,e),r&&eve.on("raphael.drag.end."+this.id,r),eve("raphael.drag.start."+this.id,a||i||this,o.clientX+l,o.clientY+u,o)}return this._drag={},Qe.push({el:this,start:o}),this.mousedown(o),this},Ue.onDragOver=function(t){t?eve.on("raphael.drag.over."+this.id,t):eve.unbind("raphael.drag.over."+this.id)},Ue.undrag=function(){for(var e=Qe.length;e--;)Qe[e].el==this&&(this.unmousedown(Qe[e].start),Qe.splice(e,1),eve.unbind("raphael.drag.*."+this.id));!Qe.length&&t.unmousemove($e).unmouseup(He),We=[]},y.circle=function(e,n,r){var i=t._engine.circle(this,e||0,n||0,r||0);return this.__set__&&this.__set__.push(i),i},y.rect=function(e,n,r,i,a){var s=t._engine.rect(this,e||0,n||0,r||0,i||0,a||0);return this.__set__&&this.__set__.push(s),s},y.ellipse=function(e,n,r,i){var a=t._engine.ellipse(this,e||0,n||0,r||0,i||0);return this.__set__&&this.__set__.push(a),a},y.path=function(e){e&&!t.is(e,G)&&!t.is(e[0],N)&&(e+=A);var n=t._engine.path(t.format[F](t,arguments),this);return this.__set__&&this.__set__.push(n),n},y.image=function(e,n,r,i,a){var s=t._engine.image(this,e||"about:blank",n||0,r||0,i||0,a||0);return this.__set__&&this.__set__.push(s),s},y.text=function(e,n,r){var i=t._engine.text(this,e||0,n||0,E(r));return this.__set__&&this.__set__.push(i),i},y.set=function(e){!t.is(e,"array")&&(e=Array.prototype.splice.call(arguments,0,arguments.length));var n=new hn(e);return this.__set__&&this.__set__.push(n),n.paper=this,n.type="set",n},y.setStart=function(t){this.__set__=t||this.set()},y.setFinish=function(){var t=this.__set__;return delete this.__set__,t},y.setSize=function(e,n){return t._engine.setSize.call(this,e,n)},y.setViewBox=function(e,n,r,i,a){return t._engine.setViewBox.call(this,e,n,r,i,a)},y.top=y.bottom=null,y.raphael=t;var Je=function(t){var e=t.getBoundingClientRect(),n=t.ownerDocument,r=n.body,i=n.documentElement,a=i.clientTop||r.clientTop||0,s=i.clientLeft||r.clientLeft||0,o=e.top+(B.win.pageYOffset||i.scrollTop||r.scrollTop)-a,u=e.left+(B.win.pageXOffset||i.scrollLeft||r.scrollLeft)-s;return{y:o,x:u}};y.getElementByPoint=function(t,e){var n=this,r=n.canvas,i=B.doc.elementFromPoint(t,e);if(B.win.opera&&"svg"==i.tagName){var a=Je(r),s=r.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=r.getIntersectionList(s,null);o.length&&(i=o[o.length-1])}if(!i)return null;for(;i.parentNode&&i!=r.parentNode&&!i.raphael;)i=i.parentNode;return i==n.canvas.parentNode&&(i=r),i=i&&i.raphael?n.getById(i.raphaelid):null},y.getElementsByBBox=function(e){var n=this.set();return this.forEach(function(r){t.isBBoxIntersect(r.getBBox(),e)&&n.push(r)}),n},y.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},y.forEach=function(t,e){for(var n=this.bottom;n;){if(t.call(e,n)===!1)return this;n=n.next}return this},y.getElementsByPoint=function(t,e){var n=this.set();return this.forEach(function(r){r.isPointInside(t,e)&&n.push(r)}),n},Ue.isPointInside=function(e,n){var r=this.realPath=this.realPath||de[this.type](this);return t.isPointInsidePath(r,e,n)},Ue.getBBox=function(t){if(this.removed)return{};var e=this._;return t?((e.dirty||!e.bboxwt)&&(this.realPath=de[this.type](this),e.bboxwt=Se(this.realPath),e.bboxwt.toString=p,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&((e.dirty||!this.realPath)&&(e.bboxwt=0,this.realPath=de[this.type](this)),e.bbox=Se(ge(this.realPath,this.matrix)),e.bbox.toString=p,e.dirty=e.dirtyT=0),e.bbox)},Ue.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},Ue.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:t.opacity||.5,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},n=e.width/2,r=this.paper,i=r.set(),a=this.realPath||de[this.type](this);a=this.matrix?ge(a,this.matrix):a;for(var s=1;n+1>s;s++)i.push(r.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/n*s).toFixed(3),opacity:+(e.opacity/n).toFixed(3)}));return i.insertBefore(this).translate(e.offsetx,e.offsety)};var Ke=function(e,n,r,i,a,s,l,h,c){return null==c?o(e,n,r,i,a,s,l,h):t.findDotsAtSegment(e,n,r,i,a,s,l,h,u(e,n,r,i,a,s,l,h,c))},tn=function(e,n){return function(r,i,a){r=Ie(r);for(var s,o,u,l,h,c="",f={},p=0,d=0,g=r.length;g>d;d++){if(u=r[d],"M"==u[0])s=+u[1],o=+u[2];else{if(l=Ke(s,o,u[1],u[2],u[3],u[4],u[5],u[6]),p+l>i){if(n&&!f.start){if(h=Ke(s,o,u[1],u[2],u[3],u[4],u[5],u[6],i-p),c+=["C"+h.start.x,h.start.y,h.m.x,h.m.y,h.x,h.y],a)return c;f.start=c,c=["M"+h.x,h.y+"C"+h.n.x,h.n.y,h.end.x,h.end.y,u[5],u[6]].join(),p+=l,s=+u[5],o=+u[6];continue}if(!e&&!n)return h=Ke(s,o,u[1],u[2],u[3],u[4],u[5],u[6],i-p),{x:h.x,y:h.y,alpha:h.alpha}}p+=l,s=+u[5],o=+u[6]}c+=u.shift()+u}return f.end=c,h=e?p:n?f:t.findDotsAtSegment(s,o,u[0],u[1],u[2],u[3],u[4],u[5],1),h.alpha&&(h={x:h.x,y:h.y,alpha:h.alpha}),h}},en=tn(1),nn=tn(),rn=tn(0,1);t.getTotalLength=en,t.getPointAtLength=nn,t.getSubpath=function(t,e,n){if(1e-6>this.getTotalLength(t)-n)return rn(t,e).end;var r=rn(t,n,1);return e?rn(r,e).end:r},Ue.getTotalLength=function(){return"path"==this.type?this.node.getTotalLength?this.node.getTotalLength():en(this.attrs.path):void 0},Ue.getPointAtLength=function(t){return"path"==this.type?nn(this.attrs.path,t):void 0},Ue.getSubpath=function(e,n){return"path"==this.type?t.getSubpath(this.attrs.path,e,n):void 0};var an=t.easing_formulas={linear:function(t){return t},"<":function(t){return V(t,1.7)},">":function(t){return V(t,.48)},"<>":function(t){var e=.48-t/1.04,n=j.sqrt(.1734+e*e),r=n-e,i=V(O(r),1/3)*(0>r?-1:1),a=-n-e,s=V(O(a),1/3)*(0>a?-1:1),o=i+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:V(2,-10*t)*j.sin((t-.075)*2*X/.3)+1},bounce:function(t){var e,n=7.5625,r=2.75;return 1/r>t?e=n*t*t:2/r>t?(t-=1.5/r,e=n*t*t+.75):2.5/r>t?(t-=2.25/r,e=n*t*t+.9375):(t-=2.625/r,e=n*t*t+.984375),e}};an.easeIn=an["ease-in"]=an["<"],an.easeOut=an["ease-out"]=an[">"],an.easeInOut=an["ease-in-out"]=an["<>"],an["back-in"]=an.backIn,an["back-out"]=an.backOut;var sn=[],on=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},un=function(){for(var e=+new Date,n=0;sn.length>n;n++){var r=sn[n];if(!r.el.removed&&!r.paused){var i,a,s=e-r.start,o=r.ms,u=r.easing,l=r.from,h=r.diff,c=r.to,f=(r.t,r.el),p={},d={};if(r.initstatus?(s=(r.initstatus*r.anim.top-r.prev)/(r.percent-r.prev)*o,r.status=r.initstatus,delete r.initstatus,r.stop&&sn.splice(n--,1)):r.status=(r.prev+(r.percent-r.prev)*(s/o))/r.anim.top,!(0>s))if(o>s){var g=u(s/o);for(var v in l)if(l[k](v)){switch(ee[v]){case Y:i=+l[v]+g*o*h[v];break;case"colour":i="rgb("+[ln(Z(l[v].r+g*o*h[v].r)),ln(Z(l[v].g+g*o*h[v].g)),ln(Z(l[v].b+g*o*h[v].b))].join(",")+")";break;case"path":i=[];for(var m=0,y=l[v].length;y>m;m++){i[m]=[l[v][m][0]];for(var b=1,_=l[v][m].length;_>b;b++)i[m][b]=+l[v][m][b]+g*o*h[v][m][b];i[m]=i[m].join(P)}i=i.join(P);break;case"transform":if(h[v].real)for(i=[],m=0,y=l[v].length;y>m;m++)for(i[m]=[l[v][m][0]],b=1,_=l[v][m].length;_>b;b++)i[m][b]=l[v][m][b]+g*o*h[v][m][b];else{var w=function(t){return+l[v][t]+g*o*h[v][t]};i=[["m",w(0),w(1),w(2),w(3),w(4),w(5)]]}break;case"csv":if("clip-rect"==v)for(i=[],m=4;m--;)i[m]=+l[v][m]+g*o*h[v][m];break;default:var B=[][T](l[v]);for(i=[],m=f.paper.customAttributes[v].length;m--;)i[m]=+B[m]+g*o*h[v][m]}p[v]=i}f.attr(p),function(t,e,n){setTimeout(function(){eve("raphael.anim.frame."+t,e,n)})}(f.id,f,r.anim)}else{if(function(e,n,r){setTimeout(function(){eve("raphael.anim.frame."+n.id,n,r),eve("raphael.anim.finish."+n.id,n,r),t.is(e,"function")&&e.call(n)})}(r.callback,f,r.anim),f.attr(c),sn.splice(n--,1),r.repeat>1&&!r.next){for(a in c)c[k](a)&&(d[a]=r.totalOrigin[a]);r.el.attr(d),x(r.anim,r.el,r.anim.percents[0],null,r.totalOrigin,r.repeat-1)}r.next&&!r.stop&&x(r.anim,r.el,r.next,null,r.totalOrigin,r.repeat)}}}t.svg&&f&&f.paper&&f.paper.safari(),sn.length&&on(un)},ln=function(t){return t>255?255:0>t?0:t};Ue.animateWith=function(e,n,r,i,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var u=r instanceof g?r:t.animation(r,i,a,s);x(u,o,u.percents[0],null,o.attr());for(var l=0,h=sn.length;h>l;l++)if(sn[l].anim==n&&sn[l].el==e){sn[h-1].start=sn[l].start;break}return o},Ue.onAnimation=function(t){return t?eve.on("raphael.anim.frame."+this.id,t):eve.unbind("raphael.anim.frame."+this.id),this},g.prototype.delay=function(t){var e=new g(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},g.prototype.repeat=function(t){var e=new g(this.anim,this.ms);return e.del=this.del,e.times=j.floor(D(t,0))||1,e},t.animation=function(e,n,r,i){if(e instanceof g)return e;(t.is(r,"function")||!r)&&(i=i||r||null,r=null),e=Object(e),n=+n||0;var a,s,o={};for(s in e)e[k](s)&&Q(s)!=s&&Q(s)+"%"!=s&&(a=!0,o[s]=e[s]);return a?(r&&(o.easing=r),i&&(o.callback=i),new g({100:o},n)):new g(e,n)},Ue.animate=function(e,n,r,i){var a=this;if(a.removed)return i&&i.call(a),a;var s=e instanceof g?e:t.animation(e,n,r,i);return x(s,a,s.percents[0],null,a.attr()),a},Ue.setTime=function(t,e){return t&&null!=e&&this.status(t,z(e,t.ms)/t.ms),this},Ue.status=function(t,e){var n,r,i=[],a=0;if(null!=e)return x(t,this,-1,z(e,1)),this;for(n=sn.length;n>a;a++)if(r=sn[a],r.el.id==this.id&&(!t||r.anim==t)){if(t)return r.status;i.push({anim:r.anim,status:r.status})}return t?0:i},Ue.pause=function(t){for(var e=0;sn.length>e;e++)sn[e].el.id!=this.id||t&&sn[e].anim!=t||eve("raphael.anim.pause."+this.id,this,sn[e].anim)!==!1&&(sn[e].paused=!0);return this},Ue.resume=function(t){for(var e=0;sn.length>e;e++)if(sn[e].el.id==this.id&&(!t||sn[e].anim==t)){var n=sn[e];eve("raphael.anim.resume."+this.id,this,n.anim)!==!1&&(delete n.paused,this.status(n.anim,n.status))}return this},Ue.stop=function(t){for(var e=0;sn.length>e;e++)sn[e].el.id!=this.id||t&&sn[e].anim!=t||eve("raphael.anim.stop."+this.id,this,sn[e].anim)!==!1&&sn.splice(e--,1);return this},eve.on("raphael.remove",v),eve.on("raphael.clear",v),Ue.toString=function(){return"Raphaël’s object"};var hn=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,n=t.length;n>e;e++)!t[e]||t[e].constructor!=Ue.constructor&&t[e].constructor!=hn||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},cn=hn.prototype;cn.push=function(){for(var t,e,n=0,r=arguments.length;r>n;n++)t=arguments[n],!t||t.constructor!=Ue.constructor&&t.constructor!=hn||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},cn.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},cn.forEach=function(t,e){for(var n=0,r=this.items.length;r>n;n++)if(t.call(e,this.items[n],n)===!1)return this;return this};for(var fn in Ue)Ue[k](fn)&&(cn[fn]=function(t){return function(){var e=arguments;return this.forEach(function(n){n[t][F](n,e)})}}(fn));cn.attr=function(e,n){if(e&&t.is(e,N)&&t.is(e[0],"object"))for(var r=0,i=e.length;i>r;r++)this.items[r].attr(e[r]);else for(var a=0,s=this.items.length;s>a;a++)this.items[a].attr(e,n);return this},cn.clear=function(){for(;this.length;)this.pop()},cn.splice=function(t,e){t=0>t?D(this.length+t,0):t,e=D(0,z(this.length-t,e));var n,r=[],i=[],a=[];for(n=2;arguments.length>n;n++)a.push(arguments[n]);for(n=0;e>n;n++)i.push(this[t+n]);for(;this.length-t>n;n++)r.push(this[t+n]);var s=a.length;for(n=0;s+r.length>n;n++)this.items[t+n]=this[t+n]=s>n?a[n]:r[n-s];for(n=this.items.length=this.length-=e-s;this[n];)delete this[n++];return new hn(i)},cn.exclude=function(t){for(var e=0,n=this.length;n>e;e++)if(this[e]==t)return this.splice(e,1),!0},cn.animate=function(e,n,r,i){(t.is(r,"function")||!r)&&(i=r||null);var a,s,o=this.items.length,u=o,l=this;if(!o)return this;i&&(s=function(){!--o&&i.call(l)}),r=t.is(r,G)?r:s;var h=t.animation(e,n,r,s);for(a=this.items[--u].animate(h);u--;)this.items[u]&&!this.items[u].removed&&this.items[u].animateWith(a,h,h);return this},cn.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},cn.getBBox=function(){for(var t=[],e=[],n=[],r=[],i=this.items.length;i--;)if(!this.items[i].removed){var a=this.items[i].getBBox();t.push(a.x),e.push(a.y),n.push(a.x+a.width),r.push(a.y+a.height)}return t=z[F](0,t),e=z[F](0,e),n=D[F](0,n),r=D[F](0,r),{x:t,y:e,x2:n,y2:r,width:n-t,height:r-e}},cn.clone=function(t){t=this.paper.set();for(var e=0,n=this.items.length;n>e;e++)t.push(this.items[e].clone());return t},cn.toString=function(){return"Raphaël‘s set"},cn.glow=function(t){var e=this.paper.set();return this.forEach(function(n){var r=n.glow(t);null!=r&&r.forEach(function(t){e.push(t)})}),e},t.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},n=t.face["font-family"];for(var r in t.face)t.face[k](r)&&(e.face[r]=t.face[r]);if(this.fonts[n]?this.fonts[n].push(e):this.fonts[n]=[e],!t.svg){e.face["units-per-em"]=J(t.face["units-per-em"],10);for(var i in t.glyphs)if(t.glyphs[k](i)){var a=t.glyphs[i];if(e.glyphs[i]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[k](s)&&(e.glyphs[i].k[s]=a.k[s])}}return t},y.getFont=function(e,n,r,i){if(i=i||"normal",r=r||"normal",n=+n||{normal:400,bold:700,lighter:300,bolder:800}[n]||400,t.fonts){var a=t.fonts[e];if(!a){var s=RegExp("(^|\\s)"+e.replace(/[^\w\d\s+!~.:_-]/g,A)+"(\\s|$)","i");for(var o in t.fonts)if(t.fonts[k](o)&&s.test(o)){a=t.fonts[o];break}}var u;if(a)for(var l=0,h=a.length;h>l&&(u=a[l],u.face["font-weight"]!=n||u.face["font-style"]!=r&&u.face["font-style"]||u.face["font-stretch"]!=i);l++);return u}},y.print=function(e,n,r,i,a,s,o){s=s||"middle",o=D(z(o||0,1),-1);var u,l=E(r)[M](A),h=0,c=0,f=A;if(t.is(i,"string")&&(i=this.getFont(i)),i){u=(a||16)/i.face["units-per-em"];for(var p=i.face.bbox[M](b),d=+p[0],g=p[3]-p[1],x=0,v=+p[1]+("baseline"==s?g+ +i.face.descent:g/2),m=0,y=l.length;y>m;m++){if("\n"==l[m])h=0,w=0,c=0,x+=g;else{var _=c&&i.glyphs[l[m-1]]||{},w=i.glyphs[l[m]];h+=c?(_.w||i.w)+(_.k&&_.k[l[m]]||0)+i.w*o:0,c=1}w&&w.d&&(f+=t.transformPath(w.d,["t",h*u,x*u,"s",u,u,d,v,"t",(e-d)/u,(n-v)/u]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},y.add=function(e){if(t.is(e,"array"))for(var n,r=this.set(),i=0,a=e.length;a>i;i++)n=e[i]||{},_[k](n.type)&&r.push(this[n.type]().attr(n));return r},t.format=function(e,n){var r=t.is(n,N)?[0][T](n):arguments;return e&&t.is(e,G)&&r.length-1&&(e=e.replace(w,function(t,e){return null==r[++e]?A:r[e]})),e||A},t.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,n=function(t,n,r){var i=r;return n.replace(e,function(t,e,n,r,a){e=e||r,i&&(e in i&&(i=i[e]),"function"==typeof i&&a&&(i=i()))}),i=(null==i||i==r?t:i)+""};return function(e,r){return(e+"").replace(t,function(t,e){return n(t,e,r)})}}(),t.ninja=function(){return S.was?B.win.Raphael=S.is:delete Raphael,t},t.st=cn,function(e,n,r){function i(){/in/.test(e.readyState)?setTimeout(i,9):t.eve("raphael.DOMload")}null==e.readyState&&e.addEventListener&&(e.addEventListener(n,r=function(){e.removeEventListener(n,r,!1),e.readyState="complete"},!1),e.readyState="loading"),i()}(document,"DOMContentLoaded"),S.was?B.win.Raphael=t:Raphael=t,eve.on("raphael.DOMload",function(){m=!0})})();window.Raphael&&window.Raphael.svg&&function(t){var e="hasOwnProperty",r=String,n=parseFloat,i=parseInt,a=Math,s=a.max,o=a.abs,u=a.pow,h=/[, ]+/,l=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var v=function(n,i){if(i){"string"==typeof n&&(n=v(n));for(var a in i)i[e](a)&&("xlink:"==a.substring(0,6)?n.setAttributeNS(p,a.substring(6),r(i[a])):n.setAttribute(a,r(i[a])))}else n=t._g.doc.createElementNS("http://www.w3.org/2000/svg",n),n.style&&(n.style.webkitTapHighlightColor="rgba(0,0,0,0)");return n},x=function(e,i){var h="linear",l=e.id+i,f=.5,p=.5,d=e.node,g=e.paper,x=d.style,y=t._g.doc.getElementById(l);if(!y){if(i=r(i).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=n(e),p=n(r);var i=2*(p>.5)-1;u(f-.5,2)+u(p-.5,2)>.25&&(p=a.sqrt(.25-u(f-.5,2))*i+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*i)}return c}),i=i.split(/\s*\-\s*/),"linear"==h){var m=i.shift();if(m=-n(m),isNaN(m))return null;var b=[0,0,a.cos(t.rad(m)),a.sin(t.rad(m))],_=1/(s(o(b[2]),o(b[3]))||1);b[2]*=_,b[3]*=_,0>b[2]&&(b[0]=-b[2],b[2]=0),0>b[3]&&(b[1]=-b[3],b[3]=0)}var w=t._parseDots(i);if(!w)return null;if(l=l.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&l!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=v(h+"Gradient",{id:l}),e.gradient=y,v(y,"radial"==h?{fx:f,fy:p}:{x1:b[0],y1:b[1],x2:b[2],y2:b[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var k=0,C=w.length;C>k;k++)y.appendChild(v("stop",{offset:w[k].offset?w[k].offset:k?"100%":"0%","stop-color":w[k].color||"#fff"}))}}return v(d,{fill:"url(#"+l+")",opacity:1,"fill-opacity":1}),x.fill=c,x.opacity=1,x.fillOpacity=1,1},y=function(t){var e=t.getBBox(1);v(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},m=function(n,i,a){if("path"==n.type){for(var s,o,u,h,l,f=r(i).toLowerCase().split("-"),p=n.paper,x=a?"end":"start",y=n.node,m=n.attrs,b=m["stroke-width"],_=f.length,w="classic",k=3,C=3,B=5;_--;)switch(f[_]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":w=f[_];break;case"wide":C=5;break;case"narrow":C=2;break;case"long":k=5;break;case"short":k=2}if("open"==w?(k+=2,C+=2,B+=2,u=1,h=a?4:1,l={fill:"none",stroke:m.stroke}):(h=u=k/2,l={fill:m.stroke,stroke:"none"}),n._.arrows?a?(n._.arrows.endPath&&g[n._.arrows.endPath]--,n._.arrows.endMarker&&g[n._.arrows.endMarker]--):(n._.arrows.startPath&&g[n._.arrows.startPath]--,n._.arrows.startMarker&&g[n._.arrows.startMarker]--):n._.arrows={},"none"!=w){var S="raphael-marker-"+w,A="raphael-marker-"+x+w+k+C;t._g.doc.getElementById(S)?g[S]++:(p.defs.appendChild(v(v("path"),{"stroke-linecap":"round",d:d[w],id:S})),g[S]=1);var T,M=t._g.doc.getElementById(A);M?(g[A]++,T=M.getElementsByTagName("use")[0]):(M=v(v("marker"),{id:A,markerHeight:C,markerWidth:k,orient:"auto",refX:h,refY:C/2}),T=v(v("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+C/2+") ":c)+"scale("+k/B+","+C/B+")","stroke-width":(1/((k/B+C/B)/2)).toFixed(4)}),M.appendChild(T),p.defs.appendChild(M),g[A]=1),v(T,l);var F=u*("diamond"!=w&&"oval"!=w);a?(s=n._.arrows.startdx*b||0,o=t.getTotalLength(m.path)-F*b):(s=F*b,o=t.getTotalLength(m.path)-(n._.arrows.enddx*b||0)),l={},l["marker-"+x]="url(#"+A+")",(o||s)&&(l.d=Raphael.getSubpath(m.path,s,o)),v(y,l),n._.arrows[x+"Path"]=S,n._.arrows[x+"Marker"]=A,n._.arrows[x+"dx"]=F,n._.arrows[x+"Type"]=w,n._.arrows[x+"String"]=i}else a?(s=n._.arrows.startdx*b||0,o=t.getTotalLength(m.path)-s):(s=0,o=t.getTotalLength(m.path)-(n._.arrows.enddx*b||0)),n._.arrows[x+"Path"]&&v(y,{d:Raphael.getSubpath(m.path,s,o)}),delete n._.arrows[x+"Path"],delete n._.arrows[x+"Marker"],delete n._.arrows[x+"dx"],delete n._.arrows[x+"Type"],delete n._.arrows[x+"String"];for(l in g)if(g[e](l)&&!g[l]){var L=t._g.doc.getElementById(l);L&&L.parentNode.removeChild(L)}}},b={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},_=function(t,e,n){if(e=b[r(e).toLowerCase()]){for(var i=t.attrs["stroke-width"]||"1",a={round:i,square:i,butt:0}[t.attrs["stroke-linecap"]||n["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*i+(o%2?1:-1)*a;v(t.node,{"stroke-dasharray":s.join(",")})}},w=function(n,a){var u=n.node,l=n.attrs,f=u.style.visibility;u.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(l[d]=g,d){case"blur":n.blur(g);break;case"href":case"title":case"target":var b=u.parentNode;if("a"!=b.tagName.toLowerCase()){var w=v("a");b.insertBefore(w,u),w.appendChild(u),b=w}"target"==d?b.setAttributeNS(p,"show","blank"==g?"new":g):b.setAttributeNS(p,d,g);break;case"cursor":u.style.cursor=g;break;case"transform":n.transform(g);break;case"arrow-start":m(n,g);break;case"arrow-end":m(n,g,1);break;case"clip-rect":var k=r(g).split(h);if(4==k.length){n.clip&&n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);var B=v("clipPath"),S=v("rect");B.id=t.createUUID(),v(S,{x:k[0],y:k[1],width:k[2],height:k[3]}),B.appendChild(S),n.paper.defs.appendChild(B),v(u,{"clip-path":"url(#"+B.id+")"}),n.clip=S}if(!g){var A=u.getAttribute("clip-path");if(A){var T=t._g.doc.getElementById(A.replace(/(^url\(#|\)$)/g,c));T&&T.parentNode.removeChild(T),v(u,{"clip-path":c}),delete n.clip}}break;case"path":"path"==n.type&&(v(u,{d:g?l.path=t._pathToAbsolute(g):"M0,0"}),n._.dirty=1,n._.arrows&&("startString"in n._.arrows&&m(n,n._.arrows.startString),"endString"in n._.arrows&&m(n,n._.arrows.endString,1)));break;case"width":if(u.setAttribute(d,g),n._.dirty=1,!l.fx)break;d="x",g=l.x;case"x":l.fx&&(g=-l.x-(l.width||0));case"rx":if("rx"==d&&"rect"==n.type)break;case"cx":u.setAttribute(d,g),n.pattern&&y(n),n._.dirty=1;break;case"height":if(u.setAttribute(d,g),n._.dirty=1,!l.fy)break;d="y",g=l.y;case"y":l.fy&&(g=-l.y-(l.height||0));case"ry":if("ry"==d&&"rect"==n.type)break;case"cy":u.setAttribute(d,g),n.pattern&&y(n),n._.dirty=1;break;case"r":"rect"==n.type?v(u,{rx:g,ry:g}):u.setAttribute(d,g),n._.dirty=1;break;case"src":"image"==n.type&&u.setAttributeNS(p,"href",g);break;case"stroke-width":(1!=n._.sx||1!=n._.sy)&&(g/=s(o(n._.sx),o(n._.sy))||1),n.paper._vbSize&&(g*=n.paper._vbSize),u.setAttribute(d,g),l["stroke-dasharray"]&&_(n,l["stroke-dasharray"],a),n._.arrows&&("startString"in n._.arrows&&m(n,n._.arrows.startString),"endString"in n._.arrows&&m(n,n._.arrows.endString,1));break;case"stroke-dasharray":_(n,g,a);break;case"fill":var M=r(g).match(t._ISURL);if(M){B=v("pattern");var F=v("image");B.id=t.createUUID(),v(B,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),v(F,{x:0,y:0,"xlink:href":M[1]}),B.appendChild(F),function(e){t._preload(M[1],function(){var t=this.offsetWidth,r=this.offsetHeight;v(e,{width:t,height:r}),v(F,{width:t,height:r}),n.paper.safari()})}(B),n.paper.defs.appendChild(B),v(u,{fill:"url(#"+B.id+")"}),n.pattern=B,n.pattern&&y(n);break}var L=t.getRGB(g);if(L.error){if(("circle"==n.type||"ellipse"==n.type||"r"!=r(g).charAt())&&x(n,g)){if("opacity"in l||"fill-opacity"in l){var N=t._g.doc.getElementById(u.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(N){var P=N.getElementsByTagName("stop");v(P[P.length-1],{"stop-opacity":("opacity"in l?l.opacity:1)*("fill-opacity"in l?l["fill-opacity"]:1)})}}l.gradient=g,l.fill="none";break}}else delete a.gradient,delete l.gradient,!t.is(l.opacity,"undefined")&&t.is(a.opacity,"undefined")&&v(u,{opacity:l.opacity}),!t.is(l["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&v(u,{"fill-opacity":l["fill-opacity"]});L[e]("opacity")&&v(u,{"fill-opacity":L.opacity>1?L.opacity/100:L.opacity});case"stroke":L=t.getRGB(g),u.setAttribute(d,L.hex),"stroke"==d&&L[e]("opacity")&&v(u,{"stroke-opacity":L.opacity>1?L.opacity/100:L.opacity}),"stroke"==d&&n._.arrows&&("startString"in n._.arrows&&m(n,n._.arrows.startString),"endString"in n._.arrows&&m(n,n._.arrows.endString,1));break;case"gradient":("circle"==n.type||"ellipse"==n.type||"r"!=r(g).charAt())&&x(n,g);break;case"opacity":l.gradient&&!l[e]("stroke-opacity")&&v(u,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(l.gradient){N=t._g.doc.getElementById(u.getAttribute("fill").replace(/^url\(#|\)$/g,c)),N&&(P=N.getElementsByTagName("stop"),v(P[P.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=i(g,10)+"px");var E=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});u.style[E]=g,n._.dirty=1,u.setAttribute(d,g)}}C(n,a),u.style.visibility=f},k=1.2,C=function(n,a){if("text"==n.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=n.attrs,o=n.node,u=o.firstChild?i(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h,l=r(a.text).split("\n"),f=[],p=0,d=l.length;d>p;p++)h=v("tspan"),p&&v(h,{dy:u*k,x:s.x}),h.appendChild(t._g.doc.createTextNode(l[p])),o.appendChild(h),f[p]=h}else for(f=o.getElementsByTagName("tspan"),p=0,d=f.length;d>p;p++)p?v(f[p],{dy:u*k,x:s.x}):v(f[0],{dy:0});v(o,{x:s.x,y:s.y}),n._.dirty=1;var g=n._getBBox(),x=s.y-(g.y+g.height/2);x&&t.is(x,"finite")&&v(f[0],{dy:x})}},B=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},S=t.el;B.prototype=S,S.constructor=B,t._engine.path=function(t,e){var r=v("path");e.canvas&&e.canvas.appendChild(r);var n=new B(r,e);return n.type="path",w(n,{fill:"none",stroke:"#000",path:t}),n},S.rotate=function(t,e,i){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=n(t[1]),i=n(t[2])),t=n(t[0]),null==i&&(e=i),null==e||null==i){var a=this.getBBox(1);e=a.x+a.width/2,i=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,i]])),this},S.scale=function(t,e,i,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=n(t[1]),i=n(t[2]),a=n(t[3])),t=n(t[0]),null==e&&(e=t),null==a&&(i=a),null==i||null==a)var s=this.getBBox(1);return i=null==i?s.x+s.width/2:i,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,i,a]])),this},S.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=n(t[1])),t=n(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},S.transform=function(r){var n=this._;if(null==r)return n.transform;if(t._extractTransform(this,r),this.clip&&v(this.clip,{transform:this.matrix.invert()}),this.pattern&&y(this),this.node&&v(this.node,{transform:this.matrix}),1!=n.sx||1!=n.sy){var i=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":i})}return this},S.hide=function(){return!this.removed&&this.paper.safari(this.node.style.display="none"),this},S.show=function(){return!this.removed&&this.paper.safari(this.node.style.display=""),this},S.remove=function(){if(!this.removed&&this.node.parentNode){var e=this.paper;e.__set__&&e.__set__.exclude(this),l.unbind("raphael.*.*."+this.id),this.gradient&&e.defs.removeChild(this.gradient),t._tear(this,e),"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.removeChild(this.node.parentNode):this.node.parentNode.removeChild(this.node);for(var r in this)this[r]="function"==typeof this[r]?t._removedFactory(r):null;this.removed=!0}},S._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e={};try{e=this.node.getBBox()}catch(r){}finally{e=e||{}}return t&&this.hide(),e},S.attr=function(r,n){if(this.removed)return this;if(null==r){var i={};for(var a in this.attrs)this.attrs[e](a)&&(i[a]=this.attrs[a]);return i.gradient&&"none"==i.fill&&(i.fill=i.gradient)&&delete i.gradient,i.transform=this._.transform,i}if(null==n&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},u=0,c=s.length;c>u;u++)r=s[u],o[r]=r in this.attrs?this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?this.paper.customAttributes[r].def:t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==n&&t.is(r,"array")){for(o={},u=0,c=r.length;c>u;u++)o[r[u]]=this.attr(r[u]);return o}if(null!=n){var f={};f[r]=n}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)l("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return w(this,f),this},S.toFront=function(){if(this.removed)return this;"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var e=this.paper;return e.top!=this&&t._tofront(this,e),this},S.toBack=function(){if(this.removed)return this;var e=this.node.parentNode;return"a"==e.tagName.toLowerCase()?e.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):e.firstChild!=this.node&&e.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper),this.paper,this},S.insertAfter=function(e){if(this.removed)return this;var r=e.node||e[e.length-1].node;return r.nextSibling?r.parentNode.insertBefore(this.node,r.nextSibling):r.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this},S.insertBefore=function(e){if(this.removed)return this;var r=e.node||e[0].node;return r.parentNode.insertBefore(this.node,r),t._insertbefore(this,e,this.paper),this},S.blur=function(e){var r=this;if(0!==+e){var n=v("filter"),i=v("feGaussianBlur");r.attrs.blur=e,n.id=t.createUUID(),v(i,{stdDeviation:+e||1.5}),n.appendChild(i),r.paper.defs.appendChild(n),r._blur=n,v(r.node,{filter:"url(#"+n.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter")},t._engine.circle=function(t,e,r,n){var i=v("circle");t.canvas&&t.canvas.appendChild(i);var a=new B(i,t);return a.attrs={cx:e,cy:r,r:n,fill:"none",stroke:"#000"},a.type="circle",v(i,a.attrs),a},t._engine.rect=function(t,e,r,n,i,a){var s=v("rect");t.canvas&&t.canvas.appendChild(s);var o=new B(s,t);return o.attrs={x:e,y:r,width:n,height:i,r:a||0,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",v(s,o.attrs),o},t._engine.ellipse=function(t,e,r,n,i){var a=v("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new B(a,t);return s.attrs={cx:e,cy:r,rx:n,ry:i,fill:"none",stroke:"#000"},s.type="ellipse",v(a,s.attrs),s},t._engine.image=function(t,e,r,n,i,a){var s=v("image");v(s,{x:r,y:n,width:i,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new B(s,t);return o.attrs={x:r,y:n,width:i,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,n,i){var a=v("text");e.canvas&&e.canvas.appendChild(a);var s=new B(a,e);return s.attrs={x:r,y:n,"text-anchor":"middle",text:i,font:t._availableAttrs.font,stroke:"none",fill:"#000"},s.type="text",w(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,n=e.x,i=e.y,a=e.width,s=e.height;if(!r)throw Error("SVG container not found.");var o,u=v("svg"),h="overflow:hidden;";return n=n||0,i=i||0,a=a||512,s=s||342,v(u,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg"}),1==r?(u.style.cssText=h+"position:absolute;left:"+n+"px;top:"+i+"px",t._g.doc.body.appendChild(u),o=1):(u.style.cssText=h+"position:relative",r.firstChild?r.insertBefore(u,r.firstChild):r.appendChild(u)),r=new t._Paper,r.width=a,r.height=s,r.canvas=u,r.clear(),r._left=r._top=0,o&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,n,i){l("raphael.setViewBox",this,this._viewBox,[t,e,r,n,i]);var a,o,u=s(r/this.width,n/this.height),h=this.top,c=i?"meet":"xMinYMin";for(null==t?(this._vbSize&&(u=1),delete this._vbSize,a="0 0 "+this.width+f+this.height):(this._vbSize=u,a=t+f+e+f+r+f+n),v(this.canvas,{viewBox:a,preserveAspectRatio:c});u&&h;)o="stroke-width"in h.attrs?h.attrs["stroke-width"]:1,h.attr({"stroke-width":o}),h._.dirty=1,h._.dirtyT=1,h=h.prev;return this._viewBox=[t,e,r,n,!!i],this},t.prototype.renderfix=function(){var t,e=this.canvas,r=e.style;try{t=e.getScreenCTM()||e.createSVGMatrix()}catch(n){t=e.createSVGMatrix()}var i=-t.e%1,a=-t.f%1;(i||a)&&(i&&(this._left=(this._left+i)%1,r.left=this._left+"px"),a&&(this._top=(this._top+a)%1,r.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=v("defs"))},t.prototype.remove=function(){l("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var A=t.st;for(var T in S)S[e](T)&&!A[e](T)&&(A[T]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(T))}(window.Raphael);window.Raphael&&window.Raphael.vml&&function(t){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},v=/([clmz]),?([^clmz]*)/gi,x=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(v,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o,l,h=n(e);s=[];for(var u=0,c=h.length;c>u;u++){o=h[u],l=h[u][0].toLowerCase(),"z"==l&&(l="x");for(var f=1,x=o.length;x>f;f++)l+=a(o[f]*b)+(f!=x-1?",":d);s.push(l)}return s.join(p)},C=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},B=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",v=b/e,x=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(v)+p+l(x),f.rotation=a*(0>e*r?-1:1),a){var y=C(a,i,n);i=y.dx,n=y.dy}if(0>e&&(g+="x"),0>r&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-v+p+n*-x,u||s.fillsize){var m=c.getElementsByTagName(h);m=m&&m[0],c.removeChild(m),u&&(y=C(a,o.x(u[0],u[1]),o.y(u[0],u[1])),m.position=y.dx*d+p+y.dy*d),s.fillsize&&(m.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(m)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},A=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,v=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),x=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),y=n;for(var m in l)l[e](m)&&(f[m]=l[m]);if(v&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||v)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],B(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),x){var C=+f.cx,A=+f.cy,N=+f.rx||+f.r||0,E=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((C-N)*b),a((A-E)*b),a((C+N)*b),a((A+E)*b),a(C*b))}if("clip-rect"in l){var M=r(l["clip-rect"]).split(u);if(4==M.length){M[2]=+M[2]+ +M[0],M[3]=+M[3]+ +M[1];var z=c.clipRect||t._g.doc.createElement("div"),F=z.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",M),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(z,c),z.appendChild(c),c.clipRect=z)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(y,l["arrow-start"]),"arrow-end"in l&&S(y,l["arrow-end"],1),null!=l.opacity||null!=l["stroke-width"]||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var P=c.getElementsByTagName(h),I=!1;if(P=P&&P[0],!P&&(I=P=L(h)),"image"==n.type&&l.src&&(P.src=l.src),l.fill&&(P.on=!0),(null==P.on||"none"==l.fill||null===l.fill)&&(P.on=!1),P.on&&l.fill){var j=r(l.fill).match(t._ISURL);if(j){P.parentNode==c&&c.removeChild(P),P.rotate=!0,P.src=j[1],P.type="tile";var q=n.getBBox(1);P.position=q.x+p+q.y,n._.fillpos=[q.x,q.y],t._preload(j[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else P.color=t.getRGB(l.fill).hex,P.src=d,P.type="solid",t.getRGB(l.fill).error&&(y.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&T(y,l.fill,P)&&(f.fill="none",f.gradient=l.fill,P.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var D=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);D=o(s(D,0),1),P.opacity=D,P.src&&(P.color="none")}c.appendChild(P);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],V=!1;!O&&(V=O=L("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var Y=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=Y.hex),D=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+Y.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(D=o(s(D,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&1>G&&(D*=G)&&(O.weight=1),O.opacity=D,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),l["stroke-dasharray"]){var W={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=W[e](l["stroke-dasharray"])?W[l["stroke-dasharray"]]:d}V&&c.appendChild(O)}if("text"==y.type){y.paper.canvas.style.display=d;var X=y.paper.span,H=100,U=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),U=i(f["font-size"]||U&&U[0])||10,g.fontSize=U*H+"px",y.textpath.string&&(X.innerHTML=r(y.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var $=X.getBoundingClientRect();y.W=f.w=($.right-$.left)/H,y.H=f.h=($.bottom-$.top)/H,y.X=f.x,y.Y=f.y+y.H/2,("x"in l||"y"in l)&&(y.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Z=["x","y","text","font","font-family","font-weight","font-style","font-size"],Q=0,J=Z.length;J>Q;Q++)if(Z[Q]in l){y._.dirty=1;break}switch(f["text-anchor"]){case"start":y.textpath.style["v-text-align"]="left",y.bbx=y.W/2;break;case"end":y.textpath.style["v-text-align"]="right",y.bbx=-y.W/2;break;default:y.textpath.style["v-text-align"]="center",y.bbx=0}y.textpath.style["v-text-kern"]=!0}},T=function(e,a,s){e.attrs=e.attrs||{};var o=(e.attrs,Math.pow),l="linear",h=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return l="radial",e&&r&&(e=i(e),r=i(r),o(e-.5,2)+o(r-.5,2)>.25&&(r=n.sqrt(.25-o(e-.5,2))*(2*(r>.5)-1)+.5),h=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==l){var u=a.shift();if(u=-i(u),isNaN(u))return null}var c=t._parseDots(a);if(!c)return null;if(e=e.shape||e.node,c.length){e.removeChild(s),s.on=!0,s.method="none",s.color=c[0].color,s.color2=c[c.length-1].color;for(var f=[],g=0,v=c.length;v>g;g++)c[g].offset&&f.push(c[g].offset+p+c[g].color);s.colors=f.length?f.join():"0% "+s.color,"radial"==l?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=h,s.angle=0):(s.type="gradient",s.angle=(270-u)%360),e.appendChild(s)}return 1},N=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;N.prototype=E,E.constructor=N,E.transform=function(e){if(null==e)return this._.transform;var i,n=this.paper._viewBoxShift,a=n?"s"+[n.scale,n.scale]+"-1-1t"+[n.dx,n.dy]:d;n&&(i=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,a+e);var s,o=this.matrix.clone(),l=this.skew,h=this.node,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(o.translate(-.5,-.5),c||u||"image"==this.type)if(l.matrix="1 0 0 1",l.offset="0 0",s=o.split(),u&&s.noRotation||!s.isSimple){h.style.filter=o.toFilter();var f=this.getBBox(),g=this.getBBox(1),v=f.x-g.x,x=f.y-g.y;h.coordorigin=v*-b+p+x*-b,B(this,1,1,v,x,0)}else h.style.filter=d,B(this,s.scalex,s.scaley,s.dx,s.dy,s.rotate);else h.style.filter=d,l.matrix=r(o),l.offset=o.offset();return i&&(this._.transform=i),this},E.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},E.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},E.hide=function(){return!this.removed&&(this.node.style.display="none"),this},E.show=function(){return!this.removed&&(this.node.style.display=d),this},E._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},E.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;f>l;l++)r=s[l],o[r]=r in this.attrs?this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?this.paper.customAttributes[r].def:t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;f>l;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var v in g)g[e](v)&&(p[v]=g[v])}p.text&&"text"==this.type&&(this.textpath.string=p.text),A(this,p)}return this},E.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},E.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},E.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},E.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},E.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;i=i.replace(x,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur)},t._engine.path=function(t,e){var r=L("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new N(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,A(i,n),e.canvas.appendChild(r);var a=L("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path();return a.attrs,a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",A(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path();return n.attrs,n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",A(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),B(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=L("shape"),l=L("path"),h=L("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new N(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,A(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=L("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var o,l,h=this.width,u=this.height,c=1/s(i/h,n/u);return a&&(o=u/n,l=h/i,h>i*o&&(e-=(h-i*o)/2/o),u>n*l&&(r-=(u-n*l)/2/l)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:c},this.forEach(function(t){t.transform("...")}),this};var L;t._engine.initWin=function(t){var e=t.document;e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),L=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){L=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n=e.width,a=e.x,s=e.y;if(!r)throw Error("VML container not found.");var o=new t._Paper,l=o.canvas=t._g.doc.createElement("div"),h=l.style;return a=a||0,s=s||0,n=n||512,i=i||342,o.width=n,o.height=i,n==+n&&(n+="px"),i==+i&&(i+="px"),o.coordsize=1e3*b+p+1e3*b,o.coordorigin="0 0",o.span=t._g.doc.createElement("span"),o.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",l.appendChild(o.span),h.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",n,i),1==r?(t._g.doc.body.appendChild(l),h.left=a+"px",h.top=s+"px",h.position="absolute"):r.firstChild?r.insertBefore(l,r.firstChild):r.appendChild(l),o.renderfix=function(){},o},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var M=t.st;for(var z in E)E[e](z)&&!M[e](z)&&(M[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}(window.Raphael);
(function ($) {
    var Svgmap = function (element, options) {
        this.$el = $(element);
        this.options = options;
        this.paper = Raphael(this.$el.attr('id'), options.width, options.height);
        this.paper.rect(0, 0, options.width, options.height, options.radius).attr(options.rectAttr);
        this.drawShape();
        this.drawText();
        this.drawMask();
        this.popContainer = $('<div class="gs_svg_float_box" />').css({
            zIndex: '10',
            display: 'none',
            width: options.popWidth + 'px'
            //,height: options.popHeight + 'px'
        }).css(options.popStyle).appendTo(document.body);
        var me = this;
        this.popContainer.on('mouseover', function () {
            options.mapOverTimeout && clearTimeout(options.mapOverTimeout);
        });
        this.popContainer.on('mouseout', function () {
            me.popdown();
        });
        this.cx = 0;
        this.cy = 0;
        this.cityId = 0;
    };

    Svgmap.prototype = {
        drawShape: function () {
            var opt = this.options,
                mapData = opt.mapData,
                paper = this.paper;
            for (var key in opt.mapData) {
                paper.path(mapData[key].path)
                    .attr({ fill: mapData[key].color || "#f0efeb", "stroke": "none" })
                    .scale(opt.scale, opt.scale, 0, 0)
                    .translate(opt.dx + opt.x, opt.dy + opt.y);
            }
        },
        drawText: function () {
            var opt = this.options,
                mapData = opt.mapData,
                paper = this.paper;
            for (var key in mapData) {
                paper.text(mapData[key].x * opt.scale + opt.x, mapData[key].y * opt.scale + opt.y, mapData[key].name).attr(opt.textAttr);
            }
        },
        drawMask: function () {
            var me = this,
                opt = this.options,
                mapData = opt.mapData,
                paper = this.paper;
            paper.setStart();
            for (var key in mapData) {
                paper.path(mapData[key].path)
                    .attr(opt.maskAttr)
                    .scale(opt.scale, opt.scale, 0, 0)
                    .data("id", mapData[key].id)
                    .translate(opt.dx + opt.x, opt.dy + opt.y);
            }
            var world = paper.setFinish();

            world.mousemove(function (e, x, y) {
                me.cx = x;
                me.cy = y;
            });
            world.mouseover(function (e, x, y) {
                var p = this;
                me.overMap = true;
                me.cityId = p.data('id');
                me.popup();
            });
            world.mouseout(function (e, x, y) {
                me.popdown();
            });
            world.hover(function (e, x, y) {
                this.stop().animate({ "fill-opacity": 0.5 }, 200);
            }, function (e, x, y) {
                this.stop().animate({ "fill-opacity": 0 }, 200);
            });
        },
        popCore: function () {
            var me = this,
                opt = this.options,
                content = opt.contentData[me.cityId] && opt.contentData[me.cityId].name,
                offset = opt.popOffset;
            if (!me.overMap) {
                return;
            }
            var x = me.cx < (opt.width / 1.5) ? (me.cx + offset.x) : (me.cx - opt.popWidth - offset.x);
            me.popContainer.html(content).animate({ left: x + 'px', top: me.cy + offset.y + 'px' }, 100, 'linear').show();
        },
        popup: function () {
            var me = this,
                opt = this.options;
            opt.mapOverTimeout && clearTimeout(opt.mapOverTimeout);
            opt.mapOverTimeout = setTimeout(function () {
                me.popCore();
            }, 200);
        },
        popdown: function () {
            var me = this,
                opt = this.options;
            opt.mapOverTimeout && clearTimeout(opt.mapOverTimeout);
            opt.mapOverTimeout = setTimeout(function () {
                me.popContainer.html('').hide('fast');
            }, 300);
        }
    };

    $.fn.svgmap = function (option) {
        return this.each(function () {
            var options = $.extend({}, $.fn.svgmap.defaults, typeof option == 'object' && option);
            new Svgmap(this, options);
        });
    };

    $.fn.svgmap.defaults = {
        dx: 0,
        dy: 0,
        x: 0,
        y: 0,
        width: 700,
        height: 400,
        radius: 0,
        scale: 1,
        mapData: {},
        contentData: {},
        rectAttr: {
            stroke: "none"
        },
        textAttr: { fill: "#000000", font: "12px Simsun"  },
        maskAttr: { fill: "#bacabd", "fill-opacity": 0, stroke: "#66bbee", "stroke-opacity": 0.25, cursor: "pointer" },
        popOffset: { x: 20, y: -30 },
        popWidth: 220,
        popHeight: 100,
        popStyle: { border: '1px solid #66BBEE', background: '#fff' }
    };

    $.fn.svgmap.Constructor = Svgmap;

    
}).call(this, jQuery);

var mapDataChina = {
    heilongjiang: { id: 100055, name: "黑龙江", x: 426, y: 58, color: '#BBEECC', path: "M432.7,36.8l-4.1-1c-1.2,1.3-2.5,2-4.2,2h-0.3c-1.5,0-2.8-0.5-3.8-1.3l-0.2-0.2v-3.7l-0.3-0.5L418,27l-0.6-3l-0.8-0.2c-2-0.8-3.3-2-3.9-3.8c-0.3-1.2-0.8-2.2-1.5-3.3l-1.3-1.7c-1.1-2.2-2.9-2.7-5.3-1.7c-2.2,1.2-4.3,1.2-6.2,0.4l-1.7-1.1l-1.8-2.2l-0.2-0.3l-0.6-1.7c-1.3-2.4-3.5-4.1-6.7-4.9l-3.8-0.4L373.1,0l-0.2,0.3c-2.1,1.7-4,3.8-5.3,6.7l3,1.1V8h0.2l3.8,0.8l0.3,2l-0.3,0.2l-0.5,0.6l-0.6,0.4l-0.1,0.5l0.8,1.5l1.6,2.4l0.1,1c0.5-1.8,1.7-2.9,3.4-3.4c0,0.8,0.3,1.3,1,1.8l1.3,1.3c0.5,0.2,0.4,0.7-0.6,1.5l-0.6,0.5l-0.3,0.9c-0.2,0.1-0.2,0.4-0.2,0.8v0.5l-0.5,1.6c-0.3,0.6-0.5,1.2-0.6,2.1l0.1,1.1l0.4,0.9l0.3,0.5l1.3,3.3l1,1.7l1.2,0.9l1.1,0.1l3.7-3l1.2-0.7l1.8-0.3l0.6,0.1l3.6,0.2l0.5-0.2l1.1-0.5l0.2-0.8c0.2-1,0.7-2,1.5-3l0.2-0.2c0.4-0.5,1-0.6,1.8-0.5c1.2-0.2,2,0.2,2.5,1c0.2,0.3,0.6,0.5,1,0.7c1.9,0.5,2.9,1.7,3,3.5l-0.3,6v0.6l-2.2,4.7l-0.2,1.2v0.2l-0.4,3.1c0,1-0.4,1.9-1.1,2.8l-0.3,0.3c-0.3,0.3-0.5,0.6-0.4,1l-0.3,2.3l-1.4,0.3l-1.5,1l-0.2-0.1l-0.4,0.6l-0.8,2.8l-0.7,1.7l-1.3,1.2l-0.6,0.3l-1.3,1l-0.2,0.2l-0.4,0.8v0.4c-0.1,0.6,0,0.9,0.3,0.9l0.4,0.7l-0.4,2.8l5.2,0.4l0.5,0.5l0.1,0.9l0.1,4.9l2.3,0.5l0.3,0.4l1.7,2.9l2.2,2.2l0.2,0.2l1.8,0.4h5.8V80l1.7,1.5l0.8,0.3l2,0.3l4.2,0.2l2.5-0.2l1.3-0.6l0.7-0.3l1.4,0.1l1.1,1.7c0.5,0.7,1.1,1.3,1.8,1.8l2,1.3c0.9,0.7,1.8,1.1,2.8,1.4l1.7,0.6l0.5,0.4l0.3,0.6v0.2c0.2,0.3,0.5,0.5,0.8,0.3h0.1c0.6,0,1-0.5,1-1.3c0-0.8,0-1.4,0.2-1.6l1.1-0.9l0.6-0.2c0.5-0.1,0.8,0.1,1,0.7l0.4,1l0.2,0.2l2.7,3.8c0.1,0.5,0.3,0.9,0.8,1.1l0.5,0.2c0.8,0,1.7-0.2,2.5-0.6l0.5-0.5l1.5-2.3l0.3-0.1h3.7l1-0.1l0.5-0.2l1.5-0.3l-2-4.3c-0.3-0.7-0.5-1.4-0.5-2.2c0.1-1.5,0.5-2.7,1.2-3.7l1.1-0.9c0.5-0.6,1.1-0.9,1.7-1.1c0.7-0.5,1.5-0.5,2.5-0.5l0.7,1l5.3-0.3c0.5-0.2,1-0.2,1.6,0c-0.1-3.8,0.2-7.7,0.9-11.9l0.5-1.3c0.8-1.3,1.1-2.8,0.8-4.3c-0.6-4.4,0-8.2,2.2-11.7c-0.3-1.7-0.5-3.1-0.5-4.3l-0.1-2.2c-0.1-0.3,0.1-0.5,0.3-0.8l1.1-2.4l-0.2-0.3h-0.4c-4.4,1.2-8.1,3.3-11.4,6.3l-3.6,3.1c-1.4,1.6-3.2,2.4-5.2,2.4c-1.5,1.9-3.2,2.7-5.3,2.5l-1.7-0.3c-0.8-0.4-1.4-1-1.6-1.8l-0.9-3c-0.5-0.9-1-1.6-1.6-2.2l-2.1-2.2l-0.3-1.9l-2.7-0.4h-0.1l-3.6-3.9L432.7,36.8z" },
    jilin: { id: 100031, name: "吉林", x: 422, y: 100, color: '#F5DCCC', path: "M426.4,81.2l-0.8,0.4l-1.2,0.5l-2.5,0.2l-4.3-0.2l-2-0.3l-0.7-0.3l-1.6-1.5l-0.2-0.1h-5.7l-1.8-0.4l-0.2-0.2l-2.3-2.2l-1.7-2.9l-0.2-0.4l-2.3-0.5l-0.6-0.2v0.1l-0.4,0.8l-1.8,1.5l-0.2,0.1l0,0l-0.8,0.2l-1.5-0.1l-0.1,0.1l-0.1,0.2v0.9l-0.3,0.2l-0.7,0.2h-2.7l0.1,1.2l-0.1,0.1h-2.1l-0.2,1.5l-0.8,1.5l-0.1,0.4c-0.1,0.5,0.1,0.7,0.5,0.6h0.1l0.7-0.1h0.5l1.1,0.3l1.3,1.5l0.2,0.4l0.2,1.8c0.2,1.3,0.5,2.4,1,3.5l2.8,6.1l1.5,1.4h0.1l0.4-0.1l1.2-1.6c0-0.2,0.2-0.3,0.6-0.3l0.1-0.1l0.1-1.9l0.3-0.3l0.9-0.8l0.5-0.4l0.2-0.1V92l1.7,3.5l0.3,0.6L403,98c-0.1,0.5,0.1,1.1,0.6,1.6l1.5,2l0.9,2.2l0.4,0.4l0.2,0.1l0.1,0.1l0.3-0.3l0.1-0.3c0.3-0.5,0.7-1,1.3-1.3l1-1h0.3l1.4,3.8h0.2l0.6,0.1l0.4-0.1l1.3-0.7v-0.1l2.2-0.2l0.6,0.5l0.5,1.9v0.4c0,0.4,0,0.7,0.5,0.9l1.1,0.8h0.1l0.6,0.8l0.2,2.8c-0.1,0.3,0,0.6,0.4,0.8l4.8,4.3l2.7,3.8l0.1,0.2l0.4-1.4c1.4-0.5,2.6-0.3,3.8,0.8l1.1,1.7l7.9,0.5l1-1v-2.7l-1.8-1.1l-0.4-3l4.3-0.2l3-1.4l0.6-1.9c0.2-0.8,0.6-1.4,1.4-1.7l1.4-0.8v-6l2.3-0.5l1.4,4.2l0.3,0.1l1.6-0.3l0.2-0.1c0.8-0.6,1.2-1.4,1.3-2.6c-0.1-0.7,0.2-1.3,0.9-1.8l2.5-2l-0.5-7l-1.2-4.8l-1.5,0.3l-0.5,0.2l-1,0.1h-3.7l-0.3,0.1l-1.5,2.3l-0.5,0.5c-0.8,0.4-1.6,0.6-2.5,0.6l-0.5-0.2c-0.5-0.2-0.7-0.5-0.8-1.1l-2.7-3.8l-0.2-0.2l-0.4-1c-0.2-0.6-0.5-0.8-1-0.7l-0.7,0.2l-1,0.9c-0.2,0.2-0.2,0.8-0.2,1.6c0,0.8-0.4,1.3-1,1.4h-0.1c-0.4,0.1-0.6-0.1-0.8-0.4v-0.2l-0.3-0.6l-0.6-0.4l-1.6-0.6c-1-0.3-1.9-0.7-2.8-1.3l-3.8-3.2l-1.1-1.7L426.4,81.2z" },
    xinjiang: { id: 100008, name: "新疆", x: 70, y: 120, color: '#bbeeff', path: "M137.4,32.6c-2.3-0.3-4.6-0.1-6.6,1c-0.7,0.4-1.2,0.9-1.7,1.7l-1.9,2.8l-2.1,0.2l-3.6-0.2l-4.2,6v5.7c-0.6,1.5-1.5,2.3-2.8,2.4l-1.3-0.1c-1.1-0.5-2-1.1-2.9-2c-2.8-0.1-5.5-0.8-8-1.8c-1.8-2.5-4-2.7-6.3-0.3c-2.5,2.5-4.2,5.3-5.1,8.8l-0.4,0.5l-1.4,1.3L89,63.7c-1,0.3-1.8,0.1-2.5-0.4L83.7,61l-1.9,1.5h-1.6c-0.5-1-1.4-1.6-2.4-1.9c-3.3-1-6.2-0.6-8.8,1l1.3,3.5c0.2,0.7,0.2,1.3,0.2,1.9c-0.5,2.7-0.5,5.5,0,8.3c0.3,2.3,0,4.5-1.1,6.2l-0.9,0.1l-2.7,3l-1.6-0.1c-0.7,1.3-1.3,2.5-1.6,3.8l-0.1,0.4l-2.4,2.5L59,91.3l-1-0.8c-2.4,0-4.5,0.6-6.7,1.9l-1.8,0.7h-4.1l-1.9-2.4l-1.9,1.8h-1.5c-2,2-4.2,2.8-6.8,2.3l-0.9,0.5c-2.1,0.5-3.7,1.7-4.6,3.8l-0.2,0.1l-2,0.5c-1,0.1-2.2-0.3-3.3-1.1l-0.2-0.1v-0.2l-0.5-4l-4.7,0.2L14.7,93c-1.1,1.1-2.3,1.8-3.8,2l-2.6,0.5c-0.8,0.3-1.5,0.8-2.1,1.5l-2.7,3.5l-3,0.5l0.8,6L0,107.3l0.1,3.5l5.2-0.1l2.8,3v1.1l-2.2,3l-0.1,5.4l-5,4.5c1,0.5,2.2,1.3,3.4,2.4l2.6,2.2c1.3,0.9,2.4,2,3.1,3.3l0.5,0.5l0.2,0.7c-1.4,1.7-1.9,3.8-1.3,6.2v0.2l0.8,0.7l2.6,1.2l0.1,0.7l0.1,0.1l3.3,2.8l1.4,1.8l1.3,1l4.2,0.2l-0.1,3.8c0.1,2,0.4,4,0.9,5.7c0,0.6,0.4,1,0.9,1.5c1.5,1.2,2.2,2.7,2.1,4.4l1.3-0.8h0.1l0.8,0.5l0.9,0.3h0.1l0.3-0.1l0.5-0.9l0.6-2.8l0.3-0.7l2.7-2.3l1.3-1.7H36c0.5,0,1,0,1.3,0.4l0.3,0.2l1.4,1.4l0.4,0.1l0,0l1.6-0.5l1.1-0.9l0.8-0.1l0.5,0.5l0.2,0.4l0.9,1.4l0.4,0.3l1.6,0.5h1.9l0.3,0.3l0.6,0.7l0.2,0.3h1.3l0.4-0.1l0.8-0.8l1-0.6l1.4-0.5h0.1l0,0l0.8,0.1l2.8,1.1l0.4,0.2h4.6l0.5,0.2h0.2l1.2,1l5.3,2.6l1.1,0.3c1.1,0.2,1.9,0,2.8-0.6h0.2h0.1l1.9,0.1l0.4,0.2l2.4,0.3h0.1l0.4-0.3l0.3-0.2l1.3-0.6l2.6-1l1.3-0.3l4-0.1l0.6-0.1l6.9-2.8l1.8-0.2c0.8,0,1.6,0.2,2.2,0.6l0.3,0.4c0,1.1,0.6,2,1.5,2.6h0.3l3.9,0.1l0.3,0.1l1.8,2.1l0.8,0.3l1.8,0.3l3.8,0.1l1.1,0.2l0.5,0.3l1,0.5l0.6,0.1h0.2v0.3l0.3-0.2h0.2h0.5h2.1l0.5,0.2l1.1-0.3l1.4-0.6h1.4l1.4,0.5v0.1l1.4-0.3l1.2-1.1l0.2-0.7V167l-0.5-0.3l-1.3-0.1l-0.4-0.1c-0.3-0.5-0.4-0.9-0.3-1.4v-0.9c-0.1-0.5,0-0.9,0.5-1.1l0.2-0.1l0.9-0.2h1.1l0.4-0.2l1.7-3.1c0.6-0.9,0.7-1.9,0.6-2.9l-0.3-0.6l-0.8-1.1l-1.2-0.4l-2.1-0.1l-0.3-0.4l-0.4-0.9l-0.6-0.8l-0.1-0.2c0-0.8,0.1-1.4,0.3-1.9c0.4-1.1,0.1-1.9-0.6-2.6l-0.8-0.4V147c-0.1-0.4,0.1-0.7,0.5-0.9l0.6-0.5l0.3-0.3c0.5-0.3,1.1-0.6,2-0.7h0.4c0.8,0,1.6,0.2,2.3,0.7l2.3,0.8l0.4,0.1l3.1-0.1l2.8-1.1l0.4-0.3l0.3-0.1l0.9-0.3l1.2,0.2h0.1l2.8,0.2h0.1l2.6-0.3l2.5-1.5l1.2-0.3l2.8-0.5l2.9,0.1l0,0l0.4-0.1l0.2-0.2l0.5-0.4l0.1-0.3h0.1l-0.1-0.1c-0.2-0.3-0.2-0.5,0.1-0.9l0.2-0.2l0.4-0.9v-0.4l-1.4-1.1c-0.2-0.6-0.2-1.1,0-1.6l0.3-1.4c0-1-0.3-2-0.9-2.8l-0.4-0.4l-0.4-0.8l0.2-1.1l0.1-0.4l3.9-2.9l0.7-1.4l0.1-1.2l0.3-0.5l0.4-0.3l4.4-0.2l0.3-0.1l0.3-1.2v-0.2l3.2-0.2l1.3-0.2l6.5-3.2l1.5-1.1l1.5-1.8l0.2-0.4l0.2-2.4c0-0.5,0.1-0.7,0.4-0.8c0.8-0.4,1.4-0.7,2-1h0.1c0.4-0.4,1-0.5,1.6-0.5l-0.3-1.7c-0.4-3-1.4-6-3.1-8.6c-0.2-0.4-0.3-0.7-0.3-1v-3.7c-1.3-0.8-2.7-1.3-4.1-1.5l-1.2-0.4l-2.3-1.6l-5.6-5.9c-1.2-0.8-2.6-1.4-4.3-1.8l0,0v0.2L154.2,81l-0.9-1c-3-0.9-3.9-2.7-2.6-5.5l1-1.4c1.6-1.6,2.7-3.5,3.4-5.6c0.8-3,0.6-6-0.7-8.9c-1.1-2.3-2.3-4.3-3.7-6c-2-2.3-4.3-4.3-6.7-5.8l-1.8-1.3l-3.2-3c-1.7-1.9-2.1-3.9-1.2-6l0.3-0.7C138.7,34.5,138.4,33.4,137.4,32.6z" },
    liaoning: { id: 100061, name: "辽宁", x: 404, y: 128, color: '#FECDAB', path: "M415.9,104.3l-2.1,0.2l-0.1,0.1l-1.3,0.8l-0.3,0.1l-0.7-0.1l-0.2-0.1l-0.2-0.5c-0.5-1-0.9-2-1.2-3.3h-0.4l-1,1c-0.5,0.3-1,0.8-1.2,1.4l-0.1,0.2l-0.3,0.3l0,0c-0.3,0.4-0.4,0.7-0.4,1.3v0.3l-1.2,1.4l-1.2,0.7h-0.8l-0.3-0.1l-1.1-0.5c-0.5,0-0.9,0.2-1.2,0.6l-2.4,2l-0.4,0.3h-0.2l-1.4,0.3h-0.1l-2.7,0.1l-0.2,0.1h-0.1l-1.4,1.8l-0.4,0.4l-1.4,1.8l-0.5,0.9l-0.8,0.5h-0.3l-1.9,0.2l-0.3,0.3l-1.2,1.8l-1.5,1.8l-1.3,0.7H381h-0.1l-0.4-0.4l-0.2-0.1c-1.2-0.6-1.9-1.5-2.4-2.5l-0.1-0.3l-0.3-0.3c-0.1-0.7-0.5-0.9-1-0.7h-0.1l0,0l-0.1,0.5c0.1,0.6,0,1.1-0.2,1.4l-0.5-0.8l-0.3-0.1h-0.1v0.1l-1,0.7l-0.6,1.4l-0.2,1.1v1c-0.1,1,0.1,1.7,0.8,2.4l0.4,0.4v0.2l-0.4,0.9l0.1,2.1l-0.6,1c-0.5,0.6-0.7,1.4-0.6,2.4l0.2,1.2c0.2,0.8,0.6,1,1.3,1.1l2.3,0.5l2.7,0.1l-0.2,0.6l-0.2,1l0.1,0.2l0.7,1.6l1.1,1.3l0.3-0.5l2.5-3c3-2.6,6.2-2.8,9.2-0.3l-0.3,8.3l-2.7,2.3l1,6.7l-3,0.6l0.7,2.4l1.3,0.1c2-0.6,3.5-1.5,4.4-2.7l0.6-0.9c1-1.9,2.3-3.3,4-4.1c1.6-0.9,3.5-1.7,5.5-2.3c1.9-0.6,3.2-1.4,4-2.1c0.7-0.8,2.3-1.5,4.5-2l-0.2-0.5l0.5,0.3c0.9-3.9,2.7-6.6,5.6-7.8c2.4-1,4-2.7,4.9-4.9l0.8-1.5l2-2.6l0.4-1.4l0.3-1.1v-0.6v-0.1l-2.8-3.9l-4.7-4.2c-0.4-0.3-0.5-0.6-0.5-0.8l-0.1-2.9l-0.5-0.8h-0.2l-1.2-0.8c-0.3-0.2-0.5-0.5-0.4-0.9v-0.3l-0.6-2L415.9,104.3z" },
    beijing: { id: 1, name: "北京", x: 350, y: 142, color: '#BBEECC', path: "M354.3,132.3h-0.4h-0.1l-0.6,0.7l-0.2,0.6l-0.5,0.5h-0.4l-0.2-0.1l-0.7-1l-0.6-0.4l0,0l-1.3-0.3h-0.1l-0.7,0.3l-0.1,0.2c0,0.8-0.1,1.5-0.5,2.2l-0.1,0.6l-0.4,0.5c-0.5,0.7-1.3,1-2.1,1h-0.2l-1.5,1l-0.5,0.9v0.6c-0.2,0.7-0.3,1.5-0.2,2.4l-0.1,0.6c-0.2,0.7,0,1.4,0.5,1.8l1.1,0.9l0.6,2.4c-0.1,0.4,0.1,0.5,0.4,0.5h0.5l0.2-0.1l0.5-0.4h0.2l1.1,0.3l0.4,0.8l0.2,0.4l0.3,0.3l0.8,0.1l1.5-0.2l1.2-0.4l0.1-0.2l0.3-0.3l0.3-0.2l2.2-0.1l0.6-2.6c0.2-1.4,0.6-2.4,1.3-3v-0.1v-0.4v-0.3l0.8-1.7c0-0.5-0.1-1-0.6-1.3l-0.4-0.1c-0.2-0.2-0.3-0.4-0.3-0.6l0.2-0.3l0.6-0.6c0.4-0.2,0.4-0.5,0.4-1v-0.4l-0.3-0.2l-0.1-0.2l-0.1-0.1l-1.3-1l-0.2-0.1l-0.5-0.8c-0.1-0.4-0.2-0.6-0.5-0.7L354.3,132.3z" },
    neimenggu: { id: 100062, name: "内蒙古", x: 278, y: 140, color: '#CCEEFF', path: "M380.8,18.5c1-0.7,1.2-1.2,0.6-1.5l-1.3-1.2c-0.7-0.5-1-1.1-1-1.8c-1.7,0.5-2.8,1.6-3.4,3.4l-0.1-1.1L374,14l-0.7-1.6V12l0.6-0.4l0.5-0.6l0.2-0.3l-0.2-2l-3.8-0.8L370.4,8v0.1c-0.1,4.5-1.3,8.5-3.7,12.2l-0.4,0.5c-0.9,1.2-1.4,2.7-1.3,4.4c0,1-0.4,1.8-1.1,2.3c-1.5,1.1-2.3,2.6-2.4,4.6l-0.4,0.9c-0.8,0.5-1.2,1.3-1.1,2.2l1.8,1.9l0.1,2.3c-2,1.5-4.1,2.5-6.3,2.9c-1.5,0.2-2.8,0.8-3.9,2c-1.3,1.4-2.8,1.8-4.6,1.3l-2-1.2l-2.5-0.3c-1.5,2.5-2.8,5.2-3.9,8.2l-0.3,0.7c-0.8,1.6-1,3.5-0.5,5.6c-1.3,0.7-1.8,2-1.5,4l-0.1,0.7c-0.7,1.7-0.2,3.2,1.6,4.2l1.3-0.5l1.4-1.7l9.8-0.4l1.3-0.6l1.7-1.5c3.7-1.3,6.7,0,8.8,3.5l0.2,0.4l1.5,1.2l1.5,0.3c1.4,0.8,2.4,2.1,2.9,3.7V72c0.5,1.3,0.4,2.5-0.1,3.7c-2.2,1.6-4.3,1.3-6.3-0.8l-0.5-0.4c-2.1,0.3-4.3,1-6.1,2l-2.7-0.7l-2.8,3.2l-2.6,1.1c-1.2-0.1-2.1,0.2-2.9,1c-1.2,1.2-1.9,2.7-2.3,4.2l-0.1,0.5h-1c-1.8,2.3-4.1,3.5-6.8,3.7c-2.8,0-5.1,1.3-7,3.5l-1.1,1.3l-3.7,3.2c-3.6,0.7-6.9-0.2-9.7-2.4l-0.8-0.2l-1.2,0.1c-3.8,2.6-5,6.1-3.4,10.6l0.4,0.5l1.3,1.5l0.2,2l-11.8,9.9c-2.6,1.6-5.6,2.2-8.9,2l0,0l-4.7,0.4c-2.6-0.1-5.1-0.4-7.6-1.2l-2.2,0.3c-3.2,1.6-6.5,2.9-10,4l-8.8,3.6c-1.1,0.3-2,0.1-2.7-0.5l-0.1-1.1l-4.4,0.2c-0.7,0.1-1.3-0.1-1.8-0.5c-1.6-1.3-3.4-2.1-5.4-2.4c-1.2-0.2-2.3-0.7-3.2-1.3c-1.2-0.9-2.6-1.4-4.2-1.3c-1.5-1.7-3.2-2.9-5.4-3.5c-0.8-0.3-1.5-0.9-1.7-1.7l-0.4-0.5l-1.5-0.2l-9-0.2l-0.7-0.7l-5.7,0.1c-0.7-0.2-1.2-0.6-1.6-1.2l-8.4-1.5l-5.7-0.4l0.9,1.9l-1,1.5l0.4,0.7l0.7,0.5l0.5,0.5c0.4,0.3,0.4,0.8,0.1,1.2l-1,2.1l-0.1,0.3l0.1,1.7l-0.3,0.5c-0.3,0.3-0.6,0.6-0.4,1v0.5c-0.2,0.5-0.2,0.9,0.1,1.3l2.1,2.5c1.3,1,2.4,2.4,3.1,4.1l0.2,0.6l1.2,1.2l0.8,0.2l3-0.4l2,0.1l0.2,0.1l0.3,0.3h0.2l0.8-1.1h0.1l2.7-0.1c0.3,0,0.3,0.1,0.4,0.4v0.3l0.7,0.8l0.6,0.2l1.2-0.2h0.3l0.6-0.3l1.9-0.4l0.7,0.1v0.2c0.3,0.9,0,1.7-0.6,2.3l-0.9,1.7v0.5l0.2,1.8l1.4,2.6l0.2,1l0.3,0.4c0.2,0.3,0.5,0.6,0.9,0.5h0.2l0.1-0.1c1-0.2,1.7,0.2,2.1,1.1l2.9,4.3l4,3.8l0.2,0.7l0.5,0.4h2.1l0.4-0.2l0.5-0.5l0.5-0.4l6.3-0.2l1.2-0.8l1-1.1l1-0.8l0.4-0.1h0.7l4,1.1l0.8,0.1c1.3,0.1,1.9,0.8,1.8,2l-0.1,1.8l-0.3,0.5l-1.8,0.8c-0.6,0.2-1,0.7-1.1,1.3l-0.1,0.6l-0.6,1.2l-0.9,0.6l-0.7,0.4l-0.5,0.2l-0.3,0.5l0.1,0.6l0.2,0.5l0.4,0.8l0.5,2.9l0.1,0.3l0.8,0.8l0.4,0.2l5.5,0.2h0.2l0.6,1.1l0.2-0.1l0.2-1.3l0.3-0.4l4.1-0.2c1.1,0,2.2-0.3,3.4-0.8l0.4-0.4l0.4-1.8l-0.1-0.3c-0.3-0.5-0.4-1-0.3-1.4v-1c-0.1-0.4,0-0.9,0.4-1.3l0.5-0.6l1.4-1.9c0.3-0.9,0.5-1.6,0.3-2.5c0-0.6,0-1.3,0.3-1.7l0.4-0.6c0.2-0.6,0.6-0.9,1.3-1h0.6h0.5c0.8-0.1,1.5,0.2,2.2,0.7h0.1l2.1,1.7l0.4,0.4c0.4,0.5,0.7,1,0.8,1.5v2.5l0.2,1.5l0.2,0.2l1.7,0.8l0.2,0.3l0.3,2.3l2,3.1l0.7,0.5l0.3,0.1l0.4-0.4c-0.1-0.3,0-0.4,0.3-0.5l2.7,0.1l0.3,0.1l2.2,1.9l0.6,0.3l0.6,0.1l0.8-0.1l0.7-0.4l2.1-1.1l1-0.8l0.3-0.1l0.1-0.4l0.1-2.4v-0.4c0.3-0.8,0.7-1.4,1.3-1.8l0.4-0.3l0.5-0.7l2.8-5.4l1.4-1.7l0.4-0.3l0.9-0.5c0.3-0.2,0.4-0.5,0.3-0.9l0.3-0.5l2.7-0.1l1.3-0.5c0.4-0.1,0.6-0.4,0.5-0.8v-0.6l0.2-0.1c0.1,0.2,0.3,0.4,0.8,0.4l1.7-0.3l0.2-0.1h0.1l0.5,0.1l0.2,0.3l1,0.6l2.1,0.1l0.8-0.5c0.4-0.2,0.4-0.5,0.4-1c-0.2-0.6,0-1.1,0.5-1.3l0,0l0.1-0.1h0.1l0.7-0.3l1.1-0.3l2.5-1.1l1.2-1l0.8-1.7l0.9-1l0.2-0.2l4.1-0.1l0.7-0.2l1.9-1.7l0.2-0.1l1.7-0.1l0.8-0.3l0.7-0.6l1.5-1l0.4-0.2l0.2-0.2l0.4-0.2h0.3l0.6-0.3l0.2-0.2l0.7-2.2l-1.9-4.2l-0.3-0.5c-0.2-0.4-0.1-0.8,0.1-1l1.8-2.5l0.3-0.5l0.7-2.7V123l0.4-0.7l0.7-1l0.4-0.3l0.5-0.4l1.1-0.1c0.6-0.2,0.9,0.1,0.9,0.6l0.2,0.2l1.8,2.3l0.8,0.5h0.2l2.3-1.3l0,0l0.1-0.1h0.1l1.9-1h5.4l0.9-0.5l0.3-0.4l2.8-2.2l0.5-1.1v-1.2l0.2-0.3l3.2-0.7l0.7-0.3l1.7-0.1l0.2,0.1l4.2,3l0.3,0.3c0.3,0.7,0.4,1.4,0.3,2.3l0.8,1.9l1.9,3.1l0.2,0.6c0.2,0.5,0.5,0.9,1.1,1l1.1-0.2h0.2l0.9,0.8h0.5h0.1l0.3-0.2l2.3-0.4v-1.3c0-0.4,0.2-0.7,0.5-0.9v-0.2l-0.5-0.5c-0.7-0.5-1-1.3-0.7-2.2v-1l0.2-1.2l0.5-1.4l1-0.7l0,0l0.2-0.1l0.2,0.1l0.4,0.8c0.3-0.3,0.4-0.8,0.3-1.5l0.1-0.3v-0.1h0.1c0.5-0.1,0.9,0.1,1,0.6l0.3,0.4l0.2,0.4c0.4,1,1.2,1.8,2.2,2.5h0.3l0.4,0.4l0.1,0.1h1.2l1.3-0.8l1.5-1.7l1.2-1.9l0.3-0.2l1.8-0.2h0.4l0.7-0.6l0.5-0.9c0.3-0.7,0.8-1.3,1.4-1.8l0.4-0.4l1.5-1.8h0.2l2.8-0.2l0,0l1.3-0.3h0.2l0.5-0.3l2.4-1.9c0.3-0.5,0.6-0.6,1.2-0.6l1.4,0.5h0.8c0.5,0,0.9-0.2,1.2-0.7l1.3-1.4v-0.3c-0.1-0.6,0-1,0.2-1.3h0.2h-0.2l-0.1-0.2l-0.5-0.3l-0.8-2.2l-1.6-2.1c-0.5-0.4-0.7-1-0.5-1.5l-0.3-2l-0.3-0.6c-0.4-0.6-0.7-1.3-0.9-1.8l-0.8-1.7l-0.2,0.1l-0.4,0.3l-1,0.8l-0.3,0.4v1.8l-0.2,0.2c-0.4,0-0.6,0.1-0.6,0.3l-1.2,1.5l-0.4,0.1h-0.1l-1.5-1.4l-2.8-6c-0.5-1.2-0.8-2.3-0.9-3.5l-0.3-1.9l-0.1-0.3l-1.4-1.5l-1.1-0.3h-0.5h-0.7l0,0c-0.5,0.1-0.7,0-0.6-0.6l0.1-0.4l0.8-1.5l0.3-1.4h2l0.1-0.2l-0.1-1.2h2.7l0.7-0.1l0.3-0.3V76l0.1-0.3l0.1-0.1l1.5,0.1l0.8-0.2h0.1h0.1l1.9-1.6l0.3-0.8V73l0.6,0.3v-4.9l-0.3-0.9l-0.3-0.5l-5.3-0.4l0.4-2.8l-0.4-0.7c-0.2-0.1-0.4-0.3-0.3-1l0.1-0.3l0.3-0.8l0.2-0.2l1.3-1l0.7-0.3l1.2-1.3l0.7-1.6l0.8-2.8l0.4-0.8l0.2-0.2v0.4l1.5-0.9l1.4-0.3l0.3-2.4c0-0.3,0.1-0.6,0.3-0.9l0.4-0.4c0.8-0.8,1.1-1.7,1.1-2.7l0.4-3.2V42h0.1l0.1-0.6v-0.1l2.2-5l0.1-0.5l0.1-3.8l-0.1-0.7l0.1-0.3v-1.3c0-1.7-1-2.9-2.9-3.5l-0.9-0.7c-0.6-0.8-1.4-1.1-2.5-0.9c-0.9-0.1-1.4,0-1.9,0.5l-0.1,0.2c-0.9,1-1.4,2-1.6,3l-0.2,0.8l-1.1,0.4l-0.5,0.2l-3.6-0.2h-0.5l-1.9,0.3l-1.2,0.7l-3.7,3l-1.1-0.1l-1.3-1l-0.8-1.6l-1.4-3.3l-0.3-0.6l-0.4-0.9l-0.1-1.1c0.1-0.9,0.3-1.5,0.7-2l0.5-1.6l-0.1-0.5c-0.1-0.5,0-0.7,0.2-0.9l0.4-0.8L380.8,19.5z" },
    gansu: { id: 100060, name: "甘肃", x: 183, y: 138, color: '#BBEECC', path: "M227.4,155l-0.2-0.8l-4.1-3.7l-2.9-4.4c-0.4-0.9-1.1-1.3-2-1.1l-0.2,0.1h-0.2c-0.4,0-0.7-0.1-0.9-0.5l-0.2-0.5l-0.3-0.9l-1.3-2.6l-0.3-1.8l0.1-0.5l0.8-1.7c0.7-0.6,0.9-1.4,0.7-2.3l-0.1-0.2l-0.7-0.1l-1.9,0.4l-0.6,0.3l-0.2,0.1l-1.3,0.1l-0.6-0.2l-0.7-0.7v-0.4c0-0.3-0.1-0.5-0.3-0.5l-2.7,0.2h-0.2l-0.8,1.2l-0.1-0.1l-0.3-0.3l-0.3-0.1h-1.9l-3.1,0.3l-0.8-0.2l-1.1-1.2l-0.3-0.5c-0.7-1.8-1.7-3.2-3.1-4.3l-2.1-2.4c-0.2-0.4-0.3-0.7-0.1-1.2v-0.6l0.7-1.4l-0.1-1.8l0.1-0.2l1.1-2.2c0.2-0.5,0.2-0.8-0.1-1.2l-0.5-0.6l-0.8-0.4l-0.3-0.6l0.9-1.5l-0.8-2l-3.5,0.1l-0.9-1.6l-1.6-0.4v-0.6l-1.6,0.5h-0.1l-2,1c-0.3,0.1-0.4,0.4-0.4,0.8l-0.2,2.5l-0.2,0.4l-1.5,1.8l-1.5,1l-6.5,3.2l-1.3,0.2l-3.2,0.2v0.2l-0.4,1.3h-0.2l-4.5,0.2l-0.4,0.3l-0.2,0.5l-0.1,1.2l-0.7,1.5l-4,2.8l-0.1,0.4v1.1l0.4,0.8l0.2,0.4c0.6,0.8,1,1.8,1,2.8l-0.4,1.4c-0.1,0.5-0.1,1,0,1.6l1.4,1.1v0.5l-0.4,0.8l-0.2,0.3v0.8v0.1l0,0l-0.1,0.3l1.4,0.6l0.4,0.7l0.4,0.3l2.5,0.5c2-0.1,3.7,0.5,5.2,1.6l0.6,0.6c0.3,0.2,0.3,0.6,0.3,1l-0.2,0.2l1,0.2l1.6,0.1l0.5,0.3l1.7,1.5l1.7,0.6l2.3,0.6c0.3-0.1,0.6,0.2,0.7,0.5l0.4,0.4l0.8,0.3h1h0.2l0.5-0.4l1-0.9l0.1-0.2l0.1-0.4c-0.1-0.5,0-0.9,0.4-1.1l0.2-0.1l0.4-0.1l2.7,0.3h0.2l0.8,0.5l0.4,0.4l0.5,0.2h0.4l0.6-0.2l0.6-0.4l0.2-0.3l0.4-0.2l0.5-0.1c0.8-0.2,1.7,0,2.2,0.5l1.5,0.2h1l0.9-0.1l0.5-0.3l0.5-0.3v-0.1h0.4l0.3,0.4c0.9,1,1.9,2,3.2,2.8l0.8,0.4l1.8,0.4l3.3,0.1l0.8,0.1l2.4,0.9l0.5,0.2l0.6,0.8l0.6,1.5l0.3,0.3c0.7,0.7,1.7,1.2,2.7,1.6l0.2,0.2v0.4c0,0.6,0.1,1.1,0.4,1.6l1.1,0.5l1,0.7l1,1.7l0.6,1.2l1.1,1.7l0.5,0.4c0.3,0.5,0.8,0.7,1.4,0.6h2.4l0.3,0.2l2.4,2.2l2.4,1.5c0.3,0.2,0.5,0.4,0.4,0.8v1l0.2,0.7l0.5,0.7l1,1l0.3,0.6l-0.1,0.9l0.2,2l0.1,0.1l0.9,0.8l0.2,0.4l0.2,0.3l0.1,3.1l0.1,0.4c0.8,0.7,1,1.4,1,2.2l-0.2,0.5l-2.4,1.9c-0.3,0.4-0.4,0.8-0.4,1.4v1.5l-0.3,0.9l-4.7,3.7h-0.1h-0.3l-0.6,0.1l-0.6,0.5l-0.8,1.6l-0.6,1.8l-0.4,0.4l-0.9,0.5l-1.7,0.4l-2.9,0.1h-0.1l-0.2,0.2l-0.8,1.6l-1.1,0.7l-0.2,0.2c-0.2,0.3,0,0.5,0.4,0.7l1.3,1l2.9,1.6l2.6,0.5h0.5l0.1-0.2v-0.1l0.4-0.2l0.6-0.6l0.5-0.5l0.3-0.2h0.5c0.5,0.4,1,0.6,1.6,0.5h0.2l0.6-0.3l0.4-0.5l2.9-2.1l0.3-0.2c0.3,0,0.7,0.1,1,0.4l0.8,0.9v0.2l1.6,2.4l1.6,1.7l0.3,0.2l2.1,0.2c0.9-0.1,1.7,0.1,2.1,0.8l3,2.8v0.1l0.1,1.4l0.2,0.7l1.2,1.5c0.3,0.6,0.6,1.2,0.6,2v0.4l0.2,0.9c0,0.6,0.2,1.1,0.7,1.5c0.3,0.3,0.7,0.5,1.1,0.7h0.5c0.5-0.2,1-0.4,1.4-0.7l0.8-0.6l0.3-0.2l0.9-0.3l1.3-0.4h2l0.7-0.2l0.2-0.5l0.1-0.8h0.3l0.2-0.2l0.2-0.1l0.3-0.3l0.2-0.5l0.1-1.6c-0.1-0.5,0.1-1.3,0.2-2.1l3-0.4l2.1-2.3l0.1-0.3c-0.1-1.4,0-2.9,0.3-4.3l0.2-0.6l0.3-4c0-0.9,0-1.7,0.2-2.5l0.1-0.5l0.4-0.3l1.3-0.8c0.2-0.3,0.5-0.4,0.8-0.4h1.9l1.2,0.4l0.6,0.3l1.1,0.3h0.1l0.7-0.1l1.3-0.5l0.4-0.3l0.6-0.9c0-0.4,0.3-0.8,0.7-1.2l0.3-0.3l2.9-0.2l0.4-0.1l0.2-0.4c-0.2-0.6-0.1-1.1,0.1-1.6l0.3-0.5c0.6-0.4,1.3-0.7,2.1-0.7h0.8l0.4-0.2l0.2-0.2l0.2-0.6l-0.3-1.1l-0.2-0.3v-0.3l-0.3-0.5l-0.3-0.8c-0.1-0.6,0-1,0.3-1.4l1.6-1.2c0.9-0.6,1.1-1.3,0.9-2.5l-0.5-1.1h-0.1h-0.2l-2.2-0.6l-2.5-1.2l-0.2-0.2l-2.2-0.5l-0.4,0.1l-0.4,0.1l-2.6,0.5h-0.1l-0.6-0.2l-4.5-2.5h-1h-0.3c-0.3,0.1-0.4,0.5-0.3,1l-0.2,2.1c-0.2,1.1-0.2,2.3-0.1,3.5v0.4l0.3,0.7l0.3,0.3c0.6,0.6,0.9,1.3,0.8,2.1l-0.1,0.6l-0.4,0.8l-0.2,0.4l-1.6,1.3l-1.1,0.5c-0.4,0.2-0.6,0.6-0.8,1.2l0.4,2.2l-0.2,0.4l-1.5,1h-0.1h-1c-0.9-0.2-1.8-0.6-2.5-1.3l-2.7-2.8l-0.3-0.1l-1.7-0.7l-0.3-0.2l-0.4-0.5v-0.2l-0.1-0.3l-0.1-1.8l0.1-0.4l1.1-1.6l0.2-2.2l-0.5-1.5l-5.3-6.8l-0.1-0.4c-0.4-1.1-0.6-2.4-0.7-3.8v-0.2l0.7-0.4l0.3-0.3l-0.7-1h-0.1l-5.6-0.2l-0.3-0.1l-0.8-0.8l-0.2-0.4l-0.5-2.9l-0.3-0.7l-0.2-0.5l-0.2-0.7l0.3-0.5l0.5-0.2l0.7-0.3l0.9-0.7l0.6-1.2l0.2-0.5c0-0.8,0.4-1.2,1-1.4l1.9-0.8l0.2-0.6l0.2-1.7c0-1.2-0.6-1.8-1.9-1.9l-0.7-0.2l-4-1.1h-0.8l-0.4,0.1l-1,0.8l-0.9,1.1l-1.3,0.8l-6.3,0.3l-0.5,0.3l-0.4,0.5l-0.4,0.3l-2.2-0.1C227.6,155.2,227.4,155.1,227.4,155z" },
    tianjin: { id: 154, name: "天津", x: 370, y: 156, color: '#FECDAB', path: "M364.2,145.2l-0.8-0.7l-1-2.4l-0.3-0.3H362l-1.4-0.2h-0.2l-0.6,0.1l-1.9,0.6l-0.8,0.3l0,0c-0.7,0.6-1.2,1.6-1.4,3l-0.6,2.6c0.4,0.1,0.5,0.4,0.5,0.9l-0.2,0.6l-0.1,4.6l0.8,2.8h1.7c0.3-1.1,0.8-2,1.7-2.9h9.1l1.3-0.9l0.9-1.1c-0.2-1-0.2-2,0-2.9l-0.2-0.1l-3-0.3l-0.2-0.1l-0.1-0.6c0.1-0.6-0.2-1.1-0.7-1.5L364.2,145.2z" },
    hebei: { id: 100059, name: "河北", x: 344, y: 170, color: '#BBEECC', path: "M359.6,114.9L358,115l-0.7,0.3l-3.2,0.8l-0.2,0.2v1.2l-0.6,1.1l-2.7,2.2l-0.4,0.4l-0.9,0.6H344l-1.9,0.9H342l-0.1,0.1l0,0l-2.4,1.3h-0.1l-0.8-0.5l-1.8-2.3l-0.2-0.2c0-0.5-0.3-0.8-0.9-0.6l-1.1,0.1L334,121l-0.3,0.3l-0.8,1l-0.3,0.7l-0.1,0.4l-0.6,2.7l-0.3,0.5l-1.8,2.5c-0.2,0.2-0.4,0.6-0.2,1l0.4,0.5l1.8,4.2l-0.7,2.2v0.6l1.8,2.5c0.5,0.5,0.7,1.2,0.6,2.1l-0.7,1.1l-0.3,0.3c-0.2,0.1-0.2,0.4,0,0.7l2.6,3.6l0.3,0.7l0.1,0.8l-0.1,2.7l-0.4,0.5l-0.8,0.4l-2.8,0.2l-0.1,0.1l-0.5,4.9c-0.1,0.9,0.1,1.9,0.3,2.8l0.3,2.5c0,1,0,1.9,0.4,2.7l0.2,0.4l1.1,1.3c0.6,0.6,0.6,1.1,0.2,1.7l-0.8,1.1v0.3l-0.1,0.5l-0.5,1.4c-0.4,0.3-0.7,0.8-0.8,1.3v0.3l-0.5,0.5l-0.2,1.4l-1,0.8c-0.5,0-0.8,0.3-1,0.6l-0.1,0.4c-0.3,0.9-0.3,1.5,0.1,2.3l2.7,4h0.3h0.3l1.2-0.2l0,0l0.5-0.1l5.7,0.7l0.4-0.2l1.3-0.5l4.8-1v-0.1h0.2h0.1l0.1-2.4l0.2-0.7l0.4-0.6l0.5-0.4l3.2-5.8l0.9-2.6c0.1-1,0.5-1.8,1.3-2.5l0.3-0.2l0.7-0.3l1.6-1.3c0.5-0.4,1.3-0.9,2.2-1.3l0.3-0.3l1.3-0.4l0.1-0.1h0.9v-0.4l-2.3-2.3c-0.5-1.6-0.4-3,0.2-4.4H356l-0.9-2.9v-0.3c0-1.4,0-2.9,0.3-4.3V149c0.1-0.5,0-0.8-0.3-0.9l-2.2,0.1l-0.3,0.2l-0.3,0.4l-0.2,0.2l-1.1,0.3l-1.6,0.2l-0.8-0.1l-0.2-0.3l-0.3-0.3l-0.3-0.9l-1.2-0.2h-0.1l-0.6,0.3l-0.3,0.1h-0.4c-0.3,0-0.4-0.1-0.3-0.5l-0.7-2.3l-1.1-1c-0.5-0.5-0.6-1-0.5-1.7l0.1-0.6c-0.1-1,0-1.8,0.2-2.4l0.1-0.7l0.4-0.8l1.5-1.1h0.2c0.9,0.1,1.6-0.3,2.2-0.9l0.3-0.6l0.2-0.5c0.3-0.7,0.5-1.4,0.4-2.2l0.2-0.2l0.7-0.4l0,0l1.3,0.4l0,0l0.7,0.2l0.6,1.1l0.2,0.1h0.5l0.5-0.5l0.2-0.6l0.5-0.7h0.2h0.3l0.5,0.4c0.3,0.1,0.5,0.3,0.5,0.7l0.5,0.8l0.3,0.2l1.2,0.9l0.1,0.1l0.2,0.2l0.2,0.2v0.4c0,0.5,0,0.9-0.3,1l-0.7,0.6l-0.1,0.3c-0.1,0.2,0.1,0.5,0.3,0.6l0.3,0.1c0.5,0.4,0.7,0.9,0.7,1.3l-0.8,1.8l-0.1,0.3v0.4h0.1l0.9-0.3l1.7-0.6l0.7-0.1h0.1l1.5,0.2l0,0l0.5,0.3l0.9,2.3l0.8,0.8l2.5,1.5c0.5,0.4,0.7,0.9,0.6,1.5l0.1,0.6l0.2,0.1l2.9,0.3l0.2,0.1h0.2l0.4-1.1l1-0.9c3-1.4,5.7-3.1,8.2-5l0.7-3.2l-1.2-1.3l-0.8-1.6v-0.2c0-0.4,0-0.8,0.2-0.9l0.1-0.7h-2.6l-2.3-0.6c-0.7,0-1.1-0.3-1.3-1.1l-0.3-1.3c0-0.9,0.2-1.7,0.7-2.2l0.6-1l-0.1-0.9l-2.4,0.4l-0.3,0.2l0,0h-0.5l-1-0.8h-0.1l-1.1,0.2c-0.6-0.1-1-0.5-1.1-1l-0.2-0.6l-1.9-3.1l-0.9-1.9c0.1-0.9,0-1.6-0.2-2.3l-0.3-0.3l-4.2-3L359.6,114.9z" },
    shanxi: { id: 100056, name: "山西", x: 316, y: 180, color: '#FFEEBB', path: "M331.3,137.1l-0.2,0.1l-0.7,0.4h-0.1l-0.5,0.2l-0.2,0.2l-0.5,0.1l-1.5,1l-0.7,0.7l-0.7,0.3l-1.8,0.1l-0.1,0.1l-1.9,1.7l-0.6,0.1l-4.2,0.1l-0.2,0.3l-1,1l-0.8,1.6l-1.2,1.1c-1.3,0.6-2.1,1-2.5,1.1l-1,0.3l-0.7,0.3h-0.1L310,148h-0.1c-0.4,0.1-0.6,0.6-0.4,1.3c0.1,0.4-0.1,0.8-0.4,1l-0.8,0.5l-1,0.8c-0.4,0.3-0.7,0.7-0.6,1.1l0.1,3.1l-0.5,1.3l-0.4,0.2l-3.5,4.2l-0.2,0.5c-0.1,0.8,0.1,1.6,0.5,2.4l1.1,2.8c0.3,1.9,0.4,3.9,0.1,5.6l-0.5,12.9l-0.3,0.9l-1.5,2.7c-0.4,0.6-0.7,1.3-0.7,2.2l-1.2,5.6l-0.1,0.5l-0.4,0.5l-0.3,0.1l-0.2,0.6l0.4,1.5l2,1.7l0.5,0.1h0.3l0.2-0.1l0.6-0.4l0.2-0.3l1.3-0.4l5.7-0.3l0.9-0.3l0.4-0.2l1.3-0.5h0.1l2.3-0.9l2-1.4l1.1-0.3l0.3-0.3l0.6-0.2c0.3-0.4,0.7-0.6,1.2-0.7h0.1h0.2l0.5-0.2v-0.1l2-0.4l0.5-0.1l2,0.2l0.9-0.2l0.4-0.4l2.5-3.8l0.8-1.8l0.1-0.4c-0.1-0.5,0-0.9,0.3-1l0.2-0.8l1-1.2l0.2-0.6v-0.4h-0.4l-0.1-0.1l-2.7-3.9c-0.5-0.8-0.5-1.5-0.2-2.3l0.2-0.4c0.2-0.3,0.5-0.6,1-0.7l1-0.7l0.2-1.4l0.3-0.6l0.2-0.3c0.1-0.5,0.3-0.9,0.7-1.2l0.6-1.4v-0.5v-0.3l0.8-1.2c0.4-0.5,0.4-1-0.2-1.6l-1.1-1.3l-0.2-0.4c-0.3-0.8-0.5-1.7-0.3-2.7l-0.3-2.5c-0.4-1-0.5-1.9-0.4-2.8l0.5-4.9l0.2-0.2l2.7-0.2l0.8-0.4l0.5-0.5v-2.6l-0.1-0.9l-0.4-0.6l-2.5-3.6c-0.2-0.3-0.2-0.6,0-0.8l0.3-0.2l0.7-1.2c0.2-0.8,0-1.5-0.5-2.1l-1.8-2.4V137.1z" },
    ningxia: { id: 100063, name: "宁夏", x: 260, y: 180, color: '#F5DCCC', path: "M264.2,152.3c-0.6,0-1.1,0.4-1.3,0.9l-0.4,0.6c-0.3,0.5-0.4,1.1-0.3,1.8c0.2,0.8,0,1.5-0.3,2.4l-1.4,2l-0.6,0.6c-0.3,0.3-0.4,0.7-0.3,1.2v1c0,0.5,0,0.9,0.3,1.4l0.1,0.4l-0.4,1.7l-0.4,0.4c-1.2,0.5-2.3,0.8-3.4,0.9l-4.1,0.2l-0.3,0.3l-0.3,1.3v0.1l-0.3,0.2l-0.7,0.4v0.2l0.7,3.8l0.1,0.5l5.2,6.7l0.6,1.5l-0.3,2.3l-1,1.5l-0.2,0.5l0.2,1.7v0.3l0.2,0.2l0.2,0.5l0.3,0.3c0.5,0.3,1,0.5,1.8,0.6l0.2,0.1l2.8,2.9c0.7,0.6,1.5,1,2.4,1.1l1.1,0.2l0.2-0.2l1.3-0.8l0.2-0.4l-0.3-2.3c0.1-0.6,0.3-1,0.8-1.2l1-0.4l1.7-1.5l0.2-0.4l0.4-0.7l0.1-0.5c0.1-0.9-0.2-1.6-0.8-2.1l-0.3-0.4l-0.3-0.6V183c-0.2-1.2-0.2-2.4,0-3.4l0.2-2.1c0-0.6,0-0.9,0.3-1l0.4-0.1h1l-0.2-1.9c0.1-3.4,1.5-6.4,4-8.8l0,0v-0.1l-0.9-1.5l-0.2-2.3l-0.2-0.2l-1.7-0.9l-0.2-0.1l-0.2-1.6v-2.4c-0.1-0.6-0.3-1.1-0.8-1.5l-0.4-0.4l-2.1-1.7l-0.1-0.1c-0.7-0.4-1.4-0.8-2.2-0.7l-0.5,0.1H264.2z" },
    shandong: { id: 100039, name: "山东", x: 368, y: 186, color: '#FFEEBB', path: "M381.6,169.8l-5.3,5.7l-2.4,0.1c-1.8-0.3-3-1.4-4-3.4l0.8-6.1c-2-0.8-4.1-0.6-6.3,0.5l-1.6,0.5l-3-0.5l-0.1-2.2h-0.9l-1.4,0.4l-4.1,2.8l-0.7,0.5l-0.3,0.2c-0.8,0.7-1.3,1.5-1.4,2.4l-0.8,2.6l-3.2,5.8l-0.5,0.4l-0.5,0.6l-0.1,0.7l-0.2,2.4l1.7,0.2l0.1,0.2l0.5,0.2l0.1,0.1l0.8,0.2v0.9l2.3,2.1v0.2l-1.2,0.3h-0.3l-0.4,0.1l-0.6,0.1l-0.5,0.4l-0.2,0.1l-0.4,0.2l-0.1,0.1l-0.5,0.2h-0.1l-1.4,0.3h-0.3l-0.1,0.4l-0.4,3.1l-1.1,1.5l-0.1,0.2c-0.1,0.4,0,0.7,0.3,0.8l0.6,0.5l0.6,1.2l0.2,1.5c0.2,0.5,0.5,0.8,1,1h0.3l2.4,0.2l0.1,0.1l1.2,1.7l0.6,0.2l3.4-1.7h0.2l1.1,0.2l0.2,0.1l0.2-0.1l0,0l0.1-0.7l0.3-0.7l-0.2-1.8c0.1-0.5,0.3-0.9,0.7-1.2l0.2-0.2l0.2-0.2l0.3-0.1l0,0l0.6,0.5c0.4,1,1.2,1.4,2.2,1.3l1.2,0.3l1.5,1.3h0.2l1.1,0.1l4.4-0.6l2,0.2l0.8,1c0,0.3,0.2,0.4,0.7,0.4l1.8-0.1l0.2-0.2c0.1-0.2,0.3-0.2,0.5-0.2l0.5-0.4l0.1-0.4c0.2-3.7,1.7-6.8,4.6-9.2l3.3-3.5c2.8-3,5.8-6.1,9-9.1l1.5-1.4c0.9-0.8,2-1.2,3.3-1.3l4.3,0.3l0.7-4.8c-2.3-0.8-4.4-0.6-6.5,0.5l-1.3,0.3h-0.9l-1.8-1.5c-1.6,0.4-3.2,0.2-4.6-0.5l-1.7-0.2C383.8,168.2,382.6,168.9,381.6,169.8z" },
    qinghai: { id: 100032, name: "青海", x: 170, y: 186, color: '#F8EF92', path: "M177.2,149.6l-1.8-0.8l-1.6-1.5l-0.5-0.2h-1.6l-1-0.3l0.1-0.2c0.1-0.4,0-0.8-0.2-1l-0.7-0.5c-1.4-1.3-3.1-1.8-5.1-1.6l-2.5-0.5l-0.4-0.4l-0.4-0.7c-0.5-0.3-0.9-0.6-1.4-0.7l-0.5,0.5l-0.3,0.3l-0.4,0.1l0,0l-2.8-0.2l-2.8,0.4l-1.3,0.4l-2.4,1.5l-2.7,0.4h-0.1l-2.7-0.3H144l-1.2-0.1l-1,0.2l-0.3,0.2l-0.3,0.1l-2.9,1.1l-3,0.3l-0.5-0.1l-2.3-0.9c-0.7-0.4-1.5-0.6-2.3-0.6h-0.4c-0.9,0.1-1.5,0.3-2,0.6l-0.3,0.4l-0.7,0.5c-0.2,0.1-0.5,0.4-0.4,0.8v0.3l0.8,0.4c0.8,0.6,1,1.5,0.6,2.5l-0.3,1.9l0.2,0.2l0.6,0.9l0.3,0.8l0.3,0.4l2.2,0.1l1.2,0.4l0.8,1.1l0.2,0.5c0.2,1.2,0,2.2-0.6,3l-1.6,3.1l-0.4,0.2h-1.1l-1,0.2l-0.3,0.2c-0.3,0.1-0.5,0.6-0.4,1v1c-0.1,0.5,0,0.8,0.4,1.3l0.3,0.2l1.4,0.1l0.3,0.2v0.2v0.7l-1.2,1l-1.4,0.4V169l-1.4-0.5h-1.5l-1.3,0.6l-1.2,0.1h-0.5l-2.1-0.1l-0.5,0.1h-0.1l-0.4,0.1v6l-0.4,0.8h-0.1l-0.6,0.6l-0.3,0.1l-0.5,0.3l-0.4,0.6l-0.3,1l-0.2,1.9l0.6,5.4l-0.3,0.8L115,188c-0.8,0.5-1.3,1.3-1.3,2.2c-0.1,0.8,0,1.4,0.5,1.9l0.3,0.5l2.7,3l1,1.9l0.1,2l1.3,2.8l0.4,0.4l0.7,0.1l4.8,0.3c1.3,0.2,2.1,0.7,2.6,1.9l0.5,0.7c0.3,0.6,0.8,1.1,1.5,1.4l3.7,0.5c1,0.1,2,0.5,2.8,1l1.7,1.7c1.4,1.3,2.9,2.3,4.6,3l2.2,0.2l1.7-0.3l2.9,0.3l2.9,2l0.7,0.2l5.5,0.1l0.4,0.3l1.5,1.6l1.7,1.3c0.8,0.4,1.3,1,1.6,1.8l1.1,2.2l0.2,0.8l0.3,0.3l1.4,0.3l0.2,0.1l1.2,1.1l0.4,0.3l0.6,0.2l4.3-0.4l2.9-0.5h0.1l0.2-0.4c-0.1-0.4-0.1-0.8,0.2-1.1l0.2-0.6l0.3-0.3l0.6-0.2h0.2l1.1-1l0.9-1.9c0.2-0.5,0.4-0.7,0.9-1h0.1h0.3l0.1-0.1h-0.1l-0.2-0.6l2-4.8l0.7-1.1l0.2-0.1l0.5-1l0.4-1.1l0.3-2c-0.1-0.8,0.2-1.7,0.8-2.2c0.2-0.2,0.5-0.4,0.8-0.4l0,0c0.5-0.1,1,0,1.5,0.5l2.5,2.8l0.3,0.4l0.3,0.2h1.7c0.9,0.2,1.6,0.7,1.8,1.6l0.6,1.3l2.3,2.9c0.7,0.5,1.6,0.7,2.6,0.6h1.9c0.5-0.1,0.9,0,1.1,0.5l1.7,2l0.4,0.4l2.4,0.3l2.9-0.2h0.1l2.3-0.8l0.1-0.1h0.9l0.2,0.1l1-0.4l0.5-0.3l1.9-1.9l0.5-0.2h4l0.2-0.2l1.2-1.2l0.2-0.5l0.1-1l-0.4-1.8l0.2-1.4l0.4-0.8l0.5-0.6h-0.4l-2.7-0.7l-2.8-1.5l-1.4-1c-0.4-0.1-0.5-0.3-0.4-0.7l0.2-0.1l1.1-0.8l0.9-1.6l0.2-0.1v-0.1l2.9-0.2l1.7-0.4l1-0.3l0.4-0.4l0.6-1.9l0.7-1.6l0.6-0.5h0.7l0.3-0.1h0.1l4.6-3.8l0.4-0.7v-1.6c0-0.6,0-1,0.4-1.3l2.3-2l0.2-0.5c0.1-0.8-0.2-1.5-0.9-2.2l-0.1-0.4l-0.1-3l-0.2-0.4l-0.2-0.4l-0.9-0.7l-0.2-0.3l-0.1-1.9l0.1-0.9l-0.3-0.7l-1-0.9l-0.5-0.7l-0.2-0.6v-1.1c0-0.4-0.1-0.7-0.4-0.7l-2.4-1.6l-2.4-2.3l-0.3-0.1h-2.4c-0.6,0.1-1.1-0.1-1.5-0.6l-0.4-0.4l-1.1-1.7l-0.6-1.2l-1-1.7l-1-0.6l-1.2-0.5c-0.2-0.5-0.4-1.1-0.3-1.7l-0.1-0.4l-0.1-0.2c-1.1-0.4-2-0.9-2.7-1.6l-0.3-0.3l-0.6-1.5l-0.6-0.7l-0.5-0.4l-2.4-0.8l-0.9-0.1l-3.2-0.1l-1.9-0.4l-0.7-0.4c-1.3-0.8-2.3-1.7-3.2-2.8l-0.4-0.4h-0.3l0,0l-0.5,0.4l-0.5,0.3l-0.9,0.2h-1l-1.5-0.3c-0.6-0.5-1.4-0.7-2.2-0.5l-0.5,0.2l-0.4,0.1l-0.2,0.2l-0.6,0.5l-0.6,0.3l-0.5-0.1l-0.4-0.2l-0.5-0.4l-0.7-0.4l-0.2-0.1l-2.7-0.3l-0.5,0.1l-0.2,0.1c-0.3,0.3-0.4,0.5-0.4,1.2v0.3l-0.1,0.2l-1,1l-0.5,0.2h-0.2l-1.1,0.1l-0.7-0.2l-0.4-0.5l-0.7-0.5L177.2,149.6z" },
    shaanxi: { id: 100057, name: "陕西", x: 286, y: 210, color: '#F7D490', path: "M295.6,153.7l-0.5,0.4l-1.4,1.5l-2.8,5.5l-0.5,0.7l-0.3,0.3c-0.7,0.4-1.1,1-1.3,1.9l-0.2,0.3v2.3l-0.2,0.5l-0.2,0.1l-0.9,0.9l-2.2,1l-0.7,0.4l-0.8,0.1l-0.7-0.1l-0.5-0.3l-2.1-1.8l-0.4-0.2l-2.7-0.1l-0.3,0.5l-0.4,0.5l-0.2-0.1l-0.7-0.5l-1.2-1.6l-0.1,0.1c-2.5,2.3-3.9,5.2-3.9,8.7l0.2,1.9l4.3,2.5l0.7,0.2l0,0l2.7-0.5l0.4-0.1l0.4-0.1l2.2,0.5l0.3,0.2l2.4,1.3l2.2,0.5h0.2l0.2,0.1l0.5,1.1c0.2,1.1-0.2,1.8-1,2.4l-1.6,1.2c-0.3,0.4-0.4,0.8-0.2,1.4l0.2,0.8l0.3,0.5v0.3l0.2,0.3l0.3,1.1l-0.2,0.6l-0.2,0.2l-0.4,0.2h-0.9c-0.7,0-1.4,0.3-2,0.7l-0.3,0.5c-0.2,0.5-0.3,1-0.2,1.6l-0.2,0.5h-0.3l-2.9,0.2l-0.3,0.3l-1.3,2.1l-0.5,0.3l-1.2,0.5l-0.8,0.1l0,0l-1.2-0.3l-0.5-0.3l-1.3-0.4h-1.8l-0.7,0.4l-1.4,0.8l-0.4,0.4l-0.7,6.9l-0.2,0.6c-0.2,1.5-0.3,2.9-0.3,4.3v0.3l-2.2,2.3l-2.8,0.4l-0.5,3.7l-0.2,0.5l-0.2,0.3l-0.2,0.1l-0.2,0.2h0.3l1.4,0.4l0.1,0.2l0.5,0.7l0.1,0.2l0.7,0.4l1.7,0.5l1.4,0.2h0.8l1.6-0.4h0.2l1-0.1l0.5,0.1l3,2.8l1.7,1.2c0.3,0.3,0.8,0.6,1.3,0.6h0.6l2.4-0.2l0.3-0.1c0.5,0,1,0.1,1.2,0.4c0.4,0.3,0.5,0.6,0.4,1.1c-0.1,0.3-0.1,0.4,0.1,0.5l1.3-0.1l2.2-1l0.7-0.1h0.2c0.6,0,1.2,0.3,1.8,0.9l1.2,1.7l0.2,0.2l0.4,0.3l0.7,0.3l2.6,0.3l0.3,0.2l1.9,2.1l1,0.5h0.2l0.3-0.5v-1.3c0-0.6,0.1-1.2,0.3-1.6l0.4-0.7l0.3-0.5c0.3-0.5,0.5-1,0.6-1.6c-0.1-0.7,0-1.3,0.2-1.8c0-0.1,0.2-0.4,0.4-0.4l0.8-0.6l0.1-0.6c-0.1-0.5-0.4-1.1-0.9-1.5l-0.4-0.4c-0.6-0.9-0.8-1.9-0.8-2.8l0.1-0.5c0-0.2,0.2-0.4,0.5-0.5l0.5-0.2l1.2-0.1l2.9,0.1l1.8-0.3l1-0.4l2.2,0.2l1.5,0.9h0.1c0.1-0.3,0-0.7-0.2-1.1l-0.9-1.4l-1.5-3.2l-1-1.6l-0.9-0.9l-0.3-0.7v-4.5l-0.2-0.3l-0.8-1.2h-0.2h-0.3h-0.4l-2.1-1.8l-0.4-1.5l0.2-0.6l0.4-0.1l0.3-0.5l0.2-0.4l1.1-5.7c0.1-0.9,0.4-1.5,0.8-2.2l1.5-2.7l0.2-0.8l0.5-12.9c0.3-1.8,0.2-3.7,0-5.6l-1.1-2.8c-0.5-0.9-0.7-1.7-0.6-2.5l0.2-0.4l3.5-4.2l0.4-0.3l0.5-1.2v-3.1c-0.1-0.5,0.1-0.8,0.5-1.1l1-0.9l-2-0.1l-1-0.6l-0.2-0.2l-0.6-0.2h-0.1l-0.2,0.1l-1.8,0.3c-0.3,0-0.6-0.1-0.7-0.4l-0.1,0.2v0.6c0,0.3-0.2,0.6-0.6,0.7l-1.2,0.5l-2.9,0.2l-0.1,0.4c0.1,0.3,0,0.7-0.4,0.9L295.6,153.7z" },
    jiangsu: { id: 100066, name: "江苏", x: 388, y: 216, color: '#BBEECC', path: "M382.1,214.6l0.6,2.7c0.2,0.7,0.4,1.1,0.8,1.5c0.3,0.3,0.4,0.7,0.3,1.1l-0.1,0.1l-2.2,0.6l-1.1,0.6l-0.1,0.2l-0.1,0.1c-0.3,0.2-0.3,0.6-0.3,1.1l0.4,5l-0.3,2.6l-0.1,0.4c-0.1,0.3-0.1,0.5,0.1,0.8l0.3,0.3l0.3,0.8l0.6,0.4l0.3,0.2l0.1,0.2l0.8,0.3l5-0.3l1.8,0.3l0.2,0.1l0.7,1.1l0.4,0.9h-0.2l-0.4,0.2l-0.4,0.5l-1.6,1.1l-0.6,0.6l-0.9,1.2l-1,1.9l1-0.7l0.7-0.3h0.4l3.6,0.5h1l0.4-0.1l1.8-1.6l-0.1-0.2h-0.1v-0.2l-0.2-0.5l0,0l-0.1-0.1c0-0.3,0.1-0.3,0.5-0.3h0.4h0.4h0.1l0.2-0.1v0.1l0.1-0.1h-0.1l0.1-0.1h0.1V237v-0.4v-0.3l0.3-0.2l0.1,0.1v0.1l0.1-0.1h0.2v0.1v-0.1l0.1-0.1l-0.1-0.2v-0.1l-0.1-0.1l-0.1-0.2l-0.2-0.2h0.1h0.1l0.2-0.2v-0.3l0.1-0.1l-0.1-0.1c0.1-0.1,0.2-0.2,0.4-0.3h0.2l0.2-0.1l0,0h0.2l0.1-0.1l0.5-0.1l0.4,0.1l0.1,0.1l0.2,0.3l0.7,0.4l0.1,0.1v0.1l0.4,0.1h0.1l0.1-0.1l-4.7-3.8l-1.9-0.7c-1.7-0.6-3.1-1.6-4.5-3.2c2-1.1,4-0.6,5.9,1.4c0.6,0.6,1.3,0.9,2,1h6.3l-0.5-2.2c-1.6-0.1-3-0.8-4-2c-2.5-2.8-4.5-4.5-6.2-5.5l-1.2-4.8l-1.3-2.3l-0.6-1.2c-0.2-1.4-0.7-2.7-1.3-4.1l-2-3.2c-2.5-0.7-4.7-1.7-6.6-3l-3.3-3l-0.7,0.3l-0.6,0.7h-0.3l-0.2,0.1l-1.9,0.2l-0.7-0.5l-0.8-1l-2-0.2l-4.4,0.6l-1.1-0.1h-0.1l-1.5-1.2c-0.4-0.3-0.8-0.4-1.2-0.4c-1.1,0.1-1.8-0.3-2.2-1.2l-0.6-0.6h-0.1l-0.6,0.5l-0.7,1.3l0.2,1.7l-0.4,0.8l-0.1,0.6l0,0l1.2-0.7l0.4-0.1c0.2,0,0.4,0.1,0.6,0.4l1,1.1l0.3,0.3l1,0.2h2l0.8,0.8l0.2,0.4c0.3,0.3,0.4,0.6,0.3,1.2l-0.1,1.1l3.1,0.1l0.3,0.2l0.8,1.5l0.4,0.2l0.7,0.2l3-0.7c0.3-0.2,0.5-0.2,0.5,0.2l0.2,0.5l0.3,0.4l0.2,0.9l0.1,5.3c0,0.6,0.2,1.1,0.7,1.6l0.8,1.2c0.6,0.8,1.4,1.3,2.3,1.6h0.7l0.1-0.1l0.3-0.5l0.1-0.3l0.1-1.3l0.3-1.1l0.8-1.6l0.5-0.5l0.4-0.1l0.4-0.3l0.2-0.1L382.1,214.6z" },
    henan: { id: 100058, name: "河南", x: 328, y: 210, color: '#BBEEFF', path: "M348.1,183.7l-0.1-0.1l-0.4-0.3l-0.2-0.2l-1.6-0.1v0.1h-0.2h-0.2l-4.6,1l-1.4,0.5l-0.4,0.2l-5.7-0.7l-0.4,0.1l0,0l-1.3,0.2v0.4l-0.2,0.5l-1,1.3l-0.3,0.8c-0.2,0.2-0.3,0.6-0.2,1l-0.1,0.4l-0.8,1.9l-2.5,3.8l-0.4,0.2l-0.9,0.4l-1.9-0.3l-0.6,0.1l-1.9,0.4l-0.2,0.1l-0.5,0.2l-0.1,0.1h-0.1c-0.5,0-0.8,0.3-1.2,0.5l-0.6,0.4l-0.3,0.2l-1.1,0.3l-2,1.5l-2.3,0.7l-0.1,0.2l-1.3,0.4l-0.4,0.2l-0.8,0.3l-5.8,0.3l-1.3,0.4l-0.2,0.3l-0.6,0.4l0.8,1.3l0.2,0.3v4.4l0.2,0.8l1,0.9l1,1.6l1.5,3.1l0.9,1.5c0.2,0.4,0.3,0.8,0.1,1.1l0.1,0.2l0,0l0.4,0.1h0.1l0.7,0.6l0.2,0.2l1.5,1.2l0,0l0.4,0.2l0.9,0.2l0.4,0.1l2,2.2l0.3,0.4l2.1,1.6l0.4,0.3l0.5,0.3l1.1,0.3c1.9,1.1,3.9,1.4,6.1,1.1l0.6-0.1l2.9-0.8c0.3-0.3,0.7-0.4,1.4-0.3c0.4,0,0.8,0.2,1.1,0.7l0.3,0.3l0.8,0.7c1.5,1,3,1.8,4.8,2.3l0.6,0.3l2.4,1.7c0.8,0.6,1.8,0.8,3.1,0.7c0.8-0.1,1.5,0.2,2.2,0.6h0.1l0.3,0.3l3.2,2l1,0.1l0,0l0.2,0.2l0,0h0.1l2.3-6.2l0.4-0.6l0.3-0.2c0.5-0.4,0.7-1,0.5-1.8l-0.6-1l-0.6-0.6l-0.7-1.1l-1.2-1.2h-1.7l-1.1-0.4l-0.5-0.5l-1.7-3c-0.5-0.6-0.8-1.3-0.7-2.1v-0.3c0.2-0.8,0.6-1.4,1.2-1.9c0.8-0.9,1.3-1.9,1.8-3l0.2-0.3l0.8-0.7l1-0.5l0,0c0.5-0.6,0.7-1.3,0.5-2.1c0-0.5,0-0.9,0.3-1.4l0.2-0.4l0.1-0.1l1.1-0.1l0.6,0.5l0.4,0.3l1.3,1.6l1.2,0.2l0.6-0.1l0,0l0.2-0.1l0.1-0.8l0.2-0.1l1.4-0.9l0.1-0.6l-0.1-2.5l-0.2-0.2l-2.5-0.2V202l0.3-0.9V201l0.2-0.2l0.3-0.7V200l-0.2-0.2l-0.1-0.1l-1.2-0.1h-0.2l-3.3,1.6l-0.6-0.1l-1.2-1.6l-0.2-0.3l-2.4-0.1h-0.3c-0.4-0.2-0.8-0.5-0.9-1l-0.2-1.5l-0.7-1.2l-0.5-0.5c-0.4-0.2-0.5-0.4-0.4-0.8l0.1-0.3l1.2-1.3l0.3-3.3l0.2-0.2l0.3-0.2l1.3-0.2h0.1l0.6-0.2v-0.1l0.5-0.2h0.2l0.5-0.5l0.6-0.1l0.4-0.1h0.2l1.3-0.3v-0.3l-2.4-2v-1L348.1,183.7z" },
    xizang: { id: 100003, name: "西藏", x: 90, y: 224, color: '#BBEECC', path: "M109.1,167.2l-1.9-2l-0.2-0.1l-4-0.1h-0.3c-0.9-0.7-1.4-1.5-1.5-2.7L101,162c-0.7-0.4-1.4-0.7-2.2-0.7l-1.9,0.3l-1.6,0.7c-1.7,0.8-3.5,1.4-5.3,2l-0.6,0.1l-4,0.2l-1.2,0.2l-2.7,1l-1.2,0.7l-0.3,0.2l-0.5,0.2h-0.1l-2.3-0.2l-0.4-0.2l-2-0.2h-0.2c-0.9,0.7-1.8,0.8-2.8,0.7l-1.2-0.3l-5.2-2.6l-1.3-1h-0.1l-0.5-0.3h-4.6l-0.4-0.2l-2.9-1l-0.7-0.1l0,0h-0.2l-1.3,0.4l-1.1,0.7l-0.7,0.7l-0.5,0.2l-1.2-0.1l-0.3-0.2l-0.5-0.8l-0.4-0.3h-1.8l-1.7-0.4l-0.4-0.4c-0.4-0.3-0.7-0.7-0.8-1.3l-0.3-0.4l-0.5-0.5h-0.7l-1.2,1l-1.6,0.5h-0.1l-0.2-0.1l-1.4-1.4l-0.4-0.3c-0.4-0.3-0.8-0.4-1.3-0.3H36l-1.3,1.7l-2.7,2.3l-0.2,0.7l-0.7,2.7l-0.5,0.9l-0.3,0.1l0,0l-0.9-0.2l-0.9-0.6h-0.1l-1.2,0.9v0.1l-3.8,1.9c-0.3,2.1-0.3,4.3,0.2,6.6c0.4,1.5,0.6,3.1,0.6,4.9c0,1.8-0.7,3.3-2.2,4.6h-2.6l-1.5-4.1l-2.6,2.8l-0.1,3c1.4,1.3,1.9,2.8,1.7,4.4l-0.1,0.8c-1.8,3-1.2,5.6,1.6,8l1.1,0.6l0.5,0.3c1.3,0.7,2.1,1.8,2.6,3.2l0.5,1.9l2,0.3l4.5,6.7l0.3,0.1l0.9,2.6l1.5-0.6c0.6-0.4,0.9-1,1.1-1.8l0.6-1.4c3.8,0.1,6.3,1.7,7.6,4.6l0.8,2.1c2.3,2.2,4.2,4.9,5.8,7.7l0.3,1.2c0.1,1.2,0.8,2.1,1.8,2.6l1.7-1.3c2.5,0.2,4.1,1.6,4.8,4L57,234c0.1,1.1,0.5,2.1,1.1,3l4.6,0.6l-0.8,1.6l1,3.1c1.3,0.2,2.2,0.4,2.9,1c0.8,0.7,1.3,1.4,1.7,2.4l0.6,2.2h1.6l0.6-1.7l1.5,0.1l0.6,3.1h0.1l0.9,0.2l0.6-0.3l0.5-2.2c2,0.4,3.5,1.7,4.3,4.1l0.5,1l1.4-0.1c2.8-0.4,5.5,0,8.1,0.9l1.1,0.6h0.4l0.5-1.3c1.5-0.6,2.9-0.4,4.1,0.5l0.1,0.3c-0.2,1.2-0.7,2.6-1.8,4l-0.2,1c0.2,1.2,0.8,2.3,1.9,3.1l3.1,0.2l-0.5-5.1l6.3-4.1l0.7-0.1c3.8,0.7,6.8,2.7,9.1,5.8c2.1-0.7,4.1-0.6,6.2,0.4l0.1,0.1l0.2,3.7l3.2,2.6l0.7,4.5l4.3,0.4l5.3,1.7l1.8,2.3l4.9-2v-1l3.3-3.5c2.9,0.1,5.6-0.5,8.2-2l1-0.4c2.4-0.8,4.8-2,7-3.4c4.4,0.8,8,3,11,6.6l4,0.6l1.1-5.7h4.8l0.1,2.3l1.6,1.5h1.3h0.1l1.6-2.2l1.7-1.5l0.3-0.5l0.5-1.6v-0.6c0-0.8,0.3-1.5,0.7-2.1l0.2-0.2l0.4-0.6l0.5-0.4l0.4-0.2h0.3l0.9,0.4l0.6,0.5l0.3-2.7l0.1-0.6l0.9-0.7l0.4-1l-0.4-8l0.1-0.5l0.1-0.6c0.4-0.9,0.5-1.8,0.4-2.6l-0.4-1.4l-1-1l-0.7-0.4l-0.4-0.4l-0.4-2l0.1-0.6l0.3-0.5l0.6-0.9l0.3-0.6l0.1-1.7l-0.1-0.3l-0.3-0.8c-0.5-0.9-1-1.6-1.8-2.2l-0.4-0.4l-1.4-1l-0.1-0.2v-1.2c0-1.5-0.5-2.7-1.9-3.6l-3-2.4l-1.5-0.7v0.1h-0.2l-0.2,0.1c-0.5,0.2-0.7,0.4-0.8,0.9l-1,1.9l-1.1,1h-0.2l-0.6,0.2l-0.3,0.3l-0.2,0.6c-0.3,0.4-0.3,0.7-0.1,1.2l-0.3,0.3h-0.1l-2.9,0.6l-4.3,0.3l-0.6-0.2l-0.4-0.3l-1.2-1.1l-0.2-0.1l-1.4-0.3l-0.3-0.3l-0.2-0.8l-1.1-2.2c-0.3-0.8-0.8-1.3-1.5-1.8l-1.8-1.3l-1.5-1.6l-0.4-0.3l-5.6-0.1l-0.6-0.2l-2.9-1.9l-2.9-0.3l-1.7,0.3l-2.1-0.3c-1.8-0.7-3.3-1.7-4.7-3l-1.7-1.6c-0.9-0.6-1.8-1-2.8-1.1l-3.6-0.5c-0.8-0.3-1.3-0.8-1.6-1.4l-0.5-0.7c-0.5-1.1-1.4-1.7-2.6-1.9l-4.8-0.3l-0.7-0.1l-0.3-0.4l-1.5-2.8v-2l-1-1.9l-2.7-3l-0.3-0.5c-0.5-0.5-0.6-1.1-0.5-1.9c0-0.9,0.5-1.6,1.4-2.2l1.1-1.2l0.3-0.8l-0.5-5.4l0.1-1.9l0.3-1l0.5-0.6l0.4-0.3l0.3-0.1l0.6-0.6l0,0l0.5-0.8v-6.2h-0.1l-0.7-0.2l-1-0.4l-0.4-0.3l-1.2-0.2l-3.7-0.2l-1.9-0.2L109.1,167.2z" },
    anhui: { id: 100068, name: "安徽", x: 368, y: 236, color: '#FECDAB', path: "M369.1,206.8l-0.7-0.2l-0.4-0.3l-0.8-1.5l-0.3-0.1l-3.1-0.1l0.1-1c0-0.6,0-1-0.4-1.4l-0.2-0.4l-0.7-0.7h-2l-1-0.2l-0.3-0.3l-1-1.1c-0.2-0.3-0.4-0.4-0.6-0.4l-0.4,0.1l-1.2,0.7l-0.2,0.1l0.2,0.1v0.2l-0.3,0.7l-0.2,0.1v0.1l-0.4,0.9v0.1l2.6,0.3l0.1,0.1l0.2,2.5l-0.2,0.7l-1.4,0.8l-0.1,0.1l-0.2,0.9h-0.1H356l-0.5,0.1l-1.2-0.1l-1.4-1.6l-0.3-0.4l-0.7-0.5l-1,0.1l-0.1,0.1l-0.3,0.5l-0.2,1.3c0.1,0.9,0,1.5-0.5,2.2h-0.1l-0.9,0.4l-0.9,0.8l-0.2,0.3c-0.4,1.1-0.9,2-1.8,2.9c-0.5,0.5-0.9,1.2-1.1,1.9v0.4c-0.2,0.7,0.1,1.5,0.6,2.1l1.8,3l0.4,0.5l1.2,0.4h1.6l1.2,1.1l0.8,1.1l0.5,0.6l0.7,1c0.2,0.8,0,1.4-0.6,1.8l-0.3,0.2l-0.3,0.7l-2.3,6.1h-0.2l-0.1-0.1h-0.1l-0.1,0.1l-0.1,0.4l-0.1,1.2l0.2,0.7l0.2,0.2l0.5-0.5h1.3l1.5,0.3l0.9,0.7l0.3,0.4v1.1l-0.4,2.2l0.1,1.3l0.1,0.4l0.8,1.3l0.2,0.3l0.8,1.4c0,1.2-0.1,2.6-0.4,3.8v0.3l0.1,0.2l0.8,0.2l0,0l1.3-0.5l5.6-0.2l0.5-0.2l1.1-0.4l0.7-0.4l0.9-0.6l0.7-0.4l0.9,0.1l0.8,0.3l0.2,0.2l2,1.8l2.8-0.1l0.2,0.1c0.9,0.7,1.5,1.7,2,2.9l0.4,0.1l2.6-1.6h0.1l0.4-0.3l2.6-3.7l0.5-2.1V245c-0.1-0.5,0-0.9,0.2-1.4l0.2-0.3l2.3-2.2l1-2l0.9-1.3l0.6-0.6l1.6-1l0.4-0.5c0-0.1,0.2-0.2,0.4-0.1h0.1l-0.3-1l-0.7-1l-0.2-0.2l-1.8-0.3l-5,0.3l-0.8-0.3l-0.2-0.3l-0.2-0.1l-0.6-0.4l-0.3-0.7l-0.3-0.4c-0.2-0.2-0.3-0.5-0.1-0.7l0.1-0.5l0.3-2.6l-0.4-5c0-0.6,0-0.9,0.2-1.2l0.2-0.1l0.1-0.1l1-0.7l2.2-0.5l0.2-0.2c0.1-0.4,0-0.8-0.3-1c-0.4-0.4-0.6-0.9-0.8-1.5l-0.6-2.7l-1-2.4h-0.3l-0.3,0.3l-0.4,0.1l-0.5,0.6l-0.8,1.6c-0.2,0.3-0.4,0.6-0.3,1l-0.1,1.3l-0.1,0.3l-0.4,0.4v0.2h-0.7c-1-0.2-1.7-0.8-2.3-1.7L374,215c-0.4-0.4-0.6-0.9-0.6-1.6l-0.1-5.3l-0.2-1l-0.3-0.3l-0.2-0.6c-0.1-0.2-0.2-0.4-0.5-0.1L369.1,206.8z" },
    sichuan: { id: 100009, name: "四川", x: 232, y: 240, color: '#CCEEFF', path: "M238.6,208.9l-1.6-1.7l-1.6-2.4v-0.2l-0.8-1l-1-0.3l-0.3,0.2l-2.9,2.1l-0.4,0.5l-0.6,0.2h-0.2c-0.6,0.2-1.1-0.1-1.6-0.4l-0.5-0.1l-0.3,0.3l-0.5,0.4l-0.6,0.7l-0.1,0.2l-0.3,0.2h-0.1l-0.6,0.8l-0.3,0.7l-0.2,1.4l0.3,1.9v0.9l-0.3,0.6l-1.2,1.2l-0.1,0.1h-4l-0.5,0.3l-2,1.9l-0.4,0.2l-1.1,0.5l-0.2-0.1h-0.8l-0.1,0.1l-2.3,0.7h-0.1l-3,0.3l-2.3-0.4l-0.4-0.4l-1.7-2c-0.3-0.5-0.7-0.6-1.1-0.6l-2,0.2c-1,0.1-1.8-0.2-2.5-0.7l-2.4-3l-0.6-1.1c-0.2-1-0.8-1.5-1.7-1.7h-1.7l-0.3-0.2l-0.3-0.4l-2.6-2.7c-0.5-0.5-0.9-0.6-1.4-0.5h-0.1l-0.7,0.3c-0.6,0.6-0.9,1.4-0.8,2.2l-0.4,2l-0.3,1.1l-0.6,1l-0.2,0.2l-0.6,1.1l-2,4.6l0.2,0.7v0.1l1.4,0.7l3.1,2.3c1.3,0.8,1.9,2.1,1.8,3.7v1.1l0.1,0.3l1.4,1l0.5,0.3c0.7,0.6,1.3,1.3,1.7,2.3l0.3,0.6l0.1,0.4l-0.1,1.8l-0.3,0.5l-0.6,0.9l-0.3,0.4v0.8l0.4,2l0.3,0.2l0.7,0.5l1.1,1l0.4,1.4c0,0.9,0,1.7-0.4,2.6l-0.2,0.6v0.5l0.4,8l-0.4,1l-0.9,0.8l-0.2,0.5l-0.3,2.6l1.6,1.5l0.3,0.9l0.1,3c-0.1,0.6,0.1,1.2,0.6,1.7l0.8,0.1h0.1l0.3-0.1l0.1-0.5l0.1-2.4l0.4-0.8l0.6-0.4l1-0.2h0.1l0.7,0.2l1.7,2.1l0.1,0.4l1.5,4.7c0.3,0.7,0.8,1,1.4,1.2l2.3,0.6l1.1,0.5c0.6,0.2,0.9,0.7,0.7,1.3l0.4,2.2l1.3,3.6l0.3,0.6l0.7,0.7l3.1,2l0.4,0.5l0.1,3.5l0.1,0.9l1.1,2.3l0.4,0.6l1.5,1.6c0.6,0.4,1,0.9,1.3,1.6l0.2,0.8l0.4,0.5h0.1l0.4-0.1l1.4-0.7l2.4-0.6l2.5,0.2h0.1c0.4,0,0.8-0.2,1.2-0.5l0.3-1.1l-0.2-0.2c-0.2-0.5-0.2-1-0.1-1.5l0.5-7.3l0.1-0.7c0.7-1.5,1.7-2.6,3-3.5l1.7-1l0.1-0.2l0.1-0.3l-0.2-1.2c0-1,0.1-1.8,0.5-2.5l0.2-0.6l0.8-1.2l1.1-1.2l0.1-0.3c0.1-1,0.4-1.8,0.9-2.5l0.7-0.6l0.7-0.3h0.1l2.3,0.1l0.4,0.2c0.9,0.4,1.5,1,1.9,1.9v0.4l-0.2,3.3c-0.1,0.3,0,0.5,0.2,0.6h0.3l0.2,0.7l0.1,0.4l0.3,0.1h0.1l0.5-0.3l1.5-1.6l0.4-0.2h0.1l1.2-0.1l1.2,0.2l0.1,0.1l0.3,0.5c0.2,0.3,0.4,0.6,0.4,1.1v0.2l1.3-0.6l0.1-0.1h1.7l0.9,0.5c0.3,0.3,0.5,0.8,0.4,1.3v0.1l-0.7,0.5h-0.1v0.1c-0.3,0-0.3,0.2-0.2,0.6l0.2,0.1l1.2,0.1h0.3l0,0l0.6-0.6h0.2c0.8,0.1,1.4,0.5,2,1.1l0.7,0.2h2.4l0.6-0.3l0.7-0.4l1.3-2.6v-0.2c-0.2-0.5-0.6-0.8-1-1.1l-1.4-0.9l-2.3-2.8l1.2-0.8l1.5-1.6v-0.3c0-0.2,0-0.3,0.1-0.5l0.2-0.1v0.3l0.5,0.7l0.2,0.3c0.2,0.2,0.6,0.3,1.2,0.2l0.5,0.2l-1.3-4.8c-0.1-0.7-0.7-1.3-1.7-1.6v-0.5l1.1-2.8h0.7l0.5-0.2l0.2-0.4v-2.6l0.8-1.3l10.2-1.7l0,0c0.5-0.3,1-0.5,1.5-0.8l0.3-0.2v-0.4h1.2l0.4-0.2l0.2-0.4v-1.8l3.5-1.2l0.2-0.3l0.2-0.3v-4.3l1.4-1.2h2.2l0.5-0.2l2.2-1.8v-0.2l0.2-0.3V232l0.5-0.9h0.8l0.5-0.1l0.2-0.4c0.1-0.1,0.3-0.3,0.6-0.5c0.6,0,1.1-0.3,1.5-0.6l-0.1-0.2l-2.5-0.2l-0.8-0.4l-0.4-0.2l-0.2-0.3l-1.2-1.7c-0.6-0.5-1.1-0.9-1.8-0.8h-0.2l-0.7,0.1l-2.1,1h-1.3c-0.2,0-0.3-0.2-0.2-0.4c0.1-0.6,0-0.9-0.3-1.1c-0.3-0.3-0.8-0.5-1.2-0.4l-0.3,0.1l-2.5,0.1h-0.5c-0.7,0-1.1-0.3-1.4-0.6l-1.7-1.1l-2.9-2.8l-0.5-0.1l-1,0.1h-0.3l-1.6,0.4h-0.8l-1.5-0.3l-1.6-0.4l-0.7-0.5v-0.2l-0.6-0.6l-0.1-0.2l-1.3-0.5l-0.1,0.1l-0.1,0.1l-0.1-0.2h-0.4l-0.1,0.9l-0.2,0.4l-0.7,0.2l-1.9,0.1l-1.4,0.3l-0.9,0.4l-0.3,0.1l-0.8,0.7c-0.4,0.3-0.9,0.5-1.4,0.6h-0.5l-1.1-0.6c-0.5-0.4-0.7-0.9-0.7-1.5l-0.1-0.9v-0.4c-0.1-0.9-0.4-1.5-0.7-2l-1.1-1.5l-0.3-0.8l-0.1-1.3v-0.2l-3-2.8c-0.4-0.6-1.2-0.8-2-0.7l-2.2-0.2L238.6,208.9z" },
    hubei: { id: 100067, name: "湖北", x: 320, y: 238, color: '#B5CCB7', path: "M328.4,225c-0.8,0.5-1.8,0.7-2.8,0.8l-0.7,0.1c-2.1,0.3-4.1,0-6-1.1l-1.1-0.3l-0.5-0.3l-0.4-0.2l-2.1-1.8l-0.3-0.3l-2-2.2l-0.4-0.1l-0.9-0.2l-0.4-0.2v-0.1l-1.5-1.1l-0.2-0.2l-0.7-0.6v-0.1h-0.5l0,0v-0.2h-0.1l-1.5-1l-2.2-0.1l-1,0.4l-1.9,0.3l-2.8-0.2l-1.2,0.2l-0.5,0.2l-0.6,0.5v0.4c0,1,0.2,2,0.8,2.9l0.4,0.3l0.8,1.5v0.7l-0.8,0.6l-0.4,0.4l-0.2,1.7c-0.1,0.6-0.3,1.2-0.6,1.6l-0.4,0.5l-0.4,0.8l-0.2,1.6v0.5l0.4,0.7c1,1.1,1.8,2.2,2.4,3.3l0.6,0.9c1.3,1,1.8,2.5,1.4,4.1c-0.3,1.4-1,2.8-2.1,4.1l-1,0.7h-1c-2.3-0.9-4.3-0.9-6,0l-4.6,2.1c-0.6,0.3-1.1,1-1.6,1.8v0.1l1,0.3l1,0.1c0.7,0.2,1.2,0.3,1.5,0.5c1.2,0.6,1.5,1.7,1.1,3.7c-0.3,1-0.1,1.8,0.4,2.3l2.5,0.4l0.4,0.3c0.7,0.4,1.3,1.1,1.8,2l1.8-1.8v-0.4l0.5-0.7l1.6-1.5c0.7-0.5,1.5-0.7,2.4-0.7l1.3,0.1h0.2l0.5,0.6l0,0v0.1h0.7c0.6-0.1,1.1-0.4,1.5-1l0.3-0.2c0.9-0.5,3.3-1,7.3-1.5l1.7-0.7l0.3-0.2l0.2-0.3l0.3-0.2c0.5-0.5,1.2-0.8,2.1-0.9h0.7h1.7l0.7,0.4l1.8,2.1l0.5,0.3l2.2-0.6l0.3-0.1l0.2-0.1l1,0.3l0,0l0.3,0.2l0.7,1c0.2,0.9,0.7,1.6,1.3,2.3l0.6,0.6l1.1-0.1l0.3-0.2l1.5-0.8c0.4-0.4,0.9-0.5,1.4-0.5h0.2l1.5,0.1l0.1,0.1l0.3,0.3l0.2,0.4l1.3,5.3l0.5,0.7l0.2-0.2l0.6-1.4l0.7-0.6l0.6-0.1c0.6,0,1-0.2,1.3-0.8l0.9-1.9l0.2-0.2l3.2,0.2l0.4,0.1c0.7,0,1.3-0.4,1.6-1l1-2.2c0.5-0.9,1.3-1.6,2.3-1.8h0.1l0.1-0.2l4,0.7l0,0h0.3l1-0.5l0.5-0.5h0.1v-0.3c0.4-1.3,0.4-2.6,0.4-3.8l-0.7-1.5l-0.3-0.3l-0.8-1.3v-0.4l-0.2-1.3l0.5-2.1l-0.1-1.1l-0.2-0.4l-0.9-0.8l-1.5-0.2h-1.3l-0.6,0.5l-0.2-0.3c-0.2-0.2-0.2-0.4-0.1-0.6l0.1-1.3v-0.4h0.2l-0.9-0.2l-3.3-2l-0.3-0.3h-0.1c-0.7-0.4-1.4-0.7-2.3-0.6c-1.2,0.1-2.2-0.1-3-0.7l-2.5-1.7l-0.5-0.3c-1.8-0.6-3.3-1.3-4.8-2.3l-0.8-0.7l-0.3-0.3c-0.3-0.4-0.6-0.7-1.1-0.7L328.4,225z" },
    chongqing: { id: 158, name: "重庆", x: 278, y: 256, color: '#BBEECC', path: "M294.1,231.9c-0.5-0.1-0.8-0.3-1.1-0.4l-1.7-2.1l-0.2-0.1c-0.5,0.4-1,0.7-1.4,0.8l-0.6,0.5l-0.3,0.2l-0.4,0.2h-0.9l-0.5,0.8v4.4l-0.1,0.3v0.2l-2.3,1.9h-0.5h-2l-1.5,1.3v4.2l-0.1,0.3l-0.3,0.2l-3.3,1.2v1.8l-0.3,0.4l-0.3,0.2h-1.2v0.4l-0.3,0.1l-1.4,0.8h-0.1l-9.9,1.7l-1,1.4v2.5l-0.1,0.4l-0.4,0.2h-0.6l-1.2,2.6v0.5c1,0.4,1.5,1,1.7,1.7l1.2,4.8h0.3l0.6-0.2l0.7-0.7l0.7-1.1c0.3-0.6,0.8-1.1,1.3-1.2l0.6-0.4c0.5-0.5,1.1-0.6,1.7-0.7h1l0.7,0.3l1.9-0.3l0.6-0.5l1.5-1.7l1.1-0.1l1.4,0.1l0.6,0.3l1.6,1.1l0.1,0.3v0.8c-0.2,0.5,0,0.8,0.6,0.8l0.9-0.2l0.4-0.2l1.5,0.1l0.1,0.2v1.6l-0.1,0.4l-0.3,0.4c-0.4,0.3-0.4,0.7-0.2,1.1l0.3,0.3l2.3,2.1c0.5,0.3,0.7,0.7,0.9,1.2l0.1,0.4l1,0.7l0.2,0.1l1.2-0.1l0.2-0.2l0.1-0.2l0.3-0.4l0.4-0.1l0.2-0.2l0.6-1l0.2-0.1l-0.5-0.7l-0.2-0.4c-0.2-1.1,0-2.1,0.6-2.9l1.5-1.9c0.3-0.5,0.4-0.9,0.4-1.4l-0.4-1.1c-0.2-0.4,0.1-1,0.9-1.9l0.1-0.1l-1.6-2l-0.5-0.3l-2.4-0.3c-0.6-0.4-0.7-1.2-0.4-2.3c0.3-1.8,0-3.1-1-3.6l-1.6-0.4l-0.9-0.1l-1.2-0.4h0.1c0.4-1,0.9-1.5,1.6-1.9l4.5-2.1c1.6-0.8,3.7-0.8,6,0l0.8,0.1l1.1-0.7c1.1-1.4,1.8-2.8,2.2-4c0.2-1.7-0.3-3.1-1.5-4.1l-2.9-4.1l-0.4-0.7v0.8l-0.3,0.4H294.1z" },
    zhejiang: { id: 100065, name: "浙江", x: 394, y: 260, color: '#FFEEBB', path: "M392.6,240.5l-0.5,0.2h-1l-3.5-0.5h-0.5l-0.6,0.3l-1,0.7l-2.4,2.3l-0.1,0.2l-0.2,1.5v0.5l-0.5,2.1l-2.7,3.8l-0.3,0.2h-0.1l-2.6,1.6v0.1l0.6,0.7l0.2,0.2v1.5l0.2,0.2l1.5,1.6l0.5,0.7v0.4l-0.4,1.3c-0.3,0.3-0.3,0.7-0.1,1.1l0.3,0.5l0.2,1.2l-0.5,2.7l0.7,1.3v0.1v0.1l0.2-0.2l0.3-0.5l0.3-0.2V266l0.8-0.4c0.4,0,0.4,0.1,0.4,0.6v0.3l0.7,1.3l1.1,1.3h0.3l0.3,0.2l1.3,1.8l0.4,2.8l0.4,0.6l0.5,0.3l1.8-0.2l0.4-0.1h0.2l2.2-1.2h0.3l2.7-0.2c0.4,0,0.7,0.1,1,0.5v0.1l0.1,0.2h0.1c2.8-1.9,3.5-4.3,2-7.2l0.2-0.3c0.8-1,2.2-1.2,4-0.4c1.5,0.7,3,0.8,4.5,0.5l-4.2-4.8l1-1.8l-1.9-3.5l4.2-0.6l0.7-0.9l-0.4-1.6l-2.3-0.1l-0.8,0.6l-1.2,0.2c0.1-2,1-3.4,2.7-4.1l1.6-0.5c-1.2-1.6-2.7-2.6-4.4-3.1l-1.4-0.3l-10.4,0.8l-0.4-1.8c1-1.2,2.3-1.4,3.8-0.7l2-0.2c0.7-0.4,1.6-1,2.7-1.9h-0.1l-0.1-0.1v-0.3l-0.3-0.2l-0.2-0.3v0.2h-0.3l-0.2-0.2h-0.1l-0.1-0.1l0.1-0.1v-0.2l-0.1-0.2l-0.2-0.1h-0.2l-0.2,0.2v0.1l-0.2,0.1l-0.2-0.2h-0.1h-0.2l0,0l0.2-0.2v-0.2v-0.3v-0.4l-0.2-0.6l-0.2-0.2l-0.1,0.1h-0.3v-0.1L392.6,240.5z" },
    jiangxi: { id: 100054, name: "江西", x: 350, y: 270, color: '#BBEEFF', path: "M376.3,253.1h-0.2c-0.4-1.3-1-2.3-1.9-3h-0.3l-2.6,0.1l-2-1.9l-0.2-0.1l-0.9-0.4h-0.9l-0.7,0.3l-1,0.6l-0.7,0.4c-0.4,0.2-0.7,0.5-1,0.5l-0.5,0.1l-5.6,0.2l-0.2,0.2l-1,0.3h-0.2l-0.7-0.2l-0.1-0.1h-0.1l-0.6,0.5l-1,0.5h-0.2h-0.1l-4-0.7v0.1h-0.2c-1,0.3-1.8,1-2.3,1.9l-1,2.2c-0.2,0.6-0.8,1-1.5,1l-0.5-0.1l-3.1-0.2l-0.3,0.2l-0.9,1.9c-0.2,0.5-0.7,0.8-1.3,0.8l-0.5,0.1l-0.8,0.6l-0.5,1.4l-0.1,0.1l0.1,0.4l0.4,0.6l0.4,1.1v5.2l0.1,0.5v1.2l-0.2,0.4L336,271l-1.6,2.5l-0.1,0.4l0.2,0.9l0.2,0.4c0.3,0.9,0.1,1.7-0.8,2.4l-0.3,0.3c-0.5,0.8-0.7,1.7-0.5,2.8l0.2,0.4l1.3,1.3l0.3,0.5l0.5,0.7c0.4,0.4,0.7,1,0.8,1.6l0.1,3.6l0.2,0.6l0.3,2.2l0.3,0.5l0.3,0.1c0.5,0.2,0.7,0.5,0.7,1.2l-0.3,4.3l-0.6,1.4l0,0l-0.1,0.3v0.1v0.1l0.3,0.5l0.2,0.1l2.2,0.1l0.1,0.1c0.2,0.4,0.5,0.7,1,0.8l2.4-0.1l1.1,0.1l0.4,0.3l0.1,1.1l-0.1,0.2l-2,2.2l-0.8,1.6v0.3l0.4,1.3l0.7,1.4h0.4h0.2l0.7-0.5c0.2-0.7,0.7-1.1,1.2-1.3l0.5-0.2l0.3-0.2l3,0.4h0.2l0.7-0.4l0.2-0.1l0.2-0.1c0.6,0.1,1.1,0.4,1.4,0.7l0.4,0.3l1.8,0.7l1.1-0.2l1.7-0.7c0.5-0.4,0.8-1.2,0.7-2v-4.1l0.2-0.5l1.6-2.6l0.1-2.4c-0.1-0.9,0-1.9,0.2-2.8c0-0.5,0.2-1,0.5-1.4l1-2l2.2-2.3l2-3.3l0.4-1.2c0.6-1.3,0.9-2.7,0.9-4l-0.3-1l-0.2-2.5c-0.1-0.7,0-1.3,0.2-2.1l0.3-1.9l-0.2-0.5l-0.3-0.1l-1.2-0.1L365,271c-0.1-0.7,0.1-1.1,0.6-1.2h0.4l0.9-0.1h0.2l7,0.7h0.2l0.6-0.1c0.4-0.1,0.8-0.3,1.2-0.6l3.7-2.9l0,0v-0.1l-0.7-1.4l0.5-2.7l-0.2-1.2l-0.3-0.4c-0.2-0.4-0.2-0.9,0.1-1.2l0.4-1.2v-0.4l-0.5-0.8l-1.5-1.5l-0.2-0.3v-1.4l-0.2-0.2l-0.6-0.8v-0.1l-0.3,0.4V253.1z" },
    hunan: { id: 100053, name: "湖南", x: 312, y: 270, color: '#FFEEBB', path: "M334.4,254.6l-0.1-0.3l-0.4-0.3l-0.1-0.1l-1.5-0.2l-1.5,0.5l-1.6,0.9l-0.3,0.2l-1.1,0.1l-0.7-0.6c-0.5-0.7-1-1.5-1.2-2.2l-0.6-1l-0.4-0.3l0,0l-1.1-0.2l0,0h-0.4l-2.1,0.7l-0.6-0.2l-1.8-2.2l-0.6-0.3l-1.8-0.2l-0.7,0.2c-0.9,0-1.5,0.3-2.2,0.7l-0.2,0.3l-0.2,0.3l-0.3,0.2l-1.7,0.7c-3.9,0.4-6.4,0.9-7.3,1.4l-0.3,0.3c-0.5,0.6-1,0.9-1.5,1h-0.7v-0.1l0,0l-0.5-0.6l-0.3-0.1l-1.2-0.1c-0.9,0-1.7,0.3-2.4,0.8l-1.6,1.5l-0.5,0.7v0.4l-1.9,1.8c-0.9,0.9-1.2,1.6-1,2l0.4,1.1c0,0.5,0,1-0.4,1.3l-1.6,2c-0.5,0.9-0.8,1.9-0.5,3l0.1,0.4l2,2.7l0.4,1.4l0.2,3.2l-0.4,0.8l-2.2,2.5l-0.4,0.9v1.1l0.2,2.1l0.1,0.2l0.7,0.1c1,0,1.8,0.1,2.7,0.6l0.4,0.3l1.4,1.5l0.3,0.6c0.2,0.3,0.2,0.5,0,0.8l-0.1,0.2l-0.9,1l-0.1,0.3c-0.4,0.3-0.6,0.7-0.6,1.3l-0.2,4.1l0.1,0.4c0.3-0.4,0.8-0.6,1.5-0.8l1.9-1.3l0.6-0.2l1.6-0.2l0.2-0.1l0,0l2.7,0.4h0.1l2.6-0.8l0.7-0.1h0.3l0.3-0.1c0.8-0.1,1.5,0.2,2.1,0.7l0.4,5.3v0.2l1.8,1.9l0.2,0.2l0.3,0.9v1.7l-0.5,3.5l0.2,0.8l0.3,0.2l1.6,0.2l1.3,1.2l0.3,0.5l0.4,0.3l3.8,0.3h0.1c0.5-1,1.2-1.9,2-2.6l0.7-0.7l1-1.2l0.2-0.3c0.1-0.3,0.3-0.5,0.6-0.6l0,0l0.6-0.1l1.4,0.5c0.7,0.5,1.6,0.8,2.5,1l0.5,0.1l0.5-0.4l0.2-1.2v-1.3c-0.1-0.5-0.1-1,0.1-1.3l0.4-0.6l0.3-0.1l7.5-0.8l0.1-0.1l0.5-1.3l0.3-4.3c0.1-0.7-0.1-1-0.7-1.2l-0.2-0.1l-0.4-0.4l-0.4-2.9l-0.1-0.2l-0.1-3.4l-0.6-1.7l-0.7-0.6l-0.3-0.5l-1.3-1.3l-0.1-0.4c-0.3-1,0-2,0.5-2.8l0.2-0.2c0.9-0.8,1.2-1.6,0.8-2.5l-0.1-0.4c-0.2-0.3-0.4-0.6-0.3-0.9l0.1-0.4c0.4-1,1-1.8,1.7-2.5l1.3-1.2l0.3-0.4v-1.2l-0.1-0.5v-5.2l-0.4-1.1l-1.1-1.6l-0.5-2.1C334.9,256.8,334.5,255.7,334.4,254.6z" },
    guizhou: { id: 100064, name: "贵州", x: 266, y: 286, color: '#FECDAB', path: "M283.1,262.6l-0.2-0.2l-1.5-0.1l-0.4,0.2l-0.9,0.1c-0.6,0.1-0.8-0.2-0.6-0.7v-0.8l-0.1-0.4l-1.6-1.1l-0.7-0.2l-1.3-0.2l-1.1,0.2l-1.6,1.7l-0.6,0.5l-1.9,0.3l-0.7-0.3h-1c-0.6,0-1.3,0.3-1.8,0.7l-0.5,0.3l-1.4,1.3l-0.8,1.2l-0.6,0.6l-0.7,0.2l-1-0.2c-0.5,0.1-0.9,0-1.1-0.3l-0.2-0.2l-0.5-0.8l-0.1-0.2l-0.1,0.1l-0.1,0.5l-0.1,0.3l-1.5,1.6l-1.1,0.9l2.3,2.7l1.3,0.9c0.5,0.2,0.8,0.6,1,1.1v0.3l-1.3,2.5l-0.7,0.5l-0.5,0.1l-2.5,0.1l-0.6-0.2c-0.6-0.5-1.3-1-2-1h-0.2l-0.7,0.5l0,0l-0.7,0.9l-0.4,0.4l-0.2,0.2l-1.5,0.3h-0.3l-0.2-0.5l-0.2,0.1l-1.5,0.9l-1.6,1.3l-0.4,0.4l-0.6,0.2l-1.5,0.1l-1.4-0.2l-0.5-0.3c-0.7-0.7-1.5-1-2.3-1.2h-0.8l-0.4,0.2l-0.6,0.5L237,280l-1.2,2.3l0.3,1.6c0.2,0.7,0.6,1.5,1.3,2.2l0.9,0.5l1.5,0.3l0,0l0.4-0.3l0.3-0.4l0.6-0.4l1.5-0.2h1.3l0.3,0.2c0.2,0.4,0.4,0.9,0.2,1.6v0.6l-1.1,1.7l-0.4,0.5c-0.2,0.7-0.2,1.4,0.3,2.2c0.3,0.7,0.5,1.5,0.4,2.2c-0.2,2.5,0.1,4.8,0.8,7l0.3,0.5l0.2,1.9l-0.2,1.8l1.1-0.1l0.4,0.4l0.2,0.3l0.4,0.2l0.3,0.2l1.7-0.3l3-2.2l1.4-0.7h1.9l0.9,0.3l1.4-0.2l0.4-0.3l0.3-0.3c0.3-0.2,0.5-0.4,1-0.2h2.8l2.4,0.6l1.6-0.2l0.4-0.3l1.3-1.9l0.4-0.5l3.2-2.9l0.4-0.1c0.4-0.1,0.7,0,0.8,0.3l2.8,2.5c0.6,0.7,1.2,1.2,2.1,1.4l0.5,0.1l2.6-0.2l1.5-0.7c0.7-0.6,1.5-0.9,2.5-1l2.7-0.4l0.9-0.4l0.5-0.3h0.1l2.3-1.7l0.5-0.3l1.4-0.9l0.7-1l0.1-0.3v-0.6l-0.1-0.4l0.2-4.1c0-0.5,0.2-1,0.6-1.4l0.2-0.1l0.9-1.1v-0.2v-0.9l-0.3-0.5l-1.4-1.5l-0.4-0.3c-0.8-0.5-1.7-0.7-2.7-0.6l-0.7-0.1l-0.1-0.2c-0.2-0.6-0.3-1.4-0.2-2.1v-1.2c0-0.3,0.2-0.6,0.4-0.8l2.2-2.5l0.4-0.7l-0.1-3.3l-0.5-1.4l-1.4-2h-0.2l-0.6,1l-0.3,0.3l-0.2,0.1l-0.4,0.5l-0.1,0.1l-0.3,0.2l-1.1,0.2l-0.3-0.2l-1-0.8l-1-1.5l-2.4-2.1l-0.3-0.4c-0.1-0.5-0.1-0.8,0.2-1l0.3-0.5l0.2-0.5V262.6z" },
    fujian: { id: 100038, name: "福建", x: 380, y: 294, color: "#BBEECC", path: "M394.3,272.8l-2.7,0.2l-0.3,0.1l-2.2,1.1h-0.2l-0.4,0.1l-1.8,0.2l-0.5-0.3l-0.4-0.6c-0.2-0.3-0.2-0.9-0.2-1.5l-0.2-1.4l-1.3-1.6l-0.3-0.3l-0.4-0.1l-1-1.1l-0.7-1.4l-0.1-0.3c0.1-0.5,0-0.6-0.2-0.6l-0.8,0.4l-0.1,0.2l-0.2,0.2l-0.4,0.5l-0.2,0.2l-3.6,2.8l-1.3,0.7h-0.6H374l-7-0.7h-0.2l-0.9,0.2h-0.3c-0.6,0-0.8,0.4-0.7,1.1l0.2,0.2l1.2,0.1l0.3,0.2l0.2,0.5l-0.5,4l0.2,2.5l0.3,0.9c0,1.4-0.2,2.8-0.9,4l-0.5,1.2l-1.9,3.4l-2.2,2.3l-1,1.9l-0.5,1.5l-0.3,5.1l-1.6,2.7l-0.2,0.5v1.3l0.1,0.2l0.8,0.9l0.5,1l0.2,0.6c0.7,0.5,1.5,0.7,2.3,0.6l2.3,0.1l0.3,0.3l1.7,1.2l1,0.5l1.1,0.2h1.1l0.8-0.2v-0.2h0.2l0.1-0.2l-0.1,0.4l-0.2,0.3l-0.1,0.5l-0.4,0.4l-0.2,0.2l-0.8,1.1l-0.1,0.3l0.1,2.9l0.6-0.4l1.6-1.7l2.9-0.3l0.4-3.3l-1.3-0.4l0.2-1.7l3.6,0.1l1.2,0.3l0.1-3.5l5,1c0.7-3,2.2-5.4,4.7-7.4c0.4-0.4,0.5-0.9,0.6-1.3c0.1-2.2,0.6-4.3,1.5-6.2l0.4-0.9l0.7-0.6l-1.2-0.9l-2.5-1.7c-1-0.5-1.4-1.3-1.3-2.3l1.2-0.7l2.6,2.3c0.3,0.2,0.7,0.4,1.4,0.3l0.5-2.4l1.5-1.1c0.4-0.7,0.3-1.3-0.2-1.8l-1.2-1.3l3.6-1.3l0.5-0.9l-0.4-2.4l0.2-0.5C395,272.9,394.7,272.7,394.3,272.8z" },
    yunnan: { id: 100007, name: "云南", x: 214, y: 310, color: '#FFEEBB', path: "M237.3,264.8L237.3,264.8l-0.7,0.4l-0.8,0.5c-0.5,0.7-0.8,1.5-0.9,2.5l-0.1,0.4l-1,1.2l-0.9,1.1l-0.1,0.7c-0.5,0.6-0.6,1.5-0.5,2.5l0.2,1.2l-0.2,0.3v0.2l-1.7,1c-1.4,0.8-2.4,2-3,3.5l-0.2,0.7l-0.5,7.2c-0.1,0.5-0.1,1,0.2,1.5l0.2,0.2l-0.4,1.2c-0.3,0.3-0.7,0.5-1.1,0.5h-0.1l-2.5-0.2l-2.4,0.5l-1.5,0.7l-0.3,0.2h-0.2l-0.5-0.6l-0.1-0.7c-0.3-0.7-0.6-1.3-1.3-1.6l-1.5-1.6l-0.3-0.6l-1.2-2.3l-0.1-0.9l-0.1-3.5l-0.4-0.6l-3.1-2l-0.6-0.5l-0.3-0.7c-0.7-1.4-1.1-2.6-1.4-3.6l-0.3-2.3c0.1-0.6-0.2-1-0.8-1.2l-1-0.5l-2.4-0.6c-0.6-0.2-1.1-0.6-1.3-1.2l-1.5-4.7l-0.2-0.5l-1.6-2l-0.8-0.3h-0.1l-1,0.3l-0.6,0.4l-0.4,0.8l-0.1,2.4l-0.1,0.4l-0.2,0.2h-0.2l-0.7-0.2c-0.5-0.5-0.8-1-0.7-1.7l-0.1-3l-0.2-0.8l-1.6-1.5l-0.6-0.5l-0.9-0.3h-0.4l-0.3,0.1l-0.6,0.5l-0.3,0.6l-0.2,0.1c-0.4,0.6-0.7,1.4-0.6,2.1l-0.1,0.6l-0.6,1.6l-0.2,0.6l-1.7,1.5l-1.6,2.1l-0.1,0.1h-1.4l-1.1,1.2l-0.1,2.3l2.6,0.4l2.6,2.2l-0.3,10c0,0.8-0.4,1.8-0.9,2.6l-1.5,0.8l-0.3,1.7l0.9,1.3l-6.6,4.5l-1.9,1.7l-4.4,4.7c0.7,1.1,1.2,2.5,1.5,4.1c0.1,0.7-0.1,1.2-0.6,1.7l-2,2.1l1.3,0.3c0.9,1.1,2.1,1.1,3.5,0l1.6-1c0.6-0.2,1.4-0.2,2.1,0l4.7,0.7c-0.7,0.9-1.2,1.9-1.3,3l0.1,1.8l0.6,3.3l1,1.9l3.7,0.4l1.2,0.7v1.5l-1.9,1.5l-0.8,3.5l-1.7,1.2c0.2,1.6,1.3,2.6,3.3,2.8l2.4,0.4l4.2,5.4c0.5,1,1.3,1.5,2.1,1.6c0.8,0,1.5-0.1,2.2-0.6l0.7-0.4l0.6-1.4l4.3,0.2l-0.1,5.8l5.7,0.5l0.8-0.7c0.7-3.8,0-7.5-1.9-10.8c0.9-1.8,2.4-2.6,4.8-2h1.4c1.4-0.6,2.3-1.5,2.8-2.8c0.8-0.1,1.5,0.2,2.1,0.9l1.4,2.4c1.2,0.4,2.4,0.2,3.4-0.8l0.7-0.9l2.4-0.5c1.5,1.3,3.2,2.2,5.2,2.6l0.7-0.2l0.5-2.6h1.7l0.3,0.7l0.8,0.1h0.2c2.5-0.6,4.6-2,6-4.1c1-1.5,2.3-1.8,3.8-1c1.8,0.7,3.3,1.6,4.7,2.9l0.6-1l0.4-0.5h0.7l0.4,0.1l0.7,0.1l0.2-0.4l0.7-1.6l0.2-0.3l0.4-0.3l0,0l1.9-0.3l0.1-0.1c0.7-0.1,1.1-0.6,1.2-1.4l0.7-2.2l-1.7-0.3l-4.8-1.9l-0.9-0.8l-0.1-0.5c0.1-0.8-0.3-1.3-1.1-1.4l-0.4-0.1l-1.4-0.9h-0.2l-2.3-0.1c-0.8,0.1-1.3-0.2-1.5-0.8l-1-3l0.1-0.2l0.4-0.6l0.1-0.1l0.2-1.8l-0.2-1.8l-0.2-0.5c-0.9-2.2-1.1-4.6-0.9-7l-0.5-2.2c-0.4-0.8-0.5-1.5-0.1-2.3l0.4-0.4l1.1-1.8v-0.5c0-0.8,0-1.3-0.4-1.7l-0.2-0.1l-1.4-0.2l-1.5,0.3l-0.5,0.4l-0.4,0.5l-0.2,0.3h-0.1l-1.6-0.3l-0.7-0.6c-0.9-0.7-1.3-1.4-1.5-2.1l-0.2-1.7c0.1-0.6,0.3-1,0.7-1.2l0.5-1.1l1.2-1.6l0.7-0.4l0.4-0.2h0.7c0.9,0.2,1.6,0.5,2.4,1.1l0.6,0.3l1.3,0.2l1.5-0.1l0.6-0.1l0.4-0.5l1.6-1.2l1.5-1h0.1l0.3,0.4l0.2,0.1l1.5-0.3l0.4-0.2l0.2-0.5l0.8-0.8h-0.2l-1.3-0.2h-0.1c-0.2-0.4-0.1-0.6,0.1-0.7h0.1l0,0l0.8-0.5v-0.1c0.1-0.5-0.2-1-0.4-1.4l-0.9-0.5l-1.7,0.1H250l-1.3,0.6v-0.1c0-0.5-0.2-0.9-0.4-1.1l-0.3-0.6h-0.2l-1.2-0.3l-1.2,0.2h-0.1l-0.5,0.1l-1.4,1.6l-0.4,0.4h-0.2l-0.2-0.2l-0.2-0.3l-0.2-0.8h-0.3c-0.1,0-0.2-0.2-0.2-0.6l0.2-3.3v-0.3c-0.3-0.9-0.9-1.5-1.8-1.9l-0.5-0.2L237.3,264.8z" },
    guangdong: { id: 100051, name: "广东", x: 340, y: 318, color: '#FECDAB', path: "M344.3,301.4h-1.2h-2.3c-0.5,0-0.9-0.4-0.9-0.8l-0.2-0.1l-2.3-0.1h-0.1l-0.3-0.5l0.1-0.2v-0.3l-7.5,0.7l-0.4,0.1l-0.4,0.6l-0.1,2.6l-0.2,1.2l-0.4,0.5l-0.5-0.2c-1-0.2-1.8-0.5-2.6-1l-1.4-0.5l-0.5,0.2H323l-0.6,0.6l-0.1,0.2l-1,1.3l-0.8,0.6l-2.5,3.5l-0.2,0.6c-0.4,1.7-1.2,3.4-2.4,4.7l-2.8,2.8l-0.4,0.5l-0.3,0.9v1.6l-0.3,1.4c-0.2,0.3-0.5,0.6-0.8,0.6l0,0l-0.2,0.1h-0.2c-0.5,0.6-1.1,1.4-1.5,2.3l-1.3,2.7l-1.7,2.9l-1.1,1.3l-0.4,0.3l-0.9,0.9l-0.4,0.4c-0.8,0.6-1.5,0.9-2.2,1.1c-0.3,0-0.5,0.2-0.5,0.6l-1.1,2.5l-0.3,0.4l-1.4,0.2l-1.7-0.1v0.2l-0.7,1.5l-0.6,0.6l-1.6,0.5l-0.6,0.4l-0.7,0.6v0.1l-0.2,1.3v0.1c-0.4,1.2-0.9,2.2-1.5,3l-0.4,0.8l2.5,2.9l0.3,2.8l1.3,1l5.1-1l0.1-2.5l-3.4-4.7h-0.1l-0.1-0.2l2.6-1.2l0.2-0.7l6.8-2.8c0.9-0.4,2-0.7,3.5-0.8l1.9,0.4l1.8-3.3l1.3-0.2l2.7,1.1l1-0.8l0.3-1.7l5.8,0.1l0.1-2.1l3.2-0.3c-0.3-0.2-0.4-0.8-0.4-1.7c0-1.1,0.5-1.9,1.6-2.5h0.8l-0.2-3.4l0.1-0.1c1,0.4,1.7,1,2.5,1.7c1.2-0.6,2.4-0.8,3.6-0.8l3,0.4l1.8,0.9l0.4-0.8l2.4,2.1l0.9-0.5l1.3-2.1l3.1-0.2c2.3-1.3,4.9-1.8,7.7-1.5c1.3-0.2,2.5-0.7,3.5-1.2c1.5-1,2.4-2.4,2.8-4.3l0.5-1.2l0.9-1.4l1.8-0.1l1.2-0.9l2.6-1.5l-0.1-2.8l0.1-0.3l0.8-1.1l0.2-0.2l0.4-0.5l0.1-0.5l0.2-0.3v-0.2l0,0l-0.2,0.1v0.1l-0.8,0.3h-1.2l-1-0.2l-1.1-0.5l-1.6-1.3l-0.4-0.2l-2.2-0.1c-0.8,0.1-1.6-0.2-2.3-0.6l-0.2-0.6l-0.5-1l-0.8-1h-0.2v2.6c0.1,0.9-0.1,1.5-0.7,2l-1.6,0.7l-1.2,0.2l-1.7-0.7l-0.4-0.3c-0.4-0.4-0.9-0.6-1.4-0.7l-0.2,0.1l-0.3,0.2l-0.5,0.3h-0.2l-3.1-0.3h-0.2l-0.5,0.3c-0.7,0.2-1,0.6-1.3,1.3l-0.7,0.6h-0.2l-0.4-0.2l-0.7-1.3l-0.4-1.3v-0.3c0.2-0.6,0.4-1.1,0.8-1.6l2-2.2l0.1-0.2l-0.2-1.1L344.3,301.4z" },
    guangxi: { id: 100052, name: "广西", x: 284, y: 318, color: '#BBEECC', path: "M305.4,290.9l-0.7,0.2l-2.6,0.8l0,0l-2.7-0.4l-0.3,0.1l-1.5,0.1l-0.7,0.2l-1.9,1.3c-0.6,0.2-1.1,0.4-1.4,0.9v0.6l-0.2,0.2l-0.6,1l-1.4,1l-0.5,0.2l-2.3,1.7l-0.2,0.1l-0.5,0.3l-0.8,0.4l-2.7,0.3c-1,0.2-1.8,0.5-2.5,1l-1.6,0.8l-2.6,0.1l-0.4-0.1c-0.9-0.1-1.6-0.6-2.2-1.3l-2.7-2.5c-0.2-0.3-0.5-0.5-0.8-0.3l-0.5,0.1l-3.2,2.9l-0.3,0.5l-1.5,1.8l-0.2,0.3l-1.7,0.2l-2.3-0.5l-3-0.1l-0.8,0.3l-0.3,0.2l-0.4,0.4l-1.5,0.2l-0.9-0.3l-1.9-0.1l-1.4,0.7l-2.9,2.2l-1.8,0.3l-0.2-0.1l-0.5-0.3l-0.1-0.3l-0.5-0.4l-1,0.1l-0.1,0.1l-0.4,0.6l-0.1,0.2l1,3c0.2,0.6,0.7,0.9,1.5,0.8l2.2,0.1h0.3l1.3,0.9l0.4,0.1c0.9,0.1,1.3,0.6,1.2,1.4l0.1,0.5l0.8,0.8l4.8,1.9l1.7,0.3l-0.7,2.2c-0.1,0.8-0.4,1.3-1.1,1.5h-0.2l-1.8,0.3l0,0l-0.4,0.4l-0.3,0.2l-0.6,1.6l-0.2,0.4l-0.8-0.1l-0.4-0.1h-0.6l-0.5,0.5l-0.5,1v0.1l0.8,0.5l1.5,0.5l3.8,0.4c1.2-0.1,2.3,0.1,3.4,0.6c0.3,1.2,0.1,2.2-0.4,3.2l-0.8,1c-0.9,0.8-1.1,1.8-0.7,2.8l3.7,2.9l3.3,1.2l1.8,0.5c1.3,0.1,2.6,0.7,3.9,1.5c1,0.9,2.4,1.4,4,1.5l3.2-3.2c1.5,0.1,2.6,0.7,3.8,2c0.5,0.6,1.2,0.9,2.2,1l1.8-0.2l1.2-1.3c2.4-0.3,3.6,0.6,3.6,2.8l0,0l0.1-0.1c0.1-0.2,0.2-0.4,0.4-0.4l0.2-0.1l0.5-0.4l1.9-0.5l0.5-0.6l0.6-1.5l0.2-0.1h1.6l1.5-0.3l0.2-0.2l1.1-2.6c0-0.3,0.2-0.5,0.5-0.6c0.7-0.2,1.4-0.5,2.2-1.1l0.4-0.3l0.9-0.9l0.4-0.4l1.1-1.2l1.7-2.9l1.2-2.9c0.5-0.9,1-1.6,1.7-2.1l0.1-0.1h0.2l0,0l0.8-0.7l0.3-1.3v-1.7c-0.1-0.3,0.1-0.6,0.4-0.9l0.3-0.4l2.9-2.9c1.1-1.3,1.8-2.9,2.3-4.7l0.2-0.6l0.6-0.7l-0.2-0.2l-3.8-0.3l-0.3-0.3l-0.3-0.5l-1.4-1.2l-1.5-0.1l-0.3-0.2l-0.2-0.8l0.5-3.5v-1.7l-0.3-1l-0.2-0.2l-1.8-1.8v-0.3l-0.5-5.2c-0.5-0.5-1.2-0.8-2.1-0.7h-0.3H305.4z" },
    taiwan: { id: 100076, name: "台湾", x: 400, y: 314, color: '#CCEEEE', path: "M410.4,301.1l-0.2-1c-0.6-1.8-1.8-2.8-3.9-2.9l-6.4,3.8l-0.1,3.2l-0.2,0.7c-1.5,1.5-2.5,3.5-3,5.7l-1.2,1.1l-0.3,1.1c-0.5,1.5-0.7,3.1-0.9,4.7l-0.1,0.4l-0.2,0.8l-1.7,1.5c0.4,0.9,1.2,1.6,2.2,2.2l1.5,1.4l0.2,0.3c0.3,0.8,1,1.4,1.8,2l0.7,0.4l1,0.5l0.7,0.8l1.8,4.5h1.8l0.5-6.6c-0.1-0.4,0-0.8,0.4-1.2c1.1-1.4,2.1-3,2.7-4.7c0.8-2.4,1.1-4.6,1.1-6.9c0-1.4,0.3-2.5,0.8-3.7c0.7-1.6,1-3.3,1.2-5L410.4,301.1z" },
    xianggang: { id: 38, name: "香港", x: 356, y: 336, color: '#BBEECC', path: "M338.9,328.8l0.4-0.7l-1.9-1l-3-0.5c-1.1,0-2.3,0.4-3.5,0.9l1.5,2.1l0.1,0.3c0.6,0.8,1.3,1.3,2.3,1.5h1.1L338.9,328.8z" },
    aomen: { id: 39, name: "澳门", x: 328, y: 346, color: '#BBEEFF', path: "M328.5,329.2h-0.7c-1.2,0.6-1.7,1.4-1.7,2.6c0,0.8,0.2,1.3,0.4,1.7l2.6-0.2L328.5,329.2z" },
    hainan: { id: 100001, name: "海南", x: 292, y: 364, color: '#DDEEFF', path: "M294.6,356.8c-0.6-0.6-1.2-0.9-2-1c-2.5-0.7-5,0-7.1,1.7l-0.7,1.5l-2.5,1.1c-3,1-4.2,3.1-3.8,6.5l0.6,2.1c1,2.4,2.5,4.1,4.3,4.9c1.7,0.8,3.7,1,6,0.7l2.2-0.7l5.8-3l1.9-2.3c0.6-1.1,0.8-2.2,0.3-3.3l0.2-1.2l2.9-3.3c0.4-0.8,0.4-1.7,0.1-2.7l-0.4-0.5l-1.3-0.7L294.6,356.8z" },
    shanghai: { id: 2, name: "上海", x: 414, y: 240, color: '#CCEEFF', path: "M399.1,235.1l-0.5-0.5l-0.2-0.2l-0.1-0.1l-0.4-0.1l-0.5,0.1v0.1h-0.2l-0.1,0.1v0.1h-0.3l-0.4,0.2l0.2,0.1l-0.2,0.1v0.2l-0.2,0.3h-0.1l0,0l0.1,0.1l0.1,0.2l0.1,0.1v0.1l0.1,0.2l-0.1,0.1l0,0l0,0h-0.2h-0.1l0,0v-0.1l-0.2,0.1l-0.2,0.3l0.2,0.4v0.5h-0.3v0.1l0,0l0,0l0,0h-0.2v0.1l-0.5-0.1h-0.4c-0.3,0-0.4,0.1-0.4,0.3v0.1l0.1,0.1l0.2,0.4v0.2l0,0l0.1,0.1h0.3l0.1-0.1c0,0,0.2,0.1,0.2,0.2l0.2,0.6l-0.1,0.4l0.1,0.2v0.2l-0.2,0.2v0.1h0.2l0.1-0.1l0.2,0.1l0,0l0.1-0.1l0.2-0.2h0.2l0.2,0.1v0.2v0.1v0.2v0.1h0.1l0.2,0.1h0.3l0.1-0.1l0.1,0.2l0.3,0.3v0.2v0.1h0.4l0.1-0.1l0.3-0.2l0.4-0.3v-0.1V241l0.3-0.2v-0.1l0.5-0.1l0.2-0.1h0.1c0.1-0.1,0.2-0.2,0.4-0.2l0.4,0.1l0.4-0.1h0.8l0.6-0.1l0.1-0.2l0.2-0.5l-0.2-0.7l-0.4-0.7l-0.1-0.2v-0.2l-0.1-0.1l-0.2-0.3l-0.1-0.2l-0.1-0.2l-0.1-0.3l-0.4-0.4l-0.2-0.2l-0.3-0.2l-0.2-0.1l-0.2-0.2l-0.4-0.2l-0.3-0.1v-0.1H399.1z" }
}
var mapDataWorld = {
    NA: {id:'na',name: "北美洲",x:186,y:80, color: "#ffdddc", path: "M 276.41 13.82 C 287.68 12.15 299.09 11.94 310.42 10.82 C 305.08 13.66 299.33 15.65 293.36 16.66 C 287.36 17.48 282.42 21.44 276.66 22.94 C 272.64 22.45 268.49 22.35 264.62 21.06 C 267.8 20.96 271.03 21.18 274.13 20.26 C 273.29 19.66 272.45 19.09 271.59 18.51 C 273.29 18.66 274.99 18.78 276.7 18.78 C 276.13 17.89 275.55 17 274.98 16.11 C 279.61 15.8 284.7 17.35 288.91 14.82 C 284.81 13.94 280.54 14.48 276.41 13.82 Z M 357.27 11.19 C 365.45 9.34 372.86 14.75 381.01 13.78 C 377.41 15.32 372.66 15.02 370.15 18.35 C 368.9 21.94 367.22 25.9 363.45 27.45 C 361.18 28.77 358.52 28.89 355.98 29.18 C 358.24 30.81 360.65 32.29 362.66 34.26 C 359.74 34.86 357.32 33.04 354.83 31.89 C 354.39 33.22 353.72 34.45 352.96 35.62 C 354.55 35.61 356.14 35.5 357.73 35.4 C 358.15 35.86 358.58 36.33 359.02 36.78 C 353.76 37.86 348.48 38.78 343.14 39.34 C 340.16 40.26 337.61 42.15 334.83 43.52 C 331.37 44.86 327.23 44.54 324.3 47.1 C 320.67 49.54 319.68 54.41 315.83 56.58 C 314.42 57.83 312.73 56.54 311.32 56.08 C 309.48 55.28 307.54 54.18 306.66 52.27 C 305.79 50.34 306.31 48.18 306.24 46.14 C 306.23 44.53 306.03 42.6 307.42 41.46 C 309.38 39.51 312.74 38.69 313.54 35.79 C 313.46 33.29 311.24 31.62 310.38 29.38 C 309.13 26.98 308.18 23.68 305.2 22.97 C 301.16 22.24 296.98 22.91 292.97 21.98 C 293.04 21.02 293.11 20.08 293.17 19.13 C 296.57 18.74 300.05 18.62 303.34 17.54 C 307.58 16.36 311.38 13.83 315.82 13.36 C 321.8 12.11 327.78 14.66 333.77 13.52 C 341.58 12.49 349.36 11.07 357.27 11.19 Z M 261.18 16.59 C 264.35 15 268.25 12.91 271.55 15.4 C 268.54 17.82 264.67 18.11 261.18 16.59 Z M 258.3 22.63 C 260.66 23 262.8 24.38 265.22 24.37 C 268.39 24.38 271.62 24.02 274.74 24.7 C 268.77 28.74 261.48 25.5 254.94 25.46 C 255.9 24.37 256.82 23.04 258.3 22.63 Z M 202.58 27.31 C 206.1 25.75 210.06 27.26 213.58 27.96 C 207.46 28.82 201.84 31.35 196.16 33.63 C 195.55 32.94 194.94 32.25 194.34 31.56 C 197.09 30.17 199.78 28.62 202.58 27.31 Z M 232.91 29.94 C 236.55 30.12 239.85 28.42 243.22 27.36 C 242.07 29.88 239.97 32.38 236.94 32.3 C 235.47 31.76 234.24 30.74 232.91 29.94 Z M 243.9 30.55 C 245.8 27.34 249.77 27.55 252.98 28.14 C 250.16 29.54 247.02 30.26 243.9 30.55 Z M 251.01 34.12 C 252.92 30.42 256.99 28.66 260.85 27.68 C 259.92 29.18 258.99 30.69 258.13 32.23 C 261.18 30.99 264.63 27.32 268.01 29.37 C 269.44 30.14 270.8 31.05 272.22 31.88 C 273.2 31.58 274.18 31.28 275.17 30.98 C 276.98 33.58 279.9 34.82 282.83 35.78 C 283.02 37.02 283.02 38.35 283.65 39.49 C 284.94 40.89 286.57 41.93 288.04 43.13 C 287.23 44.05 286.42 44.97 285.61 45.88 C 283.28 45.07 280.92 43.97 278.4 44.3 C 279.3 46.38 280.01 48.63 279.28 50.88 C 277.31 50.02 275.19 49.29 273.01 49.72 C 274.26 50.79 275.55 51.82 276.81 52.88 C 272.17 54.18 268.71 50.56 266.26 47.21 C 263.61 47.42 260.93 47.9 258.27 47.46 C 261.62 45.58 265.82 46.74 269.13 44.7 C 271.42 43.34 274.16 43.91 276.66 43.33 C 273.13 40.98 271.7 35.9 267.55 34.58 C 262.14 36.14 256.43 35.17 251.01 34.12 Z M 203.74 31.39 C 206.72 30.1 209.98 29.19 213.26 29.54 C 215.88 29.62 218.54 30.18 221.14 29.61 C 221.42 30.38 221.7 31.15 221.99 31.92 C 223.78 30.79 225.56 29.63 227.48 28.74 C 226.86 30.39 226.13 32.01 225.33 33.59 C 226.16 34.1 227.83 35.1 228.66 35.62 C 226.99 36.33 225.36 37.15 223.62 37.67 C 221.29 38.16 218.94 36.87 216.62 37.5 C 214.5 38.07 212.43 38.94 210.2 38.95 C 207.29 38.64 204.66 37.35 202 36.23 C 204.81 35.86 207.75 35.99 210.46 34.99 C 208.03 34.58 205.6 34.28 203.18 33.97 C 204.41 33.6 205.64 33.22 206.87 32.85 C 205.83 32.35 204.78 31.87 203.74 31.39 Z M 237.35 35.2 C 239.57 34.18 241.72 32.92 244.14 32.38 C 244.29 34.04 243.94 35.7 244.24 37.34 C 245.38 37.78 246.59 37.92 247.77 38.15 C 247.25 39.47 246.78 40.8 246.42 42.18 C 250.91 40.55 254.53 36.28 259.69 37.34 C 258.12 39.91 256.22 42.82 252.98 43.3 C 248.59 43.89 244.2 45.19 239.74 44.66 C 240.47 45.7 241.22 46.73 241.97 47.76 C 238.89 48.37 235.79 48.87 232.66 49.15 C 231.29 52.35 227.34 52.79 224.69 54.46 C 222.11 55.96 218.73 57.41 218.33 60.76 C 219.12 62.49 220.1 64.46 222.02 65.15 C 226.18 66.84 230.33 68.52 234.58 69.99 C 233.89 71.82 232.91 73.62 232.76 75.6 C 232.95 76.92 233.58 78.13 234.07 79.36 C 235.68 78.58 237.85 78.14 238.61 76.3 C 239.66 74.42 239.87 71.8 242.04 70.76 C 244.1 69.22 246.69 68.33 248.39 66.37 C 250.16 64.37 248.78 61.22 250.86 59.35 C 252.64 57.26 253.65 54.18 256.29 52.98 C 260.3 51.99 264.33 53.86 267.28 56.51 C 266.87 57.82 266.46 59.11 266.04 60.41 C 266.69 60.97 268 62.09 268.65 62.64 C 271.37 61.06 274.03 59.38 276.65 57.62 C 277.23 61.88 276.78 66.35 279.02 70.25 C 278.39 70.99 277.78 71.75 277.19 72.53 C 279.21 72.32 281.19 72.02 283.21 71.77 C 283.86 72.4 284.53 73.02 285.19 73.64 C 282.97 77.46 278.48 78.99 274.48 80.18 C 269.54 81.89 264.22 79.9 259.37 81.94 C 256.58 82.93 254 84.41 251.36 85.74 C 251.56 86.26 251.75 86.77 251.95 87.3 C 255.48 85.28 259.31 83.9 263.43 83.88 C 262.3 85.58 261.02 87.18 259.64 88.7 C 260.44 89.74 261.11 90.94 262.24 91.67 C 264.21 92.3 266.36 91.94 268.4 92.09 C 264.3 94.48 259.78 96.18 255.1 97 C 257.09 95.54 259.21 94.27 261.26 92.9 C 258.81 92.36 256.36 93.04 254.07 93.87 C 254.14 91.78 254.35 89.7 254.38 87.61 C 250.42 87.89 248.06 91.3 244.75 92.9 C 238.77 93.46 232.87 94.94 227.48 97.66 C 224.72 99.17 221.66 99.9 218.62 100.6 C 220.82 98.16 223.28 95.58 226.66 94.99 C 226.94 94.46 227.22 93.94 227.5 93.42 C 226.54 92.58 225.67 91.5 224.42 91.08 C 223.22 91.1 222.06 91.48 220.9 91.74 C 219.9 89.63 219.82 87.06 218.2 85.3 C 216 84.08 213.52 85.56 211.34 85.95 C 207.62 87.4 204.32 84.05 200.67 83.77 C 182.12 84.04 163.57 84.22 145.02 83.78 C 143.64 81.41 141.7 79.44 139.88 77.42 C 140.25 75.9 140.33 74.36 140.46 72.82 C 140.55 70.18 144.36 69.51 144.1 66.72 C 143.95 64.38 144.98 61.48 143.26 59.58 C 140.79 59.14 137.04 59.41 136.58 56.09 C 143.5 50.06 150.97 44.64 158.08 38.8 C 160.56 36 164.38 37.94 167.5 37.8 C 173.15 38.35 178.55 35.7 184.2 35.87 C 190.14 36.93 196.22 37.18 202.08 38.7 C 201.5 39.3 200.91 39.89 200.34 40.48 C 203.14 40.52 205.97 40.52 208.78 40.44 C 209.24 41.22 210.14 42.82 210.6 43.61 C 212.84 41.18 216.1 39.1 219.53 39.66 C 223.52 40.68 227.86 40.38 231.66 42.13 C 234.47 40.65 237.39 39.3 239.96 37.42 C 239.09 36.67 238.22 35.94 237.35 35.2 Z M 122.96 37.21 C 129.07 34.91 135.66 34.06 142.16 33.86 C 148.06 34.5 153.95 35.35 159.78 36.44 C 151.73 42.95 143.62 49.4 135.38 55.7 C 136.14 57.06 136.93 58.38 137.74 59.7 C 139.42 59.78 141.11 59.68 142.77 60.01 C 143.97 61.58 143.41 63.66 143.4 65.47 C 143.42 67.06 142.86 68.54 142.11 69.91 C 141.35 67.39 142.43 64.28 140.61 62.17 C 135.38 58.84 129.39 56.31 123.17 55.79 C 119.74 56.61 116.26 57.34 112.74 57.69 C 108.82 58.8 105.31 61.04 101.43 62.32 C 95.99 64.26 90.9 67.49 84.98 67.77 C 89.78 65.37 95.4 64.24 99.34 60.39 C 97.02 60.58 94.67 60.73 92.42 60.02 C 93.49 58.88 95.01 58.08 95.82 56.7 C 96.18 55.54 96.01 54.29 96.04 53.09 C 99.83 51.75 103.78 50.96 107.65 49.85 C 109.23 49.34 110.65 48.25 111.43 46.78 C 108.32 47.13 105.13 47.63 102.14 46.33 C 106.48 43.53 111.81 44.14 116.59 42.83 C 115.74 41.64 114.88 40.46 114.05 39.26 C 117.01 38.5 120.06 38.18 122.96 37.21 Z M 230.6 37.41 C 232.54 36.82 234.58 36.55 236.61 36.86 C 235.08 37.69 233.54 38.5 232 39.31 C 231.53 38.67 231.06 38.04 230.6 37.41 Z M 242.56 49.24 C 244.03 48.19 245.27 46.65 247.01 46.02 C 248.87 46.14 250.5 47.22 252.1 48.07 C 251.9 48.74 251.69 49.42 251.48 50.1 C 248.63 48.82 245.54 49.5 242.56 49.24 Z M 100.51 64.76 C 102.51 64.06 104.56 63.58 106.6 63.06 C 104.63 63.84 102.6 64.43 100.51 64.76 Z M 137.81 63.56 C 138.93 63.83 137.94 65.79 137.03 65.1 C 136.45 64.55 137.08 63.5 137.81 63.56 Z M 137.08 68.39 C 137.88 67.94 138.68 67.49 139.49 67.04 C 139.26 68.06 139.04 69.1 138.81 70.12 C 138.22 69.54 137.65 68.97 137.08 68.39 Z M 273.19 87.37 C 276.08 84.56 278.91 81.67 282.08 79.18 C 281.58 80.1 281.07 81.01 280.56 81.91 C 282.74 83.35 285.09 84.62 286.61 86.83 C 282.18 87.62 277.66 88.18 273.19 87.37 Z M 136.89 80.96 C 137.65 80.58 138.41 80.2 139.17 79.82 C 140.7 81.51 141.94 83.42 143.09 85.38 C 140.37 85.05 138.14 83.35 136.89 80.96 Z M 198.25 84.44 C 201.82 83.96 204.91 86.04 208.22 86.98 C 206.99 87.88 205.79 88.81 204.62 89.78 C 206.82 90.5 209.04 89.99 211.22 89.57 C 213.67 89.66 216.05 90.49 218.48 90.83 C 216.21 91.72 213.6 91.98 211.62 93.46 C 209.66 95.81 208.22 98.55 206.7 101.21 C 207.36 101.88 208.02 102.55 208.69 103.23 C 212.1 99.33 213.91 92.87 220.04 92.6 C 218 95.9 218.94 99.84 217.89 103.42 C 222.27 102.04 226.17 99.46 230.55 98.06 C 233.19 97.06 235.43 95.06 238.26 94.59 C 241 93.92 244.34 94.61 246.6 92.56 C 248.74 90.84 250.98 89.23 253.56 88.22 C 253.46 90.18 253.39 92.13 253.44 94.09 C 250.38 95.88 246.34 96.7 244.32 99.86 C 242.41 102.76 238.47 102.89 235.75 104.75 C 233.05 106.66 229.98 108.46 228.62 111.63 C 228.12 111.14 227.62 110.62 227.13 110.13 C 226.45 112.73 226.9 115.61 225.51 118 C 221.42 122.46 214.73 123.81 211.3 128.98 C 209.26 133.96 213.34 139.7 209.86 144.38 C 207.5 142.22 206.81 138.98 207.05 135.89 C 207.3 133.94 205.76 132.25 203.84 132.06 C 201.38 131.57 199.05 130.59 196.58 130.18 C 194.26 130.09 192.94 132.32 191.26 133.54 C 188.17 133.53 185.16 130.67 182.13 132.29 C 179.46 133.68 176.66 134.92 174.26 136.75 C 172.82 138.26 172.28 140.35 171.33 142.16 C 168.61 139.28 167.59 135.37 165.83 131.91 C 163.9 132.26 162.02 132.71 160.13 133.19 C 158.98 131.15 158.42 128.33 156 127.4 C 151.8 127.02 147.42 128.74 143.38 127.06 C 138.42 125.14 132.38 124.89 128.96 120.26 C 127.87 117.24 127.77 113.99 127.17 110.86 C 126.81 109.13 126.98 107.26 127.72 105.65 C 129.86 101.81 132.29 98.14 134.95 94.66 C 136.98 91.9 137.95 88.31 140.88 86.28 C 141.24 87.26 141.59 88.26 141.97 89.23 C 143.1 87.73 144.18 86.19 145.27 84.65 C 162.93 84.42 180.59 84.69 198.25 84.44 Z M 278.39 88.69 C 279.06 88.1 279.8 89.26 279.14 89.72 C 278.48 90.34 277.72 89.14 278.39 88.69 Z M 249.84 123.82 C 250.56 124.2 250.56 124.58 249.82 124.96 C 249.1 124.58 249.1 124.2 249.84 123.82 Z M 133.67 125.08 C 137.81 125.11 141.42 127.22 145.26 128.43 C 148.77 129.08 152.33 128.41 155.76 127.63 C 157.56 129.58 158.42 132.17 160.22 134.1 C 161.85 133.74 163.36 132.88 165.06 132.83 C 167.96 135.68 167.6 140.9 171.7 142.82 C 170.85 145.24 169.9 147.63 169.28 150.13 C 169.48 153.97 170.51 158.13 173.57 160.75 C 175.85 162.5 178.94 161.66 181.34 160.6 C 183.92 159.62 184.86 156.91 186.46 154.94 C 188.43 153.38 191.06 153.7 193.39 153.74 C 192.52 155.67 192.27 158.29 190.34 159.5 C 187.66 160.93 184.25 161.7 182.65 164.54 C 181.5 166.29 180.09 167.86 178.91 169.61 C 182.18 167.62 183.54 163.82 186.66 161.7 C 186.49 163.77 186.27 165.82 186.06 167.88 C 186.46 167.88 186.84 167.88 187.23 167.88 L 188.02 167.88 C 186.42 169.62 185.06 171.63 183.09 172.98 C 179.86 171.89 178.07 168.66 175.27 166.91 C 172.74 165.95 170.18 168.56 167.63 167.28 C 161.6 164.77 155.43 162.06 150.75 157.36 C 151.42 154.68 152.2 151.62 150.41 149.18 C 146.42 143.74 142.51 137.99 140.77 131.38 C 140.94 128.89 138.9 127.92 137.08 127.14 C 136.32 129.14 136.09 131.37 137.14 133.33 C 139.72 138.38 140.67 144.01 142.38 149.38 C 140.47 147.18 138.05 144.98 138.5 141.81 C 137.49 140.65 135.86 139.77 135.57 138.16 C 135.62 133.69 133.12 129.63 133.67 125.08 Z M 214.35 139.54 C 215.27 138.72 216.38 140.12 215.23 140.74 C 214.38 141.62 213.42 140.12 214.35 139.54 Z M 217.5 139.82 C 218.28 139.38 218.96 140.74 218.27 141.22 C 217.5 141.63 216.82 140.29 217.5 139.82 Z M 213.26 144.29 C 213.78 143.72 214.28 143.14 214.78 142.58 C 215.04 143.8 215.32 145.01 215.58 146.23 C 214.81 145.59 214.04 144.94 213.26 144.29 Z M 198.99 152.12 C 202.46 148.8 207.97 148.78 212.14 150.75 C 215.73 152.55 219.38 154.3 222.63 156.68 C 219.42 157.37 216.16 156.89 212.93 156.66 C 213.24 156.13 213.54 155.6 213.86 155.07 C 211.09 153.58 208.48 151.47 205.34 150.87 C 203.15 150.8 201.1 151.74 198.99 152.12 Z M 225.92 150.14 C 226.47 149.86 227.37 149.85 227.69 150.47 C 227.75 151.82 224.35 151.24 225.92 150.14 Z M 222.44 151.69 C 223.57 151.54 223.43 153.27 222.38 153.14 C 221.25 153.26 221.42 151.6 222.44 151.69 Z M 224.66 157.49 C 228.27 156.81 227.74 159.9 228.14 162.08 C 225.43 161.55 222.68 161.55 219.95 161.26 C 221.84 161.03 223.75 160.79 225.62 160.39 C 225.3 159.42 224.98 158.46 224.66 157.49 Z M 228.54 157.58 C 230.79 158.19 232.94 159.14 234.89 160.43 C 232.75 160.92 230.62 161.41 228.49 161.9 C 228.5 160.82 228.53 158.66 228.54 157.58 Z M 187.23 167.88 C 187.14 164.7 187.37 161.29 190.34 159.5 C 189.77 162.45 188.45 165.15 187.23 167.88 Z M 243.12 160.23 C 243.97 160.48 243.37 161.75 242.62 161.42 C 241.77 161.18 242.38 159.94 243.12 160.23 Z M 211.1 161.02 C 212.95 161.1 214.85 161.44 216.6 162.09 C 214.63 162.41 212.77 161.98 211.1 161.02 Z M 237.52 160.74 C 238.46 160.72 239.39 160.71 240.32 160.7 C 240.22 161.11 240.01 161.94 239.9 162.35 C 238.85 162.25 237.8 162.13 236.76 162.01 C 236.95 161.69 237.34 161.06 237.52 160.74 Z M 248.3 163.04 C 249.09 162.8 249.36 163.06 249.12 163.86 C 248.33 164.1 248.06 163.82 248.3 163.04 Z M 250.96 163.18 C 253.2 162.73 250.49 165.42 250.96 163.18 Z M 246.14 164.23 C 246.63 163.59 247.73 164.41 247.22 165.05 C 246.73 165.69 245.62 164.87 246.14 164.23 Z M 251.49 165.94 C 252.34 165.94 252.18 167.3 251.39 167.26 C 250.54 167.26 250.69 165.89 251.49 165.94 Z M 186.65 169.97 C 190.14 167.47 194.63 167.58 198.74 167.93 C 198.94 168.72 199.16 169.52 199.38 170.32 L 198.94 170.4 C 195.38 170.57 192.35 172.46 189.49 174.35 C 189.54 173.59 189.6 172.84 189.66 172.08 C 188.65 171.38 187.65 170.68 186.65 169.97 Z M 253.2 170.3 C 253.92 170.68 253.92 171.06 253.18 171.44 C 252.46 171.06 252.46 170.68 253.2 170.3 Z M 185.99 170.87 C 186.92 171.28 187.86 171.67 188.79 172.07 C 188.59 172.8 188.39 173.54 188.21 174.28 C 186.87 174.06 185.54 173.83 184.21 173.6 C 184.81 172.7 185.4 171.78 185.99 170.87 Z M 189.62 175.56 C 192.37 173.26 195.52 171.48 198.94 170.4 C 198.56 173.7 198.14 177.02 197.63 180.32 C 194.47 179.69 191.6 178.14 189.62 175.56 Z M 256 174.38 C 258.24 173.93 255.53 176.62 256 174.38 Z M 229.68 175.5 C 231.92 175.05 229.21 177.74 229.68 175.5 Z M 232.55 175.58 C 233.18 175.06 234.01 176.17 233.37 176.66 C 232.73 177.17 231.9 176.07 232.55 175.58 Z M 192.58 179.47 L 195.38 180.42 C 198.78 180.78 199.81 184.7 202.86 185.65 C 204.37 185.55 205.74 184.81 207.12 184.28 C 207.3 184.39 207.66 184.62 207.84 184.73 C 206.44 185.74 205.27 187.03 204.58 188.62 C 202.88 188 201.25 187.22 199.61 186.46 C 199.68 185.69 199.76 184.93 199.83 184.17 C 199.41 184.9 198.99 185.63 198.58 186.37 C 196.42 184.26 192.97 182.83 192.58 179.47 Z M 248.43 181 C 249.03 180.94 249.64 180.87 250.25 180.81 C 250.03 181.54 249.82 182.29 249.61 183.03 C 248.94 183.08 248.28 183.14 247.62 183.19 C 247.9 182.46 248.17 181.74 248.43 181 Z"    },
    SA: {id:'sa',name: "南美洲", x: 260, y: 250, color: "#ef8c67", path: "M 219.79 180.08 C 222.1 178.9 224.39 177.67 226.79 176.68 C 226.06 177.36 225.3 178.02 224.62 178.74 C 223.02 180.55 221.03 182.85 222.18 185.39 C 223.34 190.68 229.54 191.44 233.92 192.85 C 233.98 195.54 234.1 198.24 233.9 200.93 C 234.42 201.37 234.94 201.82 235.46 202.26 C 234.84 198.98 234.44 195.64 234.37 192.3 C 230.48 190.6 224.42 190.43 223.02 185.63 C 221.88 183.22 223.4 180.78 224.62 178.74 C 224.74 178.57 224.96 178.21 225.07 178.02 C 224.98 180.66 224.7 183.38 225.68 185.9 C 227.26 184.38 227.67 182.29 227.01 180.24 C 228.44 179.48 230.06 177.46 231.75 178.74 C 234.87 180.8 238.5 182.3 242.29 182.28 C 246.23 182.18 249.77 184.53 252.82 186.77 C 254.85 189.02 256.63 191.54 259.2 193.25 C 258.27 194.12 257.26 194.98 256.7 196.16 C 256.78 198.38 257.94 200.38 258.51 202.5 C 256.81 203.11 255.1 203.74 253.42 204.38 C 251.88 201.82 251.62 198.92 252.42 196.09 C 252.07 195.82 251.73 195.56 251.38 195.3 C 251.18 198.69 250.72 202.29 253.05 205.13 C 258.02 203.13 263.33 202.04 268.72 202.6 C 269.81 200.88 270.89 199.17 271.99 197.46 C 272.9 199.9 274.18 202.26 274.62 204.83 C 273.58 207.78 270.67 209.54 269.06 212.15 C 271.82 211.46 273.56 208.91 276.14 207.86 C 277.35 207.89 278.24 208.98 279.22 209.6 C 277.76 210.75 276.3 211.9 274.84 213.08 C 277.74 213.44 279.88 211.28 282.35 210.22 C 284.16 210.37 285.73 211.47 287.42 212.07 C 287.5 213.33 287.54 214.58 287.62 215.84 C 290.52 214.75 293.7 214.46 296.74 215.09 C 301.98 216.22 304.9 221.66 310.5 222.1 C 310.78 224.57 311.58 227.3 310.23 229.61 C 308.05 233.3 305.53 236.8 302.98 240.25 C 301.85 241.6 302.14 243.42 302.1 245.08 C 302.49 251.02 301.18 257.01 298.83 262.45 C 298.06 264.43 296.39 266.35 294.08 266.26 C 289.48 266.35 285.82 269.66 282.28 272.15 C 282.74 274.3 283.5 276.59 282.63 278.76 C 281 283.06 278.84 287.14 276.64 291.17 C 272.84 288.26 268.66 285.88 265.21 282.54 C 267.4 280.09 270.27 278.08 271.53 274.94 C 270.78 272.37 270.26 269.14 267.6 267.82 C 265.43 266.38 263.16 265.08 260.94 263.74 C 260.48 261.66 259.5 259.68 259.38 257.54 C 259.55 255.46 260.9 253.2 259.5 251.26 C 258.46 248.98 255.82 248.56 253.98 247.2 C 252.84 245.82 252.55 243.88 251.32 242.57 C 248.57 240.81 245.38 239.9 242.46 238.5 C 240.63 236.9 240.1 234.37 239.3 232.17 C 236.51 232.98 233.86 234.23 231.31 235.62 C 232.13 239.96 232.02 244.41 232.62 248.78 C 232.95 250.93 231.32 252.62 230.23 254.29 C 227.06 251.7 223.69 249.42 220.14 247.4 C 216.88 245.86 216.14 242.07 214.13 239.41 C 211.45 235.7 209.58 231.5 207.69 227.37 C 206.3 224.52 202.8 222.78 203.05 219.19 C 203.66 217.5 204.84 216.08 205.73 214.54 C 204.81 213.91 203.9 213.27 202.99 212.63 C 204.22 209.85 205.6 207.14 207.23 204.58 C 210.39 206.38 213.78 207.7 217.22 208.87 C 214.5 212.75 210.15 215.16 207.75 219.3 C 206.41 219.03 205.06 218.77 203.71 218.52 C 205.13 219.22 206.54 219.9 207.98 220.59 C 209.97 215.78 215.69 213.93 217.22 208.87 C 218.51 210.38 219.76 211.94 221.26 213.27 C 223.18 214.26 225.36 214.22 227.44 214.5 C 227.17 215.69 226.9 216.88 226.64 218.07 C 225.04 218.7 223.27 219.13 221.96 220.3 C 221.21 222.66 219.35 225.4 220.58 227.94 C 221.42 230.06 222.9 231.98 225.09 232.77 C 227.28 233.51 229.07 234.97 230.92 236.32 C 228.99 233.18 225.5 231.79 222.53 229.9 C 219.89 227.23 220.96 223.3 222.78 220.54 C 224.58 219.04 227.09 218.86 229.34 219.03 C 230.79 214.07 229.47 208.96 230.08 203.92 C 231.76 203.58 233.44 203.19 234.98 202.43 C 233.05 202.64 231.14 202.9 229.22 203.2 C 229.14 205.71 228.7 208.27 229.44 210.74 C 230.2 213.3 229.3 215.92 228.97 218.49 C 228.49 218.06 228.02 217.64 227.54 217.22 C 227.88 216.26 228.22 215.29 228.55 214.33 C 226.73 213.96 224.85 213.84 223.04 213.39 C 219.99 212.36 219 208.53 215.9 207.57 C 213.24 206.59 210.62 205.47 208.1 204.18 C 211.21 200.52 213.13 195.48 211.29 190.75 C 210.53 188.69 213.34 187.67 214.14 186.14 C 216.06 184.16 217.26 181.39 219.79 180.08 M 250.71 195.14 C 250.48 193.93 250.2 192.72 249.9 191.52 C 250.71 189.87 251.5 188.22 252.23 186.54 C 249.58 188.58 248.72 192.33 250.71 195.14 M 241.31 197.31 C 241.66 199.05 242.29 200.77 242.21 202.56 C 241.86 204.22 240.09 205.06 238.58 205.37 C 237.17 204.82 236.06 203.75 234.86 202.88 C 235.85 204.26 236.94 205.55 238.08 206.82 C 239.98 205.5 241.88 204.18 243.69 202.74 C 243.08 201.13 242.47 199.52 241.86 197.91 C 245.06 199.34 247.91 197.21 250.46 195.45 C 247.56 196.66 244.54 197.87 241.31 197.31 Z M 207.12 184.28 C 208.94 184.36 210.89 184.7 212.21 186.08 C 212.27 187.4 211.08 188.24 210.35 189.18 C 210.52 188.29 210.7 187.4 210.9 186.53 C 209.88 185.93 208.85 185.34 207.84 184.73 C 207.66 184.62 207.3 184.39 207.12 184.28 Z M 259.2 193.25 C 261.13 193.42 263.08 193.43 265.02 193.31 C 264.59 195.81 265.4 198.49 264.27 200.86 C 262.66 201.5 261.03 202.04 259.41 202.62 C 258.71 200.62 258.04 198.63 257.3 196.66 C 257.94 195.53 258.6 194.4 259.2 193.25 Z M 265.82 193.28 C 267.75 194.25 269.55 195.42 271.38 196.58 C 269.9 199.16 268.83 202.8 265.02 202.49 C 265.62 199.44 265.36 196.34 265.82 193.28 Z M 232.09 236.14 C 234.26 234.94 236.48 233.83 238.75 232.86 C 239.57 235.01 240.12 237.48 241.9 239.07 C 244.67 240.5 247.77 241.31 250.48 242.9 C 251.96 244.15 252.19 246.3 253.43 247.76 C 255.14 249.08 257.64 249.42 258.73 251.47 C 259.92 252.9 259.38 254.77 259.01 256.38 C 256.82 256.5 254.38 255.8 252.37 256.83 C 250.17 258.76 249.54 262.16 246.96 263.73 C 244.15 264.61 241.13 263.98 238.26 264.54 C 235.74 260.82 234.32 256.48 233.36 252.13 C 233.34 246.79 232.9 241.42 232.09 236.14 Z M 230.4 254.77 C 231.08 254.16 231.76 253.56 232.45 252.96 C 234.4 257.33 235.66 262 238.18 266.12 C 237.62 270.01 237.86 274.07 236.42 277.79 C 234.69 282.49 235.44 287.7 237.38 292.22 C 238.79 296.05 237.34 300.11 238.46 303.98 C 239.27 307.31 239.58 310.82 240.98 313.98 C 242.09 316.52 243.54 318.9 244.52 321.5 C 245.94 325.3 245.5 329.43 246.41 333.31 C 247.71 335.58 249.95 337.18 252.05 338.68 C 253.9 338.99 255.82 338.83 257.7 338.85 C 256.4 339.82 255.12 341.57 253.28 341.06 C 250.57 341.03 248.82 338.75 247.1 336.98 C 243.88 333.58 243.51 328.16 239.45 325.48 C 240.41 324.3 241.71 323.09 241.66 321.46 C 240.86 317.5 238.46 314.22 236.18 311.01 C 233.19 302.9 235.28 294.01 233.47 285.66 C 232.56 280.12 232.48 274.48 232.26 268.88 C 232.67 264.13 232.88 259.04 230.4 254.77 Z M 249.79 263.13 C 249.9 260.14 252.1 256.75 255.3 256.51 C 259.02 257.2 259.53 261.24 260.87 264.05 C 263.34 266.49 266.86 267.56 269.22 270.11 C 269.46 272.54 267.87 274.74 266.43 276.53 C 264.7 277.56 262.69 276.58 260.9 276.27 C 261.36 274.67 261.81 273.07 262.26 271.47 C 258.01 268.88 252.38 267.73 249.79 263.13 Z M 239.67 264.89 C 242.78 264.62 245.95 264.65 248.98 263.78 C 252 266.85 255.49 269.48 259.62 270.8 C 262.35 271.66 260.38 274.96 260.34 276.88 C 262.36 277.06 264.6 278.02 266.55 277.22 C 268.01 275.74 268.97 273.8 270.14 272.07 C 270.28 273.21 270.74 274.37 270.46 275.53 C 269.23 278.4 265.63 279.61 265 282.85 C 263.24 287.1 262.22 292.8 265.84 296.38 C 267.73 298.34 270.53 301.39 268.27 304.1 C 265.98 306.19 262.54 306.02 259.64 306.66 C 259.9 308.61 259.9 310.58 259.5 312.5 C 257.71 311.89 255.93 311.27 254.1 310.85 C 254.6 313.03 255.86 314.94 257.7 316.22 C 256.76 318.98 255.7 321.69 254.33 324.26 C 255.71 326.02 258.19 327.37 258.4 329.78 C 257.46 332.8 256.6 335.93 255.21 338.79 C 251.7 338.96 249.48 335.68 247.36 333.38 C 246.22 330.96 246.78 328.1 246.22 325.53 C 245.9 320 241.76 315.81 240.64 310.54 C 240.03 306.44 238.16 302.39 238.95 298.2 C 239.34 292.66 235.19 287.98 235.87 282.42 C 235.78 279.18 238.74 276.58 238.01 273.28 C 237.46 270.36 238.82 267.59 239.67 264.89 Z M 265.22 284.02 C 268.92 286.63 272.76 289.02 276.26 291.91 C 274.91 293.97 273.23 297.09 270.18 295.86 C 267.7 295.39 264.62 294.18 264.1 291.4 C 263.87 288.88 264.58 286.43 265.22 284.02 Z M 273.92 336.88 C 275.5 336.89 277.08 337.34 278.65 337.6 C 277.28 338.57 275.87 339.48 274.39 340.26 C 274.72 339.42 275.06 338.6 275.42 337.78 C 274.1 338.41 272.74 338.9 271.3 339.14 C 272.06 338.29 272.7 337.11 273.92 336.88 Z M 257.85 340.58 C 259.75 342.62 261.38 344.9 262.74 347.33 C 260.51 346.55 258.32 345.66 256.28 344.46 C 256.79 343.17 257.31 341.87 257.85 340.58 Z M 259.76 341.63 C 262.72 343.42 265.67 345.3 268.9 346.58 C 267.06 346.62 265.26 346.74 263.42 346.86 C 262.3 345.05 261.05 343.33 259.76 341.63 Z"    },
    EU: {id:'eu',name: "欧洲", x: 440, y: 70, color: "#ccdddd", path: "M 429.47 19.37 C 430.32 18.33 431.14 16.54 432.76 16.77 C 435.44 16.96 438.14 17.24 440.84 17.46 C 440.58 18.04 440.34 18.61 440.1 19.18 C 437.21 19.16 434.34 18.98 431.47 18.81 C 433.62 20.3 435.98 21.48 438.14 22.98 C 436.51 22.91 434.83 22.94 433.29 22.44 C 432.2 21.68 431.38 20.57 430.37 19.72 C 428.95 21.57 427.47 23.36 426.02 25.18 C 424.32 24.24 422.61 23.3 420.93 22.34 C 422.49 21.9 424.23 21.46 425.83 20.96 C 422.74 20.78 419.61 20.79 416.67 19.68 C 416.65 19.26 416.62 18.4 416.6 17.97 C 420.64 18 424.76 18.35 428.78 17.66 C 429.01 18.23 429.23 18.8 429.47 19.37 Z M 493.26 25.22 C 497.83 24.64 502.48 23.4 507.13 24.26 C 501.99 25.82 495.53 25.84 492.18 30.77 C 490.85 32.59 492.86 34.22 493.84 35.62 C 491.14 35.06 488.54 34.22 485.93 33.38 C 487.7 30.22 489.54 26.38 493.26 25.22 Z M 430.55 36.77 C 436.61 34.26 443.77 33.01 449.98 35.62 C 447.88 35.99 445.75 35.76 443.66 35.5 C 439.65 39.34 433.81 36.46 429.36 39.06 C 425.33 41.97 422.3 45.92 419.09 49.63 C 419.06 52.27 420.34 55.22 418.96 57.72 C 417.82 59.86 415.26 60.56 413.25 61.55 C 410.94 63.12 407.77 61.28 407.33 58.74 C 406.88 56.79 406.22 53.95 408.57 52.98 C 412.58 51.08 417.07 49.48 419.95 45.88 C 423.17 42.57 425.63 37.81 430.55 36.77 Z M 386.52 35.21 C 387.65 35.06 387.51 36.79 386.46 36.66 C 385.32 36.78 385.5 35.13 386.52 35.21 Z M 495.3 35.85 C 500.38 34.9 505.28 37.6 510.21 38.55 C 510.84 39.54 511.47 40.51 512.11 41.5 C 509.38 43.1 506.67 44.69 503.87 46.14 C 506.78 52.5 507.73 59.5 510.17 66.02 C 508.85 66.9 507.52 67.73 506.21 68.61 C 506.98 69.58 508.5 71.5 509.26 72.46 C 510.75 71.54 512.22 70.61 513.74 69.7 C 514.52 72.71 514.92 75.9 513.98 78.94 C 509.93 77.61 505.7 77.02 501.45 77.42 C 498.93 77.49 496.15 77.38 494.13 79.15 C 492.21 80.87 488.84 82.13 490.18 85.39 C 492.25 87.33 494.45 89.17 496.64 90.98 C 495.09 92.46 493.52 93.92 492.08 95.5 C 494.81 99.52 498.93 102.77 500.17 107.64 C 497.4 106.58 494.67 105.39 491.91 104.34 C 492.4 103.79 492.92 103.25 493.44 102.71 C 494.75 102.9 496.08 103.05 497.42 103.12 C 491.45 100.26 485.23 97.69 478.61 96.96 C 483.4 98.57 488.31 99.79 492.94 101.89 C 492.5 102.39 492.08 102.9 491.66 103.41 L 491.29 103.27 C 488.46 102.16 485.5 101.42 482.66 100.35 C 479.32 98.53 476.14 96.43 472.86 94.5 C 473.73 91.43 474.85 88.45 476.61 85.76 C 477.7 84.17 475.94 82.2 474.37 81.79 C 470.79 80.86 466.96 79.94 464.23 77.27 C 462.74 75.59 460.38 75.98 458.35 75.82 C 458.76 72.98 457.81 70.23 456.34 67.82 C 454.43 67.63 452.56 67.42 450.66 67.25 C 452.35 67.88 454.22 68.09 455.79 69.02 C 458.02 70.86 457.89 74.11 457.84 76.71 C 453.09 79.48 447.81 76.34 442.78 77.34 C 442.73 76.1 442.7 74.86 442.67 73.63 C 444.41 72.86 446.34 72.26 447.44 70.56 C 448.45 69.14 450.72 67.43 449.76 65.42 C 449.56 64.79 449.31 64.18 449.08 63.58 C 449.05 65.11 449.02 66.65 448.85 68.18 C 445.04 66.34 440.86 65.78 436.68 66.33 C 436.94 65.46 437.2 64.59 437.46 63.72 C 438.9 64.07 440.34 64.46 441.75 64.87 C 442.17 64.37 442.58 63.86 443 63.37 C 442.14 62.21 441.28 61.05 440.47 59.86 C 442.8 59.73 445.14 59.65 447.49 59.7 C 447.87 60.72 448.26 61.74 448.66 62.77 C 448.44 60.54 449.63 58.77 451.4 57.54 C 446.68 56.11 441.28 58.68 436.98 55.82 C 434.79 53.12 438.5 50.35 439.58 48.15 C 441.6 45.12 438.6 41.7 437.28 38.9 C 439.89 38.8 442.04 37.35 444.18 36.03 C 445.03 36.21 445.9 36.38 446.77 36.56 C 448.12 41.9 449.84 47.1 452.07 52.13 C 451.41 53.86 450.1 55.22 449.12 56.77 C 450.89 55.42 452.34 53.7 453.59 51.87 C 449.46 48.05 450.41 41.92 447.34 37.54 C 448.52 37.02 449.72 35.93 451.09 36.29 C 457.11 38.87 464.74 37.5 469.72 42.46 C 464.59 44.61 459.25 42.44 454.02 42.35 C 456.73 44.78 458.91 47.98 462.37 49.46 C 463.66 49.74 464.96 49.09 466.22 48.83 C 465.2 48.03 464.15 47.26 463.1 46.5 C 464.76 46.7 466.71 47.88 468.21 46.64 C 470.21 45.09 472.54 44.08 474.8 42.96 C 474.46 41.76 474.12 40.56 473.81 39.36 C 475.64 40.04 477.05 41.53 478.85 42.27 C 481.75 41.81 484.09 39.62 487 39.17 C 491.41 39.02 495.88 39.59 500.26 38.76 C 500.38 38.48 500.63 37.9 500.76 37.62 C 499.04 36.74 497.11 36.45 495.3 35.85 M 443.29 62.17 C 444.86 62.94 446.51 63.48 448.23 63.83 C 446.66 63.06 444.99 62.52 443.29 62.17 Z M 432.8 38.46 C 435.35 37.35 437.69 39.92 438.33 42.18 C 439.04 44.12 436.77 45.37 435.79 46.59 C 433.14 49.34 429.73 51.25 427.31 54.25 C 428.7 55.81 430.27 57.2 431.85 58.58 C 430.08 60.1 428.21 61.65 427.34 63.9 C 426.45 66.14 424.46 68.35 421.86 68.24 C 419.72 66.29 419 63.31 417.68 60.85 C 418.69 59.3 419.66 57.7 420.28 55.94 C 420.11 54.07 419.88 52.22 419.59 50.37 C 423.49 46.02 426.91 40.23 432.8 38.46 Z M 357.98 46.42 C 361.6 45.26 365.39 44.85 369.17 44.54 C 370.7 44.4 372.02 45.33 373.36 45.94 C 370.54 48.31 366.98 49.78 363.3 50.02 C 361.28 49.7 359.46 48.7 357.46 48.27 C 357.63 47.65 357.79 47.03 357.98 46.42 Z M 386.13 52.16 C 386.72 51.48 387.98 52.48 387.22 53.12 C 386.6 53.71 385.41 52.82 386.13 52.16 Z M 432.66 57.49 C 433.41 57.39 434.17 57.28 434.93 57.18 C 434.9 57.78 434.89 58.38 434.89 58.99 C 434.14 58.49 433.39 57.99 432.66 57.49 Z M 386.54 69.3 C 386 66.9 386.03 64.24 388.28 62.7 C 389.19 63.49 390.16 64.21 391.17 64.89 C 390.57 65.53 389.98 66.18 389.38 66.83 C 392.43 68.8 394.19 72.1 396.1 75.1 C 397.01 75.29 397.92 75.5 398.83 75.73 C 397.9 76.46 396.98 77.19 396.06 77.94 C 396.32 78.39 396.6 78.86 396.88 79.31 C 392.74 79.66 388.67 80.47 384.58 81.12 C 386.37 80.27 388.18 79.51 389.98 78.7 C 388.63 78.14 387.26 77.62 385.9 77.1 C 387.08 75.46 388.53 74.04 390.26 72.98 C 390.07 71.99 389.88 71.01 389.7 70.02 C 388.65 69.78 387.59 69.53 386.54 69.3 Z M 412.46 66.82 C 413.02 65.46 414.3 64.6 415.3 63.6 C 415.15 65.21 415.17 66.84 415.05 68.46 C 416.71 67.91 418.34 67.28 419.99 66.68 C 419.82 67.54 419.71 68.44 419.34 69.26 C 417.06 69.48 414.73 69.47 412.62 70.53 C 412.53 69.3 412.32 68.05 412.46 66.82 Z M 438.09 66.71 C 441.42 66.69 444.8 66.98 447.82 68.5 C 446.72 70.7 444.8 72.26 442.46 73 C 440.99 71.31 439.53 69.58 437.66 68.31 C 438.25 69.41 438.81 70.53 439.33 71.66 C 437.93 71.46 436.53 71.26 435.13 71.07 C 436.14 69.63 437.1 68.18 438.09 66.71 Z M 376.74 71.72 C 379.11 70.76 382.95 67.78 384.86 70.54 C 383.91 72.66 381.5 70.64 379.9 70.42 C 381.01 71.2 382.15 71.91 383.33 72.61 C 383.2 73.74 383.08 74.9 382.98 76.05 C 380.67 76.86 378.4 77.7 376.1 78.48 C 376.29 76.22 376.82 74 376.74 71.72 Z M 410.4 73.91 C 411.83 72.75 413.35 71.72 414.82 70.62 C 417.22 72.22 420.04 71.37 422.66 71.8 C 424.49 73.52 424.25 76.43 425.3 78.63 C 425.06 76.65 424.73 74.67 424.46 72.7 C 426.65 71.83 428.91 70.6 431.35 71.02 C 434.5 71.52 437.66 71.88 440.86 71.9 C 441.66 74.66 442.32 77.46 443.37 80.14 C 438.86 85.22 431.5 81.94 426.43 79.66 C 423.94 78.41 421.38 80.12 419.03 80.91 C 420.08 82.34 421.28 83.63 422.5 84.93 C 419.1 87.68 414.66 89.06 410.43 87.26 C 412.39 87.87 414.36 88.63 416.02 89.89 C 413.46 90.48 410.05 92.95 407.88 90.6 C 408.7 88.3 410.19 86.32 411.27 84.14 C 410.23 83.88 409.2 83.62 408.18 83.37 C 408.92 83.88 409.68 84.38 410.44 84.88 C 409.26 86.62 408.02 88.3 406.78 90 C 408.29 92.31 408.88 95.02 409.81 97.58 C 405.4 98.19 400.86 98.46 396.9 100.68 C 398.16 100.62 399.42 100.55 400.69 100.49 C 400.71 100.74 400.75 101.23 400.77 101.48 C 399.06 102.42 397.44 103.51 396.02 104.84 C 392.82 106.97 393.07 111.72 389.78 113.69 C 387.51 114.8 384.91 114.94 382.46 115.41 C 380.61 115.83 379.03 114.55 377.49 113.78 C 378.85 109.97 379.03 105.85 380.61 102.1 C 378.66 101.57 376.74 100.98 374.8 100.43 C 375.7 98.64 377.02 96.57 379.58 97.71 C 384.94 98.1 390.46 97.99 395.48 100.19 C 394.04 99.29 392.58 98.43 391.15 97.52 C 391.18 94.89 392.38 91.9 391.07 89.42 C 389.54 87.82 387.26 87.25 385.55 85.89 C 390.66 84.67 396.74 84.18 399.94 79.41 C 402.33 81.15 404.74 82.86 407.31 84.34 C 407.13 83.45 406.97 82.56 406.82 81.67 C 404.54 82.37 402.61 80.95 401.25 79.25 C 403.78 76.98 406.34 74.64 409.38 73.05 C 408.66 74.82 407.85 76.56 407.02 78.29 C 405.7 78.14 404.39 78.01 403.09 77.87 C 404.82 78.53 406.58 79.17 408.14 80.19 C 408 77.9 408.63 75.47 410.4 73.91 Z M 387.04 71.18 C 387.76 71.56 387.75 71.94 387.02 72.32 C 386.29 71.94 386.3 71.57 387.04 71.18 Z M 452.71 78.67 C 455.85 79.08 458.27 76.26 461.35 76.26 C 464.3 77.66 466.43 80.58 469.75 81.28 C 472.17 81.92 475.63 82.09 476.44 85.03 C 474.31 88.84 469.74 89.61 466.18 91.5 C 467.33 92.18 468.53 92.8 469.74 93.39 C 468.34 94.1 466.92 94.82 465.53 95.54 C 463.95 93.43 462.84 91.01 460.89 89.18 C 458.16 91.12 455.95 93.7 454.06 96.44 C 450.86 96.25 447.63 96.59 444.43 96.44 C 441.69 95.7 439.65 93.5 437.41 91.86 C 438.57 90.46 439.72 89.05 440.89 87.65 C 444.06 87.72 447.26 87.65 450.37 86.88 C 451.83 89.28 452.88 91.91 454.38 94.3 C 455.91 91.84 457.34 88.08 454.18 86.21 C 449.81 85.35 445.32 87.09 440.87 86.7 C 439.11 88.42 437.42 90.22 435.42 91.68 C 437.35 92.97 439.27 94.31 441.25 95.54 C 441.34 97.11 441.49 98.7 441.54 100.29 C 439.42 100.42 437.34 100.47 435.22 100.49 C 437.09 101.38 437.74 103.35 438.46 105.13 C 437.77 105.76 437.08 106.38 436.4 107.02 C 435.69 104.55 434.87 102.13 433.72 99.84 C 434.27 98.86 434.82 97.88 435.34 96.9 C 436.18 97.84 436.98 98.78 437.84 99.69 C 437.3 97.65 436.02 95.94 434.94 94.16 C 434.7 96.13 433.99 97.98 433.07 99.73 C 432.22 99.45 431.36 99.18 430.5 98.9 L 430.39 98.62 C 429.8 97.03 429.18 95.46 428.57 93.88 C 430.49 93.98 432.41 94.09 434.34 93.99 C 431.88 93.48 429.37 93.21 426.89 93.64 C 428.03 95.32 429.22 96.96 430.39 98.62 C 427.97 97.06 425.55 95.5 422.9 94.38 C 424.76 93.26 426.66 92.14 428.44 90.89 C 429.9 91.47 431.36 92.06 432.84 92.58 C 433 92.41 433.33 92.06 433.49 91.87 C 431.71 91.41 429.96 90.84 428.37 89.92 C 428.63 88.92 429.35 88.04 430.38 87.78 C 433.62 86.78 436.94 85.94 440.33 85.62 C 434.16 84.63 428.63 88.14 423.19 90.54 C 424.83 90.28 426.47 90 428.13 89.77 C 425.92 92.61 422.22 92.84 418.96 93.48 C 421.85 99.51 427.85 103.2 433.54 106.21 C 432.05 106.14 430.56 106.09 429.07 106.1 C 429.42 107.25 429.76 108.41 430.1 109.56 C 429.42 110.2 428.76 110.83 428.1 111.47 C 428.07 109.58 428.21 107.34 426.55 106.02 C 423.86 104.01 420.77 102.55 418.18 100.38 C 416.54 98.86 415.64 96.62 413.74 95.38 C 412.55 95.61 411.46 96.14 410.35 96.61 C 409.92 95.77 409.07 94.09 408.64 93.25 C 412.82 91.47 417.26 89.17 421.91 90.36 C 420.14 89.83 418.31 89.48 416.52 89.1 C 420.42 86.91 424.36 84.25 429.09 84.69 C 425.62 84.75 422.26 84.01 419.74 81.44 C 421.39 80.89 423.02 79.88 424.81 79.96 C 427.22 80.54 429.53 81.5 431.88 82.31 C 431.43 83.18 430.98 84.06 430.54 84.93 C 432.18 84.01 433.93 82.87 435.9 83.22 C 437.66 83.04 440.14 84.28 441.66 82.74 C 443.43 81.39 443.98 79.18 444.66 77.19 C 447.34 77.65 450 78.34 452.71 78.67 M 422.39 91.02 C 421.74 91.51 422.57 92.62 423.21 92.1 C 423.84 91.61 423.02 90.5 422.39 91.02 M 434.08 92.06 C 433.6 94.3 436.32 91.61 434.08 92.06 M 418.42 95.34 C 417.5 95.54 417.9 97.02 418.78 96.74 C 419.7 96.54 419.3 95.06 418.42 95.34 Z M 491.26 82.69 C 493.22 81.45 494.87 79.84 496.45 78.17 C 498.1 81.79 499.35 85.72 501.91 88.83 C 500.41 89.26 498.91 89.89 497.33 89.94 C 495.26 89.39 493.82 87.54 492.21 86.26 C 490.79 85.94 489.85 83.5 491.26 82.69 Z M 450.94 86.06 C 451.99 86.3 453.06 86.57 454.12 86.83 C 454.54 87.64 455.38 89.27 455.8 90.09 C 455.16 90.88 454.52 91.67 453.88 92.46 C 453.01 90.28 452.08 88.11 450.94 86.06 Z M 442.06 96.7 C 445.95 97.54 449.93 96.39 453.82 97.12 C 453.54 98.5 453.25 99.89 452.95 101.27 C 449.44 102.78 445.51 103.05 441.97 101.5 C 442.05 99.9 442.1 98.3 442.06 96.7 Z M 412.71 100.4 C 413.27 100.16 413.85 99.9 414.42 99.66 C 414.4 100.62 414.38 101.6 414.37 102.57 C 414.02 102.47 413.31 102.26 412.96 102.15 C 412.86 101.58 412.78 100.98 412.71 100.4 Z M 437.78 101.02 C 439.63 100.87 441.4 101.46 442.82 102.64 C 441.4 103.21 439.97 103.75 438.53 104.26 C 438.27 103.18 438.02 102.1 437.78 101.02 Z M 375.83 101.33 C 377.06 101.76 378.29 102.21 379.52 102.63 C 378.46 106.29 378.15 110.13 376.78 113.7 C 375.95 113.62 375.14 113.54 374.33 113.45 C 374.34 109.36 374.75 105.29 375.83 101.33 Z M 447.47 103.16 C 449.14 102.98 450.74 102.31 452.42 102.2 C 453.63 102.54 454.61 103.38 455.64 104.07 C 453.55 104.3 451.46 104.49 449.38 104.36 C 446.62 104.24 444.34 105.95 441.89 106.92 C 442.76 108.58 443.96 110.17 444.18 112.08 C 443.98 113.35 443.35 114.51 442.9 115.71 C 441.7 114.49 440.6 113.18 439.55 111.83 C 440.58 111.42 441.6 111 442.62 110.55 C 440.57 109.84 438.54 109.16 436.53 108.41 C 437.69 106.97 438.74 105.33 440.37 104.38 C 442.56 103.26 445.09 103.5 447.47 103.16 Z M 411.58 105.42 C 412.14 104.95 412.7 104.49 413.26 104.02 C 413.54 104.22 414.1 104.63 414.37 104.84 C 414.37 105.76 414.36 107.6 414.36 108.52 C 413.82 108.74 413.29 108.94 412.77 109.16 C 412.38 107.91 411.98 106.66 411.58 105.42 Z M 399.42 107.05 C 399.82 107.02 400.63 106.98 401.03 106.95 C 400.94 107.3 400.74 108 400.65 108.35 C 400 108.48 399.36 108.61 398.73 108.74 C 398.95 108.18 399.18 107.61 399.42 107.05 Z M 420.92 111.98 C 422.85 111.79 424.79 111.79 426.74 111.89 C 426.5 112.85 426.28 113.82 426.06 114.79 C 424.34 113.86 422.62 112.93 420.92 111.98 Z M 444.3 118.35 C 446.8 118.13 449.35 118.32 451.77 119.03 C 449.24 119.79 446.61 119.62 444.3 118.35 Z"    },
    Africa: {id:'africa',name: "非洲", x: 420, y: 180, color: "#aa99cc", path: "M 411.52 114.68 C 412.96 114.38 414.5 113.63 415.95 114.3 C 417.04 116.53 416.46 119.06 416.58 121.42 C 418.11 124.36 421.82 124.41 424.52 125.53 C 426.5 126.06 427.47 128.07 429.14 129.09 C 431.53 130.1 434.02 130.92 436.46 131.78 C 437.61 129.44 438.37 126.94 439.1 124.45 C 442.38 125.07 445.49 126.36 448.5 127.78 C 448.61 137.53 448.57 147.27 448.56 157.02 C 447.42 157.14 446.17 157.59 445.12 156.93 C 440.62 154.52 436.54 151.34 431.75 149.54 C 429.92 149.06 427.79 148.42 426.13 149.55 C 426.59 152.96 428.7 156.04 428.2 159.61 C 428.7 164.88 423.48 168.18 422.62 173.14 C 425.16 169.46 428.13 165.82 428.78 161.23 C 429.19 157.24 428.14 153.3 426.89 149.55 C 434.49 149.86 440.28 155.48 446.78 158.74 C 446.8 161.56 446.82 164.39 446.83 167.22 C 444.45 168.7 442.9 171.26 443 174.15 C 443.31 176.04 444.22 177.77 444.9 179.56 C 439.5 182.8 434.7 187.31 428.5 188.99 C 427.62 187.38 426.74 185.78 425.89 184.16 C 426.84 182.89 428.03 181.64 427.75 179.84 C 426.78 177.44 425.33 175.28 423.7 173.29 C 424.18 174.98 425.31 176.82 424.4 178.58 C 422.74 182.02 421.58 185.7 419.79 189.08 C 417.82 190.17 415.36 189.85 413.5 191.14 C 412.42 192.67 412.1 194.61 411.33 196.29 C 409.51 196.3 407.74 196.36 405.94 196.42 C 405.17 192.94 401.84 191.34 398.6 190.85 C 399.02 186.42 399.8 182.04 400.45 177.64 C 400.8 175.5 402.18 173.23 404.45 172.78 C 406.84 173.26 408.96 174.62 411.38 175.06 C 413.74 175.82 416.09 174.7 418.47 174.74 C 420.05 174.77 421.58 174.43 423.07 173.93 C 417.79 173.7 412.18 175.4 407.22 172.95 C 406.06 172.53 404.79 171.63 403.55 172.23 C 401.56 173.07 400.56 175.12 399.45 176.83 C 396.62 175.3 393.6 173.78 392.07 170.79 C 392.05 173.74 394.82 175.01 397.04 176.29 C 396.31 177.5 395.54 178.69 394.81 179.9 C 396.02 178.93 397.18 177.89 398.32 176.83 C 398.94 177.66 399.58 178.49 400.24 179.3 C 398.94 183.21 398.22 187.26 397.93 191.36 C 397.48 191.62 397.03 191.86 396.59 192.12 C 396.01 187.87 396.3 183.27 393.91 179.51 C 394.81 183.95 396.14 188.48 395.42 193.02 C 393.09 188.65 392.76 183.65 392.33 178.8 C 390.89 183.42 393.25 188.21 394.13 192.74 C 391.38 193.77 388.61 194.76 385.82 195.67 C 384.98 191.62 385.22 187.54 385.6 183.46 C 384.54 187.06 384.28 190.84 385.05 194.52 C 381.47 194.46 378.06 195.64 374.65 196.53 L 374.55 196.23 C 373.82 193.94 373.08 191.66 372.07 189.5 C 372.73 191.8 373.7 193.99 374.55 196.23 C 370.88 195.97 368.13 193.38 365.38 191.23 C 366.32 188.82 369.53 185.07 366.62 182.73 C 364.8 181.09 362.71 182.85 361.18 183.97 C 358.98 181.53 356.8 179.08 354.43 176.8 C 356.56 176.45 358.7 176.24 360.87 176.1 C 359.99 177.12 359.14 178.16 358.33 179.23 C 359.22 178.22 360.06 177.18 360.87 176.1 C 364.34 176.69 367.8 178.1 371.37 177.2 C 372.28 181.1 374.7 185.54 371.82 189.14 C 370.7 188.22 369.66 187.24 368.57 186.3 C 369.15 187.55 369.74 188.8 370.32 190.06 C 371.6 189.18 373.42 188.55 373.81 186.86 C 374.1 185.09 373.74 183.26 373.72 181.49 C 377.65 181.18 381.14 183.02 384.91 183.63 C 382.83 182.66 380.79 181.67 378.85 180.48 C 380.23 178.4 381.5 176.2 383.23 174.39 C 388.71 171.28 394.73 169.02 401.11 168.95 C 401.67 166.05 401.94 163.1 402.33 160.18 C 406.61 158.85 409.97 155.71 413.55 153.18 C 415.78 151.41 418.29 149.94 420.18 147.78 C 418.87 146.38 417.14 145.5 415.82 144.15 C 414.59 142.82 414.84 140.86 414.81 139.2 C 415.12 136.03 414.02 132.54 415.68 129.62 C 416.59 127.7 417.82 125.97 418.93 124.16 C 417.03 125.64 415.66 127.61 414.68 129.78 C 413.31 127.17 411.61 124.75 410.04 122.26 C 410.87 119.99 411.9 117.7 411.75 115.23 C 410.99 117.66 409.89 120.04 409.54 122.58 C 410.54 125.37 413.1 127.37 413.85 130.3 C 414.62 134.03 414.63 137.87 414.14 141.64 C 413.96 144.83 417.17 146.34 419.45 147.79 C 414.96 150.95 410.67 154.38 406.26 157.66 C 404.51 158.9 401.82 159.85 400.02 158.3 C 391.65 151.22 382.52 145.12 373.75 138.55 C 373.68 137.64 373.53 135.82 373.46 134.9 C 376.15 133.62 379.17 132.95 381.71 131.35 C 383.78 130.08 384.97 127.45 387.48 126.92 C 388.41 126.63 389.39 126.44 390.21 125.88 C 390.3 123.76 389.81 121.66 389.52 119.58 C 389.43 121.46 389.46 123.38 389.5 125.26 C 387.67 125.84 385.53 126.12 384.4 127.86 C 381.89 131.37 377.33 132.38 373.55 133.94 C 373.26 135.18 373.01 136.44 372.77 137.7 C 369.82 137.72 366.87 137.74 363.94 137.76 C 366.01 136.31 368.19 134.97 369.96 133.14 C 371.55 130.37 371.7 126.74 374.19 124.5 C 376.64 122.41 378.94 120.17 381.06 117.75 C 383.31 118.52 385.56 119.79 387.99 119.68 C 391.81 118.88 394.73 115.73 398.71 115.41 C 402.93 114.34 407.35 115.94 411.52 114.68 M 420.32 148.45 C 422.04 149.31 423.91 149.86 425.83 150.11 C 424.06 149.32 422.21 148.77 420.32 148.45 M 384.46 179.79 C 384.79 180.78 385.14 181.77 385.51 182.75 C 385.48 181.97 385.46 181.2 385.44 180.42 C 386.86 180.3 389.69 180.06 391.1 179.95 C 388.87 179.86 386.66 179.81 384.46 179.79 Z M 449.14 128.16 C 452.99 128.75 456.89 130.02 460.81 129.28 C 462.59 128.94 464.4 129.3 466.13 129.76 C 466.07 130.69 466.02 131.61 465.98 132.54 C 465.83 133.69 466.02 134.88 466.64 135.88 C 469.18 140.38 472.05 144.71 474.07 149.49 C 466.37 153.39 457.41 151.32 449.13 151.74 C 449.1 143.88 449.09 136.02 449.14 128.16 Z M 363.06 138.42 C 366.35 138.37 369.66 138.33 372.95 138.3 C 372.96 139.14 372.96 140.8 372.96 141.63 C 370.43 141.66 367.94 141.69 365.44 141.72 C 365.82 146.06 363.7 149.64 361.88 153.33 C 359.29 153.36 356.72 153.41 354.14 153.38 C 356.94 148.3 359.88 143.28 363.06 138.42 Z M 374.09 139.6 C 376.17 141.15 378.27 142.69 380.34 144.26 C 379.57 144.4 378.8 144.53 378.04 144.66 C 378.01 152.61 377.98 160.55 377.99 168.5 C 373.22 168.94 367.96 167.41 363.51 169.67 C 361.64 167 358.87 164.82 355.43 165.42 C 356.17 161.56 355.34 157.7 354.11 154.03 C 356.86 153.98 359.6 153.93 362.34 153.86 C 362.48 151.64 363.79 149.94 365.36 148.54 C 365.5 146.5 365.63 144.47 365.78 142.44 C 368.46 141.61 373.7 144.02 374.09 139.6 Z M 378.62 144.56 C 382.1 145.15 384.72 147.59 387.51 149.53 C 391.63 152.66 395.93 155.6 399.83 159.02 C 402.61 161.22 401.47 165.38 400.52 168.33 C 394.1 168.17 388.18 170.86 382.67 173.83 C 380.68 175.86 379.61 178.59 377.78 180.74 C 376.45 181.5 374.74 180.97 373.34 181.13 C 372.86 179.6 372.34 178.09 371.79 176.59 C 365.76 176.59 359.69 174.66 353.71 176.17 C 353.6 175.86 353.38 175.23 353.27 174.91 C 355.74 174.71 358.55 174.93 360.66 173.33 C 358.61 172.99 356.54 172.78 354.47 172.62 C 354.01 171.86 353.09 170.34 352.62 169.58 C 354.09 167.96 355.66 165.38 358.21 165.95 C 362.35 167.37 363.51 172.36 366.29 175.34 C 365.66 173.82 364.95 172.33 364.21 170.86 C 364.53 170.29 364.85 169.72 365.18 169.16 C 369.63 169.13 374.1 169.11 378.55 169.1 C 378.57 160.92 378.51 152.74 378.62 144.56 Z M 474.07 149.49 C 476.21 153.71 477.69 158.26 480.18 162.3 C 477.34 164.27 475.97 167.54 476.38 170.98 C 476.78 169.26 476.95 167.42 477.78 165.83 C 478.61 164.59 479.87 163.75 480.98 162.78 C 482.51 168.76 488.38 171.66 491.74 176.46 C 488.25 172.19 482.35 168.95 476.85 171.62 C 474.06 175.11 472.4 179.41 471.14 183.66 C 470.7 185.35 469.18 186.4 468.08 187.64 C 471.05 189.46 473.21 192.18 475.1 195.04 C 473.81 195.63 472.51 196.22 471.25 196.86 C 472.78 196.54 474.31 196.18 475.83 195.79 C 477.76 196.97 479.66 198.25 481.81 199.03 C 484.21 199 486.48 197.93 488.89 197.78 C 487.17 202.15 485.8 207.18 488.62 211.36 C 487.9 207.42 486.25 202.68 489.46 199.38 C 490.53 197.37 492.9 196.98 494.81 196.29 C 499.12 195.23 501.06 190.82 503.71 187.66 C 500.41 186.62 496.76 186.4 493.94 184.22 C 491.7 183.5 491.97 181.11 491.72 179.32 C 493.98 180.44 496.18 182.76 498.94 181.46 C 502.87 180.9 506.66 179.68 510.35 178.29 C 510.22 180.46 510.63 182.78 509.58 184.78 C 507.38 189.56 504.92 194.22 502.17 198.7 C 499.04 202.11 495.06 204.61 492 208.08 C 488.83 211.76 485.62 215.42 482.86 219.43 C 481.5 217.46 480.65 214.9 478.38 213.78 C 475.91 212.42 473.38 211.18 470.75 210.19 C 471.34 208.17 472.22 206.24 473.06 204.31 C 474.1 202.15 472.8 199.86 472.22 197.75 C 469.79 197.81 467.34 198.05 464.92 197.78 C 462.51 197.21 460.16 196.22 457.66 196.52 C 456.84 195.86 456.08 195.1 455.14 194.63 C 451.06 194.62 447.16 196.21 443.1 196.46 C 440.45 195.71 437.67 194.6 434.94 195.74 C 435.13 196.51 435.34 197.3 435.53 198.09 C 436.05 197.22 436.4 196.05 437.46 195.69 C 440.22 196.09 442.81 198.37 445.69 196.92 C 448.78 196.06 451.97 195.66 455.14 195.12 C 455.77 195.92 456.41 196.72 457.06 197.52 C 458.26 197.31 459.47 196.96 460.71 196.98 C 462.61 197.42 463.48 199.35 464.41 200.86 C 463.39 202.58 462.33 204.3 461.46 206.11 C 460.62 207.65 461.62 209.3 462.06 210.81 C 461.02 206.48 464.79 203.17 464.74 198.95 C 467.06 198.74 469.37 198.49 471.7 198.23 C 472.14 200.13 473.28 202.21 472.35 204.14 C 471.58 205.93 470.75 207.69 470.06 209.5 C 467.99 210.05 465.35 210.01 463.9 211.86 C 462.79 213.24 461.32 214.26 459.56 214.6 C 460.13 213.27 460.86 212.02 461.73 210.86 C 461.02 210.98 460.31 211.1 459.62 211.22 C 458.74 217.1 460.1 223.28 463.54 228.15 C 462.64 225.37 461.52 222.66 460.74 219.85 C 462.02 218.39 463.1 216.78 463.94 215.05 C 462.79 216.22 461.67 217.44 460.5 218.58 C 460.26 217.85 460.05 217.13 459.82 216.4 C 462.95 214.3 465.25 209.66 469.75 210.74 C 472.48 211.37 474.88 212.96 477.39 214.15 C 481.58 216.02 482.84 221.3 482.61 225.5 C 482.49 229.09 484.32 232.2 485.78 235.34 C 481.56 236.26 477.38 237.41 473.06 237.6 C 477.45 238.06 481.74 237.06 485.78 235.34 C 485.54 239.38 487.72 243.94 484.95 247.5 C 482.82 250.68 478.66 251.58 476.14 254.36 C 474.46 256.25 472.87 258.22 471.41 260.3 C 472.31 262.99 474.95 266.21 472.71 268.87 C 470.14 270.9 466.92 272.3 465.52 275.49 C 465.34 274.89 465.16 274.29 464.99 273.7 L 464.7 276.72 C 463.94 276.45 463.18 276.18 462.44 275.92 C 462.91 274.84 463.39 273.77 463.84 272.69 C 462.85 273.92 461.86 275.19 461.47 276.8 C 463.18 277.15 464.95 277.21 466.59 276.51 C 466.66 277.19 466.74 277.88 466.82 278.57 C 461.7 283.37 458.27 290.05 451.96 293.52 C 448.93 295.55 445.25 294.18 441.92 294.74 C 439.79 294.55 436.98 296.32 435.22 294.46 C 433.95 292.44 434.7 289.79 433.6 287.68 C 432.36 285.12 430.92 282.66 429.62 280.14 C 432.31 281.12 435.26 281.94 437.86 280.18 C 438 277.93 438.28 273.4 438.43 271.14 C 439.06 272.95 439.16 274.89 439.8 276.69 C 442.31 276.38 443.83 274.28 444.97 272.22 C 446.33 272.78 447.68 273.34 449.04 273.89 C 451.59 271.16 454.2 268.49 456.97 265.99 C 459.23 263.89 462.64 264.88 465.45 264.46 C 467.05 260.87 468.84 257.14 469.1 253.17 C 468.69 249.28 463.94 249.04 461.25 247.23 C 463.8 246.07 466.9 242.42 469.89 244.66 C 471.6 245.5 471.09 247.64 471.23 249.18 C 471.95 249.64 472.66 250.1 473.39 250.57 C 474.02 248.93 475.94 247.38 475.22 245.5 C 474.2 242.76 472.14 240.4 472.1 237.34 C 472.07 238.56 471.84 239.67 471.9 240.93 C 473.27 242.98 476.62 246.8 473.34 248.79 C 471.33 250.18 471.92 246.43 471.85 245.31 C 470.82 244.54 469.78 243.8 468.74 243.05 C 469.51 239.54 469.62 235.96 469.1 232.41 C 469.54 232.43 470.39 232.48 470.82 232.51 C 471.49 233.82 472.15 235.14 472.86 236.44 C 472.09 235.28 472.62 233.12 471.08 232.44 C 468.58 231.12 466.17 229.66 463.67 228.34 C 465.15 229.78 466.64 231.16 468.03 232.7 C 469.22 235.71 469.34 239.29 467.98 242.27 C 465.02 244.84 460.93 245.86 458.17 248.73 C 456.37 250.37 454.7 253.17 451.86 252.72 C 449.22 252.33 445.73 252.78 444.34 250.02 C 442.74 247.92 442.97 245.08 442.94 242.61 C 444.25 241.58 445.96 241.29 447.5 240.67 C 447.62 239.83 447.85 238.14 447.97 237.3 C 447.58 238.28 447.22 239.26 446.85 240.25 C 445.5 240.46 444.15 240.7 442.82 240.92 C 442.86 243.76 441.79 246.89 443.24 249.5 C 443.78 250.58 444.37 251.62 444.93 252.68 C 439.99 253.37 435.15 251.86 430.26 251.58 C 426.54 251.38 422.83 251.12 419.12 251.14 C 419.84 246.18 422.08 241.72 424.06 237.22 C 423.8 232.53 423.19 227.69 420.92 223.49 C 424.06 223.49 427.22 223.48 430.38 223.5 C 431.22 225.42 431.9 227.59 433.62 228.93 C 435.8 229.32 437.1 227.07 438.74 226.08 C 439.84 225.97 440.94 226.2 442.04 226.31 C 442.56 229.36 442.26 232.71 443.68 235.56 C 447.18 236.52 450.86 236.82 454.3 238.09 C 456.34 238.71 457.48 240.74 459.38 241.63 C 460.46 241.6 461.48 241.1 462.53 240.82 C 461.18 239.04 459.02 237.79 458.3 235.58 C 458.07 233.85 458.58 232.07 459.25 230.49 C 460.38 229.44 461.88 228.94 463.21 228.21 C 461.66 228.75 459.78 228.73 458.48 229.86 C 457.81 231.88 457.74 234.05 457.77 236.16 C 458.22 238.19 460.25 239.27 461.58 240.71 C 459.58 240.83 457.95 239.76 456.5 238.51 C 452.77 236.42 448.42 235.88 444.24 235.35 C 443.62 232.18 443.11 229.02 442.65 225.84 C 441.08 225.67 439.5 225.52 437.94 225.4 C 436.77 226.66 435.48 227.78 434.1 228.8 C 432.89 226.97 431.82 225.04 430.9 223.04 C 427.25 222.94 423.62 222.92 419.98 222.68 C 421.38 219.5 425.23 220.96 427.62 219.32 C 430.38 215.44 432.77 211.18 434.09 206.58 C 434.5 204.02 435.24 201.54 436.01 199.07 C 434.07 201.42 433.89 204.46 433.38 207.32 C 431.84 211.39 429.5 215.16 427.05 218.74 C 424.95 220.17 422.29 219.94 419.9 220.46 C 418.79 218.54 418.63 216.24 420.07 214.43 C 421.56 213.2 424.1 214.14 425.47 212.65 C 426.31 210.75 425.36 208.69 425.19 206.74 C 425.1 205.11 423.99 203.87 422.95 202.73 C 424.72 202.88 426.45 203.06 428.24 203.01 C 429.64 202.47 430.31 201.01 431.18 199.88 C 432.53 199.52 434.01 199.22 435.38 198.82 C 433.32 198.68 431.18 198.79 429.43 199.98 C 428.13 197.78 426.42 195.71 425.82 193.19 C 425.9 190.79 428.2 189.29 430.38 188.94 C 435.71 187.1 440.17 183.56 444.65 180.26 C 445.1 180.54 445.54 180.8 445.98 181.07 C 447.3 186.55 451.61 190.63 456.03 193.83 C 452.86 189.54 448.1 186.38 446.49 181.08 C 445.36 178.14 442.8 175.18 443.98 171.89 C 444.41 170.25 445.72 169.09 446.9 167.98 C 447.41 162.7 448.12 157.46 449.32 152.31 C 455.98 152.23 462.63 152.58 469.29 152.56 C 471.11 152.03 472.48 150.5 474.07 149.49 M 465.05 272.95 C 464.99 270.3 464.66 267.68 464.04 265.11 C 463.99 267.75 464.59 270.35 465.05 272.95 M 453.1 282.4 C 452.77 284.14 454.91 286.34 456.62 285.29 C 458.31 284.56 458.46 282.44 459.06 280.94 C 457.01 280.67 454.42 280.38 453.1 282.4 Z M 335.1 164.16 C 335.89 163.92 336.16 164.18 335.92 164.98 C 335.14 165.22 334.86 164.94 335.1 164.16 Z M 340.58 168.66 C 341.48 168.37 341.79 168.67 341.5 169.58 C 340.59 169.87 340.28 169.56 340.58 168.66 Z M 477.3 171.86 C 480.45 171.52 483.94 170.85 486.63 173.07 C 489.26 173.86 489.23 176.56 488.65 178.64 C 490.75 181.4 492.51 184.66 495.79 186.21 C 497.94 186.94 500.21 187.33 502.42 187.89 C 500.52 190.18 499.02 192.9 496.65 194.77 C 492.23 197.14 487.14 197.68 482.25 198.28 C 476.08 197.09 473.99 190.48 469.07 187.45 C 470.12 186.56 471.51 185.77 471.71 184.26 C 472.5 179.7 475.58 176.06 477.3 171.86 Z M 353.69 173.83 C 355.5 173.66 357.31 173.66 359.14 173.69 C 357.33 173.83 355.5 173.87 353.69 173.83 Z M 489.67 177.14 C 490.62 177.08 491.58 177.02 492.56 176.98 C 492.01 178.04 491.42 179.07 490.78 180.07 C 490.42 179.82 489.73 179.34 489.38 179.09 C 489.48 178.44 489.58 177.79 489.67 177.14 Z M 420.37 189.65 C 422.3 185.58 423.62 181.19 426.02 177.34 C 426.53 178.82 427.04 180.31 427.47 181.83 C 426.49 182.34 425.5 182.86 424.52 183.38 C 425.39 184.97 426.54 186.49 426.88 188.31 C 426.58 190.17 425.54 191.83 425.23 193.7 C 426.17 196.68 427.98 199.26 429.7 201.84 C 425.05 203.25 420.14 202.07 415.4 202.04 C 414.73 199.14 411.3 196.57 412.89 193.38 C 414 190.21 417.99 191.12 420.37 189.65 Z M 362.86 183.66 C 364.21 181.56 367.11 183.27 367.22 185.34 C 366.87 187.23 365.63 188.78 364.58 190.35 C 362.94 188.64 360.38 185.83 362.86 183.66 Z M 412.24 198.86 C 412.96 199.24 412.95 199.62 412.22 200 C 411.49 199.62 411.5 199.24 412.24 198.86 Z M 414.96 202.72 C 415.8 202.72 417.48 202.72 418.32 202.72 C 418.31 203.46 418.31 204.21 418.32 204.96 C 417.48 204.96 415.8 204.96 414.96 204.96 C 414.95 204.21 414.95 203.46 414.96 202.72 Z M 419.85 202.33 C 421.55 203.02 423.9 203.9 424.17 206.05 C 424.46 208.05 425.37 210.07 424.94 212.11 C 423.54 213.54 421.32 213.11 419.51 213.49 C 419.02 214.68 418.54 215.87 418.04 217.06 C 416.31 215.27 413.83 213.7 413.44 211.05 C 413.4 209.32 414 207.66 414.43 206.02 C 416.42 205.3 419.95 205.85 419.85 202.33 Z M 408.88 205.58 C 409.6 205.96 409.59 206.33 408.86 206.72 C 408.13 206.34 408.14 205.96 408.88 205.58 Z M 522.02 221.3 C 522.92 221 523.23 221.31 522.94 222.22 C 522.02 222.51 521.72 222.2 522.02 221.3 Z M 506.22 239.69 C 506.77 241.89 507.75 244.06 507.79 246.34 C 506.23 252.81 502.92 258.7 501.56 265.23 C 500.95 267.26 500.72 269.63 499.2 271.26 C 497.2 272.71 493.9 273.26 492.25 271.03 C 490.75 267.55 491.09 263.5 493.4 260.46 C 495.38 257.23 492.44 252.4 495.44 249.73 C 499.82 247.4 504.4 244.55 506.22 239.69 Z M 494.14 240.32 C 494.92 240.08 495.2 240.34 494.95 241.14 C 494.17 241.38 493.9 241.1 494.14 240.32 Z M 459.56 248.05 C 462.51 249.2 467.74 249.23 468.38 253.23 C 468.18 256.53 466.92 259.77 465.41 262.69 C 464.13 264.91 460.87 264.3 458.98 263.41 C 455.79 260.75 453.71 257.04 451.31 253.73 C 454.94 253.54 457.57 250.83 459.56 248.05 Z M 419.62 251.9 C 429.58 251.6 439.42 254.21 449.37 252.82 C 446.46 253.5 443.51 253.9 440.59 254.46 C 440.15 257.19 439.96 260.01 438.95 262.62 C 436.81 268.09 437.42 274.1 437.37 279.86 C 434.54 280.69 431.56 280.34 428.86 279.32 C 428.26 279.08 427.83 278.58 427.74 277.94 C 426.73 273.41 426.5 268.7 425.14 264.25 C 423.66 259.97 421.05 256.19 419.62 251.9 Z M 441.02 254.93 C 444.11 254.67 447.31 254.63 450.25 253.48 C 452.64 257.17 455.32 260.66 458.15 264.02 C 454.99 266.78 451.82 269.57 449.11 272.79 C 447.56 272.38 446.02 271.94 444.46 271.58 C 443.46 273.36 442.1 274.96 440.28 275.95 C 439.87 273.12 438.66 270.5 438.14 267.7 C 439.12 263.46 440.98 259.39 441.02 254.93 Z M 524.24 258.78 C 524.96 259.16 524.95 259.53 524.22 259.92 C 523.49 259.54 523.5 259.16 524.24 258.78 Z M 519.78 261.06 C 520.68 260.76 520.99 261.07 520.7 261.98 C 519.78 262.27 519.48 261.96 519.78 261.06 Z M 453.37 282.61 C 454.99 281.84 456.74 281.37 458.55 281.45 C 457.69 282.82 456.7 284.12 455.61 285.31 C 454.85 284.42 454.1 283.52 453.37 282.61 Z"    },
    Asia: {id:'asia',name: "亚洲", x: 580, y: 80, color: "#eecca3", path: "M 533.02 17.02 C 535.1 14.74 538.15 15.7 540.73 16.5 C 545.58 17.87 550.62 18.32 555.46 19.74 C 558.76 20.74 561.82 22.75 565.41 22.62 C 569.22 22.68 573.5 22.5 576.66 25.02 C 574.65 26.26 572.62 27.46 570.61 28.68 C 570.78 28.92 571.14 29.38 571.3 29.62 C 575.22 28.75 579.25 28.1 583.19 29.14 C 589.28 28.85 595.34 29.7 601.46 29.34 C 606.54 28.4 610.03 33.03 614.52 34.37 C 616.61 34.36 618.55 33.09 620.68 33.46 C 623.26 34.06 625.94 33.87 628.31 32.7 C 627.96 32.02 627.62 31.34 627.28 30.67 C 634.18 29.82 641.02 31.69 647.58 33.63 C 651.86 34.38 656.23 34.37 660.58 34.35 C 664.35 34.32 667.54 37.23 671.42 36.62 C 676.72 36.07 681.97 36.93 687.02 38.52 C 686.53 37.57 686.03 36.63 685.54 35.7 C 697.36 36.27 708.78 39.67 720.04 43.02 C 721.62 43.3 723.22 42.74 724.79 43.07 C 726.81 44.21 728.66 45.69 730.46 47.18 C 724.97 47.61 720.02 44.8 714.63 44.38 C 715.11 45.28 715.62 46.18 716.14 47.06 C 714.9 46.86 713.67 46.64 712.44 46.43 C 712.26 46.72 711.87 47.3 711.67 47.58 C 715.42 49.02 719.34 50.21 722.78 52.33 C 720.87 52.78 718.86 52.83 717.01 53.48 C 715.28 54.36 714.23 56.07 712.93 57.42 C 709.03 55.1 705.01 57.75 701.38 59.34 C 702.58 61.22 704.07 62.94 706.11 63.94 C 709.04 65.34 710.78 68.8 710.24 71.98 C 709.98 74.14 710.48 76.3 711.06 78.36 C 710.37 78.58 709.69 78.79 709.01 79.01 C 705.02 74.92 700.22 71.59 696.91 66.89 C 696.41 66.11 695.8 65.22 696.05 64.26 C 696.67 61.42 697.77 58.73 698.71 55.99 C 697.78 54.5 696.78 53.05 695.74 51.64 C 694.75 52.9 694.1 54.37 693.65 55.9 C 690.84 55.1 688.05 54.23 685.23 53.5 C 684.89 55.7 684.74 57.93 684.61 60.16 C 682.77 60.21 680.94 59.99 679.18 59.54 C 676.48 58.81 673.67 59.42 670.94 59.44 C 668.67 59.59 666.26 59.3 664.24 60.56 C 661.79 63.25 661.41 67.06 659.8 70.23 C 662.04 71.15 664.3 72.62 666.84 72.36 C 668.52 72.3 670.47 71.5 671.86 72.93 C 674.95 74.89 676.73 78.17 678.91 81 C 682.2 86.14 681.22 93.04 678.19 98.09 C 677.54 99.39 675.94 99.18 674.74 99.2 C 669.26 99.05 664.12 102.18 660.98 106.54 C 659.78 107.67 658.31 108.46 656.93 109.34 C 656.29 107.83 655.7 106.32 655.1 104.81 C 654.61 104.63 654.13 104.45 653.65 104.28 C 651.74 106.26 649.68 108.1 647.87 110.17 C 649.57 111.62 651.55 112.67 653.45 113.85 C 655.6 112.55 658.08 112.94 660.37 113.62 C 658.61 115.42 655.79 116.62 655.27 119.27 C 657.73 123.17 661.2 126.39 664.3 129.8 C 663.67 130.33 663.05 130.86 662.44 131.38 C 663.59 131.89 664.75 132.38 665.91 132.86 C 664.38 138.34 663.94 144.66 659.5 148.77 C 656.65 150.86 653.05 151.55 649.63 152.16 C 647.34 152.5 645.85 154.47 644.19 155.89 C 643.41 154.94 642.85 153.6 641.6 153.22 C 640.49 153.1 639.38 153.28 638.3 153.37 C 636.32 151.35 634.34 148.18 630.96 149.33 C 627.6 149.33 624.72 150.83 623.37 153.85 C 623.98 154.04 624.61 154.23 625.24 154.42 C 625.26 153.27 625.29 152.13 625.32 150.98 C 630.61 157.55 635.93 164.09 641.1 170.74 C 637.78 163.23 631.01 158.01 626.74 151.06 C 628.8 150.88 630.93 149.55 633.06 149.95 C 634.98 150.77 636.52 152.27 638.3 153.37 C 636.9 155.16 634.11 156.82 634.64 159.42 C 637.46 163.79 642.35 166.74 643.98 171.93 C 644.84 174.47 645.98 178.27 643.32 180.13 C 640.7 181.92 638.41 184.07 636.04 186.14 C 635.9 184.46 635.86 182.78 635.78 181.11 C 637.67 180.12 639.5 179.07 641.39 178.05 C 641.32 175.72 641.2 173.39 640.93 171.07 C 639.15 171.47 637.6 171.92 635.9 172.41 C 637.39 172.4 638.86 172.19 640.35 172.02 C 640.72 173.7 641.51 175.66 640.4 177.25 C 638.17 178.97 635.78 180.46 633.44 182.01 C 630.53 178.56 627.25 175.34 623.22 173.26 C 622.86 176.49 622.39 179.75 622.5 183.02 C 623.5 186.98 626.36 190.11 629.46 192.62 C 632.71 195.07 633.14 199.44 634.37 203.06 C 633.93 203.48 633.5 203.9 633.09 204.32 C 628.4 201.76 625.75 196.79 625.48 191.47 C 626.78 192.34 628.13 193.16 629.51 193.9 C 628.2 193.04 626.83 192.26 625.48 191.47 C 623.49 189.85 621.76 187.94 619.77 186.32 C 620.99 182.62 622.67 178.86 621.89 174.84 C 620.94 169.87 619.5 164.95 616.93 160.56 C 618.42 158.9 620.08 157.38 621.65 155.78 C 623.18 158.22 624.15 160.94 624.82 163.73 C 626.85 163.04 629.03 161.91 631.21 162.41 C 633.75 164.42 634.5 167.86 635.5 170.82 C 633.5 171.18 631.29 170.96 629.53 172.07 C 628.75 173.74 629.61 175.54 629.95 177.19 C 630.14 175.54 629.53 173.5 630.74 172.12 C 632.34 171.53 634.08 171.86 635.74 171.91 C 636.34 167.99 634.4 164.02 631.39 161.59 C 629.26 161.23 627.17 162.09 625.1 162.47 C 624.57 159.52 623.42 156.74 622.36 153.94 C 622.11 154.55 621.87 155.17 621.65 155.78 C 619.42 157.12 615.41 158.7 617.06 162.08 C 619.26 168.37 622.26 174.8 620.94 181.65 C 621.5 175.99 618.15 171.22 616.87 165.92 C 616.38 165.66 615.9 165.41 615.43 165.15 C 614.31 166.1 613.21 167.06 612.1 168.03 C 611.57 167.78 611.02 167.54 610.5 167.3 C 610.23 165.02 609.93 162.71 608.78 160.68 C 607.59 157.93 604.74 156.54 602.94 154.27 C 603.86 153.8 604.79 153.33 605.71 152.85 C 605.47 148.93 606.53 145.03 608 141.43 C 609.43 139.71 611.26 138.37 612.9 136.83 C 613.76 137.85 614.59 138.87 615.33 139.99 C 615.58 142.1 614.1 144.24 614.76 146.26 C 617.11 148.84 619.3 151.55 621.46 154.29 C 620.12 150.78 617.86 147.81 614.88 145.57 C 615.58 143.2 617.47 140.15 615.16 138.07 C 612.1 135.99 608.79 133.57 604.86 133.89 C 602.91 134.32 601.77 136.1 600.59 137.54 C 593.98 136.27 587.08 135.82 580.88 133.01 C 577.52 131.34 573.77 130.7 570.42 129.03 C 569.44 128.52 568.32 127.72 568.39 126.48 C 568.46 123.97 568.78 121.46 568.62 118.95 C 565.86 118.1 562.98 117.6 560.52 116 C 556.36 114.54 555.23 110.06 552.58 107.04 C 556.93 105.96 562.06 104.97 564.47 100.76 C 565.68 98.62 563.79 96.59 562.83 94.79 C 564.44 93.46 565.73 91.74 567.4 90.48 C 568.58 89.65 570.74 89.72 570.89 87.93 C 571.22 86.57 571.57 85.22 572.03 83.9 C 574.12 85.14 576.22 86.38 578.38 87.5 C 581.25 88.82 582.5 91.97 584.7 94.04 C 586.64 95.07 588.9 94.7 590.97 95.17 C 594.07 96.06 596.12 98.85 598.99 100.17 C 604.25 100.83 609.5 101.55 614.73 102.49 C 619.78 102.56 624.84 101.09 629.42 99.04 C 629.91 97.5 629.32 95.92 629.02 94.4 C 633.82 94.87 637.31 90.54 641.99 90.2 C 642.13 89.87 642.38 89.23 642.52 88.92 C 639.24 87.58 635.78 86.87 632.33 86.19 C 632.1 85.52 631.88 84.86 631.67 84.19 C 633.1 83.38 634.74 82.78 635.89 81.56 C 636.34 79.02 635.62 76.46 634.62 74.15 C 637.96 73.68 641.67 73.04 644.71 74.93 C 648.44 77.65 650.85 82.02 655.39 83.66 C 659.02 85.01 662.49 86.74 665.9 88.56 C 667.33 87.86 668.75 87.14 670.2 86.43 C 670.42 86.56 670.87 86.82 671.1 86.94 C 671.28 88.47 671.72 90 671.62 91.55 C 670.67 92.7 669.65 93.75 668.63 94.82 C 669.57 96.31 670.53 97.78 671.54 99.21 C 671.06 97.82 670.51 96.44 669.93 95.1 C 670.94 93.78 671.99 92.48 673.03 91.17 C 672.31 89.33 672.01 87.27 670.78 85.69 C 669 85.94 667.42 86.86 665.86 87.68 C 661.38 84.93 656.1 83.78 651.86 80.63 C 648.72 78.19 646.71 73.75 642.35 73.3 C 639.33 72.46 636.26 73.16 633.31 73.86 C 634.56 76.08 635.87 78.42 635.41 81.11 C 634.51 82.43 632.79 82.69 631.33 82.58 C 628.26 82.34 625.14 82.02 622.1 82.68 C 617.02 84 612.27 80.87 607.22 80.88 C 601.78 80.87 597.24 75.31 591.69 77.55 C 592.13 78.87 592.61 80.18 593.07 81.5 C 589.03 81.9 585.34 79.77 581.35 79.71 C 578.5 79.88 576.46 82.21 573.91 83.17 C 570.81 83.1 567.92 81.58 565 80.67 C 562.08 79.61 558.9 79.71 555.95 78.83 C 552.9 76.53 549.65 74.49 546.62 72.16 C 544.96 70.85 542.86 72 541 71.93 C 537.11 71.73 533.71 69.42 529.86 69.14 C 525.38 69.86 521.05 71.27 516.64 72.29 C 516.4 73.91 516.02 75.5 515.58 77.09 C 516.31 77.9 517.01 78.74 517.7 79.58 C 512.3 79.11 506.38 80.2 501.45 77.42 C 505.7 77.02 509.93 77.61 513.98 78.94 C 514.92 75.9 514.52 72.71 513.74 69.7 C 512.22 70.61 510.75 71.54 509.26 72.46 C 508.5 71.5 506.98 69.58 506.21 68.61 C 507.52 67.73 508.85 66.9 510.17 66.02 C 507.73 59.5 506.78 52.5 503.87 46.14 C 506.67 44.69 509.38 43.1 512.11 41.5 C 511.47 40.51 510.84 39.54 510.21 38.55 C 512.14 39.38 514.35 40.44 516.19 38.76 C 513.42 37.25 510.5 35.6 509.19 32.56 C 511.1 31.5 513.52 29.29 515.75 30.8 C 518.62 33.57 520.82 36.93 523.1 40.19 C 522.26 41.49 521.45 42.81 520.68 44.14 C 523.43 44.3 526.97 42.66 526.24 39.38 C 524.59 36.91 521.65 35.55 520.34 32.8 C 521.83 32.71 523.4 32.94 524.86 32.51 C 527.08 31.54 528.95 29.92 531.15 28.89 C 533.36 28 535.82 28.22 538.13 27.74 C 537.75 26.92 537.38 26.09 537.02 25.26 C 541.18 24.44 545.37 23.87 549.6 23.66 C 552.42 24.26 554.07 21.75 556.02 20.28 C 553.62 20.24 551.27 20.38 548.97 20.99 C 549.02 20.4 549.08 19.81 549.14 19.22 C 545.42 19.06 541.71 18.83 538.03 18.34 C 536.39 17.97 534.35 18.26 533.02 17.02 Z M 528.1 70.02 C 532.68 69.17 536.64 72.54 541.11 72.85 C 542.86 72.87 544.83 71.55 546.38 72.94 C 549.31 75.24 552.53 77.14 555.42 79.49 C 558.32 80.5 561.62 79.85 564.42 81.3 C 566.64 82.32 568.97 83.14 571.42 83.38 C 570.77 84.98 570.34 86.66 570.09 88.38 C 566.42 89.03 564.47 92.37 561.75 94.48 C 562.86 96.38 563.97 98.34 564.37 100.53 C 561.3 99.69 558.13 99.3 554.97 99.02 C 551.76 98.62 548.68 99.94 545.5 100.1 C 543.3 100.57 541.93 102.74 540.12 103.86 C 536.68 103.15 534.69 100.13 531.98 98.23 C 527.87 97.44 523.96 95.97 520.21 94.14 C 517.21 92.44 513.78 93.71 510.59 94.08 C 511.3 96.69 512.06 99.29 512.85 101.88 C 510.94 100.6 508.74 100.08 506.43 100.43 C 504.3 100.14 501.92 99.13 500.94 97.1 C 500.31 96.1 501.16 94.91 501.94 94.26 C 503.49 93.57 505.23 93.7 506.89 93.53 C 505.62 91.57 503.74 90.2 501.91 88.83 C 499.35 85.72 498.1 81.79 496.45 78.17 C 501.11 78.14 505.5 80.24 510.17 80.09 C 513.05 80.42 516.13 81.45 518.68 79.45 C 516.79 77.69 516.61 75.28 517.13 72.9 C 520.82 72.1 524.39 70.8 528.1 70.02 Z M 676.65 73.42 C 680.6 76.94 684.13 80.91 688.46 84.06 C 687.58 84.22 686.72 84.38 685.87 84.57 C 687.7 86.88 689.73 89.07 691.23 91.62 C 689.69 91.14 687.86 90.7 687.28 88.96 C 684.53 83.25 680.18 78.62 676.65 73.42 Z M 592.38 77.95 C 597.94 76.5 602.27 81.97 607.78 81.41 C 611.6 81.62 615.15 83.18 618.9 83.76 C 622.78 83.79 626.42 81.79 630.35 82.76 C 631.14 84.46 631.46 87.07 633.74 87.33 C 636.38 87.75 639.06 88.12 641.44 89.44 C 636.47 89.97 632.96 94.42 627.81 94.2 C 628.27 95.7 628.72 97.18 629.14 98.7 C 624.98 100.01 620.78 101.29 616.47 101.95 C 611.65 101.39 606.98 99.81 602.07 99.95 C 598.78 100.36 596.78 97.15 594.1 95.84 C 591.55 93.76 587.95 95.1 585.23 93.5 C 583.4 91.96 582.46 89.62 580.65 88.07 C 578.56 86.77 576.38 85.7 574.3 84.43 C 576.74 82.68 579.11 80.06 582.38 80.3 C 586.39 80.74 590.42 83.3 594.39 81.38 C 593.73 80.24 593.05 79.1 592.38 77.95 Z M 511.4 94.61 C 513.35 94.31 515.3 93.52 517.29 93.81 C 521.28 95.17 524.96 97.54 529.26 97.95 C 532.9 98.29 534.14 102.7 537.49 103.79 C 538.81 104.55 540.32 104.3 541.64 103.7 C 544.12 102.46 546.82 103.83 549.26 104.42 C 547.24 106.22 544.67 105.14 542.48 104.35 C 541.5 105.69 540.46 106.98 539.35 108.21 C 540.02 110.03 540.64 111.86 541.16 113.73 C 537.78 111.31 534.01 109.52 530.54 107.29 C 527.81 104.5 524.62 102.15 521.05 100.6 C 518.13 99.1 515.98 101.74 513.74 103.02 C 513.02 100.2 512.19 97.41 511.4 94.61 Z M 690.51 93.75 C 693.73 95.72 697.24 97.11 700.68 98.64 C 699.67 99.39 698.74 100.26 697.62 100.83 C 696.09 100.94 694.58 100.58 693.06 100.42 C 693.06 101.33 693.06 102.24 693.07 103.15 C 692.56 102.36 691.51 100.79 691 100.01 C 692.04 97.94 691.54 95.71 690.51 93.75 Z M 544.94 100.65 C 551.06 100.22 557.32 99.02 563.33 100.92 C 560.31 104.48 555.52 105.54 551.5 107.49 C 549.36 108.54 546.93 107.81 544.67 107.78 C 544.49 107.28 544.32 106.78 544.15 106.28 C 546.64 107.24 548.92 105.96 550.32 103.89 C 548.29 103.37 546.26 102.9 544.25 102.39 C 544.46 101.81 544.7 101.22 544.94 100.65 Z M 506.43 100.43 C 509.37 99.86 511.66 102.34 514.06 103.54 C 516.07 102.47 518 100.34 520.54 101.1 C 523.54 102.61 526.46 104.38 528.82 106.78 C 531.39 109.29 534.85 110.56 538.11 111.9 C 534.62 113.67 532.22 116.98 528.56 118.49 C 532.14 118.58 534.1 115.2 536.7 113.31 C 539.12 113.04 541.67 115.66 543.88 113.82 C 545.18 112.95 546.23 111.76 547.57 110.94 C 548.62 111.79 549.42 112.93 550.25 114.01 C 551.92 113.73 553.6 113.47 555.3 113.31 C 553.46 114.28 551.49 114.9 549.62 115.76 C 549.54 117.51 550.4 119.67 549.16 121.25 C 547.82 123.26 547.2 125.91 545.05 127.28 C 543.14 128.53 541.41 129.99 539.72 131.51 C 537.21 133.67 533.54 133.14 530.54 132.84 C 531.03 129.88 529.86 127.17 528.27 124.72 C 526.95 122.66 527.47 120.2 527.79 117.94 C 527.21 119.49 526.14 121.13 526.73 122.83 C 527.42 125.41 529.24 127.56 529.82 130.17 C 529.77 133.64 532.34 136.04 534.06 138.74 C 532.98 140.35 532.22 142.16 532.06 144.1 C 529.85 144.09 527.62 144.14 525.46 143.74 C 523.29 143.18 522.08 141.09 520.54 139.66 C 516.01 140.76 510.35 140.06 508.07 135.42 C 506.63 132.1 502.26 132.03 500.59 128.93 C 499.26 126.4 496.96 124.65 495.17 122.49 C 493.84 121.01 494.26 118.9 494.24 117.09 C 493.05 115.88 491.9 114.66 490.7 113.48 C 492.41 116.08 493.94 118.81 494.27 121.98 C 496.83 125.29 499.71 128.36 501.69 132.1 C 500.26 131.95 498.78 131.79 497.4 131.66 C 497.1 132.06 496.8 132.45 496.52 132.84 C 497.99 132.61 499.48 132.46 500.98 132.42 C 500.98 133.24 500.98 134.06 501 134.88 C 499.72 134.52 498.45 134.17 497.16 133.86 C 499.65 135.14 502.79 136.01 503.74 138.99 C 505.06 142.53 507.65 145.22 510.1 147.98 C 512.51 150.48 516.51 150.18 519.12 152.35 C 520 153.04 519.33 154.16 519.03 154.98 C 517.92 157.64 514.89 158.47 512.74 160.07 C 515.39 158.94 519.09 158.54 519.74 155.14 C 520.83 153.34 519.29 151.54 518.58 149.94 C 519.31 148.63 520.06 147.33 520.83 146.03 C 523.59 147.7 526.29 149.46 528.94 151.3 C 525.17 156.6 522.21 163.46 515.36 165.28 C 514.2 163.52 513.06 161.74 511.83 160.03 C 512.62 161.94 513.51 163.79 514.41 165.66 C 512.34 167.48 510.46 169.63 507.86 170.73 C 503.26 172.76 498.67 174.86 493.79 176.13 C 492.18 172.56 491.36 168.72 490.86 164.87 C 494.1 164.33 497.32 165.07 500.55 165.24 C 504.01 163.09 507.46 160.89 511.32 159.46 C 507.27 159.98 503.9 162.3 500.39 164.18 C 496.95 164.55 493.4 163.4 489.98 164.39 C 488.45 162.28 487.01 160.11 485.26 158.18 C 482.2 154.9 481.67 150.13 478.88 146.66 C 475.85 142.78 472.65 138.9 471.62 133.92 C 473.26 133.9 475.12 133.85 476.27 132.48 C 477.54 130.82 478.06 128.75 478.89 126.86 C 485.9 126.46 490.07 133.81 496.8 134.67 C 494 133.1 491.25 131.46 488.59 129.69 C 485.5 127.63 481.66 126.62 479.21 123.7 C 480.54 122.62 482.37 122.04 483.42 120.64 C 484.14 118.41 484.73 116.14 485.3 113.87 C 486.91 113.87 488.59 113.9 490.22 113.84 C 485.46 112.92 480.75 114.42 476 114.43 C 474.7 114.42 473.75 115.33 472.93 116.21 C 472.58 115.81 472.22 115.41 471.88 115.02 C 467.1 116.18 462.16 115.59 457.3 115.5 C 452.81 115.3 452.48 109.97 450.36 107.02 C 452.71 106.84 454.98 106.16 456.92 104.8 C 460.1 103.44 463.52 102.45 466.97 102.06 C 471.63 103.22 476.06 105.64 481.05 104.86 C 481.59 103.36 482.14 101.86 482.66 100.35 C 485.5 101.42 488.46 102.16 491.29 103.27 C 489.67 103.29 488.06 103.3 486.46 103.41 C 487.92 106.66 488.91 110.08 490.32 113.35 C 490.09 112.32 489.85 111.29 489.6 110.26 C 492.07 109.95 494.43 109.1 496.7 108.08 C 497.94 109.64 499.12 111.26 500.48 112.74 C 502.58 114.29 505 115.33 507.3 116.55 C 510.31 114.72 513.21 111.97 516.85 111.56 C 521.02 112.54 525.02 114.32 528.48 116.86 C 526.84 113.83 523.34 112.9 520.32 111.84 C 517.4 110.83 514.24 111.37 511.41 112.4 C 510.15 110.11 508.81 107.88 507.46 105.65 C 508.78 105.45 510.11 105.18 511.42 104.88 C 510.45 103.61 509.48 102.32 508.51 101.05 C 507.52 101.23 506.52 101.41 505.53 101.57 C 505.76 101.28 506.21 100.71 506.43 100.43 M 482.54 102.45 C 483.8 103.03 485.1 103.51 486.43 103.93 C 485.18 103.32 483.86 102.84 482.54 102.45 Z M 660.98 106.54 C 664.13 104.19 667.19 101.42 671.02 100.21 C 670.9 101.93 670.91 103.66 671.16 105.38 C 670.06 106.34 668.93 107.26 667.82 108.2 C 671.74 111.01 676.52 113.38 677.86 118.48 C 676.14 119.25 674.43 120.04 672.74 120.84 C 671.47 117.95 670.06 115.13 668.31 112.5 C 669.17 111.93 670.04 111.36 670.91 110.79 C 668.97 111.37 667.02 112.02 665.01 112.27 C 664.7 109.75 663.12 107.81 660.98 106.54 Z M 487.18 103.67 C 490.19 103.62 492.02 106.24 494.06 108.03 C 493.82 108.38 493.37 109.06 493.14 109.39 C 491.04 107.62 488.48 106.18 487.18 103.67 Z M 491.27 104.1 L 491.91 104.34 C 494.67 105.39 497.4 106.58 500.17 107.64 C 499.93 108.25 499.7 108.86 499.48 109.46 C 496.69 107.74 493.16 107.02 491.27 104.1 Z M 693.79 104.04 C 695.3 104.5 696.91 104.97 698.09 106.1 C 699.48 108.65 699.72 111.62 700.47 114.4 C 700.83 115.78 701.22 117.58 699.88 118.58 C 698.17 119.74 695.94 119.67 694.01 120.13 C 693.7 121.15 693.38 122.18 693.08 123.2 C 692.34 122.31 691.62 121.42 690.9 120.53 C 687.86 120.7 684.85 121.04 681.82 121.02 C 685.39 118.08 690.39 117.98 693.78 114.75 C 694.9 113.7 695.75 112.42 696.74 111.23 C 695.6 108.9 694.44 106.56 693.79 104.04 Z M 540.38 108.26 C 541.51 107.01 542.58 105.69 543.7 104.42 C 543.65 105.61 543.55 106.82 543.8 107.99 C 546.55 108.78 549.47 108.4 552.28 108.83 C 553.9 109.5 554.81 111.16 555.84 112.5 C 554.52 112.55 551.9 112.66 550.58 112.71 C 549.68 111.82 548.78 110.87 547.62 110.31 C 545.32 110.82 543.86 112.98 541.97 114.22 C 541.66 112.18 541.01 110.22 540.38 108.26 Z M 488.71 106.86 C 489.65 107.79 490.5 108.79 491.29 109.86 C 490.34 108.93 489.49 107.93 488.71 106.86 Z M 472.93 116.21 C 476.38 114.38 480.6 115.41 484.3 114.27 C 483.88 116.25 483.47 118.22 483.08 120.19 C 479.67 122.43 476.44 125.31 472.18 125.74 C 472.94 124.01 473.7 122.28 474.46 120.54 C 473.58 120.16 472.7 119.78 471.84 119.4 C 472.11 118.3 472.47 117.23 472.93 116.21 Z M 549.76 116.35 C 551.78 115.53 553.85 114.58 556.07 114.54 C 558.51 115.36 560.68 116.83 562.74 118.34 C 560.67 120 558.04 120.56 555.42 120.41 C 555.74 123.07 557.35 125.21 559.56 126.64 C 558.87 129.65 557.17 132.32 555.17 134.62 C 553.46 136.62 550.04 137.07 549.46 139.95 C 550.43 141.97 552.24 143.41 553.38 145.33 C 551.28 146.08 549.15 146.64 547.12 147.54 C 545.89 146.26 544.66 144.96 543.17 144 C 539.7 143.44 536.19 144.36 532.7 144 C 533.09 142.08 534.2 140.38 534.58 138.46 C 533.77 136.51 532.22 134.99 530.94 133.34 C 534.14 133.42 538.1 134.39 540.56 131.78 C 542.25 129.76 544.3 128.04 546.91 127.43 C 547.85 124.83 549 122.26 550.96 120.26 C 550.55 118.95 550.14 117.66 549.76 116.35 Z M 464.76 118.93 C 466.17 118.54 467.57 118.11 468.98 117.72 C 467.86 118.74 466.69 119.7 465.48 120.62 C 465.24 120.05 464.99 119.49 464.76 118.93 Z M 562.4 119.44 C 564 118.28 566.08 118.9 567.86 119.27 C 568.54 122.05 567.02 124.94 567.83 127.67 C 569.01 129.28 571.05 130.02 572.65 131.16 C 572.52 132.45 572.42 133.74 572.33 135.02 C 578.21 138.13 584.61 140.01 590.98 141.82 C 591.76 140.55 592.45 139.11 591.68 137.66 L 591.54 137.19 C 591.84 137.24 592.43 137.34 592.73 137.38 C 593.82 139.07 595.14 141.22 597.47 141.06 C 600.61 139.73 601.82 135.87 605.02 134.6 C 607.57 134.03 609.65 135.66 611.62 136.94 C 610.34 138.16 608.94 139.27 607.79 140.61 C 606.56 143.99 605.59 147.46 604.46 150.88 C 602.73 149.11 601.98 146.77 602.17 144.32 C 600.59 144.19 598.83 144.4 597.54 143.28 C 595.98 142.62 594.29 140.42 592.46 141.65 C 593.63 145.09 594.98 148.46 595.98 151.96 C 594.68 152.72 592.34 152.38 591.68 154.08 C 590.47 157.2 587.49 159 585.29 161.37 C 582.58 164.1 579.87 166.82 576.91 169.26 C 578.58 175.58 576.84 182.4 572.67 187.38 C 571.6 186.62 570.11 186.14 569.61 184.81 C 567.11 178.14 564.14 171.65 561.09 165.21 C 558.82 160.87 559.78 155.74 558.22 151.2 C 557.26 152.57 556.52 154.04 555.78 155.52 C 553.55 155.15 551.7 153.89 550.3 152.2 C 551.12 151.82 551.94 151.43 552.76 151.05 C 552.66 150.84 552.46 150.42 552.37 150.22 C 550.66 149.79 549.08 148.99 547.73 147.86 C 549.62 147.19 551.59 146.87 553.58 146.66 C 555.86 143.24 548.71 141.56 551.12 138.46 C 555.94 135.98 559.74 131.38 560.42 125.9 C 558.34 124.82 556.74 123.1 555.82 120.95 C 558.08 120.81 560.45 120.76 562.4 119.44 Z M 472.1 120.3 C 472.7 120.54 473.32 120.8 473.94 121.05 C 473.2 122.08 472.43 123.1 471.63 124.08 C 471.78 122.82 471.95 121.56 472.1 120.3 Z M 686.46 122.63 C 687.56 122.45 688.66 122.27 689.78 122.13 C 689.06 123.21 688.31 124.27 687.5 125.28 C 687.13 124.4 686.79 123.51 686.46 122.63 Z M 681.79 122.35 C 682.85 123.16 684.09 123.82 684.84 124.96 C 685.43 126.3 685.05 127.79 684.93 129.18 C 683.59 127.5 682.38 125.71 681.13 123.98 C 681.3 123.56 681.62 122.76 681.79 122.35 Z M 471.33 133.61 C 469.32 130.6 469.94 127.26 471.29 124.16 C 471.29 127.3 471.73 130.47 471.33 133.61 Z M 473.14 126.51 C 475.42 125.88 477.58 124.89 479.85 124.19 C 478.18 127.7 476.65 131.72 473.12 133.76 C 473.02 131.34 472.98 128.92 473.14 126.51 Z M 471.58 130.7 C 471.81 129.22 472.14 127.77 472.58 126.34 C 472.34 127.82 472.02 129.27 471.58 130.7 Z M 466.13 129.76 C 467 129.61 467.87 129.46 468.75 129.3 C 469.77 131.92 471.1 134.56 470.56 137.48 C 469 135.86 467.5 134.18 465.98 132.54 C 466.02 131.61 466.07 130.69 466.13 129.76 Z M 573.73 131.61 C 578.02 131.02 581.03 134.94 585.16 135.22 C 587.54 135.4 589.58 136.66 591.68 137.66 C 591.69 138.22 591.7 138.78 591.74 139.34 C 591.36 139.78 590.98 140.22 590.61 140.66 C 584.2 139.71 578.21 137.04 572.39 134.32 C 572.78 133.39 573.11 132.42 573.73 131.61 Z M 594.91 136.26 C 596.7 136.91 598.37 137.84 599.9 138.97 C 598.1 140.5 595.9 140.19 594 139.08 C 594.3 138.14 594.6 137.19 594.91 136.26 Z M 515.08 146.62 C 517.1 145.21 518.74 143.35 520.43 141.58 C 520.9 144.89 519.3 147.84 517.82 150.68 C 514.74 149.87 511.81 148.62 509.3 146.67 C 511.21 146.7 513.21 147.21 515.08 146.62 Z M 593.31 141.73 C 595.82 143.34 598.27 145.95 601.54 144.98 C 601.14 148.03 602.91 150.24 605.2 151.92 C 604.45 152.7 603.68 153.47 602.94 154.27 C 602.18 153.1 601.75 151.29 600.19 151 C 598.99 151.02 597.84 151.39 596.69 151.64 C 595.55 148.34 594.7 144.94 593.31 141.73 Z M 508.62 142.47 C 509.28 143.27 509.88 144.12 510.44 145.01 C 510 144.95 509.1 144.84 508.66 144.78 C 508.64 144.01 508.62 143.24 508.62 142.47 Z M 665.98 148.41 C 666.27 146.52 667.8 145.18 669.15 143.98 C 669.74 146.71 669.23 149.49 668.42 152.12 C 667.47 150.99 666.32 149.88 665.98 148.41 Z M 641.67 158.9 C 643.26 158.49 644.71 158.1 646.38 157.76 C 645.45 159.22 644.55 160.67 643.62 162.11 C 643 161.62 642.42 161.14 641.82 160.65 C 641.78 160.21 641.71 159.34 641.67 158.9 Z M 668.86 167.96 C 668.96 165.42 669.86 162.98 670.73 160.6 C 672.05 162.08 673.67 163.62 673.86 165.72 C 673.66 167.38 672.96 168.92 672.46 170.49 C 674.81 172.16 677.93 172.61 679.88 174.85 C 677.3 174.45 674.17 174.98 672.26 172.81 C 670.9 171.4 669.25 169.97 668.86 167.96 Z M 671.22 174.58 C 672.22 175.52 673.11 176.56 673.86 177.7 C 672.82 176.81 671.94 175.75 671.22 174.58 Z M 680.22 176.65 C 682.09 177.45 683.51 178.91 684.5 180.68 C 682.52 180.01 681.09 178.49 680.22 176.65 Z M 674.91 178.73 C 675.61 178.68 676.31 178.63 677.02 178.58 C 676.59 179.54 676.17 180.48 675.76 181.43 C 675.26 181.04 674.78 180.64 674.3 180.25 C 674.5 179.74 674.7 179.23 674.91 178.73 Z M 664.46 186.74 C 666.06 184.32 667.73 181.87 670.02 180.05 C 669.5 183.1 667.32 185.62 664.46 186.74 Z M 680.24 180.61 C 681.18 180.38 681.78 182.02 681.26 182.69 C 680.3 182.9 679.7 181.28 680.24 180.61 Z M 676.87 181.92 C 677.51 182.36 678.17 182.82 678.82 183.26 C 678.22 184.03 677.61 184.8 677 185.56 C 676.91 184.34 676.87 183.13 676.87 181.92 Z M 684.26 183.26 C 685.14 185.92 686.09 188.57 686.81 191.29 C 685.83 191.02 684.86 190.75 683.88 190.52 C 684.1 191.41 684.34 192.29 684.6 193.17 C 683.77 193.37 682.94 193.56 682.13 193.76 C 681.34 192.09 680.58 190.41 679.8 188.74 C 678.66 188.9 677.53 189.08 676.4 189.24 C 676.8 188.62 677.22 187.98 677.63 187.37 C 679.12 187.27 680.83 187.54 682.07 186.5 C 683.06 185.64 683.59 184.38 684.26 183.26 Z M 578.42 183.97 C 580.14 185.96 582.08 188.1 582.31 190.85 C 581.44 191.92 580.1 192.43 578.93 193.09 C 578.42 190.07 578.15 187.01 578.42 183.97 Z M 658.6 196.86 C 660.54 194.94 662.5 193.02 664.53 191.18 C 665.86 192.44 667.22 193.72 668.58 194.98 C 667.62 196.57 666.24 198.04 665.95 199.92 C 666.18 201.86 667.31 203.51 668.03 205.3 C 664.73 208.83 664.21 214.03 661.04 217.67 C 657.34 215.94 653 216.97 649.33 215.32 C 647.05 212.25 646.6 208.14 646.47 204.41 C 647.52 205.15 648.56 205.9 649.61 206.66 C 652.53 205.77 655.56 205.23 658.43 204.18 C 661.02 203.16 661.24 199.98 662.86 198.06 C 663.78 197.39 664.92 197.16 665.98 196.79 C 664.78 196.89 663.63 196.89 662.52 197.18 C 660.98 198.9 660.7 201.5 658.9 203.02 C 655.95 204.33 652.74 204.95 649.69 205.96 C 649.02 205.33 648.35 204.71 647.7 204.09 C 648.43 204.26 649.17 204.45 649.9 204.62 C 652.34 201.93 655.4 199.78 657.38 196.68 C 658.14 197.17 658.89 197.66 659.66 198.16 C 660.3 197.32 660.95 196.5 661.59 195.66 C 660.59 196.06 659.6 196.48 658.6 196.86 Z M 614.15 194.06 C 617.96 195.13 621.69 197 623.98 200.36 C 626.33 203.55 630.78 204.73 632.37 208.5 C 633.89 211.93 637.25 214.16 638.69 217.62 C 639.89 220.07 636.8 224.07 634.29 221.99 C 630.56 219.38 628.57 215.1 626.42 211.24 C 623.01 205.05 618.07 199.9 614.15 194.06 Z M 690.92 209.39 C 687.97 207.54 689.41 203.42 691.61 201.59 C 690.94 204.14 691.12 206.79 690.92 209.39 Z M 673.46 204.91 C 676.98 205.84 680.63 206.1 683.99 204.5 C 682.94 205.78 682.06 208.06 680.05 207.74 C 677.65 207.66 674.61 205.95 672.7 207.94 C 671.56 209.22 672.87 210.59 673.53 211.73 C 675.43 211.24 677.34 210.79 679.29 210.42 C 678.17 211.37 677.04 212.3 675.97 213.3 C 676.77 215.6 677.26 217.98 677.6 220.41 C 675.73 219.04 674.49 217.07 673.46 215.05 C 672.81 215.64 672.16 216.24 671.52 216.84 C 671.89 218.47 672.26 220.11 672.61 221.75 C 671.78 221.9 670.98 222.06 670.17 222.2 C 669.98 220.22 669.48 218.29 669.38 216.31 C 670.14 212.34 671.09 208.29 673.46 204.91 Z M 689.98 216.07 C 691.87 216.06 693.9 216.18 695.82 216.42 C 693.89 217.19 691.8 217.1 689.98 216.07 Z M 637.69 225.18 C 640.14 223.38 643.27 224.65 645.86 225.45 C 648.26 226.31 650.9 224.84 653.24 225.98 C 655.7 227.13 658.06 228.4 660.47 229.66 C 654.83 230.5 649.48 227.94 643.92 227.63 C 641.78 227.34 638.77 227.39 637.69 225.18 Z M 671.19 229.26 C 673.24 229.61 675.29 230.01 677.34 230.44 C 675.14 231.14 672.34 231.79 671.19 229.26 Z M 662.58 230.51 C 664.54 230.07 666.61 229.54 668.54 230.39 C 666.58 230.92 664.54 231.1 662.58 230.51 Z M 682.07 230 C 683.99 230.04 685.92 230.1 687.86 230.22 C 686.09 230.71 684.49 231.28 682.78 231.82 C 682.54 231.22 682.3 230.6 682.07 230 Z M 681.08 230.78 C 681.67 231.34 682.07 232.04 682.5 232.74 C 681.22 233.26 679.92 233.77 678.61 234.24 C 679.4 233.06 680.14 231.85 681.08 230.78 Z M 669.72 232.57 C 670.4 231.98 672.02 232.7 671.73 233.66 C 671.04 234.16 669.51 233.46 669.72 232.57 Z"    },
    Oceania: {id:'oceania',name: "大洋洲", x: 690, y: 270, color: "#bbddff", path: "M 28.11 150.25 C 28.85 150.02 29.58 149.8 30.31 149.58 C 30.26 149.94 30.18 150.67 30.13 151.03 C 29.39 151.25 28.66 151.48 27.93 151.7 C 27.97 151.34 28.06 150.61 28.11 150.25 Z M 30.97 150.94 C 34.58 151.33 37.44 154.02 39.08 157.13 C 38.09 157.6 36.1 158.54 35.09 159.01 C 35.42 157.74 35.79 156.47 36.15 155.22 C 34.03 154.35 32.31 152.76 30.97 150.94 Z M 704.53 188.34 C 705.37 188.34 705.22 189.7 704.43 189.66 C 703.58 189.66 703.73 188.29 704.53 188.34 Z M 791.92 188.94 C 794.15 188.49 791.44 191.18 791.92 188.94 Z M 796.54 204.48 C 797.32 204.24 797.59 204.5 797.35 205.3 C 796.56 205.54 796.29 205.26 796.54 204.48 Z M 781.28 208.94 C 781.99 209.32 781.99 209.69 781.26 210.08 C 780.53 209.7 780.53 209.32 781.28 208.94 Z M 697.6 211.2 C 699.3 210.7 700.95 210.23 702.7 209.82 C 704.02 212.3 705.22 214.86 706.71 217.26 C 708.96 215.46 711.07 213.09 713.99 212.47 C 716.14 213.06 718.07 214.25 720.1 215.16 C 720.14 220.46 720.15 225.78 720.22 231.08 C 718.1 229.29 715.52 228.52 712.8 228.38 C 713.77 227.59 714.75 226.81 715.74 226.02 C 713.48 220.42 707.22 218.66 701.84 217.53 C 701.54 217.04 701.26 216.55 700.98 216.07 C 701.56 215.37 702.16 214.67 702.75 213.98 C 701.02 213.06 699.3 212.14 697.6 211.2 Z M 742.6 214.85 C 745.02 216 747.56 217.39 748.54 220.06 C 746.5 218.39 744.56 216.6 742.6 214.85 Z M 720.77 215.33 C 725.15 216.82 729.42 218.86 732.99 221.86 C 735.02 223.55 734.22 226.58 735.61 228.66 C 737.45 231.86 740.52 233.96 743.25 236.34 C 740.54 235.73 737.74 235.04 735.46 233.37 C 733.3 231.2 731.57 228.35 728.49 227.35 C 726.17 227.59 725.3 230.33 723.82 231.8 C 722.78 231.6 721.75 231.4 720.73 231.22 C 720.7 225.92 720.69 220.62 720.77 215.33 Z M 738.56 223.97 C 741.36 222.64 744.18 221.26 746.91 219.78 C 745.95 221.58 744.75 223.37 742.91 224.38 C 741.54 225.33 739.95 224.3 738.56 223.97 Z M 750.25 222.14 C 751.36 223.64 752.37 225.22 753.1 226.95 C 751.27 225.99 750.59 224.04 750.25 222.14 Z M 754.22 225.51 C 755.28 226.29 756.29 227.14 757.22 228.09 C 756.14 227.31 755.15 226.45 754.22 225.51 Z M 758.48 228.1 C 759.5 229.03 760.5 229.98 761.52 230.94 C 760.44 230.06 759.42 229.11 758.48 228.1 Z M 755.88 229.28 C 756.74 228.83 757.79 230.22 757.3 230.99 C 756.46 231.38 755.42 230.02 755.88 229.28 Z M 763.43 230.73 C 764.37 230.64 764.92 232.77 763.96 233.06 C 763.18 232.66 762.86 231.4 763.43 230.73 Z M 760.86 232.61 C 761.54 231.93 763 232.95 762.42 233.8 C 761.72 234.49 760.31 233.44 760.86 232.61 Z M 807.6 232.46 C 808.31 232.84 808.31 233.22 807.58 233.6 C 806.84 233.22 806.85 232.84 807.6 232.46 Z M 764.21 234.83 C 764.85 234.22 765.92 235.3 765.33 235.95 C 764.69 236.52 763.62 235.46 764.21 234.83 Z M 718.81 248.51 C 720.04 244.55 720.09 240.12 722.42 236.55 C 725 242.36 730.07 248.32 727.72 255.07 C 732.22 259.51 733.89 265.86 737.85 270.7 C 739.86 273.11 738.95 276.36 738.38 279.14 C 737.7 282.9 735.55 286.18 733.17 289.08 C 731.01 291.8 727.74 293.34 725.62 296.1 C 723.18 298.81 720.62 301.42 718.34 304.27 C 715.09 304.12 712.18 305.38 709.55 307.16 C 708.98 306.62 707.84 305.54 707.27 305 C 704.33 306.77 701.05 305.5 698.54 303.62 C 699.28 300.94 698.98 298.14 698.35 295.48 C 697.38 296.11 696.42 296.76 695.46 297.4 C 696.58 295.87 697.73 294.37 698.9 292.88 C 698.73 292.58 698.39 291.95 698.22 291.65 C 696.24 293.02 694.3 294.46 692.39 295.94 C 691.17 293.03 689.66 289.58 686.3 288.72 C 679.93 287.92 673.6 290.02 667.85 292.55 C 663.03 293.73 658.02 294.14 653.44 296.17 C 651.26 297.27 649.03 296.02 647.33 294.65 C 649.42 292.66 651.37 289.98 650.99 286.94 C 650.1 280.65 650.81 274.34 651.24 268.05 C 651.4 266.57 651.98 264.96 653.36 264.2 C 658.14 261.59 663.38 260.02 668.59 258.54 C 671.9 257.68 672.94 254.2 674.51 251.6 C 675.28 251.8 676.06 252 676.84 252.21 C 678.59 248.31 681.86 245.06 685.86 243.52 C 687.54 244.75 689.26 245.9 691.01 247.06 C 691.82 245 692.34 242.6 694.2 241.21 C 696.44 240.1 698.69 238.71 701.2 238.27 C 703.53 238.22 705.7 239.29 707.83 240.11 C 706.62 242.21 704 244.76 705.88 247.24 C 708.38 249.88 711.73 251.55 714.6 253.78 C 716.02 252.06 717.82 250.54 718.81 248.51 Z M 824.67 242.56 C 825.51 242.53 826.37 242.5 827.22 242.48 C 826.74 243.09 826.26 243.7 825.78 244.3 C 825.4 243.72 825.03 243.14 824.67 242.56 Z M 776.61 246.16 C 777.57 247.76 778.34 249.48 778.89 251.27 C 777.55 249.87 776.82 248.06 776.61 246.16 Z M 779.58 248.38 C 781.78 248.82 778.3 250.3 779.58 248.38 Z M 802.78 250.46 C 804 250.4 805.25 250.35 806.49 250.3 C 805.81 250.87 805.13 251.45 804.46 252.02 C 803.89 251.5 803.33 250.98 802.78 250.46 Z M 800.03 251.88 C 801.09 252.45 802.15 253.02 803.22 253.57 C 802.21 254.04 801.19 254.5 800.18 254.96 C 800.06 253.93 800 252.9 800.03 251.88 Z M 766.4 256.26 C 768.99 259.2 771.31 262.37 773.49 265.62 C 769.98 263.56 767.13 260.37 766.4 256.26 Z M 814.9 259.34 C 815.81 258.97 816.11 260.47 815.26 260.72 C 814.36 261.06 814 259.57 814.9 259.34 Z M 774.46 296.51 C 775.27 299.48 775.4 302.69 777.53 305.15 C 778.51 304.87 779.5 304.61 780.5 304.37 C 776.6 308.02 772.47 312.03 767.25 313.64 C 768.02 312.59 768.86 311.59 769.71 310.6 C 769.45 309.76 769.17 308.93 768.93 308.1 C 770.55 306.9 772.38 305.94 773.82 304.51 C 774.56 301.92 774.16 299.14 774.46 296.51 Z M 763.66 311.57 C 764.18 312.34 764.7 313.1 765.24 313.88 C 759.86 317.71 754.29 321.28 748.71 324.81 C 746.42 326.23 743.56 325.72 741.03 325.43 C 743.61 321.94 747.89 320.5 751.74 318.86 C 756.02 316.99 759.87 314.28 763.66 311.57 Z M 703.49 312.1 C 705.94 312.62 708.45 312.81 710.94 313.05 C 708.59 315.57 706.04 318.61 702.3 318.48 C 702.72 316.35 703.1 314.22 703.49 312.1 Z"    }
};
var chang_nav_svg = function (type) {

    if ($('#gs_static_resource').val() == undefined) {
        var desurl = 'http://youresource.c-ctrip.com/';
    } else {
        var desurl = $('#gs_static_resource').val();
    }

    var contentDataChina = {
        100055: { name: '<div class="img-box"><a href="/place/heilongjiang100055.html"><img src="' + desurl + '/img/des/map/world/china/heilongjiang.jpg" alt="黑龙江"></a></div><h1><a href="/place/heilongjiang100055.html">黑龙江</a></h1><ul class="cf"><li><a href="/place/haerbin151.html">哈尔滨</a></li><li><a href="/place/mudanjiangxuexiang264.html">牡丹江</a></li><li><a href="/place/mohe983.html">漠河</a></li><li><a href="/place/yichun498.html">伊春</a></li><li><a href="/place/heihe265.html">黑河</a></li></ul>' },
        100031: { name: '<div class="img-box"><a href="/place/jilin100031.html"><img src="' + desurl + '/img/des/map/world/china/jilin.jpg" alt="吉林"></a></div><h1><a href="/place/jilin100031.html">吉林</a></h1><ul class="cf"><li><a href="/place/changbaishan268.html">长白山</a></li><li><a href="/place/changchun216.html">长春</a></li><li><a href="/place/jilinshi267.html">吉林市</a></li><li><a href="/place/yanbian415.html">延边</a></li><li><a href="/place/tonghua874.html">通化</a></li></ul>' },
        100008: { name: '<div class="img-box"><a href="/place/xinjiang100008.html"><img src="' + desurl + '/img/des/map/world/china/xinjiang.jpg" alt="新疆"></a></div><h1><a href="/place/xinjiang100008.html">新疆</a></h1><ul class="cf"><li><a href="/place/kanasi816.html">喀纳斯</a></li><li><a href="/place/wulumuqi117.html">乌鲁木齐</a></li><li><a href="/place/yili115.html">伊犁</a></li><li><a href="/place/tulufan35.html">吐鲁番</a></li><li><a href="/place/kashi124.html">喀什</a></li></ul>' },
        100061: { name: '<div class="img-box"><a href="/place/liaoning100061.html"><img src="' + desurl + '/img/des/map/world/china/liaoning.jpg" alt="辽宁"></a></div><h1><a href="/place/liaoning100061.html">辽宁</a></h1><ul class="cf"><li><a href="/place/dalian4.html">大连</a></li><li><a href="/place/shenyang155.html">沈阳</a></li><li><a href="/place/dandong315.html">丹东</a></li><li><a href="/place/huludao345.html">葫芦岛</a></li><li><a href="/place/benxi463.html">本溪</a></li></ul>' },
        1: { name: '<div class="img-box"><a href="/place/beijing1.html"><img src="' + desurl + '/img/des/map/world/china/beijing.jpg" alt="北京"></a></div><h1><a href="/place/beijing1.html">北京</a></h1><ul class="cf"><li><a href="/place/beijing1.html">北京</a></li></ul>' },
        100062: { name: '<div class="img-box"><a href="/place/neimenggu100062.html"><img src="' + desurl + '/img/des/map/world/china/neimenggu.jpg" alt="内蒙古"></a></div><h1><a href="/place/neimenggu100062.html">内蒙古</a></h1><ul class="cf"><li><a href="/place/hulunbeier458.html">呼伦贝尔</a></li><li><a href="/place/huhehaote156.html">呼和浩特</a></li><li><a href="/place/xilingol484.html">锡林郭勒</a></li><li><a href="/place/eerduosi600.html">鄂尔多斯</a></li><li><a href="/place/chifeng483.html">赤峰</a></li></ul>' },
        100060: { name: '<div class="img-box"><a href="/place/gansu100060.html"><img src="' + desurl + '/img/des/map/world/china/gansu.jpg" alt="甘肃"></a></div><h1><a href="/place/gansu100060.html">甘肃</a></h1><ul class="cf"><li><a href="/place/dunhuang8.html">敦煌</a></li><li><a href="/place/gannan426.html">甘南</a></li><li><a href="/place/jiayuguan284.html">嘉峪关</a></li><li><a href="/place/lanzhou231.html">兰州</a></li><li><a href="/place/tianshui285.html">天水</a></li></ul>' },
        154: { name: '<div class="img-box"><a href="/place/tianjin154.html"><img src="' + desurl + '/img/des/map/world/china/tianjin.jpg" alt="天津"></a></div><h1><a href="/place/tianjin154.html">天津</a></h1><ul class="cf"><li><a href="/place/tianjin154.html">天津</a></li></ul>' },
        100059: { name: '<div class="img-box"><a href="/place/hebei100059.html"><img src="' + desurl + '/img/des/map/world/china/hebei.jpg" alt="河北"></a></div><h1><a href="/place/hebei100059.html">河北</a></h1><ul class="cf"><li><a href="/place/chengde135.html">承德</a></li><li><a href="/place/qinhuangdao132.html">秦皇岛</a></li><li><a href="/place/zhangjiakou497.html">张家口</a></li><li><a href="/place/handan495.html">邯郸</a></li><li><a href="/place/baoding459.html">保定</a></li></ul>' },
        100056: { name: '<div class="img-box"><a href="/place/shanxi100056.html"><img src="' + desurl + '/img/des/map/world/china/shanxi.jpg" alt="山西"></a></div><h1><a href="/place/shanxi100056.html">山西</a></h1><ul class="cf"><li><a href="/place/pingyao365.html">平遥</a></li><li><a href="/place/wutaishan184.html">五台山</a></li><li><a href="/place/datong275.html">大同</a></li><li><a href="/place/yuncheng397.html">运城</a></li><li><a href="/place/linfen318.html">临汾</a></li></ul>' },
        100063: { name: '<div class="img-box"><a href="/place/ningxia100063.html"><img src="' + desurl + '/img/des/map/world/china/ningxia.jpg" alt="宁夏"></a></div><h1><a href="/place/ningxia100063.html">宁夏</a></h1><ul class="cf"><li><a href="/place/yinchuan239.html">银川</a></li><li><a href="/place/zhongwei1184.html">中卫</a></li><li><a href="/place/wuzhong890.html">吴忠</a></li><li><a href="/place/guyuan888.html">固原</a></li></ul>' },
        100039: { name: '<div class="img-box"><a href="/place/shandong100039.html"><img src="' + desurl + '/img/des/map/world/china/shandong.jpg" alt="山东"></a></div><h1><a href="/place/shandong100039.html">山东</a></h1><ul class="cf"><li><a href="/place/qingdao5.html">青岛</a></li><li><a href="/place/Taishan6.html">泰山</a></li><li><a href="/place/Jinan128.html">济南</a></li><li><a href="/place/yantai170.html">烟台</a></li><li><a href="/place/weihai169.html">威海</a></li></ul>' },
        100032: { name: '<div class="img-box"><a href="/place/qinghai100032.html"><img src="' + desurl + '/img/des/map/world/china/qinghai.jpg" alt="青海"></a></div><h1><a href="/place/qinghai100032.html">青海</a></h1><ul class="cf"><li><a href="/place/xining237.html">西宁</a></li><li><a href="/place/qinghaihu281.html">青海湖</a></li><li><a href="/place/tongren895.html">同仁</a></li><li><a href="/place/geermu332.html">格尔木</a></li><li><a href="/place/yushu896.html">玉树</a></li></ul>' },
        100057: { name: '<div class="img-box"><a href="/place/shanxi100057.html"><img src="' + desurl + '/img/des/map/world/china/shan3xi.jpg" alt="陕西"></a></div><h1><a href="/place/shanxi100057.html">陕西</a></h1><ul class="cf"><li><a href="/place/xian7.html">西安</a></li><li><a href="/place/huashan183.html">华山</a></li><li><a href="/place/baoji422.html">宝鸡</a></li><li><a href="/place/yanan423.html">延安</a></li><li><a href="/place/xianyang632.html">咸阳</a></li></ul>' },
        100066: { name: '<div class="img-box"><a href="/place/jiangsu100066.html"><img src="' + desurl + '/img/des/map/world/china/jiangsu.jpg" alt="江苏"></a></div><h1><a href="/place/jiangsu100066.html">江苏</a></h1><ul class="cf"><li><a href="/place/suzhou11.html">苏州</a></li><li><a href="/place/nanjing9.html">南京</a></li><li><a href="/place/wuxi10.html">无锡</a></li><li><a href="/place/yangzhou12.html">扬州</a></li><li><a href="/place/liyang598.html">溧阳</a></li></ul>' },
        100058: { name: '<div class="img-box"><a href="/place/henan100058.html"><img src="' + desurl + '/img/des/map/world/china/henan.jpg" alt="河南"></a></div><h1><a href="/place/henan100058.html">河南</a></h1><ul class="cf"><li><a href="/place/songshan178.html">嵩山</a></li><li><a href="/place/luoyang198.html">洛阳</a></li><li><a href="/place/kaifeng165.html">开封</a></li><li><a href="/place/zhengzhou157.html">郑州</a></li><li><a href="/place/anyang412.html">安阳</a></li></ul>' },
        100003: { name: '<div class="img-box"><a href="/place/xizang100003.html"><img src="' + desurl + '/img/des/map/world/china/xizang.jpg" alt="西藏"></a></div><h1><a href="/place/xizang100003.html">西藏</a></h1><ul class="cf"><li><a href="/place/lhasa36.html">拉萨</a></li><li><a href="/place/linzhi126.html">林芝</a></li><li><a href="/place/rikaze2446.html">日喀则</a></li><li><a href="/place/ali99.html">阿里</a></li><li><a href="/place/shannan339.html">山南</a></li></ul>' },
        100068: { name: '<div class="img-box"><a href="/place/anhui100068.html"><img src="' + desurl + '/img/des/map/world/china/anhui.jpg" alt="安徽"></a></div><h1><a href="/place/anhui100068.html">安徽</a></h1><ul class="cf"><li><a href="/place/huangshan19.html">黄山</a></li><li><a href="/place/yixian528.html">黟县</a></li><li><a href="/place/jiuhuashan182.html">九华山</a></li><li><a href="/place/hefei196.html">合肥</a></li><li><a href="/place/wuhu457.html">芜湖</a></li></ul>' },
        100009: { name: '<div class="img-box"><a href="/place/sichuan100009.html"><img src="' + desurl + '/img/des/map/world/china/sichuan.jpg" alt="四川"></a></div><h1><a href="/place/sichuan100009.html">四川</a></h1><ul class="cf"><li><a href="/place/chengdu104.html">成都</a></li><li><a href="/place/jiuzhaigouhuanglong25.html">九寨沟</a></li><li><a href="/place/emeishan24.html">峨眉山</a></li><li><a href="/place/daochengyading342.html">稻城-亚丁</a></li><li><a href="/place/kangding344.html">康定</a></li></ul>' },
        100067: { name: '<div class="img-box"><a href="/place/hubei100067.html"><img src="' + desurl + '/img/des/map/world/china/hubei.jpg" alt="湖北"></a></div><h1><a href="/place/hubei100067.html">湖北</a></h1><ul class="cf"><li><a href="/place/wuhan145.html">武汉</a></li><li><a href="/place/wudangshan146.html">武当山</a></li><li><a href="/place/yichang313.html">宜昌</a></li><li><a href="/place/Shennongjia147.html">神农架</a></li><li><a href="/place/xiangyang414.html">襄阳</a></li></ul>' },
        158: { name: '<div class="img-box"><a href="/place/chongqing158.html"><img src="' + desurl + '/img/des/map/world/china/chongqing.jpg" alt="重庆"></a></div><h1><a href="/place/chongqing158.html">重庆</a></h1><ul class="cf"><li><a href="/place/chongqing158.html">重庆</a></li></ul>' },
        100065: { name: '<div class="img-box"><a href="/place/zhejiang100065.html"><img src="' + desurl + '/img/des/map/world/china/zhejiang.jpg" alt="浙江"></a></div><h1><a href="/place/zhejiang100065.html">浙江</a></h1><ul class="cf"><li><a href="/place/hangzhou14.html">杭州</a></li><li><a href="/place/xitang15.html">西塘</a></li><li><a href="/place/shaoxing18.html">绍兴</a></li><li><a href="/place/putuoshan16.html">普陀山</a></li><li><a href="/place/wuzhen508.html">乌镇</a></li></ul>' },
        100054: { name: '<div class="img-box"><a href="/place/jiangxi100054.html"><img src="' + desurl + '/img/des/map/world/china/jiangxi.jpg" alt="江西"></a></div><h1><a href="/place/jiangxi100054.html">江西</a></h1><ul class="cf"><li><a href="/place/wuyuan446.html">婺源</a></li><li><a href="/place/lushan20.html">庐山</a></li><li><a href="/place/jingdezhen405.html">景德镇</a></li><li><a href="/place/sanqingshan159.html">三清山</a></li><li><a href="/place/jinggangshan171.html">井冈山</a></li></ul>' },
        100053: { name: '<div class="img-box"><a href="/place/hunan100053.html"><img src="' + desurl + '/img/des/map/world/china/hunan.jpg" alt="湖南"></a></div><h1><a href="/place/hunan100053.html">湖南</a></h1><ul class="cf"><li><a href="/place/fenghuang988.html">凤凰</a></li><li><a href="/place/zhangjiajie23.html">张家界</a></li><li><a href="/place/changsha148.html">长沙</a></li><li><a href="/place/xiangxi496.html">湘西</a></li><li><a href="/place/hengshan277.html">衡山</a></li></ul>' },
        100064: { name: '<div class="img-box"><a href="/place/guizhou100064.html"><img src="' + desurl + '/img/des/map/world/china/guizhou.jpg" alt="贵州"></a></div><h1><a href="/place/guizhou100064.html">贵州</a></h1><ul class="cf"><li><a href="/place/guiyang33.html">贵阳</a></li><li><a href="/place/anshun518.html">安顺</a></li><li><a href="/place/kaili491.html">凯里</a></li><li><a href="/place/tongren680.html">铜仁</a></li><li><a href="/place/duyun678.html">都匀</a></li></ul>' },
        100038: { name: '<div class="img-box"><a href="/place/fujian100038.html"><img src="' + desurl + '/img/des/map/world/china/fujian.jpg" alt="福建"></a></div><h1><a href="/place/fujian100038.html">福建</a></h1><ul class="cf"><li><a href="/place/xiamen21.html">厦门</a></li><li><a href="/place/gulangyuisland120058.html">鼓浪屿</a></li><li><a href="/place/wuyishan22.html">武夷山</a></li><li><a href="/place/fuzhou164.html">福州</a></li><li><a href="/place/longyan366.html">龙岩</a></li></ul>' },
        100007: { name: '<div class="img-box"><a href="/place/yunnan100007.html"><img src="' + desurl + '/img/des/map/world/china/yunnan.jpg" alt="云南"></a></div><h1><a href="/place/yunnan100007.html">云南</a></h1><ul class="cf"><li><a href="/place/lijiang32.html">丽江</a></li><li><a href="/place/diqing106.html">香格里拉</a></li><li><a href="/place/kunming29.html">昆明</a></li><li><a href="/place/dali31.html">大理</a></li><li><a href="/place/meilixueshan1143.html">梅里雪山</a></li></ul>' },
        100051: { name: '<div class="img-box"><a href="/place/guangdong100051.html"><img src="' + desurl + '/img/des/map/world/china/guangdong.jpg" alt="广东"></a></div><h1><a href="/place/guangdong100051.html">广东</a></h1><ul class="cf"><li><a href="/place/shenzhen26.html">深圳</a></li><li><a href="/place/guangzhou152.html">广州</a></li><li><a href="/place/zhuhai27.html">珠海</a></li><li><a href="/place/huizhou213.html">惠州</a></li><li><a href="/place/zhaoqing269.html">肇庆</a></li></ul>' },
        100052: { name: '<div class="img-box"><a href="/place/guangxi100052.html"><img src="' + desurl + '/img/des/map/world/china/guangxi.jpg" alt="广西"></a></div><h1><a href="/place/guangxi100052.html">广西</a></h1><ul class="cf"><li><a href="/place/guilin28.html">桂林</a></li><li><a href="/place/beihai140.html">北海</a></li><li><a href="/place/yangshuo702.html">阳朔</a></li><li><a href="/place/nanning166.html">南宁</a></li><li><a href="/place/baise524.html">百色</a></li></ul>' },
        100076: { name: '<div class="img-box"><a href="/place/taiwan100076.html"><img src="' + desurl + '/img/des/map/world/china/taiwan.jpg" alt="台湾"></a></div><h1><a href="/place/taiwan100076.html">台湾</a></h1><ul class="cf"><li><a href="/place/taipeicity360.html">台北</a></li><li><a href="/place/gaoxiong756.html">高雄</a></li><li><a href="/place/tainan757.html">台南</a></li><li><a href="/place/kending1380.html">垦丁</a></li><li><a href="/place/nantou759.html">南投</a></li></ul>' },
        38: { name: '<div class="img-box"><a href="/place/xianggang38.html"><img src="' + desurl + '/img/des/map/world/china/xianggang.jpg" alt="香港"></a></div><h1><a href="/place/xianggang38.html">香港</a></h1><ul class="cf"><li><a href="/place/hongkong38.html">香港</a></li></ul>' },
        39: { name: '<div class="img-box"><a href="/place/aomen39.html"><img src="' + desurl + '/img/des/map/world/china/aomen.jpg" alt="澳门"></a></div><h1><a href="/place/aomen39.html">澳门</a></h1><ul class="cf"><li><a href="/place/macau39.html">澳门</a></li></ul>' },
        100001: { name: '<div class="img-box"><a href="/place/hainan100001.html"><img src="' + desurl + '/img/des/map/world/china/hainan.jpg" alt="海南"></a></div><h1><a href="/place/hainan100001.html">海南</a></h1><ul class="cf"><li><a href="/place/sanya61.html">三亚</a></li><li><a href="/place/haikou37.html">海口</a></li><li><a href="/place/hainandongxian59.html">海南东线</a></li><li><a href="/place/hainanxixian58.html">海南西线</a></li><li><a href="/place/hainanzhongxian60.html">海南中线</a></li></ul>' },
        2: { name: '<div class="img-box"><a href="/place/shanghai2.html"><img src="' + desurl + '/img/des/map/world/china/shanghai.jpg" alt="上海"></a></div><h1><a href="/place/shanghai2.html">上海</a></h1><ul class="cf"><li><a href="/place/shanghai2.html">上海</a></li></ul>' }
    };
    var contentDataWorld = {
        'na': { name: '<div class="img-box"><a href="/place/northamerica120004.html"><img src="' + desurl + '/img/des/map/world/earth/north-america.jpg" alt="北美洲"></a></div><h1><a href="/place/northamerica120004.html">北美洲</a></h1><ul class="cf"><li><a href="/place/unitedstates100047.html">美国</a></li><li><a href="/place/canada100029.html">加拿大</a></li><li><a href="/place/cuba100113.html">古巴</a></li><li><a href="/place/mexico100108.html">墨西哥</a></li><li><a href="/place/costarica100140.html">哥斯达黎加</a></li><li><a href="/place/bahamas21598.html">巴哈马</a></li><li><a href="/place/jamaica21608.html">牙买加</a></li><li><a href="/place/puertorico21617.html">波多黎各</a></li></ul>' },
        'sa': { name: '<div class="img-box"><a href="/place/northamerica120005.html"><img src="' + desurl + '/img/des/map/world/earth/south-america.jpg" alt="南美洲"></a></div><h1><a href="/place/northamerica120005.html">南美洲</a></h1><ul class="cf"><li><a href="/place/baxi100109.html">巴西</a></li><li><a href="/place/argentina100111.html">阿根廷</a></li><li><a href="/place/peru100112.html">秘鲁</a></li><li><a href="/place/chile100110.html">智利</a></li><li><a href="/place/bolivia100259.html">玻利维亚</a></li><li><a href="/place/columbia100134.html">哥伦比亚</a></li><li><a href="/place/venezuela20366.html">委内瑞拉</a></li><li><a href="/place/ecuador100126.html">厄瓜多尔</a></li></ul>' },
        'eu': { name: '<div class="img-box"><a href="/place/europe120002.html"><img src="' + desurl + '/img/des/map/world/earth/europe.jpg" alt="欧洲"></a></div><h1><a href="/place/europe120002.html">欧洲</a></h1><ul class="cf"><li><a href="/place/france100024.html">法国</a></li><li><a href="/place/italy100026.html">意大利</a></li><li><a href="/place/germany100025.html">德国</a></li><li><a href="/place/spain100035.html">西班牙</a></li><li><a href="/place/unitedkingdom20354.html">英国</a></li><li><a href="/place/holland100028.html">荷兰</a></li><li><a href="/place/greece100036.html">希腊</a></li><li><a href="/place/turkey100073.html">土耳其</a></li><li><a href="/place/switzerland100050.html">瑞士</a></li><li><a href="/place/norway100098.html">挪威</a></li><li><a href="/place/russia100083.html">俄罗斯</a></li></ul>' },
        'africa': { name: '<div class="img-box"><a href="/place/africa120006.html"><img src="' + desurl + '/img/des/map/world/earth/africa.jpg" alt="非洲"></a></div><h1><a href="/place/africa120006.html">非洲</a></h1><ul class="cf"><li><a href="/place/egypt100030.html">埃及</a></li><li><a href="/place/kenya100087.html">肯尼亚</a></li><li><a href="/place/southafrica100049.html">南非</a></li><li><a href="/place/morocco100132.html">摩洛哥</a></li><li><a href="/place/mauritius444.html">毛里求斯</a></li><li><a href="/place/seychelles100153.html">塞舌尔</a></li><li><a href="/place/tanzania100154.html">坦桑尼亚</a></li><li><a href="/place/madagascar100214.html">马达加斯加</a></li></ul>' },
        'asia': { name: '<div class="img-box"><a href="/place/asia120001.html"><img src="' + desurl + '/img/des/map/world/earth/asia.jpg" alt="亚洲"></a></div><h1><a href="/place/asia120001.html">亚洲</a></h1><ul class="cf"><li><a href="/place/thailand100021.html">泰国</a></li><li><a href="/place/malaysia100022.html">马来西亚</a></li><li><a href="/place/singapore53.html">新加坡</a></li><li><a href="/place/vietnam100046.html">越南</a></li><li><a href="/place/cambodia100081.html">柬埔寨</a></li><li><a href="/place/nepal100079.html">尼泊尔</a></li><li><a href="/place/japan100041.html">日本</a></li><li><a href="/place/korea100042.html">韩国</a></li><li><a href="/place/maldives330.html">马尔代夫</a></li><li><a href="/place/philippine100044.html">菲律宾</a></li><li><a href="/place/indonesia100045.html">印度尼西亚</a></li></ul>' },
        'oceania': { name: '<div class="img-box"><a href="/place/oceania120003.html"><img src="' + desurl + '/img/des/map/world/earth/oceania.jpg" alt="大洋洲"></a></div><h1><a href="/place/oceania120003.html">大洋洲</a></h1><ul class="cf"><li><a href="/place/australia100048.html">澳大利亚</a></li><li><a href="/place/newzealand100078.html">新西兰</a></li><li><a href="/place/fiji100102.html">斐济</a></li><li><a href="/place/palau100254.html">帕劳</a></li><li><a href="/place/tahiti1354.html">大溪地</a></li><li><a href="/place/saipan569.html">塞班</a></li><li><a href="/place/guam1422.html">关岛</a></li></ul>' }
    };

    if (type == 'china') {
        contentData = contentDataChina;
        mapData = mapDataChina;
        $('#chinamap')
        .removeClass('svn-map-world')
        .addClass('svn-map-china')
        .svgmap({
            x: 0,
            y: 0,
            mapData: mapData,
            contentData: contentData
        });

        $('#btn-nav-world')
            .removeClass('btn-nav-world-cur')
            .addClass('btn-nav-world');

        $('#btn-nav-china')
            .removeClass('btn-nav-china')
            .addClass('btn-nav-china-cur');

    } else {

        contentData = contentDataWorld;
        mapData = mapDataWorld;
        $('#chinamap')
        .removeClass('svn-map-china')
        .addClass('svn-map-world')
        .svgmap({
            x: 0,
            y: 0,
            width: 900,
            height: 400,
            mapData: mapData,
            contentData: contentData
        });

        $('#btn-nav-world')
            .removeClass('btn-nav-world')
            .addClass('btn-nav-world-cur');
        $('#btn-nav-china')
            .removeClass('btn-nav-china-cur')
            .addClass('btn-nav-china');
    }
}
//svg map

window.onload = function () {
    chang_nav_svg('china');
}

// JavaScript Document
$(function () {
   
    var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
    if (isIE6) {
        $('#journals-panel-items dl').hover(function (d) {
            $(this).next().children("dt").addClass("brt");
            d.stopPropagation();
            $(this).children("dd").show().css("marginTop", ($(this).index()) * 40 + 'px');
            $(this).children("dt").addClass("panel-hover");
        }, function (a) {
            $(this).next().children("dt").removeClass("brt");
            a.stopPropagation();
            $(this).children("dd").hide();
            $(this).children("dt").removeClass("panel-hover");
        });
    }
    else {
        $("#journals-panel-items dl").hover(
            function () {
                $(this).next().children("dt").addClass("brt");
                $(this).children("dd").css("marginTop", ($(this).index()) * 40 - 1 + 'px');
                //alert(($(this).index()-1)*40+'px');
            },
            function () {
                $(this).next().children("dt").removeClass("brt");
            }
        );
    }

});
