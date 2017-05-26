<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
    table.table-dlg1 tr > td:nth-child(1) {
        text-align: right;
        width: 27%;
    }

    table.table-dlg1 tr > td:nth-child(2) {
        width: 73%;
    }

    table.table-dlg1 tr.is_index_cls > td:nth-child(2) > label:hover {
        cursor: pointer;
    }

</style>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 430px; height: 140px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>标签名称：</label></td>
                    <td>
                        <input style="width: 212px" name="name" class="easyui-textbox" type="text"
                               required="required"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="add_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveSeoTag()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveTask()" style="width: 90px">取消</a>
</div>


<div id="modify_task_dlg" class="easyui-dialog"
     style="width: 430px; height: 140px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#modify_task_dlg_btn">
    <form id="update_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>标签名称：</label></td>
                    <td>
                        <input style="width: 212px" id="seoTagName" name="name" class="easyui-textbox" type="text"
                               required="required"/>
                        <input type="hidden" id="seoTagId" name="id">
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="modify_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateSeoTag()" style="width: 90px">确认</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateTask()" style="width: 90px">取消</a>
</div>