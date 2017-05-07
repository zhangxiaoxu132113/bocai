package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.LogMapper;
import com.water.bocai.db.service.LogService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("logService")
public class LogServiceImpl implements LogService {
    @Resource
    private LogMapper logMapper;
}