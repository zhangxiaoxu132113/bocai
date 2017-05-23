<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<div id="header_add_dlg" class="easyui-dialog"
     style="width: 400px; height: 200px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#header_add_dlg_btn">
    <div align="center" style="padding: 10px 0 20px 0">
        <form id="header_add_form" method="post" enctype="multipart/form-data">
            <input type="hidden" id="header_add_businessId" name="businessId"/>
            <input type="hidden" id="header_add_faces" name="face"/>
            <input type="hidden" id="header_add_type" name="type"/>
            <table class="table-dlg">
                <tr>
                    <td><label>数据项：</label></td>
                    <td>
                        <input style="width: 160px" id="name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>描述：</label></td>
                    <td>
                        <input style="width: 160px;" id="description" name="description" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<div id="header_add_dlg_btn" style="background-color: #ffffff">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveOrUpdate(1)" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('header_add_dlg');" style="width: 90px">取消</a>
</div>

<div id="header_update_dlg" class="easyui-dialog"
     style="width: 400px; height: 250px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#header_update_dlg_btn">
    <div align="center" style="padding: 10px 0 20px 0">
        <form id="update_form" method="post" enctype="multipart/form-data">
            <input type="hidden" name="id" id="id"/>
            <input type="hidden" id="header_update_businessId" name="businessId"/>
            <input type="hidden" id="header_update_face" name="face"/>
            <input type="hidden" id="header_update_type" name="type"/>
            <table class="table-dlg">
                <tr>
                    <td><label>数据项：</label></td>
                    <td>
                        <input style="width: 160px" id="update_name" name="name" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>排序：</label></td>
                    <td>
                        <input style="width: 160px" id="sort" name="sort" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>描述：</label></td>
                    <td>
                        <input style="width: 160px;" id="update_description" name="description" class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<div id="header_update_dlg_btn" style="background-color: #ffffff">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveOrUpdate(2)" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('header_update_dlg');" style="width: 90px">取消</a>
</div>

<div id="upload_header_dlg" class="easyui-dialog"
     style="width: 400px; height: 200px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#upload_header_dlg_btn">
    <form id="upload_header_form" method="post" enctype="multipart/form-data">
        <input type="hidden" name="businessId" id="businessId"/>
        <input type="hidden" name="face" id="faces"/>
        <div align="center">
            <div style="padding: 10px 0 20px 0">
                <img src="${path}/css/icons/tip.png" alt="提示">录入excel第一行所有标题，重复则不录入</div>
            <table class="table-dlg">
                <tr>
                    <td><label>文件导入(excel)：</label></td>
                    <td>
                        <input id="txtFile" name="txtFile" class="easyui-filebox"  style="width:160px;"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="upload_header_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="uploadExcel()" style="width: 90px">上传</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('upload_header_dlg');" style="width: 90px">取消</a>
</div>