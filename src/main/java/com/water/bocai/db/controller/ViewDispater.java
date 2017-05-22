package com.water.bocai.db.controller;

import com.water.bocai.db.service.TaskService;
import com.water.bocai.db.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by mrwater on 2017/5/7.
 */
@Controller
public class ViewDispater {
    @Resource
    private UserService userService;

    @Resource
    private TaskService taskService;

    @RequestMapping("/")
    public String index() {
        return "/index";
    }

    /**
     * SELECT count(*) FROM `user`;
     * SELECT sum(profit) FROM `result`;
     *
     * @param request
     * @param response
     */
    @RequestMapping(value = "/home", method= RequestMethod.GET)
    public void home(HttpServletRequest request, HttpServletResponse response) {
        int userTotal = userService.accountUserList();
//        int profitTotal = taskService.accountProfitTotal();

    }
}
