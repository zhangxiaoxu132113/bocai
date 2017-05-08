package com.water.bocai.utils;

import java.util.Date;
import java.util.UUID;

/**
 * Created by mrwater on 2017/5/7.
 */
public class StringUtil {

    private StringUtil(){
    }

    /**
     * 根据红包金额最后一个数字获取点数
     * @param num
     * @return
     */
    public static int getNiuNum(float num) {
        String numStr = String.valueOf(num);
        numStr = numStr.substring(numStr.length()-1, numStr.length());
        return Integer.valueOf(numStr);
    }

    /**
     * 获取每一期的名称
     * @return
     */
    public static String getTaskName() {
        return DateUtils.DATE_FORMAT_MDHM.format(new Date());
    }

    /**
     * 获取uuid
     * @return
     */
    public static String uuid() {
        return UUID.randomUUID().toString();
    }

//    public static Integer[] transformStrArr2IntegerArr(String[] strArr) {
//
//    }

    public static void main(String[] args) {
    }
}
