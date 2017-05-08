package com.water.bocai.utils.web;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by paul on 2016/2/14.
 */
public class OperationTips {
    /**
     * 提示代码
     */
    public static final class TipsCode {
        public static final Integer TIPS_SUCCESS = 1; //方法操作成功，达到预期效果
        public static final Integer TIPS_FAIL = 0; //方法操作失败
        public static final Integer TIPS_MISSING_PARAMS = -1; //参数不完整或参数格式不正确

        public static final Integer TIPS_DOMAIN_EXIST = -201; //域名已存在

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(TIPS_SUCCESS);
            ALL.add(TIPS_FAIL);
            ALL.add(TIPS_MISSING_PARAMS);
        }

    }

    /**
     * 相应提示代码的提示语
     */
    public static final class TipsMsg {
        public static final String TIPS_SUCCESS = "操作成功";
        public static final String TIPS_FAIL = "操作失败";
        public static final String TIPS_MISSING_PARAMS = "参数不完整";
        public static final String TIPS_AUTH_FAIL = "身份验证失败";
        public static final String TIPS_NO_PERMISSIONS = "用户没有操作权限";
        public static final String TIPS_OP_USER_FREEZE = "被操作的用户账号被冻结";

        public static final String TIPS_BUSINESS_EXIST = "业务已存在";
        public static final String TIPS_DOMAIN_EXIST = "域名已存在";
        public static final String TIPS_ERROR_FILE_UPLOAD = "文件类型不正确"; //导入错误文档提示
        public static final String TIPS_KEYWORD_OR_SEARCH_INPUT_TIP = "导入文件第一列应为搜索词或关键词"; //导入错误文档提示

        public static final String TIPS_BAIDU_STATISTICS_RECORD_NO_EXIST = "该日期没有百度统计数据";
        public static final String TIPS_BAIDU_STATISTICS_RECORD_EXIST = "该日期有百度统计数据";
        public static final String TIPS_ROOT_EXIST = "导入的词根已存在";

    }
}
