package com.water.bocai.utils.web.dto;

import com.water.bocai.db.model.Task;

/**
 * Created by zhangmiaojie on 2017/5/8.
 */
public class TaskDto extends Task {
    private String statusName;
    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
}
