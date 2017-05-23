
var wno = $.extend({}, wno);/* 全局对象 */

/**
 * 设置百分比
 */
function fixWidth(percent) {
    return document.body.clientWidth * percent ; //这里你可以自己做调整  
} 

/**
 * 为easyUI扩展
 */
(function($) {
	/**
	 * 页面所有easyui组件渲染成功后，隐藏等待信息 
	 */
	$.parser.onComplete = function() {
		window.setTimeout(function() {
			if($(".messager-body").length){
				$.messager.progress('close');
			}
		}, 1000);
	};
	
	/**
	 * 扩展dataGrid出现错误的提示
	 * @param {Object} XMLHttpRequest
	 */
//	$.fn.datagrid.defaults.onLoadError = function(XMLHttpRequest) {
//		if(!XMLHttpRequest.responseText) return;
//		$('<div><div></div></div>').window({
//			title : "后台错误", 
//			iconCls : "icon-no",
//			modal : true,
//			collapsible : false,
//			width : 500,
//			height : 300
//		}).find('div').panel({
//			fit : true,
//			content : '<div>'+XMLHttpRequest.responseText+'</div>'
//		});
//	};
	/**
	 * combobox默认选中第一行
	 * 
	 */
	$.extend($.fn.combobox.methods, { 
	    selectedIndex: function (jq, index) { 
	        if (!index) { 
	            index = 0; 
	        } 
	        $(jq).combobox({ 
	            onLoadSuccess: function () { 
	                var opt = $(jq).combobox('options'); 
	                var data = $(jq).combobox('getData'); 

	                for (var i = 0; i < data.length; i++) { 
	                    if (i == index) { 
	                        $(jq).combobox('setValue', eval('data[index].' + opt.valueField)); 
	                        break; 
	                    } 
	                } 
	            } 
	        }); 
	    } 
	});
	/**
	 * 扩展树表格级联勾选方法：
	 * @param {Object} container
	 * @param {Object} options
	 * @return {TypeName} 
	 */
	$.extend($.fn.treegrid.methods,{
		/**
		 * 级联选择
	     * @param {Object} target
	     * @param {Object} param 
		 *		param包括两个参数:
	     *			id:勾选的节点ID
	     *			deepCascade:是否深度级联
	     * @return {TypeName} 
		 */
		cascadeCheck : function(target,param){
			var opts = $.data(target[0], "treegrid").options;
			if(opts.singleSelect)
				return;
			var idField = opts.idField;//这里的idField其实就是API里方法的id参数
			var status = false;//用来标记当前节点的状态，true:勾选，false:未勾选
			var selectNodes = $(target).treegrid('getSelections');//获取当前选中项
			for(var i=0;i<selectNodes.length;i++){
				if(selectNodes[i][idField]==param.id)
					status = true;
			}
			//级联选择父节点
			selectParent(target[0],param.id,idField,status);
			selectChildren(target[0],param.id,idField,param.deepCascade,status);
			/**
			 * 级联选择父节点
			 * @param {Object} target
			 * @param {Object} id 节点ID
			 * @param {Object} status 节点状态，true:勾选，false:未勾选
			 * @return {TypeName} 
			 */
			function selectParent(target,id,idField,status){
				var parent = $(target).treegrid('getParent',id);
				if(parent){
					var parentId = parent[idField];
					if(status)
						$(target).treegrid('select',parentId);
					else
						$(target).treegrid('unselect',parentId);
					selectParent(target,parentId,idField,status);
				}
			}
			/**
			 * 级联选择子节点
			 * @param {Object} target
			 * @param {Object} id 节点ID
			 * @param {Object} deepCascade 是否深度级联
			 * @param {Object} status 节点状态，true:勾选，false:未勾选
			 * @return {TypeName} 
			 */
			function selectChildren(target,id,idField,deepCascade,status){
				//深度级联时先展开节点
				if(!status&&deepCascade)
					$(target).treegrid('expand',id);
				//根据ID获取下层孩子节点
				var children = $(target).treegrid('getChildren',id);
				for(var i=0;i<children.length;i++){
					var childId = children[i][idField];
					if(status)
						$(target).treegrid('select',childId);
					else
						$(target).treegrid('unselect',childId);
					selectChildren(target,childId,idField,deepCascade,status);//递归选择子节点
				}
			}
		}
	});
	/**
	 * 扩展树表格级联选择（点击checkbox才生效）：
	 * 		自定义两个属性：
	 * 		cascadeCheck ：普通级联（不包括未加载的子节点）
	 * 		deepCascadeCheck ：深度级联（包括未加载的子节点）
	 */
	$.extend($.fn.treegrid.defaults,{
		onLoadSuccess : function() {
			var target = $(this);
			var opts = $.data(this, "treegrid").options;
			var panel = $(this).datagrid("getPanel");
			var gridBody = panel.find("div.datagrid-body");
			var idField = opts.idField;//这里的idField其实就是API里方法的id参数
			gridBody.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").click(function(e){
				if(opts.singleSelect) return;//单选不管
				if(opts.cascadeCheck||opts.deepCascadeCheck){
					var id=$(this).parent().parent().parent().attr("node-id");
					var status = false;
					if($(this).attr("checked")) status = true;
					//级联选择父节点
					selectParent(target,id,idField,status);
					selectChildren(target,id,idField,opts.deepCascadeCheck,status);
					/**
					 * 级联选择父节点
					 * @param {Object} target
					 * @param {Object} id 节点ID
					 * @param {Object} status 节点状态，true:勾选，false:未勾选
					 * @return {TypeName} 
					 */
					function selectParent(target,id,idField,status){
						var parent = target.treegrid('getParent',id);
						if(parent){
							var parentId = parent[idField];
							if(status)
								target.treegrid('select',parentId);
							else
								target.treegrid('unselect',parentId);
							selectParent(target,parentId,idField,status);
						}
					}
					/**
					 * 级联选择子节点
					 * @param {Object} target
					 * @param {Object} id 节点ID
					 * @param {Object} deepCascade 是否深度级联
					 * @param {Object} status 节点状态，true:勾选，false:未勾选
					 * @return {TypeName} 
					 */
					function selectChildren(target,id,idField,deepCascade,status){
						//深度级联时先展开节点
						if(status&&deepCascade)
							target.treegrid('expand',id);
						//根据ID获取下层孩子节点
						var children = target.treegrid('getChildren',id);
						for(var i=0;i<children.length;i++){
							var childId = children[i][idField];
							if(status)
								target.treegrid('select',childId);
							else
								target.treegrid('unselect',childId);
							selectChildren(target,childId,idField,deepCascade,status);//递归选择子节点
						}
					}
				}
				e.stopPropagation();//停止事件传播
			});
		}
	});
	/**
	 * 在可编辑datagrid中，使用my97日期控件
	 * 用例(设置日期格式)：
	 * {
	 * 		field : 'time',
	 * 		title : '时间',
	 * 		width : 130,
	 * 		editor : { type : 'my97',options:{dateFmt:'yyyy-MM-dd HH:00'} }
	 * }
	 */
	$.extend($.fn.datagrid.defaults.editors, {
		my97 : {
			init : function(container, options) {
				var dateFmt = "yyyy-MM-dd HH:mm:ss";
				var maxDate = "%y-%M-%d";
				if(options){
					if(options.dateFmt) dateFmt = options.dateFmt;//如options里定义了dateFmt，则按定义的格式
					if(options.maxDate) maxDate = options.maxDate;//如options里定义了maxDate，则按定义的格式
				}
				var input = $('<input class="Wdate" onclick="WdatePicker({dateFmt:\''+dateFmt+'\',maxDate:\''+maxDate+'\',readOnly:true});"/>').appendTo(container);
				return input;
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target, value) {
				$(target).val(value);
			},
			resize : function(target, width) {
				var input = $(target);
				if ($.boxModel == true) {
					input.width(width - (input.outerWidth() - input.width()));
				} else {
					input.width(width);
				}
			}
		},
		checkbox : {
			init : function (_145, _146) {
				var _147 = $("<input type=\"checkbox\">").appendTo(_145);
				_147.val(_146.on);
				_147.attr("offval", _146.off);
				if(_146.handler){
					_147.click(_146.handler);
				}
				return _147;
			},
			getValue : function (_148) {
				if ($(_148).is(":checked")) {
					return $(_148).val();
				} else {
					return $(_148).attr("offval");
				}
			},
			setValue : function (_149, _14a) {
				var _14b = false;
				if ($(_149).val() == _14a) {
					_14b = true;
				}
				$.fn.prop ? $(_149).prop("checked", _14b) : $(_149).attr("checked", _14b);
			}
		},
		numberspinner : {
			init : function (_14c, _14d) {
				var _14e = $("<input type=\"text\">").appendTo(_14c);
				_14e.css("width",88);
				_14e.numberspinner(_14d);
				return _14e;
			},
			destroy : function (_14f) {
				$(_14f).numberspinner("destroy");
			},
			getValue : function (_150) {
				return $(_150).numberspinner("getValue");
			},
			setValue : function (_151, _152) {
				$(_151).numberspinner("setValue", _152);
			},
			resize : function (_153, _154) {
				$(_153).outerWidth(_154);
			}
		}
	});
	/**
	 * 指定位置显示$.messager.show
	 * options $.messager.show的options
	 * param = {left,top,right,bottom}
	 */
	$.extend($.messager, {
		showBySite : function(options,param) {
			var site = $.extend( {
				left : "",
				top : "",
				right : 0,
				bottom : -document.body.scrollTop
						- document.documentElement.scrollTop
			}, param || {});
			var win = $("body > div .messager-body");
			if(win.length<=0)
				$.messager.show(options);
			win = $("body > div .messager-body");
			win.window("window").css( {
				left : site.left,
				top : site.top,
				right : site.right,
				zIndex : $.fn.window.defaults.zIndex++,
				bottom : site.bottom
			});
		}
	});
	/**
	 * 扩展easyui的menu组件的方法appendChild
	 */
	$.extend($.fn.menu.methods, {
		appendChild : function (jq, param) {
			return jq.each(function () {
				var parent = $(this).menu("findItem", param.parentText);
				            
				if (!parent.target.submenu) {
					var submenu = $("<div/>").width($(this).width()).menu();
					parent.target.submenu = submenu;
					$("<div class=\"menu-rightarrow\"></div>").appendTo($(parent.target).parent());
				}
				         
				param = $.extend({},param,{parent:parent.target});
				console.log(param);
				$(this).menu("appendItem", param);
			});
		}
	});
	/**
	 * 扩展easyui的validatebox组件的方法:删除校验、恢复校验
	 */
	$.extend($.fn.validatebox.methods, {  
		remove: function(jq, newposition){  
			return jq.each(function(){  
				$(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');
			});  
		},
		reduce: function(jq, newposition){  
			return jq.each(function(){  
			   var opt = $(this).data().validatebox.options;
			   $(this).addClass("validatebox-text validatebox-invalid").validatebox(opt);
			});  
		}	
	});
	
	/**
	 * 
	 * tabs扩展:按照标签页ID进行检索
	 */
	$.extend($.fn.tabs.methods, {
	    getTabById: function(jq,id) {
	        var tabs = $.data(jq[0], 'tabs').tabs;
	        for(var i=0; i<tabs.length; i++){
	            var tab = tabs[i];
	            if (tab.panel('options').id == id){
	                return tab;
	            }
	        }
	        return null;
	    },
	    selectById:function(jq,id) {
	        return jq.each(function() {
	            var state = $.data(this, 'tabs');
	            var opts = state.options;
	            var tabs = state.tabs;
	            var selectHis = state.selectHis;
	            if (tabs.length == 0) {return;}
	            var panel = $(this).tabs('getTabById',id); // get the panel to be activated 
	            if (!panel){return}
	            var selected = $(this).tabs('getSelected');
	            if (selected){
	                if (panel[0] == selected[0]){return}
	                $(this).tabs('unselect',$(this).tabs('getTabIndex',selected));
	                if (!selected.panel('options').closed){return}
	            }
	            panel.panel('open');
	            var title = panel.panel('options').title;        // the panel title 
	            selectHis.push(title);        // push select history 
	            var tab = panel.panel('options').tab;        // get the tab object 
	            tab.addClass('tabs-selected');
	            // scroll the tab to center position if required. 
	            var wrap = $(this).find('>div.tabs-header>div.tabs-wrap');
	            var left = tab.position().left;
	            var right = left + tab.outerWidth();
	            if (left < 0 || right > wrap.width()){
	                var deltaX = left - (wrap.width()-tab.width()) / 2;
	                $(this).tabs('scrollBy', deltaX);
	            } else {
	                $(this).tabs('scrollBy', 0);
	            }
	            $(this).tabs('resize');
	            opts.onSelect.call(this, title, $(this).tabs('getTabIndex',panel));
	        });
	    },
	    existsById:function(jq,id){
	        return $(jq[0]).tabs('getTabById',id) != null;
	    }
	});
	
})(jQuery);
/**
 * easyUI BUG修复
 */
