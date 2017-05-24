package com.water.bocai.utils;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Properties;
import java.util.Set;

/**
 * 各种类型参数定义的枚举类型或者常量类
 * Created by paul on 2016/2/18.
 */
public class Constant {
    public static int QUERY_PER = 1000;// 每次查询数据库的条数

    public static int INSERT_PER = 1000;// 每次插入数据库的条数

    public static int INSERT_AGGS_PER = 1000000;// 每次插入数据库的条数

    public static final int CRAW_NUM = 50;// 搜索引擎抓取的条数

    public static final int KEYWORD_MAX_LENGTH = 100;// 关键词最大的长度

    public static final long ONE_DAY = 24 * 60 * 60 * 1000;// 一天

    public static final int KEYWORD_COUNT_EXPIRE_TIME = 48 * 60 * 60;// 关键词列表过期时间(秒) 2天

    public static final int COUNT_SEO_ROOT_KEYWORD = 15 * 60 * 1000;// seo词根匹配关键词运行过期时间 15分钟

    public static final int ES_MAX_PAGE_SIZE = 5000;// 每次查询es时最大的可获取数量

    public static final int MAX_EXPORT_EXCEL_SHEET_COUNT = 50000;// excel中的每个sheet最大数量

    public static final int MAX_EXPORT_COUNT = 50000;// 最大可导出的数量

    public static final int MAX_KEYWORD_TO_DICTIONARY_COUNT = 50000;// 关键词最大可转为词表的数量

    public static final String TASK_EXPORT_PATH = "/out/task/";// 抓取导出的目录

    public static final String ZHANNEI_TASK_EXPORT_PATH = "/out/zhannei/";// 抓取导出的目录

    public static final String CSV_EXPORT_PATH = "/out/csv/";// 任务csv导出的目录

    public static final String TEMP_EXPORT_PATH = "/out/temp/";// 临时导出的目录

    public static final String STATISTICS_EXPORT_PATH = "/out/statistics/";// 统计导出的目录

    public static final String STATISTICS_URL_EXPORT_PATH = "/out/statistics/url/";// 抓取导出的目录

    public static final String STATISTICS_INDEXES_EXPORT_PATH = "/out/statistics/indexes/";// 收录检索导出的目录

    public static final String STATISTICS_RANK_PV_EXPORT_PATH = "/out/statistics/rankpv/";// 收录检索导出的目录

    public static final String ROOT_EXPORT_PATH = "/out/temp/root/";// 词根导出的目录

    public static final String UPLOAD_PATH_BAIDU = "/upload/baidu/";// 百度统计上传的目录

    public static final String UPLOAD_PATH_KEYWORDS = "/upload/keywords/";// 关键词文本上传的目录

    public static final String UPLOAD_PATH_SEO_KEYWORDS = "/upload/seokeywords/";// seo关键词文本上传的目录

    public static final String UPLOAD_PATH_KEYWORDS_REMARK = "/upload/keywords/remark/";// 关键词备注文本上传的目录

    public static final String UPLOAD_PATH_ROOT = "/upload/root/";// 词根上传的目录

    public static final String UPLOAD_PATH_Header = "/upload/header/";// 词根上传的目录

    public static final String UPLOAD_PATH_Zhishu = "/upload/zhishu/";// 词根上传的目录

    public static final String COLUMN = "column_";// 数据列

    public static final String URL = "_url";// 抓取到的url, 业务不同, url对应的也不同

    public static final String KEYWORD_DB_NAME = "kw_log";// 关键词所在的数据库

    public static final String KEYWORD_RESULT_TABLE_PREFIX = "kw_keyword_result_";// 关键词结果抓取保存的表名前缀

    public static final String KEYWORD_AGG_TABLE_PREFIX = "kw_keyword_agg_";// 聚合特征关键词结果抓取保存的表名前缀

    // 需要格式化的字段
    public static final String ADMIN = "admin";// 性别：0-否，1-是
    public static final String ENABLED = "enabled";// 账号状态：0-无效，1-有效

    // 判断是否(收录，检索，排名)
    public static final String IS_INDEX_YES = "是";
    public static final String IS_INDEX_NO = "否";
    public static final String IS_INCLUDE_YES = "是";
    public static final String IS_INCLUDE_NO = "否";
    public static final Integer IS_RANK_YES = 1; //是
    public static final Integer IS_RANK_NO = 0;  //否

