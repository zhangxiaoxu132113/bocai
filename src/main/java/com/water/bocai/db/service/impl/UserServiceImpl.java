package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.UserMapper;
import com.water.bocai.db.model.User;
import com.water.bocai.db.model.UserCriteria;
import com.water.bocai.db.service.UserService;
import com.water.bocai.utils.StringUtil;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.UserDto;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("userService")
public class UserServiceImpl implements UserService {
    private Log logger = LogFactory.getLog(UserServiceImpl.class);

    @Resource
    private UserMapper userMapper;

    @Override
    public ResultView getUserList(Map<String, Object> queryMap) {
        ResultView resultView = new ResultView();
        List<User> userList = userMapper.getUserList(queryMap);
        if (userList == null) {
            resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_FAIL);
            return resultView;
        }
        int total = userMapper.countUserTotal(queryMap);
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        resultView.setRows(userList);
        resultView.setTotal(total);
        return resultView;
    }

    @Override
    public ResultView addUser(UserDto model) {
        ResultView resultView = new ResultView();
        resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_FAIL);
        if (model == null) {
            logger.error("添加用户失败，对象为空!");
            return resultView;
        }
        User origin_user = new User();
        BeanUtils.copyProperties(model, origin_user);
        origin_user.setId(StringUtil.uuid());
        int result = userMapper.insert(origin_user);
        if (result == -1) {
            logger.error("添加用户失败，数据库插入出现异常!");
            return resultView;
        }
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_FAIL);
        return resultView;
    }

    @Override
    public ResultView deleteUser(UserDto model) {
        ResultView resultView = new ResultView(
                OperationTips.TipsCode.TIPS_FAIL,
                OperationTips.TipsMsg.TIPS_FAIL);
        String userId = model.getId();
        if (StringUtils.isBlank(userId)) {
            logger.error("用户id为空！");
            return resultView;
        }
        int result = userMapper.deleteByPrimaryKey(userId);
        if (result == -1) {
            logger.error("删除用户失败，数据库访问出现异常!");
            return resultView;
        }
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        return resultView;
    }

    @Override
    public ResultView modifyUser(UserDto model) {
        ResultView resultView = new ResultView(
                OperationTips.TipsCode.TIPS_FAIL,
                OperationTips.TipsMsg.TIPS_FAIL);
        String userId = model.getId();
        if (StringUtils.isBlank(userId)) {
            logger.error("用户id为空！");
            return resultView;
        }
        int result = userMapper.updateByPrimaryKeySelective(model);
        if (result == -1) {
            logger.error("删除用户失败，数据库访问出现异常!");
            return resultView;
        }
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        return resultView;
    }

    @Override
    public User loginByAccountAndPwd(String account, String md5Pwd) {
        UserCriteria userCriteria = new UserCriteria();
        UserCriteria.Criteria criteria = userCriteria.createCriteria();
        criteria.andAccountEqualTo(account);
        criteria.andPasswordEqualTo(md5Pwd);
        List<User> userList = userMapper.selectByExample(userCriteria);
        if (userList != null && !userList.isEmpty()) {
            return userList.get(0);
        }
        return null;
    }

    @Override
    public Integer accountUserList() {
        return null;
    }
}