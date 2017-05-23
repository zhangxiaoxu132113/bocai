package com.water.bocai.db.service.impl;

import com.alibaba.fastjson.serializer.SerializeFilter;
import com.water.bocai.db.dao.ResultMapper;
import com.water.bocai.db.dao.TaskMapper;
import com.water.bocai.db.dao.TaskUserMapper;
import com.water.bocai.db.model.Result;
import com.water.bocai.db.model.Task;
import com.water.bocai.db.model.TaskUser;
import com.water.bocai.db.model.TaskUserCriteria;
import com.water.bocai.db.service.ResultService;
import com.water.bocai.db.service.TaskService;
import com.water.bocai.utils.*;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import com.water.bocai.utils.web.dto.ResultDto;
import com.water.bocai.utils.web.dto.TaskDto;
import com.water.bocai.utils.web.dto.TaskUserDto;
import com.water.bocai.utils.web.filter.TimeFieldsFormatter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;

@Service("taskService")
public class TaskServiceImpl implements TaskService {

    @Resource
    private TaskMapper taskMapper;

    @Resource
    private TaskUserMapper taskUserMapper;

    @Resource
    private ResultMapper resultMapper;

    @Resource
    private ResultService resultService;

    public static final Set<String> GETURLTASKLIST_TIME_FORMATTER_FIELDS;

    static {
        GETURLTASKLIST_TIME_FORMATTER_FIELDS = new HashSet<String>();
        GETURLTASKLIST_TIME_FORMATTER_FIELDS.add("startTime");
        GETURLTASKLIST_TIME_FORMATTER_FIELDS.add("endTime");
        GETURLTASKLIST_TIME_FORMATTER_FIELDS.add("updateTime");
        GETURLTASKLIST_TIME_FORMATTER_FIELDS.add("finishTime");
        GETURLTASKLIST_TIME_FORMATTER_FIELDS.add("lastFinishTime");
        GETURLTASKLIST_TIME_FORMATTER_FIELDS.add("createOn");
    }

