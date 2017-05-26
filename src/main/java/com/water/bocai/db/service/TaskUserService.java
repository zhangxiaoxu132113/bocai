package com.water.bocai.db.service;

import com.water.bocai.db.model.TaskUser;

import java.util.List;
import java.util.Map;

public interface TaskUserService {
    int deleteByExample(Map<String, Object> queryMap);

    List<TaskUser> getTaskUserBySelective(Map<String, Object> queryMap);
}