    // 默认搜索引擎ID
    public static final String DEFAULT_SEARCH_ENGINE_BAIDU = "1";

    public static final Set<String> GENERAL_TIME_FORMATTER_FIELDS;

    public static final String QUEUE_SERVERS = "queue-server-01:6379|queue-server-02:6379";
    public static final String CACHE_SERVERS = "cache-server-01:6379|cache-server-02:6379";
    public static final Properties DB_PROPER = new Properties();


    static {
        GENERAL_TIME_FORMATTER_FIELDS = new HashSet<String>();
        GENERAL_TIME_FORMATTER_FIELDS.add("createTime");
        GENERAL_TIME_FORMATTER_FIELDS.add("updateTime");
        GENERAL_TIME_FORMATTER_FIELDS.add("finishTime");
        GENERAL_TIME_FORMATTER_FIELDS.add("lastFinishTime");
        GENERAL_TIME_FORMATTER_FIELDS.add("lastExtractTime");
        GENERAL_TIME_FORMATTER_FIELDS.add("nowTime");
        GENERAL_TIME_FORMATTER_FIELDS.add("uploadDate");
        GENERAL_TIME_FORMATTER_FIELDS.add("uploadTime");

        //爬虫任务框架
        DB_PROPER.setProperty("DriverClass", "net.sourceforge.jtds.jdbc.Driver");
//        DB_PROPER.setProperty("DriverClass", "com.mysql.jdbc.Driver");
//        DB_PROPER.setProperty("JdbcUrl", "jdbc:mysql://121.14.241.69:3306/kw_log?useUnicode=true&characterEncoding=utf8");
        DB_PROPER.setProperty("JdbcUrl", "jdbc:mysql://163.177.48.215:3306/kw_log?useUnicode=true&characterEncoding=utf8");
        DB_PROPER.setProperty("user", "keydkien");
        DB_PROPER.setProperty("password", "ieu_87NBVijvd965wd");
        DB_PROPER.setProperty("maxIdleTime", "60");
        DB_PROPER.setProperty("initialPoolSize", "5");
        DB_PROPER.setProperty("minPoolSize", "3");
        DB_PROPER.setProperty("idleConnectionTestPeriod", "20");
        DB_PROPER.setProperty("unreturnedConnectionTimeout", "20");
        DB_PROPER.setProperty("maxPoolSize", "10");

    }

    public static final Set<String> GENERAL_FORMATTER_FIELDS;

    static {
        GENERAL_FORMATTER_FIELDS = new HashSet<String>();
        GENERAL_FORMATTER_FIELDS.add(ADMIN);
        GENERAL_FORMATTER_FIELDS.add(ENABLED);
    }

//    public static String webroot = "E:\\\\repository\\\\keyword\\\\keyword\\\\src\\\\main\\\\webapp";
    public static String webroot = "/data/jsp/data/upload";

