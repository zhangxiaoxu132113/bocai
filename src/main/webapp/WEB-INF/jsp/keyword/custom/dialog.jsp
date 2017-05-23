<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="show_tips" class="easyui-dialog"
     style="width: 430px; height: 340px; top: 80px;" closed="true"
     data-options="iconCls:'icon-help',modal:true"
     buttons="#show_tips_btn">
    <div style="font-size: larger">
        <ui>
            <li>
                在一次筛选过程中用户必须填写二级业务、搜索引擎、结束日期（列表显示该日期的数据）及至少一条的筛选条件，否则筛选无效；
            </li>
            <li>
                当需要进行导出时，需填写导出数量，单日最大支持5W条导出；
            </li>
            <li>
                当日期为多日时，浏览量、访客量、访客数、IP数为每天满足条件的关键词，排名为多日中最新可查询到的排名，通过定制导出可以看到详细表；
            </li>
            <li>
                系统默认在每晚20点上传前一天的搜索词的数据，所以会有两天左右的时间差。
                例如10月7日晚21点上传10月6日的数据，请根据筛选的时间点来确认有数据的时间段，目前仅支持对于有数据的时间段进行筛选；
            </li>
        </ui>
    </div>
</div>

<div id="show_tips_btn">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel"
       onclick="javascript:s.closeDialog('show_tips');" style="width: 90px">关闭</a>
</div>
