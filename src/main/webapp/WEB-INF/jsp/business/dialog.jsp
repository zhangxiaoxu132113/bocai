<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" pageEncoding="UTF-8"%>

<div id="add_business_dlg" class="easyui-dialog"
     style="width: 400px; height: 280px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_business_dlg_btn">
    <form id="add_business_form" method="post">
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>业务层级：</label></td>
                    <td>
                        <input id="add_business_type" name="type" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>业务名称：</label></td>
                    <td>
                        <input style="width: 160px" id="add_business_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </div>
        <div id="add_business_second_div" align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>上层业务：</label></td>
                    <td>
                        <input id="add_business_parent_id" name="parentId" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>搜索引擎类型：</label></td>
                    <td>
                        <input id="add_business_search_engine_type" name="searchEngineType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>域名：</label></td>
                    <td>
                        <input style="width: 160px" id="add_business_site_domain" name="domain" class="easyui-textbox" type="text"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_business_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveBusiness()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveBusiness()" style="width: 90px">取消</a>
</div>

<div id="update_business_dlg" class="easyui-dialog"
     style="width: 400px; height: 280px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_business_btn">
    <form id="update_business_form" name="update_business_form" method="post">
        <input type="hidden" id="update_business_id" name="id"/>
        <input type="hidden" id="update_business_sid" name="sid"/>
        <input type="hidden" id="update_business_business_type" name="type"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>业务名称：</label></td>
                    <td>
                        <input style="width: 160px" id="update_business_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </div>
        <div id="update_business_second_div" align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>上层业务：</label></td>
                    <td>
                        <input id="update_business_parent_id" name="parentId" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>搜索引擎类型：</label></td>
                    <td>
                        <input id="update_business_search_engine_type" name="searchEngineType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>域名：</label></td>
                    <td>
                        <input style="width: 160px" id="update_business_site_domain" name="domain" class="easyui-textbox" type="text"/>
                    </td>
                </tr>
            </table>
        </div>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>状态：</label></td>
                    <td>
                        <input name="enabled" type="radio" value="0"/>无效
                        <input name="enabled" type="radio" value="1"/>有效
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="update_business_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateBusiness()" style="width: 90px">更新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateBusiness()" style="width: 90px">取消</a>
</div>
