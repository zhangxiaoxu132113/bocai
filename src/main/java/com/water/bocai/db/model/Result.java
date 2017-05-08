package com.water.bocai.db.model;

import java.io.Serializable;

public class Result implements Serializable {
    private String id;

    private String taskId;

    private Float red1;

    private Float red2;

    private Float red3;

    private Float red4;

    private Float red5;

    private Float red6;

    private static final long serialVersionUID = 1L;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public Float getRed1() {
        return red1;
    }

    public void setRed1(Float red1) {
        this.red1 = red1;
    }

    public Float getRed2() {
        return red2;
    }

    public void setRed2(Float red2) {
        this.red2 = red2;
    }

    public Float getRed3() {
        return red3;
    }

    public void setRed3(Float red3) {
        this.red3 = red3;
    }

    public Float getRed4() {
        return red4;
    }

    public void setRed4(Float red4) {
        this.red4 = red4;
    }

    public Float getRed5() {
        return red5;
    }

    public void setRed5(Float red5) {
        this.red5 = red5;
    }

    public Float getRed6() {
        return red6;
    }

    public void setRed6(Float red6) {
        this.red6 = red6;
    }
}