(function($) {
	/**
	 * 解决可编辑表格combobox多选编辑状态下不可选、新增行combobox多选后不保存的问题
	 * @param {Object} jq
	 * @param {Object} value
	 */
	$.extend($.fn.datagrid.defaults.editors.combobox, {
		getValue : function(jq) {
			var opts = $(jq).combobox('options');
			if(opts.multiple){
				var values = $(jq).combobox('getValues');
				if(values.length>0){
					if(values[0]==''||values[0]==' '){
						return values.join(',').substring(1);
					}
				}
				return values.join(',');
			}
			else
				return $(jq).combobox("getValue");
		},
		setValue : function(jq, value) {
			var opts = $(jq).combobox('options');
			if(opts.multiple&&value.indexOf(opts.separator)!=-1){//多选且不只一个值
				var values = value.split(opts.separator);
				$(jq).combobox("setValues", values);
			}
			else
				$(jq).combobox("setValue", value);
		}
	});
	/**
	 * 解决easyui，如果window里面有easyui-combo等控件，
	 * 
	 * 那么销毁window时，这些控件是不会销毁的，
	 * 
	 * 所以在关闭之前先销毁这些控件，避免内存泄漏和DOM节点泄漏
	 * @param {Object} opts 配置项
	 * @param {Object} id 指定ID（可选），如不指定则新建DIV
	 * 
	 */
	wno.$window = function(opts,id) {
		var gc = function(obj) {
			$(obj).find('.combo-f').combobox('destroy');
		};
		var options = $.extend({
			modal : true,
			collapsible : false,
			minimizable : false,
			maximizable : false,
			onBeforeDestroy : function() {
				gc(this);
			},
			onBeforeClose : function() {
				if(id) return;
				gc(this);
			},
			onClose : function() {
				if(id) return;
				$(this).window('destroy');
			}
		}, opts);
		if(id)
			return $('#'+id).window(options);
		else
			return $('<div/>').window(options);
	};
	/**
	 * tab关闭后iframe内存不能完全释放解决方法
	 * @memberOf {TypeName} 
	 */
	$.fn.panel.defaults.onBeforeDestroy = function() {/* 回收内存 */
		var frame = $('iframe', this);
		try{
			if (frame.length > 0) {
				frame[0].contentWindow.document.write('');
				frame[0].contentWindow.close();
				frame.remove();
				if ($.browser.msie) {
					CollectGarbage();
				}
			}
		}catch(e){
			
		}
	};
	/**
	 * datagrid页数不归1的BUG解决方法，另外options添加pagerBtns属性用于直接定义分页工具栏自定义按钮，用法与toolbar一样
	 */
	/*$.fn.datagrid.defaults.onBeforeLoad = function(){
		var opts = $.data(this, "datagrid").options;
		var a = $.data(this, "datagrid");
		opts.pageNumber = 1;//每次加载数据时，自动返回第一页开始
	};*/
	/**
	 * datagrid的options添加pagerBtns属性用于直接定义分页工具栏自定义按钮，用法与toolbar一样
	 */
	$.fn.datagrid.defaults.onLoadSuccess = function(){
		var opts = $.data(this, "datagrid").options;
		var panel=$.data(this,"datagrid").panel;
		if(opts.pagination){
			if(opts.pagerBtns){//扩展内容：表格工具栏添加自定义按钮
				var pager = $(panel).find(".datagrid-pager");
				var pOpts = pager.pagination('options');
				if(!pOpts.buttons)
					pager.pagination({buttons:opts.pagerBtns});
			}
		}
	};
})(jQuery);
/**
 * easyui中文
 */
