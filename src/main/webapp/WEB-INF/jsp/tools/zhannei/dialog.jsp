<%@ page language="java" pageEncoding="UTF-8" %>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 400px; height: 220px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>业务选择：</label></td>
                    <td>
                        <input id="add_business_id" name="businessId" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>词表ID：</label></td>
                    <td>
                        <input style="width: 160px" id="add_task_dictionary_id" name="dictionaryId" class="easyui-textbox"
                               type="text" required="required" buttonText="检查"/>
                    </td>
                </tr>
                <tr>
                    <td><img id="add_task_compare_tip" src="${path}/css/icons/tip.png" alt="提示"><label>爬取竞争对手：</label></td>
                    <td>
                        <input name="enabledCompare" type="radio" value="0" checked="checked"/>否
                        <input name="enabledCompare" type="radio" value="1"/>是
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