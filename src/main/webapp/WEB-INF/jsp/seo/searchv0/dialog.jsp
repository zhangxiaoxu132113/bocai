<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
.add_excel_tip {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    display: block;
}

#match_keyword_form .datagrid-view {height: 420px!important;}
#match_keyword_form .datagrid-wrap {height: 460px!important;}
</style>

<div id="add_keyword_dlg" class="easyui-dialog"
     style="width: 400px; height: 180px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_keyword_dlg_btn">
    <form id="add_keyword_form" method="post" enctype="multipart/form-data">
        <div align="center">
            <span class="add_excel_tip">导入格式为两列的excel<br/>第一列关键词，第二列指数（可为空）</span>
            <table class="table-dlg">
                <tr>
                    <td><label>文件导入(Excel)：</label></td>
                    <td>
                        <input id="add_keyword_file" name="txtFile" class="easyui-filebox"  style="width:160px;"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_keyword_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveKeyword()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveKeyword()" style="width: 90px">取消</a>
</div>

<div id="add_dictionary_dlg" class="easyui-dialog"
     style="width: 400px; height: 220px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_dictionary_dlg_btn">
    <form id="add_dictionary_form" method="post">
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:160px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>词表名称：</label></td>
                    <td>
                        <input style="width: 160px" id="add_dictionary_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>分类标签：</label></td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="add_dictionary_label" name="label" type="text"
                               autocomplete="off" placeholder="英文逗号分隔"/>
                        <div class="auto-div" id="add_dictionary_auto_div" />
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_dictionary_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="keywordsToDictionary()" style="width: 90px">转换</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelKeywordsToDictionaryDlg()" style="width: 90px">取消</a>
</div>

<!-- 查看聚合特征词 -->
<div id="add_list_dlg" class="easyui-dialog"
     style="overflow: hidden;width: 800px; height: 570px;" closed="true"
     data-options="iconCls:'image-queue',modal:true"
     buttons="#keyword_list_dlg_btn">
    <div id="queue_top" border="false" style="margin-bottom: 5px;">
        <a class="easyui-linkbutton" iconCls="image-excel" onclick="exportAggregateCharactWords(0)">导出</a>
        <span>当前已执行<span id="countCompleteAggs">0</span>个搜索词，优质聚合特征词共计<span id="youzhiTotal">0</span>个，三甲视频特征词共计<span id="sanjiaTotal">0</span>个，详细如下</span>
    </div>
    <form id="match_keyword_form" method="post">
        <input type="hidden" id="keyword" name="keyword">
        <div id="queue_center" border="true" style="overflow: hidden;height:auto;width: auto;">
            <table id="aggregate_words_table" border="ture" style="overflow: hidden;height:460px;"></table>
        </div>
    </form>
    <div id="add_list_dlg_btn">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
           onclick="closeAggregateCharactWordsListDlg()" style="width: 90px">关闭</a>
    </div>
</div>


