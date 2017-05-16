package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.model.Result;
import com.water.bocai.db.model.ResultCriteria;
import com.water.bocai.db.service.ResultService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("resultService")
public class ResultServiceImpl implements ResultService {
    @Resource
    private ResultMapper resultMapper;

    @Override
    public Result getResultBySelective(Map<String, Object> queryMap) {
        ResultCriteria resultCriteria = new ResultCriteria();
        ResultCriteria.Criteria criteria = resultCriteria.createCriteria();
        if (queryMap != null) {
            if (queryMap.containsKey("task_id")) {
                criteria.andTaskIdEqualTo((String) queryMap.get("task_id"));
            }
        }
        List<Result> resultList = resultMapper.selectByExample(resultCriteria);
        if (resultList != null && resultList.size()>0) {
            return resultList.get(0);
        }
        return null;
    }
}