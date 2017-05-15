package com.water.bocai.fetchWX;

import com.water.bocai.utils.HttpRequestTool;
import com.water.bocai.utils.entry.ResponseData;

import java.net.URLEncoder;

/**
 * Created by zhangmiaojie on 2017/5/15.
 */
public class FetchWXMessagev2 {
    public static String GET_UUID_URL = "https://login.weixin.qq.com/jslogin?appid=%s&redirect_uri=%s&fun=%s&lang=%s&_=%s";

    public static void main(String[] args) {
        String appid = "wx782c26e4c19acffb";
        String redirect_uri = URLEncoder.encode("https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage");
        String fun = "new";
        String lang = "en_US";
        Long _ = System.currentTimeMillis();
        String url1 = String.format(GET_UUID_URL, appid, redirect_uri, fun, lang, _);
        ResponseData result = HttpRequestTool.getRequest(url1);
        System.out.println(result.getHtmlPage());
    }
}
