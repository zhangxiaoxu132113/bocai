package com.water.bocai.db.dao;

import com.water.bocai.db.dao.extend.ResultMapperExtend;
import com.water.bocai.db.model.Result;
import com.water.bocai.db.model.ResultCriteria;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;

public interface ResultMapper extends ResultMapperExtend {
    int countByExample(ResultCriteria example);

    int deleteByExample(ResultCriteria example);

    int deleteByPrimaryKey(String id);

    int insert(Result record);

    int insertSelective(Result record);

    List<Result> selectByExampleWithRowbounds(ResultCriteria example, RowBounds rowBounds);

    List<Result> selectByExample(ResultCriteria example);

    Result selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Result record, @Param("example") ResultCriteria example);

    int updateByExample(@Param("record") Result record, @Param("example") ResultCriteria example);

    int updateByPrimaryKeySelective(Result record);

    int updateByPrimaryKey(Result record);

    int insertBatch(List<Result> list);
}