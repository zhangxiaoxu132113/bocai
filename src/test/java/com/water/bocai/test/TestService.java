package com.water.bocai.test;

import com.water.bocai.utils.StringUtil;

/**
 * Created by mrwater on 2017/5/7.
 */
public class TestService {

    public static void main(String[] args) {
        double maifang = 1.29;
        double zhangjia = 0.48;

        int maifangInt = StringUtil.getNiuNum(maifang);
        int zhangjiaInt = StringUtil.getNiuNum(zhangjia);

        if (maifangInt == zhangjiaInt) {
            if (maifangInt >= 1 && maifangInt <= 5) {
                System.out.println("庄家赢");
            } else {
                System.out.println("平手");
            }
        }

        if (maifangInt > zhangjiaInt) {
            System.out.println("买家赢");
        } else {
            System.out.println("庄家赢");
        }
    }
}
