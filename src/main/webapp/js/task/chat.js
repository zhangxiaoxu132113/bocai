var tabMap = {};// 存储已加载的tab
$(document).ready(function () {
    $('#tt').tabs('add', {
        title: '首页首位率',
        border: false,
        content: getIFrame("../task/tab.do?dictionaryId=" + dictionaryId + "&rankType=2&view=1&dictionaryName=" + dictionaryName)
    });
    tabMap['首页首位率'] = '首页首位率';

    $('#tt').tabs('add', {
        title: '分布优势',
        border: false
    });

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
                    url = "../task/tab.do?dictionaryId=" + dictionaryId + "&rankType=4&view=2&dictionaryName=" + dictionaryName;
                } else if ('分布优势' == title) {
                    url = "../task/tab.do?dictionaryId=" + dictionaryId + "&rankType=5&view=3&dictionaryName=" + dictionaryName;
                } else if ('竞争优势' == title) {
                    url = "../task/tab.do?dictionaryId=" + dictionaryId + "&rankType=6&view=4&dictionaryName=" + dictionaryName;
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