package com.water.bocai.db.service;

import com.water.bocai.db.model.Result;

import java.util.Map;

public interface ResultService {
    Result getResultBySelective(Map<String, Object> queryMap);
}