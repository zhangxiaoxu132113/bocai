package com.water.bocai.db.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.dao.TaskMapper;
import com.water.bocai.db.dao.TaskUserMapper;
import com.water.bocai.db.model.Result;
import com.water.bocai.db.model.ResultCriteria;
import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.service.ResultService;
import com.water.bocai.db.service.TaskUserService;
import com.water.bocai.utils.*;
import com.water.bocai.utils.web.MapView;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.StatisticsData;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.*;

@Service("resultService")
public class ResultServiceImpl implements ResultService {
    @Resource
    private ResultMapper resultMapper;

    @Resource
    private TaskMapper taskMapper;

    @Resource
    private TaskUserMapper taskUserMapper;

    @Resource
    private TaskUserService taskUserService;

    @Override
    public Result getResultBySelective(Map<String, Object> queryMap) {
        ResultCriteria resultCriteria = new ResultCriteria();
        ResultCriteria.Criteria criteria = resultCriteria.createCriteria();
        if (queryMap != null) {
            if (queryMap.containsKey("task_id")) {
                criteria.andTaskIdEqualTo((String) queryMap.get("task_id"));
            }
        }
        List<Result> resultList = resultMapper.selectByExample(resultCriteria);
        if (resultList != null && resultList.size() > 0) {
            return resultList.get(0);
        }
        return null;
    }

    @Override
    public Map<String, Object> getHistoryStatisticsData(Map<String, Object> queryMap) throws ParseException {
        MapView mapView = new MapView();
        List<StatisticsData> statisticsDataList = resultMapper.getHistoryStatisticsData(queryMap);
        int count = taskMapper.countTaskList(queryMap);
        List<Map<String, Object>> xAxis = new ArrayList<>();
        Map<String, Object> xAxisMap = new HashMap<>();
        List<String> dateArr = new ArrayList<>();


        List<Map<String, Object>> seriesDatas = new ArrayList<>();
        Map<String, Object> agencyFeeMap = new HashMap<>();
        Map<String, Object> profiltMap = new HashMap<>();
        Map<String, Object> touzhuMap = new HashMap<>();
        Map<String, Object> moneyInMap = new HashMap<>();
        Map<String, Object> moneyOutMap = new HashMap<>();

        List<Float> touzhuList = new ArrayList<>();
        List<Float> profiltList = new ArrayList<>();
        List<Float> moneyInList = new ArrayList<>();
        List<Float> moneyOutList = new ArrayList<>();
        List<Float> agencyFeeList = new ArrayList<>();

        List<String> legend_data = new ArrayList<>();

        for (StatisticsData statisticsData : statisticsDataList) {
            String time = statisticsData.getTime();
            float agencyFeeTotal = statisticsData.getAgencyFeeTotal();
            float profiltTotal = statisticsData.getProfitTotal();
            float touzhuTotal = statisticsData.getTouZhuTotal();
            float moneyInTotal = statisticsData.getMoneyInTotal();
            float moneyOutTotal = statisticsData.getMoneyOutTotal();

            agencyFeeList.add(agencyFeeTotal);
            profiltList.add(profiltTotal);
            touzhuList.add(touzhuTotal);
            moneyInList.add(moneyInTotal);
            moneyOutList.add(moneyOutTotal);
            dateArr.add(DateUtils.DATE_FORMAT_MD.format(DateUtils.DATE_FORMAT_YMD.parse(time)));
        }

        touzhuMap.put("name", "投注金额");
        touzhuMap.put("type", "line");
        touzhuMap.put("itemStyle", JSONObject.parse("{normal: {areaStyle: {type: 'default'}}}"));
        touzhuMap.put("data", touzhuList);
        profiltMap.put("name", "纯收益");
        profiltMap.put("type", "line");
        profiltMap.put("itemStyle", JSONObject.parse("{normal: {areaStyle: {type: 'default'}}}"));
        profiltMap.put("data", profiltList);
        moneyInMap.put("name", "杀包位");
        moneyInMap.put("type", "line");
        moneyInMap.put("itemStyle", JSONObject.parse("{normal: {areaStyle: {type: 'default'}}}"));
        moneyInMap.put("data", moneyInList);
        moneyOutMap.put("name", "赔包位");
        moneyOutMap.put("type", "line");
        moneyOutMap.put("itemStyle", JSONObject.parse("{normal: {areaStyle: {type: 'default'}}}"));
        moneyOutMap.put("data", moneyOutList);
        agencyFeeMap.put("name", "佣金");
        agencyFeeMap.put("type", "line");
        agencyFeeMap.put("itemStyle",JSONObject.parse("{normal: {areaStyle: {type: 'default'}}}"));
        agencyFeeMap.put("data", agencyFeeList);

        legend_data.add("投注金额");
        legend_data.add("纯收益");
        legend_data.add("杀包位");
        legend_data.add("赔包位");
        legend_data.add("佣金");

        seriesDatas.add(touzhuMap);
        seriesDatas.add(profiltMap);
        seriesDatas.add(moneyInMap);
        seriesDatas.add(moneyOutMap);
        seriesDatas.add(agencyFeeMap);

        mapView.putParams("title_text", "报表分析");
        mapView.putParams("title_subtext", "分析");
        mapView.putParams("legend_data", legend_data);
        xAxisMap.put("date", dateArr);
        xAxisMap.put("type", "category");
        xAxisMap.put("boundaryGap", false);
        xAxis.add(xAxisMap);
        mapView.putParams("xAxis", xAxis);
//        mapView.putParams("yAxis", dateArr);
        mapView.putParams("series", seriesDatas);
        mapView.setTotal(count);
        mapView.setRows(statisticsDataList);
        mapView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        mapView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        return mapView.getResultMap();
    }