    public ResultView addTask() {
        ResultView resultView = new ResultView();
        Task task = new Task();
        task.setId(StringUtil.uuid());
        task.setName(StringUtil.getTaskName());
        task.setStatus(Constants.TASK_STATUS.RUNING.getIndex());
        task.setCreateOn(new Date());
        task.setStartTime(System.currentTimeMillis());
        if (taskMapper.insert(task) != -1) {
            resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
            TaskDto taskDto = new TaskDto();
            BeanUtils.copyProperties(task, taskDto);
            taskDto.setStatusName(Constants.TASK_STATUS.getName(taskDto.getStatus()));
            resultView.setRows(taskDto);
        } else {
            resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_FAIL);
        }
        return resultView;
    }

    @Override
    public ResultView saveTaskUser(TaskUserDto model, MultipartFile excelFile) throws IOException {
        ResultView resultView = new ResultView();
        String taskId = model.getTaskId();
        if (StringUtils.isBlank(taskId) && excelFile == null && excelFile.getSize() <= 0) {
            return new ResultView(OperationTips.TipsCode.TIPS_FAIL, OperationTips.TipsMsg.TIPS_FAIL);
        }
        //解析excel文件
        String fileName = excelFile.getOriginalFilename();
        if (!fileName.endsWith(Constant.FileType.TYPE_FILE_EXCEL_XLSX)
                && !fileName.endsWith(Constant.FileType.TYPE_FILE_EXCEL_XLSX)) {
            return new ResultView(OperationTips.TipsCode.TIPS_FAIL, OperationTips.TipsMsg.TIPS_ERROR_FILE_UPLOAD);
        }
        FileUtil.fileUpload(excelFile, Constant.webroot + Constant.UPLOAD_PATH_Zhishu, fileName);
        List<List<String>> excelData = ExcelUtil.readExcelDataToList2(Constant.webroot + Constant.UPLOAD_PATH_Zhishu, fileName);

        int insertEffectRows = 0;
        int updateEffectRows = 0;
        List<TaskUser> taskUserLlist = new ArrayList<>();
        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("taskId", taskId);
        for (List<String> list : excelData) {
            if (list != null && !list.isEmpty()) {
                boolean isExist = false;
                queryMap.put("userId", list.get(0));
                TaskUser taskUser = findTaskUser(queryMap);
                if (taskUser != null) isExist = true;
                taskUser = new TaskUser();
                taskUser.setId(StringUtil.uuid());
                taskUser.setTaskId(taskId);
                taskUser.setUserId(list.get(0));
                taskUser.setNum(Integer.valueOf((int) Float.valueOf(list.get(1)).longValue()));
                taskUser.setSum(Float.valueOf(list.get(2)));
                taskUser.setCreateOn(System.currentTimeMillis());
                taskUser.setUpdateTime(System.currentTimeMillis());

                if (isExist) {
                    taskUserMapper.updateByPrimaryKeySelective(taskUser);
                    updateEffectRows++;
                } else {
                    taskUserLlist.add(taskUser);
                }
            }
        }
        insertEffectRows = taskUserMapper.insertBatch(taskUserLlist);
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg("保存成功，本次共添加：" + insertEffectRows + "条记录,，更新" + updateEffectRows + "条记录");
        return resultView;
    }

    public TaskUser findTaskUser(Map<String, Object> queryMap) {
        TaskUserCriteria taskUserCriteria = new TaskUserCriteria();
        TaskUserCriteria.Criteria criteria = taskUserCriteria.createCriteria();
        if (queryMap != null) {
            if (queryMap.containsKey("taskId")) {
                criteria.andTaskIdEqualTo((String) queryMap.get("taskId"));
            }
            if (queryMap.containsKey("userId")) {
                criteria.andUserIdEqualTo((String) queryMap.get("userId"));
            }
        }
        List<TaskUser> taskUserList = taskUserMapper.selectByExample(taskUserCriteria);
        if (taskUserList != null && !taskUserList.isEmpty()) {
            return taskUserList.get(0);
        }
        return null;
    }

    @Override
    public ResultView getTaskUserList(Map<String, Object> queryMap) {
        TaskUserDto model = (TaskUserDto) queryMap.get("model");
        List<TaskUserDto> taskUserList = new ArrayList<>();
        if (model == null || StringUtils.isBlank(model.getTaskId())) {
            return new ResultView(OperationTips.TipsCode.TIPS_SUCCESS, OperationTips.TipsMsg.TIPS_SUCCESS, taskUserList);
        }
        if (model.getSearchType() != null && model.getSearchType() == 0 && StringUtils.isNotBlank(model.getSearchValue())) {
            model.setUserId(StringUtil.getSearchWordToSql(model.getSearchValue()));
            queryMap.put("model", model);
        } else {
            model.setNum(model.getSearchType());
            queryMap.put("model", model);
        }

        taskUserList = taskUserMapper.getTaskUserList(queryMap);
        int total = taskUserMapper.countTaskUserList(queryMap);
        if (taskUserList != null && !taskUserList.isEmpty()) {
            ResultView resultView = new ResultView();
            List<SerializeFilter> filters = new ArrayList<SerializeFilter>();
            TimeFieldsFormatter timeFieldsFormatter1 = new TimeFieldsFormatter(GETURLTASKLIST_TIME_FORMATTER_FIELDS, DateUtils.DATE_FORMAT_YMDHMS);
            filters.add(timeFieldsFormatter1);

            resultView.setTotal(total);
            resultView.setFilters(filters);
            resultView.setRows(taskUserList);
            resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
            return resultView;
        }

        return new ResultView(OperationTips.TipsCode.TIPS_SUCCESS, OperationTips.TipsMsg.TIPS_SUCCESS, taskUserList);
    }

    @Override
    public ResultView handleLotteryResult(ResultDto model) {
        ResultView resultView = new ResultView();
        resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
        String taskId = model.getTaskId();
        Integer packageNum = model.getPackageNum();
        Task task = taskMapper.selectByPrimaryKey(taskId);
        if (packageNum == null || packageNum <= 0) {
            resultView.setMsg("请输入庄家压的包位");
            return resultView;
        }
        if (StringUtils.isBlank(taskId)) {
            resultView.setMsg("参数不正确，没有传递taskid");
            return resultView;
        }
        if (task.getStatus().equals(Constants.TASK_STATUS.FINISHED)) {
            resultView.setMsg("任务已经结束，请走查询结果的通道");
            return resultView;
        }
        Map<String, Object> queryMap = new HashMap<>();
        TaskUser taskUser = new TaskUser();
        taskUser.setTaskId(model.getTaskId());
        queryMap.put("model", taskUser);
        List<TaskUserDto> taskUserList = taskUserMapper.getTaskUserList(queryMap);
        if (taskUserList != null && !taskUserList.isEmpty()) {
            Result origin_result = new Result();
            Map<String, Integer> resultMap = getResultMap(model);
            ResultDto resultDto = handleResult(model, taskUserList, packageNum, resultMap);
            BeanUtils.copyProperties(resultDto, origin_result);
            task.setStatus(Constants.TASK_STATUS.FINISHED.getIndex());
            resultMapper.insert(origin_result);
            taskMapper.updateByPrimaryKeySelective(task);

            resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
            resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
            resultView.setRows(model);
            return resultView;
        } else {

            resultView.setCode(OperationTips.TipsCode.TIPS_FAIL);
            resultView.setMsg("这一期没有用户参与！");
            return resultView;
        }
    }

    @Override
    public ResultView getTaskList(Map<String, Object> queryMap) {
        ResultView resultView = new ResultView();
        resultView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        resultView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        List<ResultDto> taskResultList = taskMapper.getTaskList(queryMap);
        Integer total = taskMapper.countTaskList(queryMap);
        resultView.setRows(taskResultList);
        resultView.setTotal(total);
        return resultView;
    }

    /**
     * 获取每一个包位的进出情况
     */
    private Map<String, Integer[]> getPackageNumsResult(Integer packageNum, Map<String, Integer> resultMap) {
        Map<String, Integer[]> dataMap = new HashMap<>();
        Integer value = resultMap.get(String.format("red%s", packageNum));
        Integer packageNumName;
        Integer[] inPackageNums = new Integer[0];
        Integer[] outPackageNums = new Integer[0];
        Integer[] tiePackageNums = new Integer[0];
        for (Map.Entry<String, Integer> entry : resultMap.entrySet()) {
            packageNumName = Integer.valueOf(entry.getKey().substring(entry.getKey().length() - 1, entry.getKey().length()));
            if (value > entry.getValue()) {
                inPackageNums = addPackageCountResult(inPackageNums, packageNumName);
            } else if (value < entry.getValue()) {
                outPackageNums = addPackageCountResult(outPackageNums, packageNumName);
            } else {
                if (value <= 5) {
                    inPackageNums = addPackageCountResult(inPackageNums, packageNumName);
                } else {
                    tiePackageNums = addPackageCountResult(tiePackageNums, packageNumName);
                }
            }
        }

        dataMap.put("inPackageNums", inPackageNums);
        dataMap.put("outPackageNums", outPackageNums);
        dataMap.put("tiePackageNums", tiePackageNums);
        return dataMap;
    }

    /**
     * 根据红包内容处理结果
     */
    private ResultDto handleResult(ResultDto model, List<TaskUserDto> taskUserList, Integer packageNum, Map<String, Integer> resultMap) {
        int sum = 0;
        int inCount = 0;
        int outCount = 0;
        int tieCount = 0;
        float total = 0F;
        float moneyIn = 0F;
        float moneyOut = 0F;
        for (TaskUserDto taskUserDto : taskUserList) {
            matchAndHandleResult(packageNum, taskUserDto, resultMap);
            taskUserMapper.updateByPrimaryKeySelective(taskUserDto);
            int status = taskUserDto.getStatus();
            if (status == Constants.RESULT_STATUS.TIE.getIndex()) {
                tieCount++;
            } else if (status == Constants.RESULT_STATUS.LOSE.getIndex()) {
                moneyIn += Math.abs(taskUserDto.getBonus());
                inCount++;
            } else {
                moneyOut += Math.abs(taskUserDto.getBonus());
                outCount++;
            }
            total += taskUserDto.getSum();
            sum++;
        }
        float agencyFee = getAgencyFee(total);
        float profit = (moneyIn + agencyFee) - moneyOut;
        Map<String, Integer[]> dataMap = getPackageNumsResult(packageNum, resultMap);
        model.setSum(sum);
        model.setInCount(inCount);
        model.setOutCount(outCount);
        model.setTieCount(tieCount);
        model.setTotal(total);
        model.setProfit(profit);
        model.setMoneyIn(moneyIn);
        model.setMoneyOut(moneyOut);
        model.setId(StringUtil.uuid());
        model.setAgencyFee(agencyFee);
        model.setInPackageNums(dataMap.get("inPackageNums"));
        model.setTiePackageNUms(dataMap.get("tiePackageNums"));
        model.setOutPackageNums(dataMap.get("outPackageNums"));
        return model;
    }

    /**
     * 计算庄家跟卖家哪个输赢
     */
    private void matchAndHandleResult(Integer bossPackageNum, TaskUserDto taskUserDto, Map<String, Integer> resultMap) {
        String formatter = "red%s";
        int bossResult = Constants.E_ODDS.getPer(resultMap.get(String.format(formatter, bossPackageNum)));
        int userResult = Constants.E_ODDS.getPer(resultMap.get(String.format(formatter, taskUserDto.getNum())));
        float indemnity = 0F;
        if (bossResult == userResult) {
            if (bossResult > 0 && bossResult <= 5) {
                indemnity = taskUserDto.getSum() * bossResult;
                taskUserDto.setStatus(Constants.RESULT_STATUS.LOSE.getIndex());
                taskUserDto.setBonus(-indemnity);
            } else {
                taskUserDto.setStatus(Constants.RESULT_STATUS.TIE.getIndex());
                taskUserDto.setBonus(0f);
            }
        } else if (bossResult < userResult) {
            indemnity = taskUserDto.getSum() * userResult;
            taskUserDto.setStatus(Constants.RESULT_STATUS.WIN.getIndex());
            taskUserDto.setBonus(indemnity);
        } else {
            indemnity = taskUserDto.getSum() * bossResult;
            taskUserDto.setStatus(Constants.RESULT_STATUS.LOSE.getIndex());
            taskUserDto.setBonus(-indemnity);
        }
    }

    /**
     * 根据红包结果转换为map
     */
    private Map<String, Integer> getResultMap(ResultDto model) {
        Map<String, Integer> resultMap = new HashMap<>();
        resultMap.put("red1", StringUtil.getNiuNum(model.getRed1()));
        resultMap.put("red2", StringUtil.getNiuNum(model.getRed2()));
        resultMap.put("red3", StringUtil.getNiuNum(model.getRed3()));
        resultMap.put("red4", StringUtil.getNiuNum(model.getRed4()));
        resultMap.put("red5", StringUtil.getNiuNum(model.getRed5()));
        resultMap.put("red6", StringUtil.getNiuNum(model.getRed6()));
        return resultMap;
    }

    /**
     * 计算中介费
     */
    private float getAgencyFee(float total) {
        int flag = 2000;
        float agencyFee = 50F;
        if (total > flag) {
            agencyFee = 50 + ((total - flag) / 1000) * 50;
        }
        return agencyFee;
    }

    private Integer[] addPackageCountResult(Integer[] oldArr, Integer value) {
        Integer[] newArr = new Integer[oldArr.length + 1];
        for (int i = 0; i < oldArr.length; i++) {
            newArr[i] = oldArr[i];
        }
        newArr[newArr.length - 1] = value;
        return newArr;
    }
}