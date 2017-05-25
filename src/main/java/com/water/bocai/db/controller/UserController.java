package com.water.bocai.db.controller;

import com.water.bocai.db.model.User;
import com.water.bocai.db.service.UserService;
import com.water.bocai.utils.MD5;
import com.water.bocai.utils.MWSessionUtils;
import com.water.bocai.utils.WebUtils;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.Page;
import com.water.bocai.utils.web.dto.UserDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangmiaojie on 2017/5/22.
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Resource
    private UserService userService;


    @RequestMapping(value = "incomeInfo", method = RequestMethod.GET)
    public ModelAndView amounts(String userId) {
        ModelAndView mav = new ModelAndView("kaijiang/user_chart/home");
        mav.addObject("userId", userId);
        return mav;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response,
                      @RequestBody(required = false) UserDto model) {
        ResultView resultView = new ResultView();
        resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
        if (model == null) {
            resultView.setMsg("登陆失败，参数异常！");
            WebUtils.sendResult(response, resultView);
            return;
        }

        String account = model.getAccount();
        String pwd = model.getPassword();
        if (StringUtils.isBlank(account) || StringUtils.isBlank(pwd)) {
            resultView.setMsg("账号或密码不能为空！");
            WebUtils.sendResult(response, resultView);
            return;
        }

        String md5Pwd = MD5.getMD5(pwd);
        User user = userService.loginByAccountAndPwd(account, md5Pwd);
        if (user == null) {
            resultView.setMsg("用户不存在或密码输入错误！");
            WebUtils.sendResult(response, resultView);
            return;
        }
        //TODO 记住密码账号功能
        MWSessionUtils.addUser2Session(request, user);
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg("登陆成功！");
        WebUtils.sendResult(response, resultView);
    }

    @RequestMapping(value = "/loginout", method = RequestMethod.POST)
    public void loginout(HttpServletRequest request, HttpServletResponse response,
                      @RequestBody(required = false) UserDto model) {
        //TODO loginout
    }


    @RequestMapping(value = "/getUserList", method = RequestMethod.POST)
    public void getUserList(HttpServletRequest request, HttpServletResponse response,
                            @RequestBody(required = false) UserDto model,
                            @RequestParam(defaultValue = "1") int currentPage,
                            @RequestParam(defaultValue = "10") int pageSize) {
        //TODO getUserList
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        Page page = new Page(begin, pageSize, currentPage);
        queryMap.put("page", page);
        queryMap.put("model", model);

        WebUtils.sendResult(response, userService.getUserList(queryMap));
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public void addUser(HttpServletRequest request, HttpServletResponse response,
                        @RequestBody(required = false) UserDto model) {
        WebUtils.sendResult(response, userService.addUser(model));
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public void deleteUser(HttpServletRequest request, HttpServletResponse response,
                           @RequestBody(required = false) UserDto model) {
        WebUtils.sendResult(response, userService.deleteUser(model));
    }

    @RequestMapping(value = "/modifyUser", method = RequestMethod.POST)
    public void modifyUser(HttpServletRequest request, HttpServletResponse response,
                           @RequestBody(required = false) UserDto model) {
        WebUtils.sendResult(response, userService.modifyUser(model));
    }

    @RequestMapping(value = "/getUserIncomeInfo", method = RequestMethod.GET)
    public void getUserIncomeInfo(HttpServletRequest request, HttpServletResponse response,
                                  UserDto model,
                                  @RequestParam(defaultValue = "1") int currentPage,
                                  @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        Page page = new Page(begin, pageSize, currentPage);
        queryMap.put("page", page);
        queryMap.put("model", model);
        queryMap.put("endTime", model.getQueryEndTime());
        queryMap.put("startTime", model.getQueryStartTime());
        WebUtils.sendResult(response, userService.getUserIncomeInfo(queryMap));
    }
}
