<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<div id="label_add_dlg" class="easyui-dialog"
     style="width: 400px; height: 200px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#label_add_dlg_btn">
    <div align="center" style="padding: 20px 0 20px 0">
        <form id="label_form" method="post">
            <input type="hidden" id="label_add_type" name="type" value="1"/>
            <table class="table-dlg">
                <tr>
                    <td><label>标签名：</label></td>
                    <td>
                        <input style="width: 180px" id="add_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<div id="label_add_dlg_btn" style="background-color: #ffffff">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveOrUpdate(1)" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('label_add_dlg');" style="width: 90px">取消</a>
</div>

<div id="label_update_dlg" class="easyui-dialog"
     style="width: 400px; height: 200px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#label_update_dlg_btn">
    <div align="center" style="padding: 20px 0 20px 0">
        <form id="label_update_form" method="post">
            <input type="hidden" id="label_update_id" name="id"/>
            <input type="hidden" id="label_update_type" name="type" value="0"/>
            <table class="table-dlg">
                <tr>
                    <td><label>标签名：</label></td>
                    <td>
                        <input style="width: 180px" id="update_label_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<div id="label_update_dlg_btn" style="background-color: #ffffff">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveOrUpdate(0)" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('label_update_dlg');" style="width: 90px">取消</a>
</div>
