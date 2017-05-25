package com.water.bocai.db.service;

import com.water.bocai.db.model.User;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.UserDto;

import java.util.Map;

public interface UserService {
    ResultView getUserList(Map<String, Object> queryMap);

    ResultView addUser(UserDto model);

    ResultView deleteUser(UserDto model);

    ResultView modifyUser(UserDto model);

    User loginByAccountAndPwd(String account, String md5Pwd);

    Integer accountUserList();

    ResultView getUserIncomeInfo(Map<String, Object> queryMap);
}