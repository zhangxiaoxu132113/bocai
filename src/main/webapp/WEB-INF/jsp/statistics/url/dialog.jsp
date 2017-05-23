<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
    table.table-dlg1 tr > td:nth-child(1) {
        text-align: right;
        width: 27%;
    }

    table.table-dlg1 tr > td:nth-child(2) {
        width: 73%;
    }
</style>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 430px; height: 350px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label><img id="add_task_name_tip" src="${path}/css/icons/tip.png" alt="提示">任务名称：</label></td>
                    <td>
                        <input style="width: 100px" id="add_task_name" name="name" class="easyui-textbox" type="text" required="required"/>
                        -
                        <input id="date_type" name="dateType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>日期：</label></td>
                    <td>
                        <input id="add_task_startDate" name="startDate" class="easyui-datebox" style="width:100px"/>
                        -
                        <input id="add_task_endDate" name="endDate" class="easyui-datebox" style="width:100px"/>
                    </td>
                </tr>
                <tr>
                    <td><label>URL列表：</label></td>
                    <td>
                        <textarea id="add_task_urls" name="urls" rows="10" cols="27" class="easyui-validatebox" required="required"
                                  placeholder="支持多个URL，一行一个。eg：&#10;ask.39.net/question/000001.html&#10;ask.39.net/question/000002.html"></textarea>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>


<div id="add_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveTask()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveTask()" style="width: 90px">取消</a>
</div>

<div id="update_task_dlg" class="easyui-dialog"
     style="width: 400px; height: 150px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_task_dlg_btn">
    <form id="update_task_form" method="post">
        <input type="hidden" id="update_task_id" name="id"/>
        <input type="hidden" id="update_task_type" name="type"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>点击次数：</label></td>
                    <td>
                        <input style="width: 160px" id="update_task_click_count" name="clickCount" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>


<div id="update_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateTask()" style="width: 90px">确认</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateTask()" style="width: 90px">取消</a>
</div>