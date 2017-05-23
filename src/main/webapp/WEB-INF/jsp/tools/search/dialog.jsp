<%@ page language="java" pageEncoding="UTF-8" %>

<div id="add_dictionary_dlg" class="easyui-dialog"
     style="width: 400px; height: 220px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_dictionary_dlg_btn">
    <form id="add_dictionary_form" method="post">
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="business" name="business" class="easyui-combobox" valueField="businessId" textField="businessName"
                               panelHeight="auto" style="width:160px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>词表名称：</label></td>
                    <td>
                        <input style="width: 160px" id="add_dictionary_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>分类标签：</label></td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="add_dictionary_label" name="label" type="text"
                               autocomplete="off" placeholder="英文逗号分隔"/>
                        <div class="auto-div" id="add_dictionary_auto_div" />
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_dictionary_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="keywordsToDictionary()" style="width: 90px">转换</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelKeywordsToDictionaryDlg()" style="width: 90px">取消</a>
</div>