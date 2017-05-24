package com.water.bocai.db.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.dao.TaskMapper;
import com.water.bocai.db.model.Result;
import com.water.bocai.db.model.ResultCriteria;
import com.water.bocai.db.service.ResultService;
import com.water.bocai.utils.web.MapView;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.dto.StatisticsData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("resultService")
public class ResultServiceImpl implements ResultService {
    @Resource
    private ResultMapper resultMapper;

    @Resource
    private TaskMapper taskMapper;

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
    public Map<String, Object> getHistoryStatisticsData(Map<String, Object> queryMap) {
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
            dateArr.add(time);
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
        xAxisMap.put("data", dateArr);
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
}