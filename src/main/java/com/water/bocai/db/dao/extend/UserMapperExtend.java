package com.water.bocai.db.dao.extend;

import com.water.bocai.db.model.User;
import com.water.bocai.utils.web.dto.StatisticsUserData;

import java.util.List;
import java.util.Map;

public interface UserMapperExtend {
    List<User> getUserList(Map<String, Object> queryMap);

    int countUserTotal(Map<String, Object> queryMap);

    List<StatisticsUserData> getUserIncomeInfo(Map<String, Object> queryMap);

    int countUserIncmeInfoList(Map<String, Object> queryMap);
}