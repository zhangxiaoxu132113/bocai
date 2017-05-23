package com.water.bocai.db.service;

import com.water.bocai.db.model.TaskUser;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.ResultDto;
import com.water.bocai.utils.web.dto.TaskUserDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface TaskService {
    ResultView addTask();

    ResultView saveTaskUser(TaskUserDto model, MultipartFile excelFile) throws IOException;

    ResultView getTaskUserList(Map<String, Object> queryMap);

    ResultView handleLotteryResult(ResultDto model);

    ResultView getTaskList(Map<String, Object> queryMap);
}