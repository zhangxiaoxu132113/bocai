package com.water.bocai.db.dao.extend;

import com.water.bocai.utils.web.dto.TaskDto;

import java.util.List;
import java.util.Map;

public interface TaskMapperExtend {
    List<TaskDto> getTaskList(Map<String, Object> queryMap);

    Integer countTaskList(Map<String, Object> queryMap);
}