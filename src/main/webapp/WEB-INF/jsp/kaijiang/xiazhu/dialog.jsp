<%@ page language="java" pageEncoding="UTF-8" %>

<style type="text/css">
    table.table-dlg1 tr.is_index_cls > td:nth-child(2) > label:hover {
        cursor: pointer;
    }

    .add_excel_tip {
        margin-top: 0.5em;
        display: block;
    }

    #add_task_dlg {
        height: 140px !important;
    }
    #task_execute_status_dlg table.table-dlg tr > td:nth-child(1) {
        text-align: center;
        width: 25%;

    }
</style>


<div id="add_task_dlg" class="easyui-dialog"
     style="width: 430px; height: 140px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post" enctype="multipart/form-data">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td style="vertical-align: text-top"><label>文件导入(Excel)：</label></td>
                    <td>
                        <input id="add_dictionary_file" name="excelFile" class="easyui-filebox" style="width:160px;"/>
                        <br/>
                        <span class="add_excel_tip">
                            导入格式为三列搜索词的excel<br>
                            第一列为玩家，第二列为包位，第三列为压手金额
                        </span>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="add_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveTaskUser()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveTask()" style="width: 90px">取消</a>
</div>

<div id="update_task_dlg" class="easyui-dialog"
     style="width: 400px; height: 370px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_task_dlg_btn">
    <form id="task_result_form" method="post">
        <input type="hidden" id="update_task_id" name="id"/>
        <input type="hidden" id="update_task_type" name="type"/>

        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>第1个：</label></td>
                    <td>
                        <input style="width: 160px" name="red1"
                               class="easyui-textbox red1" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>第2个：</label></td>
                    <td>
                        <input style="width: 160px" name="red2"
                               class="easyui-textbox red2" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>第3个：</label></td>
                    <td>
                        <input style="width: 160px" name="red3"
                               class="easyui-textbox red3" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>第4个：</label></td>
                    <td>
                        <input style="width: 160px" name="red4"
                               class="easyui-textbox red4" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>第5个：</label></td>
                    <td>
                        <input style="width: 160px" name="red5"
                               class="easyui-textbox red5" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>第6个：</label></td>
                    <td>
                        <input style="width: 160px" name="red6"
                               class="easyui-textbox red6" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>庄家包位：</label></td>
                    <td>
                        <input style="width: 160px" name="packageNum"
                               class="easyui-textbox packageNum" type="text"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="update_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="jishu_result()" style="width: 90px">确认</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelStartTask()" style="width: 90px">取消</a>
</div>

<div id="modify_task_dlg" class="easyui-dialog"
     style="width: 400px; height: 210px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#modify_task_dlg_btn">
    <form id="update_task_form" method="post">
        <div align="center">
            <table class="table-dlg table-dlg1">
                <tr>
                    <td><label>玩家：</label></td>
                    <td><span id="modify_player_name"></span></td>
                    <input type="hidden" name="id" id="modify_id"/>
                </tr>
                <tr>
                    <td><label>包位：</label></td>
                    <td>
                        <input style="width: 212px" name="num" id="modify_num" type="text"/>
                    </td>
                </tr>
                <tr>
                    <td><label>金额：</label></td>
                    <td>
                        <input style="width: 212px" name="sum" id="modify_sum" type="text"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>
<div id="modify_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateTaskUser()" style="width: 90px">确认</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateTask()" style="width: 90px">取消</a>
</div>


<div id="result_info_dlg" class="easyui-dialog"
     style="width: 400px; height: 350px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#result_info_dlg_btn">
    <div align="center">
        <table class="table-dlg">
            <tr>
                <td>庄家：</td>
                <td>包位 <span class="packageNum"></span></td>
            </tr>
            <tr>
                <td>杀包位：</td>
                <td><span class="inPackageNums"></span> 共 <span class="inCount"></span> 注，共进 <span class="moneyIn"></span> ￥</td>
            </tr>
            <tr>
                <td>赔包位：</td>
                <td><span class="outPackageNums"></span> 共 <span class="outCount"></span> 注，共出 <span class="moneyOut"></span> ￥</td>
            </tr>
            <tr>
                <td>平包位：</td>
                <td><span class="tiePackageNUms"></span> 共 <span class="tieCount"></span> 注</td>
            </tr>
            <tr>
                <td>佣金：</td>
                <td> <span class="agencyFee"></span> ￥</td>
            </tr>
            <tr>
                <td>纯盈利：</td>
                <td> <span class="profit"></span> ￥</td>
            </tr>
        </table>
    </div>
</div>
<div id="result_info_dlg_btn" style="text-align: center">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="close_result_info_dlg()" style="width: 90px">关闭</a>
</div>

<div id="result_dlg" class="easyui-dialog"
     style="width: 400px; height: 350px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#result_dlg_btn">
    <div align="center">
        <table id="result_table" border="ture"></table>
    </div>
</div>
<div id="result_dlg_btn" style="text-align: center">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="close_result_info_dlg()" style="width: 90px">关闭</a>
</div>