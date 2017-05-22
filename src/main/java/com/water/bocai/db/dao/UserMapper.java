package com.water.bocai.db.dao;

import com.water.bocai.db.dao.extend.UserMapperExtend;
import com.water.bocai.db.model.User;
import com.water.bocai.db.model.UserCriteria;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;

public interface UserMapper extends UserMapperExtend {
    int countByExample(UserCriteria example);

    int deleteByExample(UserCriteria example);

    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    List<User> selectByExampleWithRowbounds(UserCriteria example, RowBounds rowBounds);

    List<User> selectByExample(UserCriteria example);

    User selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") User record, @Param("example") UserCriteria example);

    int updateByExample(@Param("record") User record, @Param("example") UserCriteria example);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int insertBatch(List<User> list);
}