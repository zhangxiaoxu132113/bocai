package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.UserMapper;
import com.water.bocai.db.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;
}