if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '数据加载中，请稍后。。。';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的Email地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '该输入项为必输项';
}

/**
 * 格式化时间 为xxxx-MM-dd
 * @param value
 * @returns {String}
 */
function formatDateToDay(value){
	 if (value == null || value == '') {
        return '';
    }
	 var time;
	  if(value instanceof Date ){
		  time = value;
	  }else{
		  time = new Date(value);
	  }
	 return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
}

/**
 * 格式化时间 为xxxx-MM-dd HH:mm
 * @param value
 * @returns {String}
 */
function formatDateToMinute(value){
	if (value == null || value == '') {
	       return '';
	   }
	 var time;
	  if(value instanceof Date ){
		  time = value;
	  }else{
		  time = new Date(value);
	  }
	 return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes();
}


/**
 * 扩展的关于编辑状态的 对要输入日期的控件使用
 */
$.extend($.fn.datagrid.defaults.editors, {
    datetimebox: {
        init: function(container, options){
            var editor = $('<input>').appendTo(container);
            return  editor.datetimebox({
                formatter:function(date){
                    return new Date(date).format("yyyy-MM-dd hh:mm:ss");
                }
            });
        },
        getValue: function(target){
            return $(target).datetimebox('getValue');
        },
        setValue: function(target, value){
            $(target).datetimebox('setValue', value);
        },
        resize: function(target, width){
            $(target).datetimebox('resize',width);
        },
        destroy: function(target){
            $(target).datetimebox('destroy');
        }
    }
});

