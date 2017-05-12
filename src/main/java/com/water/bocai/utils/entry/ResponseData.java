package com.water.bocai.utils.entry;

import com.water.bocai.utils.CookieConfig;
import org.apache.http.client.CookieStore;

/**
 * Created by zhangmiaojie on 2017/5/10.
 */
public class ResponseData {
    private String json;
    private String htmlPage;
    private int statusCode;
    private Object obj;
    private CookieStore cookieStore;
    private RedirectResponseData redirectResponseData;

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getHtmlPage() {
        return htmlPage;
    }

    public void setHtmlPage(String htmlPage) {
        this.htmlPage = htmlPage;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public CookieStore getCookieStore() {
        return cookieStore;
    }

    public void setCookieStore(CookieStore cookieStore) {
        this.cookieStore = cookieStore;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public RedirectResponseData getRedirectResponseData() {
        return redirectResponseData;
    }

    public void setRedirectResponseData(RedirectResponseData redirectResponseData) {
        this.redirectResponseData = redirectResponseData;
    }
}
