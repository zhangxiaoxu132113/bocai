<%@ page language="java" pageEncoding="UTF-8"%>

<div id="add_dictionary_dlg" class="easyui-dialog"
     style="width: 400px; height: 360px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_dictionary_dlg_btn">
    <form id="add_dictionary_form" method="post" enctype="multipart/form-data">
        <input type="hidden" id="add_dictionary_businessId" name="businessId"/>
        <input type="hidden" id="add_dictionary_labels" name="labels"/>
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
                <tr>
                    <td><label>关键词：</label></td>
                    <td>
                        <textarea id="add_dictionary_keywords" name="keywords" rows="9" cols="20"
                                  placeholder="支持多个关键词，一行一个；Excel文件上传同理（只保留中文、英文、数字、少量中英文字符组成的关键词，最多不超过5w个词）"></textarea>
                    </td>
                </tr>
                <tr>
                    <td><label>文件导入(Excel)：</label></td>
                    <td>
                        <input id="add_dictionary_file" name="txtFile" class="easyui-filebox" style="width:160px;"/>
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="add_dictionary_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="saveDictionary()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelSaveDictionary()" style="width: 90px">取消</a>
</div>

<div id="update_dictionary_dlg" class="easyui-dialog"
     style="width: 400px; height: 210px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#update_dictionary_btn">
    <form id="update_dictionary_form" name="update_dictionary_form" method="post">
        <input type="hidden" id="update_dictionary_id" name="id"/>
        <input type="hidden" id="update_dictionary_labels" name="labels"/>
        <input type="hidden" id="update_dictionary_dictionarySearchType" name="dictionarySearchType"/>
        <table class="table-dlg">
            <tr>
                <td><label>词表名称：</label></td>
                <td>
                    <input style="width: 160px" id="update_dictionary_name" name="name" class="easyui-textbox" type="text" required="required"/>
                </td>
            </tr>
            <tr>
                <td><label>分类标签：</label></td>
                <td>
                    <input class="textbox" style="height: 20px; width: 160px;" id="update_dictionary_label" name="label" type="text"
                           autocomplete="off" placeholder="英文逗号分隔"/>
                    <div class="auto-div" id="update_dictionary_auto_div" />
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="update_dictionary_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateDictionary()" style="width: 90px">更新</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateDictionary()" style="width: 90px">取消</a>
</div>

<div id="add_task_dlg" class="easyui-dialog"
     style="width: 400px; height: 400px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#add_task_dlg_btn">
    <form id="add_task_form" method="post">
        <input type="hidden" id="add_task_dictionayId" name="dictionaryId"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>词表名称：</label></td>
                    <td>
                        <span id="add_task_dictionary_name"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>搜索引擎：</label></td>
                    <td>
                        <input id="add_task_search_engine_id" name="searchEngineId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>任务类型：</label></td>
                    <td>
                        <input name="type" type="radio" value="1"/>监控（设置后每天都会抓取结果）
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input name="type" type="radio" value="2" checked="checked"/>单次（只输出报表，无分析功能）
                    </td>
                </tr>
                <tr>
                    <td><label>地域：</label></td>
                    <td>
                        <input id="add_task_area_selected" name="selected" type="checkbox"/>指定地区（只使用当地IP抓取）
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input id="add_task_areaParentId" name="areaParentId" class="easyui-combobox" valueField="id" textField="name"
                               panelHeight="200" style="width:80px;" disabled="disabled"/>
                        <input id="add_task_areaId" name="areaId" class="easyui-combobox" valueField="id" textField="name"
                               panelHeight="200" style="width:80px;" disabled="disabled"/>
                    </td>
                </tr>
                <tr>
                    <td><label>可用代理数量：</label></td>
                    <td>
                        <span id="add_task_proxy_count"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>拓展：</label></td>
                    <td>
                        <input id="add_task_save_original_result" name="saveOriginalResult" type="checkbox"/>保存结果明细
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
     style="width: 400px; height: 400px;" closed="true"
     data-options="iconCls:'icon-add',modal:true"
     buttons="#update_task_dlg_btn">
    <form id="update_task_form" name="update_task_form" method="post">
        <input type="hidden" id="update_task_dictionayId" name="dictionaryId"/>
        <input type="hidden" id="update_task_id" name="id"/>
        <div align="center">
            <table class="table-dlg">
                <tr>
                    <td><label>词表名称：</label></td>
                    <td>
                        <span id="update_task_dictionary_name"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>搜索引擎：</label></td>
                    <td>
                        <input id="update_task_search_engine_id" name="searchEngineId" class="easyui-combobox" valueField="id" textField="text"
                               panelHeight="auto" style="width:160px;" required="required"/>
                    </td>
                </tr>
                <tr>
                    <td><label>任务类型：</label></td>
                    <td>
                        <input name="type" type="radio" value="1"/>监控（设置后每天都会抓取结果）
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input name="type" type="radio" value="2" checked="checked"/>单次（只输出报表，无分析功能）
                    </td>
                </tr>
                <tr>
                    <td><label>地域：</label></td>
                    <td>
                        <input id="update_task_area_selected" name="selected" type="checkbox"/>指定地区（只使用当地IP抓取）
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input id="update_task_areaParentId" name="areaParentId" class="easyui-combobox" valueField="id" textField="name"
                               panelHeight="200" style="width:80px;"/>
                        <input id="update_task_areaId" name="areaId" class="easyui-combobox" valueField="id" textField="name"
                               panelHeight="200" style="width:80px;"/>
                    </td>
                </tr>
                <tr>
                    <td><label>可用代理数量：</label></td>
                    <td>
                        <span id="update_task_proxy_count"></span>
                    </td>
                </tr>
                <tr>
                    <td><label>拓展：</label></td>
                    <td>
                        <input id="update_task_save_original_result" name="saveOriginalResult" type="checkbox"/>保存结果明细
                    </td>
                </tr>
            </table>
        </div>
    </form>
</div>

<div id="update_task_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok"
       onclick="updateTask()" style="width: 90px">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="cancelUpdateTask()" style="width: 90px">取消</a>
</div>