<%@ page language="java" pageEncoding="UTF-8"%>

<div id="add_root_dlg" class="easyui-dialog"
     style="width: 400px; height: 200px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_root_dlg_btn">
    <form id="add_root_form" method="post" enctype="multipart/form-data">
        <div align="center">
            <div style="padding: 10px 0 20px 0">
                <img src="${path}/css/icons/tip.png" alt="提示">上传的excel名就是分类名称，第一列须为"词根"，如果文件名存在则合并</div>
            <table class="table-dlg">
                <tr>
                    <td><label>文件导入(excel)：</label></td>
                    <td>
                        <input id="add_root_file" name="txtFile" class="easyui-filebox"  style="width:160px;" required="required"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_root_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="uploadExcel()" style="width: 90px">上传</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUploadExcel()" style="width: 90px">取消</a>
</div>

<div id="update_root_dlg" class="easyui-dialog"
     style="width: 400px; height: 160px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_root_btn">
    <form id="update_root_form" name="update_root_form" method="post">
        <input type="hidden" id="update_root_id" name="id"/>
        <input type="hidden" id="name" name="name"/>
        <table class="table-dlg">
            <tr>
                <td><label>分类：</label></td>
                <td>
                    <input style="width: 160px" id="category" name="categoryId" class="easyui-combobox" valueField="id" textField="text"
                           panelHeight="auto" style="width:100px;" required="required"/>
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="update_root_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateRoot()" style="width: 90px">更新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateRoot()" style="width: 90px">取消</a>
</div>
