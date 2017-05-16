package com.water.bocai.db.model;

import java.io.Serializable;

public class Result implements Serializable {
    private String id;

    private String taskId;

    private Integer packageNum;

    private Integer red1;

    private Integer red2;

    private Integer red3;

    private Integer red4;

    private Integer red5;

    private Integer red6;

    private Integer sum;

    private Float total;

    private Float moneyOut;

    private Float moneyIn;

    private Float agencyFee;

    private Float profit;

    private static final long serialVersionUID = 1L;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public Integer getPackageNum() {
        return packageNum;
    }

    public void setPackageNum(Integer packageNum) {
        this.packageNum = packageNum;
    }

    public Integer getRed1() {
        return red1;
    }

    public void setRed1(Integer red1) {
        this.red1 = red1;
    }

    public Integer getRed2() {
        return red2;
    }

    public void setRed2(Integer red2) {
        this.red2 = red2;
    }

    public Integer getRed3() {
        return red3;
    }

    public void setRed3(Integer red3) {
        this.red3 = red3;
    }

    public Integer getRed4() {
        return red4;
    }

    public void setRed4(Integer red4) {
        this.red4 = red4;
    }

    public Integer getRed5() {
        return red5;
    }

    public void setRed5(Integer red5) {
        this.red5 = red5;
    }

    public Integer getRed6() {
        return red6;
    }

    public void setRed6(Integer red6) {
        this.red6 = red6;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Float getMoneyOut() {
        return moneyOut;
    }

    public void setMoneyOut(Float moneyOut) {
        this.moneyOut = moneyOut;
    }

    public Float getMoneyIn() {
        return moneyIn;
    }

    public void setMoneyIn(Float moneyIn) {
        this.moneyIn = moneyIn;
    }

    public Float getAgencyFee() {
        return agencyFee;
    }

    public void setAgencyFee(Float agencyFee) {
        this.agencyFee = agencyFee;
    }

    public Float getProfit() {
        return profit;
    }

    public void setProfit(Float profit) {
        this.profit = profit;
    }
}