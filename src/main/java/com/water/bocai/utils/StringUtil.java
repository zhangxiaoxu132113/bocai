package com.water.bocai.utils;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

/**
 * Created by mrwater on 2017/5/7.
 */
public class StringUtil {

    private StringUtil(){
    }

    /**
     * 根据红包金额最后一个数字获取点数
     */
    public static int getNiuNum(float num) {
        String numStr = String.valueOf(num);
        numStr = numStr.substring(numStr.length()-1, numStr.length());
        return Integer.valueOf(numStr);
    }

    /**
     * 获取每一期的名称
     */
    public static String getTaskName() {
        return DateUtils.DATE_FORMAT_MDHM.format(new Date());
    }

    /**
     * 获取uuid
     */
    public static String uuid() {
        return UUID.randomUUID().toString();
    }

    /**
     * 生产deviceid
     */
    public static String getDeviceId() {
        String deviceId = "e"+getFixLenthString(6)+getFixLenthString(6)+getFixLenthString(3);
        return deviceId;
    }

    private static String getFixLenthString(int strLength) {
        Random rm = new Random();
        double pross = (1 + rm.nextDouble()) * Math.pow(10, strLength);// 获得随机数
        String fixLenthString = String.valueOf(pross);// 将获得的获得随机数转化为字符串
        return fixLenthString.substring(1, strLength + 1);// 返回固定的长度的随机数
    }

    public static void main(String[] args) {
        getDeviceId();
    }
}
