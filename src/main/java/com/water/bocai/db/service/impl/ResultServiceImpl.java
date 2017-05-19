package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.dao.TaskMapper;
import com.water.bocai.db.model.Result;
import com.water.bocai.db.model.ResultCriteria;
import com.water.bocai.utils.web.MapView;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.dto.StatisticsData;
import com.water.bocai.db.service.ResultService;
import com.water.bocai.utils.web.ResultView;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
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
        if (resultList != null && resultList.size()>0) {
            return resultList.get(0);
        }
        return null;
    }

    @Override
    public Map<String, Object> getHistoryStatisticsData(Map<String, Object> queryMap) {
        MapView mapView = new MapView();
        List<StatisticsData> statisticsDataList = resultMapper.getHistoryStatisticsData(queryMap);
        int count = taskMapper.countTaskList(queryMap);
        List<String> dateArr = new ArrayList<>();
        for (StatisticsData statisticsData : statisticsDataList) {
            String time = statisticsData.getTime();
            float agencyFeeTotal = statisticsData.getAgencyFeeTotal();
            float profiltTotal = statisticsData.getProfitTotal();
            float touzhuTotal  = statisticsData.getTouZhuTotal();
            float moneyInTotal = statisticsData.getMoneyInTotal();
            statisticsData.getMoneyOutTotal();
            dateArr.add(time);
        }
        mapView.putParams("title_text", "");
        mapView.putParams("title_subtext", "");
        mapView.putParams("legend_data", "");
        mapView.putParams("dateArr", dateArr);

        mapView.setTotal(count);
        mapView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        mapView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        return mapView.getResultMap();
    }
}