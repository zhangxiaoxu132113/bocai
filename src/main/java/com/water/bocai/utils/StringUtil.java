package com.water.bocai.utils;

import com.alibaba.fastjson.JSONObject;
import com.water.bocai.utils.entry.MessageStatus;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.CookieStore;
import org.apache.http.cookie.Cookie;
import sun.net.www.content.text.plain;

import java.util.*;

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

    public static Map<String, String> getHeaderMap(CookieStore cookieStore) {
        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("Accept","application/json, text/plain, */*");
        headerMap.put("Accept-Encoding","gzip, deflate, sdch, br");
        headerMap.put("Accept-Language","zh-CN,zh;q=0.8,en;q=0.6");
        headerMap.put("Connection","keep-alive");
        headerMap.put("Host","wx2.qq.com");
        headerMap.put("Referer","https://wx2.qq.com/?&lang=zh_CN");
        headerMap.put("User-Agent","Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");

//        StringBuilder cookieStr = new StringBuilder();
//        for (Cookie cookie : cookieStore.getCookies()) {
//            cookieStr.append(cookie.getName()+"=");
//            cookieStr.append(cookie.getValue()+";");
//        }
//        String cookie = cookieStr.substring(0,cookieStr.length()-1);
//        headerMap.put("Cookie",cookie);
        return headerMap;
    }
    private static float getAgencyFee(float total) {
        int flag = 2000;
        float agencyFee = 50F;
        if (total > flag) {
            agencyFee = 50 + ((total - flag) / 1000) * 50;
        }
        return agencyFee;
    }

    /**
     * 获取默认的当前页
     *
     * @param page
     * @return
     */
    public static Integer getDefaultCurrentPage(Integer page) {
        Integer currentPage = 1;
        if (page == null || page <= 0) {
            return currentPage;
        }
        return page;
    }

    /**
     * 获取默认的每页大小
     *
     * @param rows
     * @return
     */
    public static Integer getDefaultPageSize(Integer rows) {
        Integer pageSize = 20;
        if (rows == null || rows > 50) {
            return pageSize;
        }
        return rows;
    }

    /**
     * 估计关键词获取sql用的关键词值
     *
     * @param word
     * @return
     */
    public static String getSearchWordToSql(String word) {
        if (StringUtils.isNotBlank(word)) {
            String keyword = word.trim().toLowerCase();
            if (keyword.startsWith("*") && keyword.endsWith("*")) {
                keyword = keyword.replaceFirst("\\*", "");
                keyword = keyword.substring(0, keyword.lastIndexOf("*"));
                word = "LIKE \"%" + keyword + "%\"";
            } else if (keyword.startsWith("*")) {
                keyword = keyword.replaceFirst("\\*", "");
                word = "LIKE \"%" + keyword + "\"";
            } else if (keyword.endsWith("*")) {
                keyword = keyword.substring(0, keyword.lastIndexOf("*"));
                word = "LIKE \"" + keyword + "%\"";
            } else {
                word = "=\"" + keyword + "\"";
            }
        }
        return word;
    }

    /**
     * 获取excel路径
     *
     * @param name
     * @return
     */
    public static String getExcelFilePath(String des, String name) {
        StringBuilder excelFilePath = new StringBuilder();
        excelFilePath.append(des).append(name).append(Constant.FileType.TYPE_FILE_EXCEL_XLSX);
        return excelFilePath.toString();
    }

    public static void main(String[] args) {
//        int total = 2100;
//        int flag = 2000;
//        if (total < 2000) return;
//        float agencyFee = 50 + ((total - flag) / 1000)* 50;
//        System.out.println(agencyFee);
        System.out.println(getAgencyFee(56));
    }
}
