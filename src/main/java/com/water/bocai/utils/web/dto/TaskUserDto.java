package com.water.bocai.utils.web.dto;

import com.water.bocai.db.model.TaskUser;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by zhangmiaojie on 2017/5/8.
 */
public class TaskUserDto extends TaskUser {
    private Integer searchType;
    private Float moneyBegin;
    private Float moneyEnd;
    private String searchValue;
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

    public Integer getSearchType() {
        return searchType;
    }

    public void setSearchType(Integer searchType) {
        this.searchType = searchType;
    }

    public String getSearchValue() {
        return searchValue;
    }

    public void setSearchValue(String searchValue) {
        this.searchValue = searchValue;
    }

    public Float getMoneyBegin() {
        return moneyBegin;
    }

    public void setMoneyBegin(Float moneyBegin) {
        this.moneyBegin = moneyBegin;
    }

    public Float getMoneyEnd() {
        return moneyEnd;
    }

    public void setMoneyEnd(Float moneyEnd) {
        this.moneyEnd = moneyEnd;
    }
}
