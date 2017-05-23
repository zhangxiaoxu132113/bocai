/**
 * validateRule.js
 * 
 * The validate rule is defined by using required and validType property, here are the rules already implemented:
 * email: Match email regex rule.
 * url: Match URL regex rule.
 * length[0,100]: Between x and x characters allowed.
 * remote['http://.../action.do','paramName']: Send ajax request to do validate value, return 'true' when successfully.
 *
 * 缩写
 * LT 小于
 * LE 小于或等于
 * GT 大于
 * GE 大于或等于
 * EQ 等于
 * NE、NEQ 不等于
 */

$.extend($.fn.validatebox.defaults.rules, {
	eqPassword : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不能设为 {0}'
	},
	password: {
		validator : function(value, param) {
			return value.length>=6&&value.length<=16;
		},
		message : '密码长度必须大于6个字符并且小于16个字符'
	},
	
	// 验证手机号码
	mobile: {
		validator: function(value) {
			return /^[0-9]{11}$/.test(value);
		}
	},
	
	// 长度
	minLength: {
		validator: function(value, param){
			return value.length >= param[0];
		},
		message: '请输入不小于{0}位的字符'
	},
	maxLength: {
		validator: function(value, param){
			return value.length <= param[0];
		},
		message: '请输入不大于{0}位的字符'
	},
	
	// 日期验证
	leDate: {
		validator: function(value, param){
			var self = $.fn.datebox.defaults.parser(value);
			var target;
			if ($.isFunction(param[0])) {
				target = $.fn.datebox.defaults.parser(param[0]());
			} else {
				target = $.fn.datebox.defaults.parser(param[0]);
			}
			return self <= target;
		},
		message: '{1}'
	},
	leEndDate: {
		validator: function(value, param){
			var self = $.fn.datebox.defaults.parser(value);
			var target;
			if ($.isFunction(param[0])) {
				target = $.fn.datebox.defaults.parser(param[0]());
			} else {
				target = $.fn.datebox.defaults.parser(param[0]);
			}
			return self <= target;
		},
		message: '{1}'
	},
	geDate: {
		validator: function(value, param){
			var self = $.fn.datebox.defaults.parser(value);
			var target;
			if ($.isFunction(param[0])) {
				target = $.fn.datebox.defaults.parser(param[0]());
			} else {
				target = $.fn.datebox.defaults.parser(param[0]);
			}
			return self >= target;
		},
		message: '{1}'
	},
	geStartDate: {
		validator: function(value, param){
			var self = $.fn.datebox.defaults.parser(value);
			var target;
			if ($.isFunction(param[0])) {
				target = $.fn.datebox.defaults.parser(param[0]());
			} else {
				target = $.fn.datebox.defaults.parser(param[0]);
			}
			return self >= target;
		},
		message: '{1}'
	},
	neDate: {
		validator: function(value, param){
			if ($.isFunction(param[0])) {
				return value !== param[0]();
			}
			return value !== param[0];
		},
		message: '两个日期不能相等'
	},
	
	// 多个 url 校验，其中 value 用多个回车符分隔
	urls: {
		validator: function(value, param) {
			var arr = value.split('\n');
			var reg = /^(https?):\/\//i;
			var result = true;
			$.each(arr, function(i, n) {
				if (!reg.test(n)) {
					result = false;
					return false;
				}
			});
			return result;
		},
		message: '存在不合法的 url'
	}
});