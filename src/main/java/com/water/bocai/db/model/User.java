package com.water.bocai.db.model;

import java.io.Serializable;

public class User implements Serializable {
    private String id;

    private String count;

    private String nickname;

    private Integer isVip;

    private String createOn;

    private static final long serialVersionUID = 1L;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count == null ? null : count.trim();
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    public Integer getIsVip() {
        return isVip;
    }

    public void setIsVip(Integer isVip) {
        this.isVip = isVip;
    }

    public String getCreateOn() {
        return createOn;
    }

    public void setCreateOn(String createOn) {
        this.createOn = createOn == null ? null : createOn.trim();
    }
}