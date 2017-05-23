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
    #task_execute_status_dlg table.table-dlg tr > td:nth-child(1) {
        text-align: center;
        width: 25%;

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
                        <span class="add_excel_tip">导入格式为一列搜索词的excel</span>
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

<div id="task_execute_status_dlg" class="easyui-dialog"
     style="width: 400px; height: 270px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#task_execute_status_dlg_btn">
    <div align="center">
        <table class="table-dlg">
            <tr>
                <td>任务Id：</td>
                <td>o1beml7shd9eqI-3_Ukac9W1cbEuK3O-</td>
            </tr>
            <tr>
                <td>任务标题：</td>
                <td>乳房DL词表任务监控</td>
            </tr>
            <tr>
                <td>执行状态：</td>
                <td>运行中</td>
            </tr>
            <tr>
                <td>执行进度：</td>
                <td>85%</td>
            </tr>
            <tr>
                <td>操作：</td>
                <td><span>取消</span></td>
            </tr>
        </table>
    </div>
</div>
<div id="task_execute_status_dlg_btn" style="text-align: center">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="closeTaskExecuteStatusDlg()" style="width: 90px">关闭</a>
</div>