    @Override
    public Map<String, Object> exportDataForChat(Map<String, Object> queryMap) throws ParseException {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("result", 0);
        Map<String, Object> histroyStatisticsData = getHistoryStatisticsData(queryMap);
        if (histroyStatisticsData == null) {
            return data;
        }

        List<StatisticsData> statisticsDataList = (List<StatisticsData>) histroyStatisticsData.get("rows");
        if (statisticsDataList == null || statisticsDataList.isEmpty()) {
            return data;
        }


        if (data != null && !data.isEmpty()) {
            String filePath = Constant.webroot;
            String fileName = "报表分析_"+ StringUtil.uuid();
            String path = StringUtil.getExcelFilePath(Constant.STATISTICS_URL_EXPORT_PATH, fileName);
            List<EasyUIColumn> dColumns = new ArrayList<>();// 动态列
            dColumns.add(new EasyUIColumn("time", "time", "时间"));
            dColumns.add(new EasyUIColumn("touZhuTotal", "touZhuTotal", "投注金额"));
            dColumns.add(new EasyUIColumn("moneyInTotal", "moneyInTotal", "共进"));
            dColumns.add(new EasyUIColumn("moneyOutTotal", "moneyOutTotal", "共出"));
            dColumns.add(new EasyUIColumn("profitTotal", "profitTotal", "纯收益"));

            queryMap.put("destFilePath", filePath + path);
            queryMap.put("sheetName", "结果明细表");
            queryMap.put("dColumns", dColumns);
            queryMap.put("dColumnData", JSON.parseArray(JSON.toJSONString(statisticsDataList)));

            boolean result = ExportUtils.exportDiynamicDataToLocalExcel(queryMap);
//            if (result) {// 成功生成结果明细后再添加一个sheet用于记录结果统计
//                return ExportUtils.exportBaiduUrlStatisticsToLocalExcel(filePath + path, baiduUrlStatisticsTask, resultList);
//            }
            File f07 = new File(filePath + path);
            if (f07.exists()) {
                data.put("result", "1");
                data.put("path", path);
            }
        }

        return data;
    }

    @Override
    public Map<String, Object> exportAllData(String taskId) {
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> queryMap = new HashMap<>();
        data.put("result", 0);
        queryMap.put("taskId", taskId);
        List<TaskUser> taskUserList = taskUserService.getTaskUserBySelective(queryMap);
        if (taskUserList != null && !taskUserList.isEmpty()) {
            String filePath = Constant.webroot;
            String fileName = "报表分析_"+ StringUtil.uuid();
            String path = StringUtil.getExcelFilePath(Constant.STATISTICS_URL_EXPORT_PATH, fileName);
            List<EasyUIColumn> dColumns = new ArrayList<>();// 动态列
            dColumns.add(new EasyUIColumn("userId", "userId", "闲家"));
            dColumns.add(new EasyUIColumn("num", "num", "包位"));
            dColumns.add(new EasyUIColumn("sum", "sum", "投注金额"));
            dColumns.add(new EasyUIColumn("bonus", "bonus", "盈利"));

            queryMap.put("destFilePath", filePath + path);
            queryMap.put("sheetName", "结果明细表");
            queryMap.put("dColumns", dColumns);
            queryMap.put("dColumnData", JSON.parseArray(JSON.toJSONString(taskUserList)));

            boolean result = ExportUtils.exportDiynamicDataToLocalExcel(queryMap);
//            if (result) {// 成功生成结果明细后再添加一个sheet用于记录结果统计
//                return ExportUtils.exportBaiduUrlStatisticsToLocalExcel(filePath + path, baiduUrlStatisticsTask, resultList);
//            }
            File f07 = new File(filePath + path);
            if (f07.exists()) {
                data.put("result", "1");
                data.put("path", path);
            }
        }

        return data;
    }
}