    /**
     * 站点类型：1-内部站点，2-外部对比站点
     */
    public static class SiteType {
        public static final Integer INNER_SITE = 1;
        public static final Integer OHTER_SITE = 2;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(INNER_SITE);
            ALL.add(OHTER_SITE);
        }
    }

    /**
     * 关键词特征
     */
    public static class Task {
        public static final Integer RANK = 1;// 关键词排名
        public static final Integer ZHANNEI = 2;// 查询帖子总量
    }

    /**
     * 聚合特征词
     */
    public static enum AggTypeEnum {
        NONE(0, "普通"),
        ALL(1, "优质聚合|三甲视频"),
        AGG(2, "优质聚合"),
        VEDIO(3, "三甲视频");

        public static String getName(int index) {
            for (AggTypeEnum item : AggTypeEnum.values()) {
                if (item.getIndex() == index) {
                    return item.name;
                }
            }
            return null;
        }

        private AggTypeEnum(int index, String name) {
            this.index = index;
            this.name = name;
        }

        private int index;
        private String name;

        public int getIndex() {
            return index;
        }

        public String getName() {
            return name;
        }
    }

    /**
     * 业务层级：1-一级，2-二级
     */
    public static class BusinessType {
        public static final Integer TOP = 1;
        public static final Integer SECOND = 2;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(TOP);
            ALL.add(SECOND);
        }
    }

    /**
     * 界面 ：1-关键词，2-词表，3-备注;
     */
    public static class FaceType {
        public static final Integer KEYWORD_FACE = 1;
        public static final Integer DICTIONARY_FACE = 2;
        public static final Integer REMARK_FACE = 3;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(KEYWORD_FACE);
            ALL.add(DICTIONARY_FACE);
            ALL.add(REMARK_FACE);
        }
    }

    /**
     * 上传类型
     */
    public static class UploadType {
        public static final String KEYWORD_CSV_EXCEL_TO_ZIP = "报表zip格式上传";
        public static final String KEYWORD_REMARK_CSV_EXCEL_TO_ZIP = "关键词备注zip格式上传";
        public static final String KEYWORD_ONE_EXCEL = "excel单文件上传";
        public static final String KEYWORD_MANY_EXCEL = "excel多文件上传";

        public static final Set<String> ALL;

        static {
            ALL = new HashSet<String>();
            ALL.add(KEYWORD_CSV_EXCEL_TO_ZIP);
            ALL.add(KEYWORD_REMARK_CSV_EXCEL_TO_ZIP);
            ALL.add(KEYWORD_ONE_EXCEL);
            ALL.add(KEYWORD_MANY_EXCEL);
        }
    }

    /**
     * 队列后缀名称
     */
    public static class FunctionalModule {
        public static final String KEYWORD_URL_PC_RANK = "_pc_rank";
        public static final String KEYWORD_URL_WAP_RANK = "_wap_rank";
        public static final String KEYWORD_RANK_PV = "_keyword_rankPv";

        public static final Set<String> ALL;

        static {
            ALL = new HashSet<String>();
            ALL.add(KEYWORD_RANK_PV);
            ALL.add(KEYWORD_URL_PC_RANK);
            ALL.add(KEYWORD_URL_WAP_RANK);
        }
    }

    /**
     * 文件类型
     */
    public static class FileType {
        public static final String TYPE_FILE_ZIP = ".zip";
        public static final String TYPE_FILE_EXCEL_XLS = ".xls";
        public static final String TYPE_FILE_EXCEL_XLSX = ".xlsx";
        public static final String TYPE_FILE_CSV = ".csv";

        public static final Set<String> ALL;

        static {
            ALL = new HashSet<String>();
            ALL.add(TYPE_FILE_ZIP);
            ALL.add(TYPE_FILE_EXCEL_XLS);
            ALL.add(TYPE_FILE_EXCEL_XLSX);
            ALL.add(TYPE_FILE_CSV);
        }
    }

    /**
     * 报表显示相关字段
     */
    public static class ChartField {
        public static final String NO_DATA = "暂无数据";
        public static final String ADVANCE_ALL_COMPARE = "优于全部对手";
        public static final String ADVANCE_COMPARE = "优于";
        public static final String DATE = "日期";
        public static final String RESULT = "结果";
        public static final String KEYWORD_NUM = "关键词数";
        public static final String KEYWORD_ACTUAL_NUM = "实际爬取的关键词数";
        public static final String FINISH_PER = "完成率";

        public static final String KEYWORDNUM = "优化词数";
        public static final String CLICKNUM = "点击次数";
        public static final String PROMOTEKEYWORDNUM = "排名提升词数";
        public static final String TOPNUM = "排名进入TOP10";
        public static final String OUTNUM = "排名跌出TOP100";

        public static final String SITE_ID_SEPARATOR = "_";
        public static final String SITE_NAME_SEPARATOR_BEFORE = "(";
        public static final String SITE_NAME_SEPARATOR_MIDDLE = "-";
        public static final String SITE_NAME_SEPARATOR_END = ")";

        public static final String FIRST_INTERVAL_NUM = "1-10";// 排名1-10名区间的关键词数量
        public static final String SECOND_INTERVA_LNUM = "11-20";// 排名11-20名区间的关键词数量
        public static final String THIRD_INTERVAL_NUM = "21-30";// 排名21-30名区间的关键词数量
        public static final String FOURTH_INTERVAL_NUM = "31-40";// 排名31-40名区间的关键词数量
        public static final String FIFTH_INTERVAL_NUM = "41-50";// 排名41-50名区间的关键词数量

        public static final String DATE_COLUMN = "date";
        public static final String KEYWORD_NUM_COLUMN = "keywordNum";
        public static final String KEYWORD_ACTUAL_NUM_COLUMN = "keywordActualNum";
        public static final String FINISH_PER_COLUMN = "finishPer";
    }

    /**
     * 关键词
     */
    public static class ConditionHeader {
        public static final String KEYWORD_REMARK = "备注";
        public static final String KEYWORD = "关键词";
        public static final String KEYWORD_SEARCH = "搜索词";

        public static final Set<String> ALL;
        public static final Set<String> KEYWORDSET;

        static {
            ALL = new HashSet<String>();
            ALL.add(KEYWORD_REMARK);
            ALL.add(KEYWORD);
            ALL.add(KEYWORD_SEARCH);

            KEYWORDSET = new HashSet<String>();
            KEYWORDSET.add(KEYWORD);
            KEYWORDSET.add(KEYWORD_SEARCH);
        }
    }

    /**
     * 关键词排名状态
     */
    public static class KeywordRankStatus {
        public static final Integer ONLINE = 1;
        public static final Integer OFFLINE = 2;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(ONLINE);
            ALL.add(OFFLINE);
        }
    }

    /**
     * 初始通用动态列
     */
    public enum DynamicColumnType {
        BAIDU_URL("baidurl", "URL(百度)"),
        BAIDU_RANK("baidurank", "排名(百度)"),
        WAP_BAIDU_URL("wapbaiduurl", "URL(WAP百度)"),
        WAP_BAIDU_RANK("wapbaidurank", "排名(WAP百度)"),
        SO_URL("sourl", "URL(360SO)"),
        SO_RANK("sorank", "排名(360SO)"),
        WAP_SO_URL("wapsourl", "URL(WAP360SO)"),
        WAP_SO_RANK("wapsorank", "排名(WAP360SO)"),
        SOGOU_URL("sogouurl", "URL(搜狗)"),
        SOGOU_RANK("sogourank", "排名(搜狗)"),
        WAP_SOGOU_URL("wapsogouurl", "URL(WAP搜狗)"),
        WAP_SOGOU_RANK("wapsogourank", "排名(WAP搜狗)"),
        SM_URL("smurl", "URL(神马)"),
        SM_RANK("smrank", "排名(神马)"),
        BING_URL("bingurl", "URL(必应)"),
        BING_RANK("bingrank", "排名(必应)"),

        BAIDU_PV("baidu_pv", "浏览量(百度)"),
        BAIDU_IP("baidu_ip", "IP数(百度)"),
        BAIDU_UV("baidu_uv", "访客数(百度)"),
        BAIDU_NEW_UV_PER("baidu_new_uv_per", "新访客比率(百度)"),
        BAIDU_VC("baidu_vc", "访问次数(百度)"),
        BAIDU_BR("baidu_br", "跳出率(百度)"),
        BAIDU_CS("baidu_cs", "转化次数(百度)");

        public String type;
        private String desc;

        public static final String BAIDU_URL_TYPE = "baidurl";
        public static final String BAIDU_RANK_TYPE = "baidurank";
        public static final String WAP_BAIDU_URL_TYPE = "wapbaiduurl";
        public static final String WAP_BAIDU_RANK_TYPE = "wapbaidurank";
        public static final String SO_URL_TYPE = "sourl";
        public static final String SO_RANK_TYPE = "sorank";
        public static final String WAP_SO_URL_TYPE = "wapsourl";
        public static final String WAP_SO_RANK_TYPE = "wapsorank";
        public static final String SOGOU_URL_TYPE = "sogouurl";
        public static final String SOGOU_RANK_TYPE = "sogourank";
        public static final String WAP_SOGOU_URL_TYPE = "wapsogouurl";
        public static final String WAP_SOGOU_RANK_TYPE = "wapsogourank";
        public static final String SM_URL_TYPE = "smurl";
        public static final String SM_RANK_TYPE = "smrank";
        public static final String BING_URL_TYPE = "bingurl";
        public static final String BING_RANK_TYPE = "bingrank";

        public static final String BAIDU_PV_TYPE = "baidu_pv";
        public static final String BAIDU_IP_TYPE = "baidu_ip";
        public static final String BAIDU_UV_TYPE = "baidu_uv";
        public static final String BAIDU_NEW_UV_PER_TYPE = "baidu_new_uv_per";
        public static final String BAIDU_VC_TYPE = "baidu_vc";
        public static final String BAIDU_BR_TYPE = "baidu_br";
        public static final String BAIDU_CS_TYPE = "baidu_cs";

        public static final LinkedHashSet<String> ALL;
        public static final LinkedHashSet<String> ALL_RANK;
        public static final LinkedHashSet<String> ALL_BAIDU;

        static {
            ALL = new LinkedHashSet<String>();
            ALL_RANK = new LinkedHashSet<String>();
            ALL_BAIDU = new LinkedHashSet<String>();

            ALL.add(BAIDU_PV_TYPE);
            ALL.add(BAIDU_IP_TYPE);
            ALL.add(BAIDU_UV_TYPE);
            ALL.add(BAIDU_NEW_UV_PER_TYPE);
            ALL.add(BAIDU_VC_TYPE);
            ALL.add(BAIDU_BR_TYPE);
            ALL.add(BAIDU_CS_TYPE);

            ALL.add(BAIDU_URL_TYPE);
            ALL.add(BAIDU_RANK_TYPE);
            ALL.add(WAP_BAIDU_URL_TYPE);
            ALL.add(WAP_BAIDU_RANK_TYPE);
            ALL.add(SO_URL_TYPE);
            ALL.add(SO_RANK_TYPE);
            ALL.add(WAP_SO_URL_TYPE);
            ALL.add(WAP_SO_RANK_TYPE);
            ALL.add(SOGOU_URL_TYPE);
            ALL.add(SOGOU_RANK_TYPE);
            ALL.add(WAP_SOGOU_URL_TYPE);
            ALL.add(WAP_SOGOU_RANK_TYPE);
            ALL.add(SM_URL_TYPE);
            ALL.add(SM_RANK_TYPE);
            ALL.add(BING_URL_TYPE);
            ALL.add(BING_RANK_TYPE);

            ALL_RANK.add(BAIDU_URL_TYPE);
            ALL_RANK.add(BAIDU_RANK_TYPE);
            ALL_RANK.add(WAP_BAIDU_URL_TYPE);
            ALL_RANK.add(WAP_BAIDU_RANK_TYPE);
            ALL_RANK.add(SO_URL_TYPE);
            ALL_RANK.add(SO_RANK_TYPE);
            ALL_RANK.add(WAP_SO_URL_TYPE);
            ALL_RANK.add(WAP_SO_RANK_TYPE);
            ALL_RANK.add(SOGOU_URL_TYPE);
            ALL_RANK.add(SOGOU_RANK_TYPE);
            ALL_RANK.add(WAP_SOGOU_URL_TYPE);
            ALL_RANK.add(WAP_SOGOU_RANK_TYPE);
            ALL_RANK.add(SM_URL_TYPE);
            ALL_RANK.add(SM_RANK_TYPE);
            ALL_RANK.add(BING_URL_TYPE);
            ALL_RANK.add(BING_RANK_TYPE);

            ALL_BAIDU.add(BAIDU_PV_TYPE);
            ALL_BAIDU.add(BAIDU_IP_TYPE);
            ALL_BAIDU.add(BAIDU_UV_TYPE);
            ALL_BAIDU.add(BAIDU_NEW_UV_PER_TYPE);
            ALL_BAIDU.add(BAIDU_VC_TYPE);
            ALL_BAIDU.add(BAIDU_BR_TYPE);
            ALL_BAIDU.add(BAIDU_CS_TYPE);
        }

        private DynamicColumnType(String value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(String type) {
            for (DynamicColumnType enumType : DynamicColumnType.values()) {
                if (enumType.type.equals(type)) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 词表报表对比类型
     */
    public enum RankType {
        TOPPER(1, "首位率"), INDEXPER(2, "首页率"), NATURALINDEXPER(3, "自然首页率"),
        ADVANCE_KEYWORD(4, "优势关键词"), DISTRIBUTE_TREND(5, "分布趋势"), ADVANCE_COMPARE(6, "竞争优势");

        public int type;
        private String desc;

        public static final int TOPPER_TYPE = 1;
        public static final int INDEXPER_TYPE = 2;
        public static final int NATURALINDEXPER_TYPE = 3;
        public static final int ADVANCE_KEYWORD_TYPE = 4;
        public static final int DISTRIBUTE_TREND_TYPE = 5;
        public static final int ADVANCE_COMPARE_TYPE = 6;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(INDEXPER_TYPE);
            ALL.add(TOPPER_TYPE);
            ALL.add(NATURALINDEXPER_TYPE);
            ALL.add(ADVANCE_KEYWORD_TYPE);
            ALL.add(DISTRIBUTE_TREND_TYPE);
            ALL.add(ADVANCE_COMPARE_TYPE);
        }

        private RankType(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (RankType enumType : RankType.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 单词报表对比类型
     */
    public enum SingleRankType {
        TOPPER(1, "首页率/首位率"), ADVANCE_KEYWORD(2, "优势关键词"), ADVANCE_COMPARE(3, "竞争优势");

        public int type;
        private String desc;

        public static final int TOPPER_TYPE = 1;
        public static final int ADVANCE_KEYWORD_TYPE = 2;
        public static final int ADVANCE_COMPARE_TYPE = 3;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(TOPPER_TYPE);
            ALL.add(ADVANCE_KEYWORD_TYPE);
            ALL.add(ADVANCE_COMPARE_TYPE);
        }

        private SingleRankType(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (SingleRankType enumType : SingleRankType.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 任务类型
     */
    public enum TaskType {
        DAILY(1, "监控"), DISPOSABLE(2, "单次");

        public int type;
        private String desc;

        public static final Integer DAILY_TYPE = 1;
        public static final Integer DISPOSABLE_TYPE = 2;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(DAILY_TYPE);
            ALL.add(DISPOSABLE_TYPE);
        }

        private TaskType(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (TaskType enumType : TaskType.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 关键词特征
     */
    public enum KeywordSpecial {
        ALADDIN(1, "阿拉丁"), BAIKE(2, "百科");

        public int type;
        private String desc;

        public static final Integer ALADDIN_TYPE = 1;
        public static final Integer BAIKE_TYPE = 2;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(ALADDIN_TYPE);
            ALL.add(BAIKE_TYPE);
        }

        private KeywordSpecial(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (KeywordSpecial enumType : KeywordSpecial.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 搜索引擎类型
     */
    public enum SearchEngineType {
        PC(1, "PC"), WAP(2, "WAP"), COMMOM(3, "通用");

        public int type;
        private String desc;

        public static final Integer PC_TYPE = 1;
        public static final Integer WAP_TYPE = 2;
        public static final Integer COMMOM_TYPE = 3;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(PC_TYPE);
            ALL.add(WAP_TYPE);
            ALL.add(COMMOM_TYPE);
        }

        private SearchEngineType(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (SearchEngineType enumType : SearchEngineType.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 任务爬取类型：1-普通关键词排名，2-聚合排名
     */
    public enum TaskCrawlerType {
        NORMAL_RANK(1, "普通关键词排名"),
        AGG(2, "聚合排名");

        public int type;
        private String desc;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<>();
            ALL.add(NORMAL_RANK.type);
            ALL.add(AGG.type);
        }

        TaskCrawlerType(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (TaskCrawlerType enumType : TaskCrawlerType.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 任务状态
     */
    public enum TaskStatus {
        EREXCEPTION(-3, "异常"),
        DEL(-2, "已取消"),
        READY(0, "等待中"),
        RUN(1, "爬取中"),
        FINISH(2, "完成");

        public int type;
        private String desc;

        public static final Integer EREXCEPTION_STATUS = -3;
        public static final Integer DEL_STATUS = -2;
        public static final Integer READY_STATUS = 0;
        public static final Integer RUN_STATUS = 1;
        public static final Integer FINISH_STATUS = 2;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(EREXCEPTION_STATUS);
            ALL.add(DEL_STATUS);
            ALL.add(READY_STATUS);
            ALL.add(RUN_STATUS);
            ALL.add(FINISH_STATUS);
        }

        private TaskStatus(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (TaskStatus enumType : TaskStatus.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }

    /**
     * 比较类型
     */
    public enum CompareType {
        LT(-2, "低于"), EQ(0, "相等"), GT(1, "高于");

        public int type;
        private String desc;

        public static final Integer LT_STATUS = -2;
        public static final Integer EQ_STATUS = 0;
        public static final Integer GT_STATUS = 1;

        public static final Set<Integer> ALL;

        static {
            ALL = new HashSet<Integer>();
            ALL.add(LT_STATUS);
            ALL.add(EQ_STATUS);
            ALL.add(GT_STATUS);
        }

        private CompareType(int value, String desc) {
            this.type = value;
            this.desc = desc;
        }

        public String getDesc() {
            return desc;
        }

        public static String getDesc(int type) {
            for (CompareType enumType : CompareType.values()) {
                if (enumType.type == type) {
                    return enumType.getDesc();
                }
            }
            return null;
        }
    }
}
