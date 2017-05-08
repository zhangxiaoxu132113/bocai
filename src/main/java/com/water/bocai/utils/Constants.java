package com.water.bocai.utils;

/**
 * Created by mrwater on 2017/5/7.
 */
public class Constants {

    public static enum RESULT_STATUS {
        LOSE(-1, "输"),
        TIE(0, "平手"),
        WIN(1, "赢");

        public static String getName(int index) {
            for (RESULT_STATUS item : RESULT_STATUS.values()) {
                if (item.getIndex() == index) {
                    return item.name;
                }
            }
            return null;
        }

        private RESULT_STATUS(int num, String name) {
            this.num = num;
            this.name = name;
        }
        private int num;
        private String name;
        public int getIndex() {
            return num;
        }
        public String getName() {
            return name;
        }
    }

    public static enum TASK_STATUS {
        FAILD(-1, "无效"),
        RUNING(0, "正在投注"),
        STOP(1, "停止投注"),
        FINISHED(2, "已结束");

        public static String getName(int index) {
            for (TASK_STATUS item : TASK_STATUS.values()) {
                if (item.getIndex() == index) {
                    return item.name;
                }
            }
            return null;
        }

        private TASK_STATUS(int num, String name) {
            this.num = num;
            this.name = name;
        }
        private int num;
        private String name;
        public int getIndex() {
            return num;
        }
        public String getName() {
            return name;
        }
    }

    //根据数字获取赔率
    public static enum E_ODDS {
        NIU_0(0, 10),
        NIU_1(1, 1),
        NIU_2(2, 2),
        NIU_3(3, 3),
        NIU_4(4, 4),
        NIU_5(5, 5),
        NIU_6(6, 6),
        NIU_7(7, 7),
        NIU_8(8, 8),
        NIU_9(9, 9);

        public static int getPer(int index) {
            for (E_ODDS item : E_ODDS.values()) {
                if (item.getIndex() == index) {
                    return item.per;
                }
            }
            throw new RuntimeException("数字不能大于10！或小于0！");
        }

        private E_ODDS(int num, int per) {
            this.num = num;
            this.per = per;
        }
        private int num;
        private int per;
        public int getIndex() {
            return num;
        }
        public int getPer() {
            return per;
        }
    }

    //根据数子获取结果名称
    public static enum E_NIU {
        NIU_0(0, "牛牛"),
        NIU_1(1, "牛一"),
        NIU_2(2, "牛二"),
        NIU_3(3, "牛三"),
        NIU_4(4, "牛四"),
        NIU_5(5, "牛五"),
        NIU_6(6, "牛六"),
        NIU_7(7, "牛七"),
        NIU_8(8, "牛八"),
        NIU_9(9, "牛九");

        public static String getName(int index) {
            for (E_NIU item : E_NIU.values()) {
                if (item.getIndex() == index) {
                    return item.name;
                }
            }
            return null;
        }

        private E_NIU(int num, String name) {
            this.num = num;
            this.name = name;
        }
        private int num;
        private String name;
        public int getIndex() {
            return num;
        }
        public String getName() {
            return name;
        }
    }
}
