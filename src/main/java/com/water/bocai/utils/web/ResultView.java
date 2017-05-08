package com.water.bocai.utils.web;

import com.alibaba.fastjson.serializer.SerializeFilter;

import java.io.Serializable;
import java.util.List;

public class ResultView implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer code = 1;    // 状态码: 1-成功, -1-失败, 或者其他
    private String msg = "";    // 消息
    private long total;// 返回的总数量(easyui)
    private Object rows;// 返回的列表(easyui)
    List<SerializeFilter> filters; //序列化过滤器

    public ResultView() {

    }

    /**
     * @param code 状态码
     * @param msg  消息
     */
    public ResultView(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    /**
     * @param code 状态码
     * @param msg  消息
     * @param rows 数据
     */
    public ResultView(int code, String msg, Object rows) {
        this.code = code;
        this.msg = msg;
        this.rows = rows;
    }

    /**
     * @param code  状态码
     * @param msg   消息
     * @param total 数量
     * @param rows  数据
     */
    public ResultView(int code, String msg, long total, Object rows) {
        this.code = code;
        this.msg = msg;
        this.total = total;
        this.rows = rows;
    }


    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public Object getRows() {
        return rows;
    }

    public void setRows(Object rows) {
        this.rows = rows;
    }

    public List<SerializeFilter> getFilters() {
        return filters;
    }

    public void setFilters(List<SerializeFilter> filters) {
        this.filters = filters;
    }


}
