package com.water.bocai.utils;

import com.water.bocai.db.model.Result;

import java.lang.reflect.Field;

/**
 * Created by zhangmiaojie on 2017/5/26.
 */
public class RefleatUtil {
    public static Object getValueByFieldName(String fieldName, Class cls, Object obj) {
        Field[] allField = cls.getDeclaredFields();
        Object value = null;
        for (Field field : allField) {
            field.setAccessible(true);
            if (field.getName().equals(fieldName)) {
                try {
                    value = field.get(obj);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
        return value;
    }

    public static void main(String[] args) {
        Result result = new Result();
        result.setId("123");
        String id = (String) getValueByFieldName("id", Result.class, result);
        System.out.println(id);
    }
}
