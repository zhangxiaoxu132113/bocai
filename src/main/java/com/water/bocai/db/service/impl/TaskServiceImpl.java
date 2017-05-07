package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.TaskMapper;
import com.water.bocai.db.model.Task;
import com.water.bocai.db.service.TaskService;
import com.water.bocai.utils.Constants;
import com.water.bocai.utils.StringUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("taskService")
public class TaskServiceImpl implements TaskService {
    @Resource
    private TaskMapper taskMapper;

    public boolean addTask() {
        boolean isSuccess = false;
        Task task = new Task();
        task.setId(StringUtil.uuid());
        task.setName(StringUtil.getTaskName());
        task.setStatus(Constants.TASK_STATUS.RUNING.getIndex());
        task.setCreateOn(System.currentTimeMillis());
        task.setStartTime(System.currentTimeMillis());
        isSuccess = taskMapper.insert(task) != -1? true : false;
        return isSuccess;
    }
}