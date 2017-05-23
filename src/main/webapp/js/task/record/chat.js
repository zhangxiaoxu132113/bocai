var tabMap = {};// 存储已加载的tab
$(document).ready(function () {
    $('#tt').tabs('add', {
        title: '首页首位率',
        border: false,
        content: getIFrame("../record/tab.do?rankType=1&view=1&id=" + id)
    });
    tabMap['首页首位率'] = '首页首位率';

    $('#tt').tabs('add', {
        title: '竞争优势',
        border: false
    });

    $('#tt').tabs('add', {
        title: '优势关键词',
        border: false
    });

    $('#tt').tabs({
        border: false,
        onSelect: function (title) {
            if (tabMap[title] == undefined) {
                tabMap[title] = title;
                var tab = $('#tt').tabs('getSelected');  // 获取选择的面板
                var url;
                if ('优势关键词' == title) {
                    url = "../record/tab.do?rankType=2&view=2&id=" + id;
                } else if ('竞争优势' == title) {
                    url = "../record/tab.do?rankType=3&view=3&id=" + id;
                }
                $('#tt').tabs('update', {
                    tab: tab,
                    options: {
                        content: getIFrame(url)
                    }
                });
            }
        }
    });

});