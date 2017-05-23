<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<div id="add_compare_dlg" class="easyui-dialog"
     style="width: 400px; height: 250px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_compare_dlg_btn">
    <form id="add_compare_form" method="post">
        <input type="hidden" id="add_compare_businessId" name="businessId"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>名称：</label></td>
                    <td>
                        <input style="width: 160px" id="add_compare_site_name" name="siteName" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>域名：</label></td>
                    <td>
                        <input style="width: 160px" id="add_compare_site_domain" name="domain" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>搜索引擎类型：</label></td>
                    <td>
                        <input id="add_compare_site_search_engine_type" name="searchEngineType" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>备注：</label></td>
                    <td>
                        <input style="width: 160px" id="add_compare_site_remark" name="remark" class="easyui-textbox" type="text"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_compare_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveCompare()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveCompare()" style="width: 90px">取消</a>
</div>

<div id="update_compare_dlg" class="easyui-dialog"
     style="width: 400px; height: 320px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_compare_btn">
    <form id="update_compare_form" name="update_compare_form" method="post">
        <input type="hidden" id="update_compare_id" name="id"/>
        <table class="table-dlg">
            <tr>
                <td><label>名称：</label></td>
                <td>
                    <input style="width: 160px" id="update_compare_site_name" name="siteName" class="easyui-textbox" type="text" required="required"/>
                </td>
            </tr>
            <tr>
                <td><label>域名：</label></td>
                <td>
                    <input style="width: 160px" id="update_compare_site_domain" name="domain" class="easyui-textbox" type="text" required="required"/>
                </td>
            </tr>
            <tr>
                <td><label>备注：</label></td>
                <td>
                    <input style="width: 160px" id="update_compare_site_remark" name="remark" class="easyui-textbox" type="text"/>
                </td>
            </tr>
            <tr>
                <td><label>搜索引擎类型：</label></td>
                <td>
                    <input id="update_compare_site_search_engine_type" name="searchEngineType" class="easyui-combobox" valueField="id" textField="text"
                           panelHeight="auto" style="width:160px;"/>
                </td>
            </tr>
            <tr>
                <td><label>排序：</label></td>
                <td>
                    <input style="width: 160px" id="update_compare_sort" name="sort" class="easyui-textbox" type="text" required="required"/>
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

<div id="update_compare_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateCompare()" style="width: 90px">更新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateCompare()" style="width: 90px">取消</a>
</div>
