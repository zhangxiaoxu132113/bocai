<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>

<div id="upload_add_dlg" class="easyui-dialog"
     style="width: 430px; height: 340px; top: 80px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#upload_add_dlg_btn">
    <div align="center">
        <div style="padding: 10px 0 20px 20px;">
            <img src="${path}/css/icons/tip.png" alt="提示">录入文件名格式为：YYYY-MM-DD，例如：2016-01-01
            <div style="margin-top: 8px;">
                <span>如果导入文件名相同,且数据存在，则更新数据</span>
            </div>
            <div style="margin-top: 8px;">
                <img src="${path}/css/icons/tip.png" alt="注意" style="">
                csv或excel类型文档 ，装载数据<span style="color:red;font-size: 12px;">约5K条</span>最适宜,
            </div>
            <div style="margin-top: 8px;">
                可多个文档打包Zip格式批量上传
            </div>
        </div>
        <form id="upload_add_form" method="post" enctype="multipart/form-data">
            <table class="table-dlg">
                <tr>
                    <td><label>类型：</label></td>
                    <td>
                        <input id="type" name="type" class="easyui-combobox" valueField="id" textField="type"
                               panelHeight="auto" style="width:150px;height: 25px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>业务：</label></td>
                    <td>
                        <input id="businessId" name="businessId" class="easyui-combobox" valueField="businessId"
                               textField="businessName" panelHeight="auto" style="width:150px;height: 25px;"
                               required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>关键词导入：</label></td>
                    <td>
                        <input id="uploadfile" name="uploadfile" class="easyui-filebox"
                               style="width:160px;height: 25px;" required="required"/>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</div>

<div id="upload_add_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="save()" style="width: 90px">确定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('upload_add_dlg');" style="width: 90px">取消</a>
</div>

<div id="uploadKeyWord_add_dlg" class="easyui-dialog"
     style="width: 420px; height: 300px; top:80px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#uploadKeyWord_add_dlg_btn">
    <div align="center">
        <div style="padding: 10px 0 5px 10px">
            <img src="${path}/css/icons/tip.png" alt="提示">excel规则：第一列须为“关键词”，
        </div>
        后面的备注列无限扩展，<br/>
        如果导入文件名相同且数据存在，则更新数据
        <div style="margin-top: 8px;">
            <img src="${path}/css/icons/tip.png" alt="注意" style="">
            csv或excel类型文档装载数据<span style="color:red;font-size: 12px;">约5K条</span>最适宜,
        </div>
        <div style="margin-top: 8px;">
            可多个文档打包Zip格式批量上传
        </div>
    </div>

    <form id="uploadKeyWord_Remark_add_form" method="post" enctype="multipart/form-data">
        <table class="table-dlg">
            <tr>
                <td><label>业务：</label></td>
                <td>
                    <input id="business_id" name="businessId" class="easyui-combobox" valueField="businessId"
                           textField="businessName" panelHeight="auto" style="width:170px;height: 25px;"
                           required="required"/>
                </td>
            </tr>
            <tr>
                <td width="100px"><label>关键词备注：</label></td>
                <td>
                    <input id="upfile" name="upfile" class="easyui-filebox" style="width:170px;height: 25px;" required="required"/>
                </td>
            </tr>
        </table>
    </form>
</div>
</div>

<div id="uploadKeyWord_add_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveKeyWordRemark()" style="width: 90px">确定</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('uploadKeyWord_add_dlg');" style="width: 90px">取消</a>
</div>
