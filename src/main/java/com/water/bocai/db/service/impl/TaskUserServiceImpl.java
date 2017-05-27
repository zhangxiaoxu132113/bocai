package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.TaskUserMapper;
import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.model.TaskUserCriteria;
import com.water.bocai.db.service.TaskUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("taskUserService")
public class TaskUserServiceImpl implements TaskUserService {
    @Resource
    private TaskUserMapper taskUserMapper;

    @Override
    public int deleteByExample(Map<String, Object> queryMap) {
        TaskUserCriteria taskUserCriteria = new TaskUserCriteria();
        TaskUserCriteria.Criteria criteria = taskUserCriteria.createCriteria();
        if (queryMap != null) {
            if (queryMap.containsKey("taskId")) {
                criteria.andTaskIdEqualTo((String) queryMap.get("taskId"));
            }
        }
        int effectRows = taskUserMapper.deleteByExample(taskUserCriteria);
        return effectRows;
    }

    @Override
    public List<TaskUser> getTaskUserBySelective(Map<String, Object> queryMap) {
        TaskUserCriteria taskUserCriteria = new TaskUserCriteria();
        TaskUserCriteria.Criteria criteria = taskUserCriteria.createCriteria();
        if (queryMap != null) {
            if (queryMap.containsKey("taskId")) {
                criteria.andTaskIdEqualTo((String) queryMap.get("taskId"));
            }
        }
        List<TaskUser> taskUserList = taskUserMapper.selectByExample(taskUserCriteria);
        return taskUserList;
    }
}