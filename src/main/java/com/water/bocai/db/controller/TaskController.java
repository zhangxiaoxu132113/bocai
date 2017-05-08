package com.water.bocai.db.controller;

import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.service.TaskService;
import com.water.bocai.utils.StringUtil;
import com.water.bocai.utils.WebUtils;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
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
        System.out.println("saveTaskUser");
    }

    /**
     * 获取开奖列表信息
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public void list() {

    }

    @RequestMapping(value = "/taskUserList", method = RequestMethod.POST)
    public void taskUserList(HttpServletRequest request, HttpServletResponse response,
                             @RequestBody TaskUserDto model,
                             @RequestParam(defaultValue = "1") int currentPage,
                             @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        queryMap.put("model", model);
        queryMap.put("beginIndex", begin);
        queryMap.put("pageSize", pageSize);
        queryMap.put("currentPage", currentPage);
        WebUtils.sendResult(response, taskService.getTaskUserList(queryMap));

    }

    @RequestMapping(value = "/getLotteryResults", method = RequestMethod.POST)
    public void getLotteryResults(HttpServletRequest request, HttpServletResponse response, ResultDto model) {
        WebUtils.sendResult(response,taskService.handleLotteryResult(model));
    }


}
