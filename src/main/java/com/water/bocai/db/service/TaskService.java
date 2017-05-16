package com.water.bocai.db.service;

import com.water.bocai.db.model.TaskUser;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.ResultDto;

import java.util.List;
import java.util.Map;

public interface TaskService {
    ResultView addTask();

    ResultView saveTaskUser(List<TaskUser> taskUserList);

    ResultView getTaskUserList(Map<String, Object> queryMap);

    ResultView handleLotteryResult(ResultDto model);

    ResultView getTaskList(Map<String, Object> queryMap);
}