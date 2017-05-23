package com.water.bocai.db.controller;

import com.water.bocai.db.service.ResultService;
import com.water.bocai.db.service.TaskService;
import com.water.bocai.utils.StringUtil;
import com.water.bocai.utils.WebUtils;
import com.water.bocai.utils.web.dto.Page;
import com.water.bocai.utils.web.dto.ResultDto;
import com.water.bocai.utils.web.dto.TaskDto;
import com.water.bocai.utils.web.dto.TaskUserDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
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

    @RequestMapping(value = "xiazhu", method = RequestMethod.GET)
    public ModelAndView amounts() {
        ModelAndView mav = new ModelAndView("kaijiang/xiazhu/home");
        return mav;
    }

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
                             @RequestParam("excelFile") MultipartFile excelFile,
                             @RequestParam("taskId") String taskId) throws IOException {
//        if ((model.getUsernames().length != model.getNums().length) || (model.getUsernames().length != model.getSums().length)) {
//            WebUtils.sendResult(response, new ResultView(OperationTips.TipsCode.TIPS_FAIL, OperationTips.TipsMsg.TIPS_FAIL));
//            return;
//        }
//        List<TaskUser> taskUserList = new ArrayList<TaskUser>();
//        for (int i = 0; i < model.getUsernames().length; i++) {
//            TaskUser taskUser = new TaskUser();
//            taskUser.setId(StringUtil.uuid());
//            taskUser.setUserId(model.getUsernames()[i] + "");
//            taskUser.setTaskId(model.getTaskId());
//            taskUser.setNum(model.getNums()[i]);
//            taskUser.setSum((float) model.getSums()[i]);
//            taskUser.setCreateOn(System.currentTimeMillis());
//            taskUser.setUpdateTime(System.currentTimeMillis());
//            taskUserList.add(taskUser);
//        }
//        taskService.saveTaskUser(taskUserList);
        TaskUserDto model = new TaskUserDto();
        model.setTaskId(taskId);
        WebUtils.sendResult(response, taskService.saveTaskUser(model, excelFile));
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
    @RequestMapping("/taskUserList")
    public void taskUserList(HttpServletRequest request, HttpServletResponse response, TaskUserDto model, Integer page, Integer rows) {
        page = StringUtil.getDefaultCurrentPage(page);
        rows = StringUtil.getDefaultPageSize(rows);

        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("beginIndex", (page - 1) * rows);
        queryMap.put("pageSize", rows);
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
                             @RequestBody(required = false) TaskDto model,
                             @RequestParam(defaultValue = "1") int currentPage,
                             @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> queryMap = new HashMap<>();
        int begin = (currentPage - 1) * pageSize;
        Page page = new Page(begin, pageSize, currentPage);
        queryMap.put("page", page);
        queryMap.put("model", model);
        queryMap.put("endTime", model.getQueryEndTime());
        queryMap.put("startTime", model.getQueryStartTime());
        WebUtils.sendJson(response, resultService.getHistoryStatisticsData(queryMap));
    }
}
