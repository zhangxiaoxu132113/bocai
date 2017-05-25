package com.water.bocai.utils.web.dto;

/**
 * Created by zhangmiaojie on 2017/5/25.
 */
public class StatisticsUserData {
    private String time;
    private Float totalProfit;
    private Float totalMoeny;
    private Float avgMoney;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Float getTotalProfit() {
        return totalProfit;
    }

    public void setTotalProfit(Float totalProfit) {
        this.totalProfit = totalProfit;
    }

    public Float getTotalMoeny() {
        return totalMoeny;
    }

    public void setTotalMoeny(Float totalMoeny) {
        this.totalMoeny = totalMoeny;
    }

    public Float getAvgMoney() {
        return avgMoney;
    }

    public void setAvgMoney(Float avgMoney) {
        this.avgMoney = avgMoney;
    }
}
