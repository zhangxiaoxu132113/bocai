<%@ page language="java" pageEncoding="UTF-8"%>
<style type="text/css">
    .business_bind_account_button a {
        margin-top: 8px;
    }
</style>

<div id="business_add_account_dlg" class="easyui-dialog"
     style="width: 400px; height: 210px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#business_add_account_dlg_btn">
    <form id="business_add_account_form" method="post">
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>角色：</label></td>
                    <td>
                        <input id="business_add_role_id" name="roleId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;" required="required" multiple="true"/>
                    </td>
                </tr>
                <tr>
                    <td><label>用户id：</label></td>
                    <td>
                        <input style="width: 160px" id="business_add_account_userId" name="userId" class="easyui-textbox" type="text" required="required" placeholder="权限系统提供"/>
                    </td>
                </tr>
                <tr>
                    <td><label>用户账号：</label></td>
                    <td>
                        <input style="width: 160px" id="business_add_account_username" name="username" class="easyui-textbox" type="text" required="required" placeholder="权限系统提供"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="business_add_account_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveAccount()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveAccount()" style="width: 90px">取消</a>
</div>

<div id="business_update_account_dlg" class="easyui-dialog"
     style="width: 400px; height: 210px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#business_update_account_dlg_btn">
    <form id="business_update_account_form" name="business_update_account_form" method="post">
        <input type="hidden" id="business_update_account_id" name="id"/>
        <input type="hidden" id="business_update_old_role_id" name="oldRoleId"/>
        <table class="table-dlg">
            <tr>
                <td><label>角色：</label></td>
                <td>
                    <input id="business_update_role_id" name="roleId" class="easyui-combobox" valueField="id" textField="text"
                           panelHeight="auto" style="width:160px;" required="required" multiple="true"/>
                </td>
            </tr>
            <tr>
                <td><label>用户账号：</label></td>
                <td>
                    <input style="width: 160px" id="business_update_account_username" name="username" class="easyui-textbox" type="text" required="required" placeholder="权限系统提供"/>
                </td>
            </tr>
            <tr>
                <td><label>状态：</label></td>
                <td>
                    <input name="enabled" type="radio" value="0"/>无效
                    <input name="enabled" type="radio" value="1"/>有效
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="business_update_account_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateAccount()" style="width: 90px">更新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateAccount()" style="width: 90px">取消</a>
</div>


<div id="business_bind_account_dlg" class="easyui-dialog"
     style="width: 400px;height: 300px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true">
    <div id="cc" class="easyui-layout" fit="true">
        <div data-options="region:'west'" style="width:130px;">
            <table id="from" class="easyui-datagrid">
                <thead>
                <tr align="center">
                    <th field="businessId" hidden="true">id</th>
                    <th field="businessName" width="125">未选业务</th>
                </tr>
                </thead>
            </table>
        </div>
        <div data-options="region:'east'" style="width:130px;">
            <table id="to" class="easyui-datagrid">
                <thead>
                <tr align="center">
                    <th field="businessId"  hidden="true">id</th>
                    <th field="businessName" width="125">已有业务</th>
                </tr>
                </thead>
            </table>
        </div>
        <div data-options="region:'center'" style="width:50px;">
            <div class="business_bind_account_button" align="center">
                <a href="javascript:updateSort()" class="easyui-linkbutton">↑</a><br/>
                <a href="javascript:addAll()" class="easyui-linkbutton">&gt;&gt;</a><br/>
                <a href="javascript:addOnes()" class="easyui-linkbutton">&gt;</a><br/>
                <a href="javascript:removeOnes()" class="easyui-linkbutton">&lt;</a><br/>
                <a href="javascript:removeAll()" class="easyui-linkbutton">&lt;&lt;</a><br/>
            </div>
        </div>
    </div>
</div>