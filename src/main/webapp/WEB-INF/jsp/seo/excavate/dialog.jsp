<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
    table.table-dlg tr > td:nth-child(1) {
        text-align: left;
    }

    #add_task_keyword {
        padding: 0.5em;
        box-sizing: border-box;
        width: 100%;
    }

    #match_keyword_form .datagrid-view {
        height: 420px !important;
    }

    #match_keyword_form .datagrid-wrap {
        height: 460px !important;
    }
</style>

<%--批量挖掘--%>
<div id="batch_excavate_dlg" class="easyui-dialog"
     style="width: 400px; height: 320px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="batch_excavate_form" method="post" enctype="multipart/form-data" action="../seo/getExpandKeywords.do">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label style="font-size: 14px">关键词</label></td>
                </tr>
                <tr>
                    <td>
                        <textarea id="add_task_keyword" name="keyword" rows="10" cols="27" class="easyui-validatebox"
                                  placeholder="请输入需要关键词，一行一个最多50个"></textarea>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="add_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="batchExcavate()" style="width: 90px">确定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelbatchExcavate()" style="width: 90px">取消</a>
</div>

<%--組合挖掘--%>
<div id="group_excavate_dlg" class="easyui-dialog"
     style="overflow: hidden;width: 500px; height: 360px;" closed="true"
     data-options="iconCls:'image-queue',modal:true"
     buttons="#keyword_list_dlg_btn">
    <form id="group_excavate_form" action="../seo/getExpandKeywords.do" method="post">
        <div class="search-div" style="overflow: auto; width: 1250px">
            <table class="table-search" width="auto;">
                <tr>
                    <td>基础词</td>
                    <td></td>
                    <td>扩展方向词</td>
                </tr>
                <tr>
                    <td>
                    <textarea id="base_keyword" class="easyui-validatebox" name="keyword" rows="14" cols="25"
                              placeholder="（一行一个）。eg：&#10;感冒&#10;发烧"></textarea>
                    </td>
                    <td>
                        +
                    </td>
                    <td>
                    <textarea id="expandKeyword" class="easyui-validatebox" name="expandKeyword" rows="14" cols="25"
                              placeholder="（一行一个）。eg：&#10;怎么办&#10;吃什么"></textarea>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="keyword_list_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="groupExcavate()" style="width: 90px">确定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelGroupExcavate()" style="width: 90px">取消</a>
</div>

<div id="modify_rootTag_dlg" class="easyui-dialog"
     style="width: 430px; height: 140px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#update_task_dlg_btn">
    <form id="update_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>标签名称：</label></td>
                    <td>
                        <input id="seoTagList2" name="tagId" class="easyui-combobox" valueField="id"
                               textField="name"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <%--<input name="id" id="rootId" type="hidden"/>--%>
                <input name="ids" id="ids" type="hidden"/>
            </table>
        </div>
    </form>
</div>

<div id="update_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateRootTag()" style="width: 90px">确认</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateRootTag()" style="width: 90px">取消</a>
</div>

<!-- 转词表 -->
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