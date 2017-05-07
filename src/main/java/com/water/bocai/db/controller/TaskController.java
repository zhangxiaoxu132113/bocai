package com.water.bocai.db.controller;

import com.water.bocai.db.service.TaskService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * Created by mrwater on 2017/5/7.
 */
@Controller
@RequestMapping({"/task","/Task"})
public class TaskController {

    @Resource
    private TaskService taskService;

    @RequestMapping("/list")
    public String list() {
        return "haha";
    }

    @RequestMapping("/startTask")
    public void startTask() {
        taskService.addTask();
    }


}
