package com.water.bocai.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.*;
import com.water.bocai.utils.web.ResultView;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

/**
 * Created by paul on 2016/2/2.
 */
public class WebUtils {

    protected static final Log log = LogFactory.getLog(WebUtils.class);

    protected static final String ENCODEING_UTF8 = "UTF-8";

    protected static final String CONTENTTYPE_TEXT = "text/plain";
    protected static final String CONTENTTYPE_HTML = "text/html";
    protected static final String CONTENTTYPE_XML = "text/xml";
    protected static final String CONTENTTYPE_JSON = "text/html";//"application/json";

    /**
     * 把字符串传给页面
     *
     * @param response
     * @param str
     */
    public static void sendString(HttpServletResponse response, String str) {
        print(response, null, CONTENTTYPE_HTML, str);
    }

    /**
     * 把xml字符传给页面
     *
     * @param response
     * @param xml
     */
    public static void sendXml(HttpServletResponse response, String xml) {
        Document document = null;
        try {
            document = DocumentHelper.parseText(xml.toString());
            print(response, null, CONTENTTYPE_XML, document.asXML());
        } catch (DocumentException e) {
            log.error("XML转Document对象出错：" + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 将str字符串返回json
     *
     * @param response
     * @param str
     */
    public static void sendJson(HttpServletResponse response, String str) {
        sendJson(response, str, null);
    }

    public static void sendJson(HttpServletResponse response, String str, List<SerializeFilter> filters) {
        JSONSerializer jser = new JSONSerializer();
        addJosnFilter(jser, filters);
        jser.write(JSONArray.parse(str));
        print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, jser.toString());
    }

    public static void sendJson(HttpServletResponse response, List<?> list) {
        sendJson(response, list, null);
    }

    public static void sendJson(HttpServletResponse response, List<?> list, List<SerializeFilter> filters) {
        JSONSerializer jser = new JSONSerializer();
        addJosnFilter(jser, filters);
        jser.write(list);
        print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, jser.toString());
    }

    public static void sendJson(HttpServletResponse response, Map<String, Object> map) {
        sendJson(response, map, null);
    }

    public static void sendJson(HttpServletResponse response, Map<String, Object> map, List<SerializeFilter> filters) {
        JSONSerializer jser = new JSONSerializer();
        addJosnFilter(jser, filters);
        jser.write(map);
        print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, jser.toString());
    }

    public static void sendJson(HttpServletResponse response, Object obj) {
        JSONSerializer jser = new JSONSerializer();
        addJosnFilter(jser, null);
        jser.write(obj);
        print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, jser.toString());
    }

    public static void sendJson(HttpServletResponse response, Object obj, List<SerializeFilter> filters) {
        JSONSerializer jser = new JSONSerializer();
        addJosnFilter(jser, filters);
        jser.write(obj);
        print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, jser.toString());
    }

    /**
     * 返回msg消息JSON数据
     *
     * @param response
     * @param resultView
     */
    public static void sendResult(HttpServletResponse response, ResultView resultView) {
        JSONSerializer jser = null;

        if (resultView != null) {
            // 1.过滤data部分
            Object data = resultView.getRows();
            if (data != null) {
                jser = new JSONSerializer();
                addJosnFilter(jser, resultView.getFilters()); // 加入过滤器
                jser.write(data);
                resultView.setRows(JSONObject.parse(jser.toString()));
            }
            // 2.不管data是否过滤,清空过滤器
            resultView.setFilters(null); // 清空过滤器

            // 3.重新创建jser,过滤resultView
            jser = new JSONSerializer();
            jser.write(resultView);
            print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, jser.toString());
        }
        print(response, ENCODEING_UTF8, CONTENTTYPE_JSON, "");
    }

    /**
     * 输出字符串回页面
     *
     * @param response
     * @param charset
     * @param contentType
     * @param str
     */
    public static void print(HttpServletResponse response, String charset, String contentType, String str) {
        // 使用默认字符串
        if (StringUtils.isBlank(charset)) {
            charset = ENCODEING_UTF8;
        }
        // 使用文本渲染
        if (StringUtils.isBlank(contentType)) {
            contentType = CONTENTTYPE_TEXT;
        }
        try {
            response.setCharacterEncoding(charset);
            response.setContentType(contentType);
            PrintWriter out = response.getWriter();
            out.print(str);
            out.flush();
            out.close();
        } catch (IOException ioe) {
            log.debug("------------------------------------------------------------------------------------------------------------------");
            log.error("返回结果失败：" + ioe.getMessage());
            log.debug("------------------------------------------------------------------------------------------------------------------");
            ioe.printStackTrace();
        }
    }

    /**
     * 向JSON序列化对象添加过滤器
     *
     * @param jser
     * @param filters
     */
    private static void addJosnFilter(JSONSerializer jser, List<SerializeFilter> filters) {
        if (filters != null && filters.size() > 0) {
            for (SerializeFilter filter : filters) {
                // 值过滤
                if (filter instanceof ValueFilter) {
                    jser.getValueFilters().add((ValueFilter) filter);
                }
                // 名称过滤
                else if (filter instanceof NameFilter) {
                    jser.getNameFilters().add((NameFilter) filter);
                }
                //
                else if (filter instanceof PropertyFilter) {
                    jser.getPropertyFilters().add((PropertyFilter) filter);
                }
                //
                else if (filter instanceof PropertyPreFilter) {
                    jser.getPropertyPreFilters().add((PropertyPreFilter) filter);
                }
            }
        }
        // 禁止循环引用检测
        jser.config(SerializerFeature.DisableCircularReferenceDetect, true);
    }

}
