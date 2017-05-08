package com.water.bocai.db.dao.extend;

import com.water.bocai.db.model.TaskUser;
import com.water.bocai.utils.web.dto.TaskUserDto;

import java.util.List;
import java.util.Map;

public interface TaskUserMapperExtend {
    List<TaskUserDto> getTaskUserList(Map<String, Object> queryMap);

    int countTaskUserList(Map<String, Object> queryMap);
}