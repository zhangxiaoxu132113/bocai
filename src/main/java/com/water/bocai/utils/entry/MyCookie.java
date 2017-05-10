package com.water.bocai.utils.entry;

import org.apache.http.cookie.Cookie;

import java.util.Date;

/**
 * Created by zhangmiaojie on 2017/5/10.
 */
public class MyCookie implements Cookie {
    private String name;
    private String value;
    public MyCookie(String name, String value) {
        this.name = name;
        this.value = value;
    }
    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getValue() {
        return this.value;
    }

    @Override
    public String getComment() {
        return null;
    }

    @Override
    public String getCommentURL() {
        return null;
    }

    @Override
    public Date getExpiryDate() {
        return null;
    }

    @Override
    public boolean isPersistent() {
        return false;
    }

    @Override
    public String getDomain() {
        return null;
    }

    @Override
    public String getPath() {
        return null;
    }

    @Override
    public int[] getPorts() {
        return new int[0];
    }

    @Override
    public boolean isSecure() {
        return true;
    }

    @Override
    public int getVersion() {
        return 0;
    }

    @Override
    public boolean isExpired(Date date) {
        return false;
    }
}
