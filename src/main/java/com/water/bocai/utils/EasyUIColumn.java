package com.water.bocai.utils;

/**
 * Created by paul on 2016/5/27.
 */
public class EasyUIColumn {
    private String id;// 用于判断是哪一列, 取数据时有用
    private String field;
    private String title;
    private String align = "center";
    private String width = "100";

    public EasyUIColumn() {
    }

    public EasyUIColumn(String id, String field, String title) {
        this.id = id;
        this.field = field;
        this.title = title;
    }

    public EasyUIColumn(String id, String field, String title, String width) {
        this.id = id;
        this.field = field;
        this.title = title;
        this.width = width;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAlign() {
        return align;
    }

    public void setAlign(String align) {
        this.align = align;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }
}