$.extend($.fn.combobox.methods, { 
    selectFirst: function (jq,param) { 
        var index = 0;
        var opt = $(jq).combobox('options');
        var data = $(jq).combobox('getData'); 
        // 有数据时执行默认值
        if (data && data.length>0) {
            $(jq).combobox('select', data[index][opt.valueField]); 
        }
    } 
});




//时间格式化
Date.prototype.format = function(format){
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    if(!format){
        format = "yyyy-MM-dd hh:mm:ss";
    }

    var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
           "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
           "S": this.getMilliseconds()
            // millisecond
   };

   if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) { 
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" +o[k]).length));
       }
    }
    return format;
};

//tabId 主tab的Id，str需要隐藏的tab
function tabOpearto(tabId,str){
	//默认隐藏所有tab
	var ctab = $(tabId).tabs('tabs');
	var opts;
    for (var i = 0; i < ctab.length; i++) {
        opts = ctab[i].panel('options');
        ctab[i].hide();
        opts.tab.hide();
    }
	//呈现有权限的界面
	var s = str.split(",");
	for(var i=0;i<s.length;i++){
		if($(tabId).tabs('getTabById',s[i])!=null){
			var tab_option = $(tabId).tabs('getTabById',s[i]).panel('options').tab;
			tab_option.show();
			$(tabId).tabs('getTabById',s[i]).show();
		}
	}
}


