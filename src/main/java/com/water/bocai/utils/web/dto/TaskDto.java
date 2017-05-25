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
    private String startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String endDate;

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
