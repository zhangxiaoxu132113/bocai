<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
    table.table-dlg1 tr.is_index_cls > td:nth-child(2) > label:hover {
        cursor: pointer;
    }

    .add_excel_tip {
        margin-top: 0.5em;
        display: block;
    }

    #add_task_dlg {
        height: 140px !important;
    }
</style>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 430px; height: 350px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post" enctype="multipart/form-data">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>任务备注：</label></td>
                    <td>
                        <input style="width: 157px" id="add_task_name" name="name" class="easyui-textbox" type="text"
                               required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>执行类型：</label></td>
                    <td>
                        <label><span>单次</span><input type="radio" name="type" value="2" checked/></label>
                        <label><span>监控</span><input type="radio" name="type" value="1"/></label>
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: text-top"><label>文件导入(Excel)：</label></td>
                    <td>
                        <input id="add_dictionary_file" name="excelFile" class="easyui-filebox" style="width:160px;"/>
                        <br/>
                        <span class="add_excel_tip">导入格式为两列的excel<br/>第一列关键词，第二列对应的URL</span>
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