<%@ page language="java" pageEncoding="UTF-8" %>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 600px; height: 500px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <div align="center">
            <table>
                <tr>
                    <td><label>关键词：</label></td>
                    <td><label>对应的网址：</label></td>
                    <td><label>点击次数：</label></td>
                </tr>
                <tr>
                    <td>
                        <textarea id="add_task_keywords" class="easyui-validatebox" name="keyword" rows="20" cols="20"
                                  placeholder="一行一个" required="required"></textarea>
                    </td>
                    <td>
                        <textarea id="add_task_server_name" class="easyui-validatebox" name="serverName" rows="20"
                                  cols="20" placeholder="一行一个" required="required"></textarea>
                    </td>
                    <td>
                        <textarea id="add_task_click_count" class="easyui-validatebox" name="clickCountStr" rows="20"
                                  cols="20" placeholder="一行一个" required="required"></textarea>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr>
                    <td><label>搜索引擎：</label>
                        <input id="add_task_search_engine_id" name="searchEngineId" class="easyui-combobox"
                               valueField="id" textField="text"
                               panelHeight="auto" style="width:100px;" required="required"/>
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