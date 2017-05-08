package com.water.bocai.db.service.impl;

import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.dao.TaskMapper;
import com.water.bocai.db.dao.TaskUserMapper;
import com.water.bocai.db.model.Task;
import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.service.TaskService;
import com.water.bocai.utils.Constants;
import com.water.bocai.utils.StringUtil;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.ResultDto;
import com.water.bocai.utils.web.dto.TaskDto;
import com.water.bocai.utils.web.dto.TaskUserDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("taskService")
public class TaskServiceImpl implements TaskService {
    @Resource
    private TaskMapper taskMapper;

    @Resource
    private TaskUserMapper taskUserMapper;

    @Resource
    private ResultMapper resultMapper;

    public ResultView addTask() {
        ResultView resultView = new ResultView();
        boolean isSuccess = false;
        Task task = new Task();
        task.setId(StringUtil.uuid());
        task.setName(StringUtil.getTaskName());
        task.setStatus(Constants.TASK_STATUS.RUNING.getIndex());
        task.setCreateOn(System.currentTimeMillis());
        task.setStartTime(System.currentTimeMillis());
        isSuccess = taskMapper.insert(task) != -1 ? true : false;
        if (isSuccess) {
            resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
            TaskDto taskDto = new TaskDto();
            BeanUtils.copyProperties(task, taskDto);
            taskDto.setStatusName(Constants.TASK_STATUS.getName(taskDto.getStatus()));
            resultView.setRows(taskDto);
        } else {
            resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_FAIL);
        }
        return resultView;
    }

    @Override
    public ResultView saveTaskUser(List<TaskUser> taskUserList) {
        ResultView resultView = null;
        if (taskUserList == null || taskUserList.size() == 0) {
            return new ResultView(OperationTips.TipsCode.TIPS_FAIL, OperationTips.TipsMsg.TIPS_FAIL);
        }
        taskUserMapper.insertBatch(taskUserList);
        return new ResultView(OperationTips.TipsCode.TIPS_SUCCESS, OperationTips.TipsMsg.TIPS_SUCCESS);
    }

    @Override
    public ResultView getTaskUserList(Map<String, Object> queryMap) {
        ResultView resultView = new ResultView();
        List<TaskUserDto> taskUserList = taskUserMapper.getTaskUserList(queryMap);
        int total = taskUserMapper.countTaskUserList(queryMap);
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        resultView.setRows(taskUserList);
        resultView.setTotal(total);
        return resultView;
    }

    @Override
    public ResultView handleLotteryResult(ResultDto model) {
        ResultView resultView = new ResultView();
        if (StringUtils.isBlank(model.getTaskId())) {
            resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
            resultView.setMsg("参数不正确，没有传递taskid");
            return resultView;
        }
        resultMapper.insert(model);
        Map<String, Object> queryMap = new HashMap<>();
        TaskUser taskUser = new TaskUser();
        taskUser.setTaskId(model.getTaskId());
        queryMap.put("model", taskUser);
        List<TaskUserDto> taskUserList = taskUserMapper.getTaskUserList(queryMap);
        TaskUserDto bossTaskUser = null;
        if (taskUserList != null && taskUserList.size() > 0) {
            for (TaskUserDto taskUserDto : taskUserList) {
                if (taskUserDto.getUserId().equals("boss")) {
                    bossTaskUser = taskUserDto;
                    taskUserList.remove(bossTaskUser);
                    break;
                }
            }
            if (bossTaskUser == null) {
                resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
                resultView.setMsg("莊家沒有選擇紅包序號！");
                return resultView;
            }
        } else {
            resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
            resultView.setMsg("此次開獎結果沒有人參與！");
            return resultView;
        }

        Map<String, Integer> resultMap = new HashMap<>();
        resultMap.put("red1", StringUtil.getNiuNum(model.getRed1()));
        resultMap.put("red2", StringUtil.getNiuNum(model.getRed2()));
        resultMap.put("red3", StringUtil.getNiuNum(model.getRed3()));
        resultMap.put("red4", StringUtil.getNiuNum(model.getRed4()));
        resultMap.put("red5", StringUtil.getNiuNum(model.getRed5()));
        resultMap.put("red6", StringUtil.getNiuNum(model.getRed6()));

        for (TaskUserDto taskUserDto : taskUserList) {
            matchAndHandleResult(bossTaskUser, taskUserDto, resultMap);
            taskUserMapper.updateByPrimaryKeySelective(taskUserDto);
        }
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        return resultView;
    }

    /**
     * 计算庄家跟卖家哪个输赢
     */
    private void matchAndHandleResult(TaskUserDto bossTaskUser, TaskUserDto taskUserDto, Map<String, Integer> resultMap) {
        String formatter = "red%s";
        int bossResult = Constants.E_ODDS.getPer(resultMap.get(String.format(formatter, bossTaskUser.getNum())));
        int userResult = Constants.E_ODDS.getPer(resultMap.get(String.format(formatter, taskUserDto.getNum())));
        if (bossResult == userResult) {
            if (bossResult > 0 && bossResult <= 5) {
                taskUserDto.setStatus(Constants.RESULT_STATUS.LOSE.getIndex());
                taskUserDto.setSum(-taskUserDto.getSum());
                System.out.println("莊家赢");
            } else {
                taskUserDto.setStatus(Constants.RESULT_STATUS.TIE.getIndex());
                taskUserDto.setSum(0f);
                System.out.println("平手");
            }
        } else if (bossResult < userResult) {
            float indemnity = taskUserDto.getSum() * userResult;
            taskUserDto.setStatus(Constants.RESULT_STATUS.WIN.getIndex());
            taskUserDto.setSum(indemnity);
        } else {
            taskUserDto.setStatus(Constants.RESULT_STATUS.LOSE.getIndex());
            taskUserDto.setSum(-taskUserDto.getSum());
            System.out.println("莊家赢");
        }
    }
}