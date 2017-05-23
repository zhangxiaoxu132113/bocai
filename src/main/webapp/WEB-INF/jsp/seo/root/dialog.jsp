<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
    table.table-dlg1 tr > td:nth-child(1) {
        text-align: right;
        width: 27%;
    }

    table.table-dlg1 tr > td:nth-child(2) {
        width: 55%;
    }

    table.table-dlg1 tr.is_index_cls > td:nth-child(2) > label:hover {
        cursor: pointer;
    }
    #add_name_tip {cursor: pointer}
    #match_keyword_form .datagrid-view {height: 420px!important;}
    #match_keyword_form .datagrid-wrap {height: 460px!important;}
</style>

<div id="add_root_dlg" class="easyui-dialog"
     style="width: 400px; height: 180px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post" enctype="multipart/form-data">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label><img id="add_name_tip" src="${path}/css/icons/tip.png" alt="提示"> 词根文件：</label></td>
                    <td>
                        <input id="add_dictionary_file" name="excelFile" class="easyui-filebox" style="width:160px;"/>

                    </td>
                </tr>
                <tr>
                    <td><label>词根标签：</label></td>
                    <td>
                        <input id="seoTagList" name="tagId" class="easyui-combobox" valueField="id"
                               textField="name"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>


<div id="add_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveSeoRoot()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveSeoRoot()" style="width: 90px">取消</a>
</div>

<div id="keyword_list_dlg" class="easyui-dialog"
     style="overflow: hidden;width: 800px; height: 570px;" closed="true"
     data-options="iconCls:'image-queue',modal:true"
     buttons="#keyword_list_dlg_btn">
    <div id="queue_top" border="false" style="margin-bottom: 5px;">
        <a class="easyui-linkbutton" iconCls="image-excel" onclick="exportSeoKeyword(0)">导出</a>
    </div>
    <form id="match_keyword_form" method="post">
        <input type="hidden" id="keyword" name="keyword">
        <div id="queue_center" border="true" style="overflow: hidden;height:auto;width: auto;">
            <table id="queue_table" border="ture" style="overflow: hidden;height:460px;"></table>
        </div>
    </form>
</div>
<div id="keyword_list_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="closeKeywordListDlg()" style="width: 90px">关闭</a>
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