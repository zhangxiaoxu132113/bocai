<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<div id="add_dictionary_dlg" class="easyui-dialog"
     style="width: 400px; height: 180px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_dictionary_dlg_btn">
    <form id="add_dictionary_form" method="post">
        <div align="center">
            <table class="table-dlg">
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

<div id="update_keyword_special_dlg" class="easyui-dialog"
     style="width: 400px; height: 180px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_keyword_special_dlg_btn">
    <form id="update_keyword_special_form" method="post">
        <input type="hidden" id="update_keyword_special_id" name="id"/>
        <input type="hidden" id="update_keyword_special_businessId" name="businessId"/>
        <input type="hidden" id="update_keyword_special_keyword" name="keyword"/>
        <input type="hidden" id="update_keyword_special_labels" name="specials"/>
        <input type="hidden" id="uupdate_keyword_special_operate" name="operate"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>关键词：</label></td>
                    <td>
                        <span id="update_keyword_special_name"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>特征：</label></td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="update_keyword_special_label" name="special" type="text"
                               autocomplete="off" placeholder="英文逗号分隔"/>
                        <div class="auto-div" id="update_keyword_special_auto_div" />
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="update_keyword_special_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateKeywordSepcial()" style="width: 90px">修改</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelKeywordSepcialDlg()" style="width: 90px">取消</a>
</div>

<div id="update_keyword_root_dlg" class="easyui-dialog"
     style="width: 400px; height: 180px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_keyword_root_dlg_btn">
    <form id="update_keyword_root_form" method="post">
        <input type="hidden" id="update_keyword_root_id" name="id"/>
        <input type="hidden" id="update_keyword_root_businessId" name="businessId"/>
        <input type="hidden" id="update_keyword_root_keyword" name="keyword"/>
        <input type="hidden" id="update_keyword_root_labels" name="roots"/>
        <input type="hidden" id="uupdate_keyword_root_operate" name="operate"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>关键词：</label></td>
                    <td>
                        <span id="update_keyword_root_name"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>词根：</label></td>
                    <td>
                        <input class="textbox" style="height: 20px; width: 160px;" id="update_keyword_root_label" name="root" type="text"
                               autocomplete="off" placeholder="英文逗号分隔"/>
                        <div class="auto-div" id="update_keyword_root_auto_div" />
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="update_keyword_root_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateKeywordRoot()" style="width: 90px">修改</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelKeywordRootDlg()" style="width: 90px">取消</a>
</div>