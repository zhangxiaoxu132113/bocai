package com.water.bocai.db.controller;

import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.service.ResultService;
import com.water.bocai.db.service.TaskService;
import com.water.bocai.utils.StringUtil;
import com.water.bocai.utils.WebUtils;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.Page;
import com.water.bocai.utils.web.dto.ResultDto;
import com.water.bocai.utils.web.dto.TaskDto;
import com.water.bocai.utils.web.dto.TaskUserDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by mrwater on 2017/5/7.
 */
@Controller
@RequestMapping({"/task", "/Task"})
public class TaskController {

    @Resource
    private TaskService taskService;

    @Resource
    private ResultService resultService;

    /**
     * 开始下注
     */
    @RequestMapping(value = "/startTask", method = RequestMethod.POST)
    public void startTask(HttpServletRequest request, HttpServletResponse response) {
        WebUtils.sendResult(response, taskService.addTask());
    }

    /**
     * 保存投注信息
     */
    @RequestMapping(value = "/saveTaskUser", method = RequestMethod.POST)
    public void saveTaskUser(HttpServletRequest request, HttpServletResponse response,
                             @RequestBody(required = false) TaskUserDto model) {
        if ((model.getUsernames().length != model.getNums().length) || (model.getUsernames().length != model.getSums().length)) {
            WebUtils.sendResult(response, new ResultView(OperationTips.TipsCode.TIPS_FAIL, OperationTips.TipsMsg.TIPS_FAIL));
            return;
        }
        List<TaskUser> taskUserList = new ArrayList<TaskUser>();
        for (int i = 0; i < model.getUsernames().length; i++) {
            TaskUser taskUser = new TaskUser();
            taskUser.setId(StringUtil.uuid());
            taskUser.setUserId(model.getUsernames()[i] + "");
            taskUser.setTaskId(model.getTaskId());
            taskUser.setNum(model.getNums()[i]);
            taskUser.setSum((float) model.getSums()[i]);
            taskUser.setCreateOn(System.currentTimeMillis());
            taskUser.setUpdateTime(System.currentTimeMillis());
            taskUserList.add(taskUser);
        }
        taskService.saveTaskUser(taskUserList);
    }

    /**
     * 获取开奖列表信息
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public void taskList(HttpServletRequest request, HttpServletResponse response,
                         @RequestBody TaskDto model,
                         @RequestParam(defaultValue = "1") int currentPage,
                         @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        Page page = new Page(begin, pageSize, currentPage);
        queryMap.put("page", page);
        queryMap.put("model", model);

        WebUtils.sendResult(response, taskService.getTaskList(queryMap));
    }

    /**
     * 获取投注人的投注信息
     */
    @RequestMapping(value = "/taskUserList", method = RequestMethod.POST)
    public void taskUserList(HttpServletRequest request, HttpServletResponse response,
                             @RequestBody TaskUserDto model,
                             @RequestParam(defaultValue = "1") int currentPage,
                             @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        Page page = new Page(begin, pageSize, currentPage);
        queryMap.put("page", page);
        queryMap.put("model", model);

        WebUtils.sendResult(response, taskService.getTaskUserList(queryMap));
    }

    /**
     * 计算并获取开奖结果
     */
    @RequestMapping(value = "/getLotteryResults", method = RequestMethod.POST)
    public void getLotteryResults(HttpServletRequest request, HttpServletResponse response,
                                  @RequestBody ResultDto model) {
        WebUtils.sendResult(response, taskService.handleLotteryResult(model));
    }

    /**
     * 获取图标需要展示的数据
     */
    @RequestMapping(value = "/getChartData", method = RequestMethod.POST)
    public void getChartData(HttpServletRequest request, HttpServletResponse response,
                             @RequestBody TaskDto model,
                             @RequestParam(defaultValue = "1") int currentPage,
                             @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        Page page = new Page(begin, pageSize, currentPage);
        String endTime = request.getParameter("endTime");
        String startTime = request.getParameter("startTime");
        queryMap.put("page", page);
        queryMap.put("model", model);
        queryMap.put("endTime", endTime);
        queryMap.put("startTime", startTime);
        WebUtils.sendJson(response, resultService.getHistoryStatisticsData(queryMap));
    }
}
