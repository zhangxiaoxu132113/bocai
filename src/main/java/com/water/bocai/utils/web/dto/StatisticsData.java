package com.water.bocai.utils.web.dto;

/**
 * Created by zhangmiaojie on 2017/5/19.
 */
public class StatisticsData implements java.io.Serializable {
    private float touZhuTotal;
    private float profitTotal;
    private float moneyInTotal;
    private float moneyOutTotal;
    private float agencyFeeTotal;
    private String time;

    public float getAgencyFeeTotal() {
        return agencyFeeTotal;
    }

    public void setAgencyFeeTotal(float agencyFeeTotal) {
        this.agencyFeeTotal = agencyFeeTotal;
    }

    public float getTouZhuTotal() {
        return touZhuTotal;
    }

    public void setTouZhuTotal(float touZhuTotal) {
        this.touZhuTotal = touZhuTotal;
    }

    public float getProfitTotal() {
        return profitTotal;
    }

    public void setProfitTotal(float profitTotal) {
        this.profitTotal = profitTotal;
    }

    public float getMoneyInTotal() {
        return moneyInTotal;
    }

    public void setMoneyInTotal(float moneyInTotal) {
        this.moneyInTotal = moneyInTotal;
    }

    public float getMoneyOutTotal() {
        return moneyOutTotal;
    }

    public void setMoneyOutTotal(float moneyOutTotal) {
        this.moneyOutTotal = moneyOutTotal;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
