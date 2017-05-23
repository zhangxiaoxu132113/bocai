package com.water.bocai.utils.web.filter;

import com.alibaba.fastjson.serializer.ValueFilter;
import com.water.bocai.utils.DateUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Desc: 默认逻辑型统一转成 yyyy-MM-dd HH:mm:ss格式显示, 亦可传formatPattern格式显示
 * Created by paul on 2016/2/18.
 */
public class TimeFieldsFormatter implements ValueFilter {
    private SimpleDateFormat format = DateUtils.DATE_FORMAT_YMDHMS;

    private Set<String> needFormatFields = new HashSet<String>();// 需要转换的字段集合

    public TimeFieldsFormatter(Set<String> needFormatFields) {
        this.needFormatFields = needFormatFields;
    }

    public TimeFieldsFormatter(Set<String> needFormatFields, String formatPattern) {
        this.needFormatFields = needFormatFields;
        this.format = new SimpleDateFormat(formatPattern);
    }

    public TimeFieldsFormatter(Set<String> needFormatFields, SimpleDateFormat format) {
        this.needFormatFields = needFormatFields;
        this.format = format;
    }

    @Override
    public Object process(Object source, String name, Object value) {
        if (needFormatFields.contains(name)) {
            if (value instanceof Date) {
                return value == null ? "-" : format.format((Date) value);
            }
            if (value instanceof Long) {
                return value == null ? "-" : format.format(new Date(
                        (Long) value));
            }
        }

        return value;
    }

}
