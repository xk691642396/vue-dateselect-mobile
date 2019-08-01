//页面公用js
//提示
function tips(opt){
	var obj={
		content:opt.msg||"提示",
		type:opt.type==0?"remove":"ok",
		time:((typeof opt.time)==Number?opt.time:1)
	}
	var a = document.createElement("div");
	var html='<div class="layer-cover" style="background-color:rgba(0,0,0,0);"></div>'+
	'<div class="layer-bg"><div class="layer-cont"><div class="remind-layer"><div class="txtcnt"><span class="circle"><i class="iconfont icon-'+obj.type+'"></i></span></div><p class="txtcnt" style="line-height:22px;">'+obj.content+'</p></div></div></div></div>';
	a.innerHTML=html;
	setTimeout(function(){
		document.body.appendChild(a);
	},200)
	setTimeout(function(){
		document.body.removeChild(a);
	},obj.time*2000)
}
//获取url参数值
function request(keyValue) {
    var search = location.href.split("?")[location.href.split("?").length-1];
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == keyValue) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
//判断是否是微信浏览器
function isWeixinBrowser() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
//将数字转换成金额显示
function toMoney(num){
	num = Number(num);
    num = num.toFixed(2);
    num = parseFloat(num);
    num = num.toLocaleString();
    var s = num.toString();
	var rs = s.indexOf('.'); 
 	if (rs < 0) { 
		rs = s.length; 
	    s += '.'; 
  	} 
  	while (s.length <= rs + 2) { 
    	s += '0'; 
  	} 
    return s;//返回的是字符串23,245.12保留2位小数
}
//
function decodeBase64 (input) {  
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";  
    var chr1, chr2, chr3;  
    var enc1, enc2, enc3, enc4;  
    var i = 0;  
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
    while (i < input.length) {  
        enc1 = _keyStr.indexOf(input.charAt(i++));  
        enc2 = _keyStr.indexOf(input.charAt(i++));  
        enc3 = _keyStr.indexOf(input.charAt(i++));  
        enc4 = _keyStr.indexOf(input.charAt(i++));  
        chr1 = (enc1 << 2) | (enc2 >> 4);  
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
        chr3 = ((enc3 & 3) << 6) | enc4;  
        output = output + String.fromCharCode(chr1);  
        if (enc3 != 64) {  
            output = output + String.fromCharCode(chr2);  
        }  
        if (enc4 != 64) {  
            output = output + String.fromCharCode(chr3);  
        }  
    }  
    output = _utf8_decode(output);  
    return output;  
}
function _utf8_decode (utftext) {  
    var string = "";  
    var i = 0;  
    var c =0, c1 =0, c2 = 0;  
    while ( i < utftext.length ) {  
        c = utftext.charCodeAt(i);  
        if (c < 128) {  
            string += String.fromCharCode(c);  
            i++;  
        } else if((c > 191) && (c < 224)) {  
            c2 = utftext.charCodeAt(i+1);  
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
            i += 2;  
        } else {  
            c2 = utftext.charCodeAt(i+1);  
            c3 = utftext.charCodeAt(i+2);  
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
            i += 3;  
        }  
    }  
    return string;  
}
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
//时间加加减
function toDate(time,type, count) {
    var dateTime = new Date(time);
    var timeObject = {};
    switch (type) {
        case "year":
            timeObject.year = dateTime.getFullYear() + count;
            dateTime.setYear(timeObject.year);
            break;
        case "month":
            timeObject.month = dateTime.getMonth() + 1 + count;
            dateTime.setMonth(timeObject.month);
            break;
        case "day":
            timeObject.day = dateTime.getDate() + count;
            dateTime.setDate(timeObject.day);
            break;
        case "h":
            timeObject.h = dateTime.getHours();
            dateTime.setHours(timeObject.h);
            break;
        case "m":
            timeObject.m = dateTime.getMinutes() + count;
            dateTime.setMinutes(timeObject.m);
            break;
        case "s":
            timeObject.s = dateTime.getSeconds() + count;
            dateTime.setSeconds(timeObject.s);
            break;
        default:
            break;
    }
    timeObject.year = dateTime.getFullYear();
    timeObject.month = Number(dateTime.getMonth()) + 1;
    timeObject.day = dateTime.getDate();
    timeObject.h = dateTime.getHours();
    timeObject.m = dateTime.getMinutes();
    timeObject.s = dateTime.getSeconds();

    return timeObject.year + "-" + changeDoubleStr(timeObject.month) + "-" + changeDoubleStr(timeObject.day) + " " + changeDoubleStr(timeObject.h) + ":" + changeDoubleStr(timeObject.m) + ":" + changeDoubleStr(timeObject.s);
}
function changeDoubleStr(num) {
	var str = num;
	if (num < 10) {
	    str = "0" + str.toString();
	}
	return str;
}
 //日期格式化yyyy-
function formatDate(v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecondjsonccp
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
function arrIndex(arr,item){
	for( var i=0;i<arr.length;i++){
	    if(arr[i]==item)
	    return i;
	}
	return -1;
}
export { //很关键
	request,
	tips,
	toMoney,
	decodeBase64,
	getNowFormatDate,
	changeDoubleStr,
	formatDate,
	arrIndex
}