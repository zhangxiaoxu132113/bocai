package com.water.bocai.db.dao.extend;

import com.water.bocai.db.model.User;

import java.util.List;
import java.util.Map;

public interface UserMapperExtend {
    List<User> getUserList(Map<String, Object> queryMap);

    int countUserTotal(Map<String, Object> queryMap);
}