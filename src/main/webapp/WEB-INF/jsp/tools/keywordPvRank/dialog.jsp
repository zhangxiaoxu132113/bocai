<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">table.table-dlg1 tr.is_index_cls > td:nth-child(2) > label:hover {
    cursor: pointer;
}

.add_excel_tip {
    margin-top: 0.5em;
    display: block;
}

#add_task_dlg {
    height: 330px !important;
}
</style>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 430px; height: 350px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>业务选择：</label></td>
                    <td>
                        <input id="business_level_one" name="businessLevelOneId" class="easyui-combobox" valueField="businessId"
                               textField="businessName"
                               panelHeight="auto" style="width:80px;"/>
                        <input id="business_level_two" name="businessLevelTwoId" class="easyui-combobox" valueField="businessId"
                               textField="businessName"
                               panelHeight="auto" style="width:80px;" disabled="disabled"/>
                    </td>
                </tr>
                <tr>
                    <td><label>备注：</label></td>
                    <td>
                        <input style="width: 162px" id="add_task_name" name="name" class="easyui-textbox" type="text"
                               required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label id="add_task_name_tip"><img src="${path}/css/icons/tip.png" alt="提示">搜索词日期：</label></td>
                    <td>
                        <div style="width: 162px">
                            <a href="javascript:void(0)" class="easyui-linkbutton"
                               onclick="checkSearchDate()" style="width: 35px;height: 22px;float: right;">检查</a>
                        </div>
                        <input id="add_task_searchDate" name="searchDate" class="easyui-datebox" style="width: 125px"/>

                    </td>
                </tr>
                <tr>
                    <td><label>关键词：</label></td>
                    <td>
                        <textarea id="add_task_urls" style="width: 162px" name="keywords" rows="10" cols="27"
                                  class="easyui-validatebox" required="required"
                                  placeholder="一行一个关键词"></textarea>
                    </td>
                </tr>
                <tr>
                    <td><label>是否查排名：</label></td>
                    <td>
                        <label><span>是</span><input type="radio" name="isRank" value="1"/></label>
                        <label><span>否</span><input type="radio" name="isRank" value="0" checked/></label>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>


<div id="add_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveTask()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveTask()" style="width: 90px">取消</a>
</div>

<div id="update_task_dlg" class="easyui-dialog"
     style="width: 400px; height: 150px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_task_dlg_btn">
    <form id="update_task_form" method="post">
        <input type="hidden" id="update_task_id" name="id"/>
        <input type="hidden" id="update_task_type" name="type"/>

        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>点击次数：</label></td>
                    <td>
                        <input style="width: 160px" id="update_task_click_count" name="clickCount"
                               class="easyui-textbox" type="text" required="required"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>


<div id="update_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateTask()" style="width: 90px">确认</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateTask()" style="width: 90px">取消</a>
</div>
