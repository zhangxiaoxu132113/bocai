package com.water.bocai.utils.web.dto;

import com.water.bocai.db.model.Result;

/**
 * Created by zhangmiaojie on 2017/5/8.
 */
public class ResultDto extends Result {
    private String name;
    private Integer status;
    private String niuStr;
    private int inCount;
    private int outCount;
    private int tieCount;
    private int perCount;
    private Float perValue;
    private Float moneyTotal;
    private Float totalXiazhuMoney;
    private Integer[] inPackageNums;
    private Integer[] outPackageNums;
    private Integer[] tiePackageNUms;

    public Float getTotalXiazhuMoney() {
        return totalXiazhuMoney;
    }

    public void setTotalXiazhuMoney(Float totalXiazhuMoney) {
        this.totalXiazhuMoney = totalXiazhuMoney;
    }

    public Float getMoneyTotal() {
        return moneyTotal;
    }

    public void setMoneyTotal(Float moneyTotal) {
        this.moneyTotal = moneyTotal;
    }

    public String getNiuStr() {
        return niuStr;
    }

    public void setNiuStr(String niuStr) {
        this.niuStr = niuStr;
    }

    public Float getPerValue() {
        return perValue;
    }

    public void setPerValue(Float perValue) {
        this.perValue = perValue;
    }

    public int getPerCount() {
        return perCount;
    }

    public void setPerCount(int perCount) {
        this.perCount = perCount;
    }

    public int getInCount() {
        return inCount;
    }

    public void setInCount(int inCount) {
        this.inCount = inCount;
    }

    public int getOutCount() {
        return outCount;
    }

    public void setOutCount(int outCount) {
        this.outCount = outCount;
    }

    public int getTieCount() {
        return tieCount;
    }

    public void setTieCount(int tieCount) {
        this.tieCount = tieCount;
    }

    public Integer[] getInPackageNums() {
        return inPackageNums;
    }

    public void setInPackageNums(Integer[] inPackageNums) {
        this.inPackageNums = inPackageNums;
    }

    public Integer[] getOutPackageNums() {
        return outPackageNums;
    }

    public void setOutPackageNums(Integer[] outPackageNums) {
        this.outPackageNums = outPackageNums;
    }

    public Integer[] getTiePackageNUms() {
        return tiePackageNUms;
    }

    public void setTiePackageNUms(Integer[] tiePackageNUms) {
        this.tiePackageNUms = tiePackageNUms;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
