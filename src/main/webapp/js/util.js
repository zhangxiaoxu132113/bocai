// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * js 扩展
 * @author xujiancheng
 */
var s = $.extend({}, s);
(function ($) {
    /**
     * 当前操作
     * true 表示用户正在进行添加操作
     * false 表示用户正在进行编辑操作
     */
    var operate = true;

    /**
     * 获取 jQuery 对象
     */
    var get = function (id) {
        return $("#" + id);
    };

    /**
     * 获取 jQuery class对象
     */
    var getClass = function (cla) {
        return $("." + cla);
    };


    /**
     * 获取视口尺寸
     */
    s.fixWidth = function (percent) {
        return document.body.clientWidth * percent;
    };
    s.fixHeight = function (percent) {
        return document.body.clientHeight * percent;
    };

    /**
     * 显示消息信息
     */
    s.showMessage = function (message) {
        $.messager.show({
            title: '提示信息',
            msg: message
        });
        return '';
    };
    s.error = function (message) {
        $.messager.show({
            title: '错误',
            msg: message
        });
        return '';
    };
    s.success = function (message) {
        $.messager.show({
            title: '成功',
            msg: message
        });
        return '';
    };
    s.alert = function (message) {
        $.messager.alert({
            title: '提示信息',
            msg: message
        });
        return '';
    };

    /**
     * 打开对话框
     */
    s.openDialog = function (id, options) {
        var settings = $.extend({}, options);
        get(id).dialog(settings).dialog('open');
    };

    /**
     * 关闭对话框
     */
    s.closeDialog = function (id) {
        get(id).dialog('close');
    };

    /**
     * 销毁对话框
     */
    s.destroyDialog = function (id) {
        get(id).dialog('destroy');
    };

    /**
     * 关闭对话框 通过class取
     */
    s.closeDialogByClass = function (cla) {
        getClass(cla).dialog('close');
    };

    /**
     * 构造数据表格
     */
    s.datagrid = function (id, columns, options, callback) {
        var $target = get(id);
        var colunmsTmp = [];
        $.extend(colunmsTmp, columns);

        var datagridDefault = {
            iconCls: 'icon-save',
            width: s.fixWidth(1),
            height: s.fixHeight(1),
            columns: [colunmsTmp],
            loadMsg: "正在处理，请稍待...",
            clickSelected: true,
            pagination: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            nowrap: false,
            pageList: [10, 15, 20],
            pageSize: 10
        };
        datagridDefault['onLoadSuccess'] = function (data) {
            //
            if (callback) {
                callback(data);
            }
        };
        /*datagridDefault['frozenColumns'] = [ [ {
         field : 'rowid',
         checkbox : true
         } ] ];*/
        $.extend(datagridDefault, options);
        $target.datagrid(datagridDefault);

        /* 自动调节窗体的大小 */
        $(window).resize(function () {
            $target.datagrid('resize', {
                width: s.fixWidth(1),
                height: s.fixHeight(1)
            });
        });
    };

    /**
     * 搜索
     */
    s.search = function (datagridId, searchFormId) {
        var filters = s.getFilters(searchFormId);
        get(datagridId).datagrid('load', filters);
    };

    s.getFilters = function (searchFormId) {
        var filters = {};
        var array = get(searchFormId).serialize().split('&');
        for (var i = 0; i < array.length; i++) {
            var entry = array[i].split('=');
            if (entry.length > 1) {
                if (filters[entry[0]] != undefined) {
                    filters[entry[0]] = filters[entry[0]] + ',' + decodeURIComponent(entry[1]);
                } else {
                    filters[entry[0]] = decodeURIComponent(entry[1]);
                }
            }
        }
        return filters;
    }

    s.popAdd = function (dialogId, options) {
        operate = true;
        get(dialogId).find('form').form('reset');
        s.openDialog(dialogId, options);
    };

    s.popUpdate = function (datagridId, dialogId, options, callback) {
        operate = false;
        var row = get(datagridId).datagrid('getSelected');
        if (!row) {
            s.error("请选中需要修改的行");
            return;
        }

        get(dialogId).find('form').form('load', row);
        s.openDialog(dialogId, options);
        if (callback) {
            callback(row);
        }
    };

    /**
     * 异步表单提交
     */
    s.ajaxSubmit = function (datagridId, dialogId, urls, options) {
        var $dialog = get(dialogId);
        var $form = $dialog.find('form');
        var formDefault = {
            url: operate ? urls.add : urls.update,
            onSubmit: function () {
                return $(this).form('validate');
            },
            success: function (data) {
                data = $.parseJSON(data);
                if (!data.result) {
                    s.error("保存失败");
                    return;
                }

                s.success("保存成功，reload 数据");
                $dialog.dialog('close');
                get(datagridId).datagrid('reload');
            }
        };
        $.extend(formDefault, options);
        $form.form('submit', formDefault);
    };

    /**
     * post提交表单
     */
    s.postSubmit = function (datagridId, dialogId, url) {
        var $dialog = get(dialogId);
        var $form = $dialog.find('form');

        var validator = $form.form('validate');
        if (validator) {
            $dialog.dialog('close');
            get(datagridId).datagrid("loading");// 显示遮罩层
        }

        var formDefault = {
            url: url,
            onSubmit: function () {
                return $(this).form('validate');
            },
            success: function (result) {
                get(datagridId).datagrid("loaded");// 关闭遮罩层
                var result = $.parseJSON(result);
                if (result.code == '1') {
                    s.success(result.msg);
                    get(datagridId).datagrid('reload');
                    get(datagridId).treegrid('reload');
                } else {
                    s.error(result.msg);
                }
            },
            error: function () {
                $.messager.progress('close');
                s.error('操作失败');
                return false;
            }
        }
        $form.form('submit', formDefault);
    }

    s.postSubmit = function (datagridId, dialogId, url, isreload, callback) {
        var $dialog = get(dialogId);
        var $form = $dialog.find('form');

        var validator = $form.form('validate');
        if (validator) {
            $dialog.dialog('close');
            get(datagridId).datagrid("loading");// 显示遮罩层
        }

        var formDefault = {
            url: url,
            onSubmit: function () {
                return $(this).form('validate');
            },
            success: function (result) {
                get(datagridId).datagrid("loaded");// 关闭遮罩层
                var result = $.parseJSON(result);
                if (result.code == '1') {
                    s.success(result.msg);
                    if (isreload) {
                        get(datagridId).datagrid('reload');
                        get(datagridId).treegrid('reload');
                    } else {
                        callback.call();
                    }
                } else {
                    s.error(result.msg);
                }
            },
            error: function () {
                $.messager.progress('close');
                s.error('操作失败');
                return false;
            }
        }
        $form.form('submit', formDefault);
    }

    /**
     * confirm
     */
    s.postConfirm = function (datagridId, msg, url, options) {
        $.messager.confirm('提示信息', msg, function (r) {
            if (r) {
                get(datagridId).datagrid("loading");// 显示遮罩层
                $.post(url, options, function (result) {
                    get(datagridId).datagrid("loaded");// 关闭遮罩层
                    if (result.code == '1') {
                        s.success(result.msg);
                        get(datagridId).datagrid('reload');
                    } else {
                        s.error(result.msg);
                    }
                }, 'json');
                return true;
            }
        });
    }

    /**
     * 异步删除
     */
    s.ajaxDel = function (datagridId, url) {
        var $datagrid = get(datagridId);
        var row = $datagrid.datagrid('getSelected');
        if (!row) {
            s.error("请选中需要删除的行");
            return;
        }

        $.messager.confirm('Confirm', '你确定要删除吗', function (r) {
            if (!r) {
                return;
            }

            $.post(url, {
                id: row.id
            }, function (data) {
                if (!data.result) {
                    s.error("删除失败");
                    return;
                }

                s.success("删除成功，reload 数据");
                $datagrid.datagrid('reload');
            }, 'json');
        });
    };

    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) === prefix;
    };

    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    /**
     * 初始化范围日期
     */
    s.initRangeDate = function (startDateId, endDateId, defaultStart, defaultEnd) {
        var $dateStartInput = get(startDateId);
        var $dateEndInput = get(endDateId);

        var now = new Date();
        var today = $.fn.datebox.defaults.formatter(now);
        var yesterday = $.fn.datebox.defaults.formatter(new Date(now - 86400000));

        defaultStart = defaultStart || yesterday;
        defaultEnd = defaultEnd || yesterday;

        // 先设置dataEnd的值，防止启动时出现验证不通过问题
        $dateEndInput.datebox('setValue', defaultEnd);

        $dateStartInput.datebox({
            required: true,
            validType: {
                leDate: [today, '开始日期不能大于今天:' + today],
                leEndDate: [function () {
                    return $dateEndInput.datebox('getValue');
                }, '开始日期不能大于结束日期']
            }
        }).datebox('setValue', defaultStart);

        $dateEndInput.datebox({
            required: true,
            validType: {
                leDate: [today, '结束日期不能大于今天:' + today],
                geStartDate: [function () {
                    return $dateStartInput.datebox('getValue');
                }, '结束日期不能小于开始日期']
            }
        }).datebox('setValue', defaultEnd);
    };
    /**
     * 初始化范围日期
     * 范围为最近一个月
     */
    s.initRangeDateInMonth = function (startDateId, endDateId) {
        var now = new Date();
        var yesterday = $.fn.datebox.defaults.formatter(new Date(now - 86400000));
        var oneMonthBefore = $.fn.datebox.defaults.formatter(new Date(now - 31 * 86400000)); // one day = 86400000 ms
        s.initRangeDate(startDateId, endDateId, oneMonthBefore, yesterday);
    };
    /**
     * 初始化范围日期
     * 范围为最近一个星期
     */
    s.initRangeDateInWeek = function (startDateId, endDateId) {
        var now = new Date();
        var today = $.fn.datebox.defaults.formatter(now);
        var oneWeekBefore = $.fn.datebox.defaults.formatter(new Date(now - 6 * 86400000)); // one day = 86400000 ms
        s.initRangeDate(startDateId, endDateId, oneWeekBefore, today);
    };

    /**
     * 初始化日期
     * 根据当前日期往前推算输入的天数
     */
    s.initRangeDateBeforeDays = function (id, days) {
        var now = new Date();
        var other = $.fn.datebox.defaults.formatter(new Date(now - days * 24 * 60 * 60 * 1000));
        var $dateInput = get(id);
        $dateInput.datebox('setValue', other);
    }

    /*
     * 获取日期差
     */
    s.getDifferDays = function (startDate, endDate) {
        var start = new Date(startDate).getTime();
        var end = new Date(endDate).getTime();

        if (end < start) {
            return -1;
        }
        return (end - start) / (24 * 60 * 60 * 1000);
    }

    /**
     * 构造树形类型数据表格
     */
    s.treegrid = function (id, columns, options, callback) {
        var $target = get(id);
        var colunmsTmp = [];
        $.extend(colunmsTmp, columns);

        var treegridDefault = {
            iconCls: 'icon-save',
            width: s.fixWidth(1),
            height: s.fixHeight(1),
            columns: [colunmsTmp],
            loadMsg: "正在处理，请稍待...",
            clickSelected: true,
            pagination: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            nowrap: false,
            pageList: [10, 15, 20],
            pageSize: 10
        };
        treegridDefault['onLoadSuccess'] = function (row, data) {
            if (callback) {
                callback(data);
            }
        };
        $.extend(treegridDefault, options);
        $target.treegrid(treegridDefault);

        /* 自动调节窗体的大小 */
        $(window).resize(function () {
            $target.datagrid('resize', {
                width: s.fixWidth(1),
                height: s.fixHeight(1)
            });
        });
    };

    /**
     * 打开新的选项卡
     */
    s.openTabs = function(title, url, icon) {
        var jq = top.jQuery;
        if (jq("#tabs").tabs('exists', title)) {
            jq("#tabs").tabs('select', title);
        } else {
            var content = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
            jq("#tabs").tabs('add', {
                title: title,
                content: content,
                closable: true,
                icon: icon
            });
        }
    }

})(jQuery);