/**
 * @requires jQuery,EasyUI
 * 创建一个模式化的dialog
 * @returns $.modalDialog.handler 这个handler代表弹出的dialog句柄
 * @returns $.modalDialog.xxx 这个xxx是可以自己定义名称，主要用在弹窗关闭时，刷新某些对象的操作，可以将xxx这个对象预定义好
 */
$.modalDialog = function(options) {
	if ($.modalDialog.handler == undefined) {// 避免重复弹出
		var opts = $.extend({
			title : '',
			width : 840,
			height : 680,
			modal : true,
			onClose : function() {
				$.modalDialog.handler = undefined;
				$(this).dialog('destroy');
			}
			/*onOpen : function() {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
			}*/
		}, options);
		opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
		return $.modalDialog.handler = $('<div/>').dialog(opts);
	}
};
/* 
 * 定义图标样式的数组
 */
$.iconData = [
	{
		value : '',
		text : '默认'
	},{
		value : 'icon-adds',
		text : 'icon-adds'
	},{
		value : 'icon-ok',
		text : 'icon-ok'
	},{
		value : 'icon-edit',
		text : 'icon-edit'
	} ,{
		value : 'icon-tip',
		text : 'icon-tip'
	},{
		value : 'icon-back',
		text : 'icon-back'
	},{
		value : 'icon-remove',
		text : 'icon-remove'
	},{
		value : 'icon-undo',
		text : 'icon-undo'
	},{
		value : 'icon-cancel',
		text : 'icon-cancel'
	},{
		value : 'icon-save',
		text : 'icon-save'
	},{
		value : 'icon-config',
		text : 'icon-config'
	},{
		value : 'icon-comp',
		text : 'icon-comp'
	},{
		value : 'icon-sys',
		text : 'icon-sys'
	},{
		value : 'icon-db',
		text : 'icon-db'
	},{
		value : 'icon-pro',
		text : 'icon-pro'
	},{
        value : 'icon-user',
        text : 'icon-user'
    },{
		value : 'icon-role',
		text : 'icon-role'
	},{
        value : 'icon-group-go',
        text : 'icon-group-go'
    },{
		value : 'icon-end',
		text : 'icon-end'
	},{
		value : 'icon-bug',
		text : 'icon-bug'
	},{
		value : 'icon-badd',
		text : 'icon-badd'
	},{
		value : 'icon-bedit',
		text : 'icon-bedit'
	},{
		value : 'icon-bdel',
		text : 'icon-bdel'
	},{
		value : 'icon-item',
		text : 'icon-item'
	},{
		value : 'icon-excel',
		text : 'icon-excel'
	},{
		value : 'icon-auto',
		text : 'icon-auto'
	},{
		value : 'icon-time',
		text : 'icon-time'
	}
];

//格式化字符串
$.formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};
