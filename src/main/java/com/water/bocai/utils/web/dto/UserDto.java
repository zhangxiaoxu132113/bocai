package com.water.bocai.utils.web.dto;

import com.water.bocai.db.model.User;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * Created by zhangmiaojie on 2017/5/22.
 */
public class UserDto extends User {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String queryEndTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String queryStartTime;

    public String getQueryEndTime() {
        return queryEndTime;
    }

    public void setQueryEndTime(String queryEndTime) {
        this.queryEndTime = queryEndTime;
    }

    public String getQueryStartTime() {
        return queryStartTime;
    }

    public void setQueryStartTime(String queryStartTime) {
        this.queryStartTime = queryStartTime;
    }
}
