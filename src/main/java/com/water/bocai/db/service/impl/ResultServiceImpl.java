package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.service.ResultService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("resultService")
public class ResultServiceImpl implements ResultService {
    @Resource
    private ResultMapper resultMapper;
}