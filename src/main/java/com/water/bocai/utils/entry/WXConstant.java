package com.water.bocai.utils.entry;

/**
 * Created by zhangmiaojie on 2017/5/10.
 */
public class WXConstant {
    public static String WXSID = "wxsid";
    public static String WXUIN = "wxuin";
    public static String MM_LANG = "mm_lang";
    public static String WEBWX_AUTH_TICKET = "webwx_auth_ticket";
    public static String WEBWX_DATA_TICKET = "webwx_data_ticket";
    public static String WEBWXVID = "webwxuvid";
    public static String WXLOADTIME = "wxloadtime";
    private String wxsid;
    private String wxuin;
    private String mm_lang;
    private String webwx_auth_ticket;
    private String webwx_data_ticket;
    private String webwxuvid;
    private Long wxloadtime;

    public String getWxsid() {
        return wxsid;
    }

    public void setWxsid(String wxsid) {
        this.wxsid = wxsid;
    }

    public String getWxuin() {
        return wxuin;
    }

    public void setWxuin(String wxuin) {
        this.wxuin = wxuin;
    }

    public String getMm_lang() {
        return mm_lang;
    }

    public void setMm_lang(String mm_lang) {
        this.mm_lang = mm_lang;
    }

    public String getWebwx_auth_ticket() {
        return webwx_auth_ticket;
    }

    public void setWebwx_auth_ticket(String webwx_auth_ticket) {
        this.webwx_auth_ticket = webwx_auth_ticket;
    }

    public String getWebwx_data_ticket() {
        return webwx_data_ticket;
    }

    public void setWebwx_data_ticket(String webwx_data_ticket) {
        this.webwx_data_ticket = webwx_data_ticket;
    }

    public String getWebwxuvid() {
        return webwxuvid;
    }

    public void setWebwxuvid(String webwxuvid) {
        this.webwxuvid = webwxuvid;
    }

    public Long getWxloadtime() {
        return wxloadtime;
    }

    public void setWxloadtime(Long wxloadtime) {
        this.wxloadtime = wxloadtime;
    }
}
