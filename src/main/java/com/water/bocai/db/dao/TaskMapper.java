package com.water.bocai.db.dao;

import com.water.bocai.db.dao.extend.TaskMapperExtend;
import com.water.bocai.db.model.Task;
import com.water.bocai.db.model.TaskCriteria;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface TaskMapper extends TaskMapperExtend {
    int countByExample(TaskCriteria example);

    int deleteByExample(TaskCriteria example);

    int deleteByPrimaryKey(String id);

    int insert(Task record);

    int insertSelective(Task record);

    List<Task> selectByExampleWithRowbounds(TaskCriteria example, RowBounds rowBounds);

    List<Task> selectByExample(TaskCriteria example);

    Task selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Task record, @Param("example") TaskCriteria example);

    int updateByExample(@Param("record") Task record, @Param("example") TaskCriteria example);

    int updateByPrimaryKeySelective(Task record);

    int updateByPrimaryKey(Task record);

    int insertBatch(List<Task> list);
}