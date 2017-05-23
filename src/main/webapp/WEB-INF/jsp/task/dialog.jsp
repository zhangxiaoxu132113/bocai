<%@ page language="java" pageEncoding="UTF-8" %>
<style type="text/css">
    table.table-dlg1 tr > td:nth-child(1) {
        width: 10%;
    }

    table.table-dlg1 tr > td:nth-child(2) {
        text-align: center;
        width: 12%;
    }

    table.table-dlg1 tr > td:nth-child(3) {
        text-align: center;
        width: 12%;
    }

    table.table-dlg1 tr > td:nth-child(4) {
        text-align: center;
        width: 12%;
    }

    table.table-dlg1 tr > td:nth-child(5) {
        text-align: center;
        width: 12%;
    }

    table.table-dlg1 tr > td:nth-child(6) {
        text-align: right;
        width: 32%;
    }

    table.table-dlg1 tr > td:nth-child(7) {
        width: 10%;
    }
</style>
<div id="queue_len_dlg" class="easyui-dialog"
     style="width: 700px; height: 470px;" closed="true"
     data-options="iconCls:'icon-edit',modal:true"
     buttons="#queue_len_btn">
    <form id="queue_len_form" name="queue_len_form" method="post">
        <table class="table-dlg table-dlg1">
            <tr>
                <th align="center">搜索引擎</th>
                <th align="center">监控任务数量</th>
                <th align="center">临时任务数量</th>
                <th align="center">关键词排名数量</th>
                <th align="center">关键词排名点击总数量</th>
                <th colspan="2" align="center">其他信息</th>
            </tr>
            <tr>
                <td><label>baidu：</label></td>
                <td>
                    <span id="queue_len_baidu"></span>
                </td>
                <td>
                    <span id="queue_len_baidu_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_baidu"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_baidu"></span>
                </td>
                <td><label>待分析监控任务队列剩余数量：</label></td>
                <td>
                    <span id="all_finish_task_id_len"></span>
                </td>
            </tr>
            <tr>
                <td><label>wapbaidu：</label></td>
                <td>
                    <span id="queue_len_wapbaidu"></span>
                </td>
                <td>
                    <span id="queue_len_wapbaidu_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_wapbaidu"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_wapbaidu"></span>
                </td>
                <td><label>待分析临时任务队列剩余数量：</label></td>
                <td>
                    <span id="all_vip_finish_task_id_len"></span>
                </td>
            </tr>
            <tr>
                <td><label>so：</label></td>
                <td>
                    <span id="queue_len_so"></span>
                </td>
                <td>
                    <span id="queue_len_so_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_so"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_so"></span>
                </td>
                <td><label>程序正在分析处理数量：</label></td>
                <td>
                    <span id="running_finish_task_count"></span>
                </td>
            </tr>
            <tr>
                <td><label>wapso：</label></td>
                <td>
                    <span id="queue_len_wapso"></span>
                </td>
                <td>
                    <span id="queue_len_wapso_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_wapso"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_wapso"></span>
                </td>
                <td><label>当前共享代理总数：</label></td>
                <td>
                    <span title="http" id="ce_http_proxy_pool_len"></span>|<span title="https" id="ce_https_proxy_pool_len"></span>
                </td>
            </tr>
            <tr>
                <td><label>sogou：</label></td>
                <td>
                    <span id="queue_len_sogou"></span>
                </td>
                <td>
                    <span id="queue_len_sogou_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_sogou"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_sogou"></span>
                </td>
                <td><label>当前独享代理总数：</label></td>
                <td>
                    <div onclick="getProxyListDlg()"
                         style="width: 40%;background-color: #f5f5f5;border-style: solid;
                        border-width: 1px;border-color: #dedede;
                        border-radius: 3px">
                        <a><span id="ce_http_private_proxy_pool_len"></span></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td><label>wapsogou：</label></td>
                <td>
                    <span id="queue_len_wapsogou"></span>
                </td>
                <td>
                    <span id="queue_len_wapsogou_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_wapsogou"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_wapsogou"></span>
                </td>
                <td><label>放入队列词数（Baidu Top 50）：</label></td>
                <td>
                    <span title="aggs" id="count_submited_bdc"></span></span>
                </td>
            </tr>
            <tr>
                <td><label>sm：</label></td>
                <td>
                    <span id="queue_len_sm"></span>
                </td>
                <td>
                    <span id="queue_len_sm_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_sm"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_sm"></span>
                </td>
                <td><label>当前剩余词数（Baidu Top 50）：</label></td>
                <td>
                    <span title="aggs" id="surplus_bdc_queue_len"></span></span>
                </td>
            </tr>
            <tr>
                <td><label>bing：</label></td>
                <td>
                    <span id="queue_len_bing"></span>
                </td>
                <td>
                    <span id="queue_len_bing_vip"></span>
                </td>
                <td>
                    <span id="all_click_keyword_count_bing"></span>
                </td>
                <td>
                    <span id="need_click_keyword_count_bing"></span>
                </td>
                <td><label>放入队列词数（优质聚合平台）：</label></td>
                <td>
                    <span title="aggs" id="count_submited_bdc_agg"></span></span>
                </td>
            </tr>

            <tr>
                <td><label></label></td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td><label>当前剩余词数（优质聚合平台）：</label></td>
                <td>
                    <span title="aggs" id="surplus_bdc_agg_queue_len"></span></span>
                </td>
            </tr>
        </table>
    </form>
</div>

<div id="queue_len_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="closeQueueLenDlg()" style="width: 90px">关闭</a>
</div>

<div id="proxy_list_dlg" class="easyui-dialog"
     style="width: 800px; height: 550px;" closed="true"
     data-options="iconCls:'image-queue',modal:true"
     buttons="#proxy_list_dlg_btn">
    <div id="queue_top" border="false"></div>
    <div id="queue_center" border="true" style="overflow: hidden;height:auto;width: auto;">
        <table id="queue_table" border="ture" style="overflow: hidden;height:450px;"></table>
    </div>
</div>

<div id="proxy_list_dlg_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('proxy_list_dlg');" style="width: 90px">关闭</a>
</div>
