package com.water.bocai.db.dao;

import com.water.bocai.db.dao.extend.LogMapperExtend;
import com.water.bocai.db.model.Log;
import com.water.bocai.db.model.LogCriteria;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface LogMapper extends LogMapperExtend {
    int countByExample(LogCriteria example);

    int deleteByExample(LogCriteria example);

    int insert(Log record);

    int insertSelective(Log record);

    List<Log> selectByExampleWithRowbounds(LogCriteria example, RowBounds rowBounds);

    List<Log> selectByExample(LogCriteria example);

    int updateByExampleSelective(@Param("record") Log record, @Param("example") LogCriteria example);

    int updateByExample(@Param("record") Log record, @Param("example") LogCriteria example);

    int insertBatch(List<Log> list);
}