package com.water.bocai.utils.web.dto;

import com.water.bocai.db.model.Task;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * Created by zhangmiaojie on 2017/5/8.
 */
public class TaskDto extends Task {
    private String statusName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String queryEndTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String queryStartTime;

    public String getQueryStartTime() {
        return queryStartTime;
    }

    public void setQueryStartTime(String queryStartTime) {
        this.queryStartTime = queryStartTime;
    }

    public String getQueryEndTime() {
        return queryEndTime;
    }

    public void setQueryEndTime(String queryEndTime) {
        this.queryEndTime = queryEndTime;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
}
