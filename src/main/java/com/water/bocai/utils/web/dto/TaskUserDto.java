package com.water.bocai.utils.web.dto;

import com.water.bocai.db.model.TaskUser;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by zhangmiaojie on 2017/5/8.
 */
public class TaskUserDto extends TaskUser {
    private String[] usernames;
    private Integer[] nums;
    private Integer[] sums;

    public String[] getUsernames() {
        return usernames;
    }

    public void setUsernames(String[] usernames) {
        this.usernames = usernames;
    }

    public Integer[] getNums() {
        return nums;
    }

    public void setNums(Integer[] nums) {
        this.nums = nums;
    }

    public Integer[] getSums() {
        return sums;
    }

    public void setSums(Integer[] sums) {
        this.sums = sums;
    }
}
