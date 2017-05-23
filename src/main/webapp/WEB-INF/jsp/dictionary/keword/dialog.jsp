<%@ page language="java" pageEncoding="UTF-8"%>

<div id="add_keyword_dlg" class="easyui-dialog"
     style="width: 400px; height: 320px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_keyword_dlg_btn">
    <form id="add_keyword_form" method="post" enctype="multipart/form-data">
        <input type="hidden" id="add_keyword_dictionaryId" name="id" value="${dictionaryId}"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>词表名称：</label></td>
                    <td>
                         <span id="add_keyword_dictionary_name"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>关键词：</label></td>
                    <td>
                        <textarea id="add_keyword_keywords" name="keywords" rows="9" cols="20"
                                  placeholder="支持多个关键词，一行一个；Excel文件上传同理（只保留中文、英文、数字、少量中英文字符组成的关键词，最多不超过5w个词）"></textarea>
                    </td>
                </tr>
                <tr>
                    <td><label>文件导入(Excel)：</label></td>
                    <td>
                        <input id="add_keyword_file" name="txtFile" class="easyui-filebox"  style="width:160px;"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_keyword_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveKeyword()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveKeyword()" style="width: 90px">取消</a>
</div>
