package com.water.bocai.db.model;

import java.io.Serializable;

public class Result implements Serializable {
    private String id;

    private String taskId;

    private Integer packageNum;

    private Float red1;

    private Float red2;

    private Float red3;

    private Float red4;

    private Float red5;

    private Float red6;

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

    public Float getRed1() {
        return red1;
    }

    public void setRed1(Float red1) {
        this.red1 = red1;
    }

    public Float getRed2() {
        return red2;
    }

    public void setRed2(Float red2) {
        this.red2 = red2;
    }

    public Float getRed3() {
        return red3;
    }

    public void setRed3(Float red3) {
        this.red3 = red3;
    }

    public Float getRed4() {
        return red4;
    }

    public void setRed4(Float red4) {
        this.red4 = red4;
    }

    public Float getRed5() {
        return red5;
    }

    public void setRed5(Float red5) {
        this.red5 = red5;
    }

    public Float getRed6() {
        return red6;
    }

    public void setRed6(Float red6) {
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