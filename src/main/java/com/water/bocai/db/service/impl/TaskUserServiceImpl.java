package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.TaskUserMapper;
import com.water.bocai.db.service.TaskUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("taskUserService")
public class TaskUserServiceImpl implements TaskUserService {
    @Resource
    private TaskUserMapper taskUserMapper;
}