package com.water.bocai.utils.web;

import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangmiaojie on 2016/12/30.
 */
public class MapView implements Serializable {
    private static final long serialVersionUID = 1L;

    private Map<String, Object> resultMap = new HashMap<>();

    private Integer code = 1;    // 状态码: 1-成功, -1-失败, 或者其他
    private String msg = "";    // 消息
    private long total;// 返回的总数量(easyui)
    private Object rows;// 返回的列表(easyui)

    public MapView() {
    }

    public MapView(int code, String msg) {
        setCode(code);
        setMsg(msg);
    }

    public MapView(int code, String msg, Object rows) {
        setCode(code);
        setMsg(msg);
        setRows(rows);
    }

    public Map<String, Object> getResultMap() {
        return resultMap;
    }

    public void setResultMap(Map<String, Object> resultMap) {
        this.resultMap = resultMap;
    }

    public Integer getCode() {
        return (Integer) resultMap.get("code");
    }

    public void setCode(Integer code) {
        resultMap.put("code", code);
    }

    public String getMsg() {
        return (String) resultMap.get("msg");
    }

    public void setMsg(String msg) {
        resultMap.put("msg", msg);
    }

    public long getTotal() {
        return (Long) resultMap.get("total");
    }

    public void setTotal(long total) {
        resultMap.put("total", total);
    }

    public Object getRows() {
        return resultMap.get("rows");
    }

    public void setRows(Object rows) {
        resultMap.put("rows", rows);
    }

    public void putParams(String name, Object value) {
        if (!(name instanceof String) || StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("参数不合法");
        }
        resultMap.put(name, value);
    }
}
