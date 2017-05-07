package com.water.bocai.db.dao;

import com.water.bocai.db.dao.extend.TaskUserMapperExtend;
import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.model.TaskUserCriteria;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface TaskUserMapper extends TaskUserMapperExtend {
    int countByExample(TaskUserCriteria example);

    int deleteByExample(TaskUserCriteria example);

    int deleteByPrimaryKey(String id);

    int insert(TaskUser record);

    int insertSelective(TaskUser record);

    List<TaskUser> selectByExampleWithRowbounds(TaskUserCriteria example, RowBounds rowBounds);

    List<TaskUser> selectByExample(TaskUserCriteria example);

    TaskUser selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") TaskUser record, @Param("example") TaskUserCriteria example);

    int updateByExample(@Param("record") TaskUser record, @Param("example") TaskUserCriteria example);

    int updateByPrimaryKeySelective(TaskUser record);

    int updateByPrimaryKey(TaskUser record);

    int insertBatch(List<TaskUser> list);
}