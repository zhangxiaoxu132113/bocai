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
     style="width: 430px; height: 350px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>任务备注：</label></td>
                    <td>
                        <input style="width: 212px" id="add_task_name" name="name" class="easyui-textbox" type="text"
                               required="required"/>
                    </td>
                </tr>
                <tr class="is_index_cls">
                    <td><label>是否查索引：</label></td>
                    <td>
                        <label><span>是</span><input type="radio" name="isIndex" value="1"/></label>
                        <label><span>否</span><input type="radio" name="isIndex" value="0"/></label>
                    </td>
                </tr>
                <tr>
                    <td><label>URL列表：</label></td>
                    <td>
                        <textarea id="add_task_urls" name="urls" rows="10" cols="27" class="easyui-validatebox"
                                  required="required"
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
                        <input style="width: 160px" id="update_task_click_count" name="clickCount"
                               class="easyui-textbox" type="text" required="required"/>
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