package com.water.bocai.db.service;

import com.water.bocai.db.model.Result;
import com.water.bocai.utils.web.MapView;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.TaskDto;

import java.util.Map;

public interface ResultService {
    Result getResultBySelective(Map<String, Object> queryMap);

    Map<String, Object> getHistoryStatisticsData(Map<String, Object> queryMap);
}