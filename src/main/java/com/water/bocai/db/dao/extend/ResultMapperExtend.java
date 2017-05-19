package com.water.bocai.db.dao.extend;

import com.water.bocai.utils.web.dto.StatisticsData;

import java.util.List;
import java.util.Map;

public interface ResultMapperExtend {
    List<StatisticsData> getHistoryStatisticsData(Map<String, Object> queryMap);
}