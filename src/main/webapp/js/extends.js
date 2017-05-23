
/**
 * jQuery 扩展
 */
(function($) {
	/**
	 * 序列化form的字段为json对象
	 */
	$.fn.toJson = function() {
		var o = {};
		$.each($(this).serializeArray(), function(index) {
			if (o[this['name']]) {
				o[this['name']] = o[this['name']] + "," + this['value'];
			} else {
				o[this['name']] = this['value'];
			}
		});
		return o;
	};
	
	$.encode = function(param) {
		return decodeURIComponent(encodeURIComponent($.param(param)));
	};
})(jQuery);

/**
 * 模板反转
 */
function TemplateWrap(target) {
	target.find("[_class]").each(function() {
		var t = $(this);
		t.addClass(t.attr("_class"));
		t.removeAttr("_class");
	});
	return target;
}

/**
 * 去除字符串的左右空格
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 对象拷贝
 */
function clone(myObj){ 
	if(typeof(myObj) != 'object') return myObj; 
	if(myObj == null) return myObj; 
	var myNewObj = new Object(); 
	for(var i in myObj) 
	myNewObj[i] = clone(myObj[i]); 
	return myNewObj; 
} 

//转换对象为json字符串
function toJson(myObj){
	var json = '{';
	for(var i in myObj){
		json += "\""+i+"\""+":"+"\""+myObj[i] +"\""+ ",";
	}
	json = json.substr(0, json.length-1);
	json += '}';
	return json;
} 

//转换js数组对象为json数组
function arrayToJson(array){
	if(isArray(array)){
		var arrayJson = '[';
		for(var i=0; i<array.length; i++){
			arrayJson += toJson(array[i])+',';
		}
		arrayJson = arrayJson.substr(0, arrayJson.length-1);
		arrayJson += ']';
		return arrayJson;
	}
	return '不是数组类型,无法转换';
}

//判断js对象是否为数组
function isArray(obj){ 
    return (typeof obj=='object')&&obj.constructor==Array; 
}

function transformPump(str){
	if(str.indexOf("_") == -1){
		return str;
	}
    var arr = str.split("_");
    var res = arr[0];
    for ( var i = 1; i < arr.length; i++) {
		var slice = arr[i];
		if(slice){
			slice = slice.charAt(0).toUpperCase() + slice.substring(1)
		}
		res += slice;
	}
    return res;
}

/**
 * 字符串模版替换
 * 
 * @author ____′↘夏悸
 * @param this
 *            需要替换的字符串
 * @param data
 *            替换的数据。json格式的数据或者数组。 eg： str：我是{{key1}}替换的字符串{{key2}}。
 *            data：{key1:"替换",key2:"替换2"}
 *            str：我是{{key.subkey}}替换的字符串{{key.subkey2}}。
 *            data：{key{subkey:"替换",subkey2:"替换2"}} str：我是{{0}}替换的字符串{{1}}。
 *            data：["替换","替换2"]
 * @returns
 */
String.prototype.template = function(data) {
	var str = this;
	if (data && data.sort) {
		for ( var i = 0; i < data.length; i++) {
			str = str.replace(new RegExp("{\\{" + i + "}}", "gm"), data[i]);
		}
		return str;
	}

	var placeholder = str.match(new RegExp("{{.+?}}", 'ig'));
	if (data && placeholder) {
		for ( var i = 0; i < placeholder.length; i++) {
			var key = placeholder[i];
			var value = proxy.call(data, key.replace(new RegExp("[{,}]", "gm"),
					""));
			key = key.replace(new RegExp("\\\.", "gm"), "\\.").replace("{{",
					"{\\{");
			if (value == null)
				value = "&nbsp;";
			str = str.replace(new RegExp(key, "gm"), value);
		}
	}
	return str;

	function proxy(key) {
		try {
			return eval('this.' + key);
		} catch (e) {
			return "";
		}
	}
};
