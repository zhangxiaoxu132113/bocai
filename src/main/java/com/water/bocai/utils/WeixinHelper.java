package com.water.bocai.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.water.bocai.utils.entry.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.*;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangmiaojie on 2017/5/11.
 */
public class WeixinHelper {
    public static String WINDOW_QRLOGIN_CODE = "window.QRLogin.code";
    public static String WINDOW_QRLOGIN_UUID = "window.QRLogin.uuid";
    public static String WINDOW_CODE = "window.code";
    public static String WINDOW_REDIRECT_URI = "window.redirect_uri";
    public static String UUID;

    /**
     * 获取uuid
     *
     * @return
     */
    public static String getuuid() {
        System.setProperty("jsse.enableSNIExtension", "false");
        String url = "https://login.weixin.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=zh_CN&_=";
        url = url + System.currentTimeMillis();
        String result = HttpRequestTool.getRequest(url).getHtmlPage();
        System.out.println(result);
        String[] resultArr = result.split(";");
        Map<String, Object> resultMap = new HashMap<>();
        for (String resultStr : resultArr) {
            resultStr = resultStr.trim();
            String[] tmpArr = resultStr.split(" ");
            tmpArr[0] = tmpArr[0].trim();
            tmpArr[2] = tmpArr[2].trim().replace("\"", "");
            resultMap.put(tmpArr[0], tmpArr[2]);
        }
        String uuid = (String) resultMap.get(WINDOW_QRLOGIN_UUID);
        System.out.println(uuid);
        return uuid;
    }

    /**
     * 获取二维码图片和保存本地地址的路径
     */
    public static String getLoginQRcodeImgPath(String uuid) throws Exception {
        System.setProperty("jsse.enableSNIExtension", "false");
        String url = "https://login.weixin.qq.com/qrcode/%s?t=webwx";
        String fileName = uuid + ".jpeg";
        String webFilePath = "/upload/qrcode/";
        String filePath = "E:\\personal\\github\\v1\\bocai\\src\\main\\webapp\\upload\\qrcode\\" + fileName;
        url = String.format(url, uuid);
        URL realurl = new URL(url);

        HttpURLConnection urlConnection = (HttpURLConnection) realurl.openConnection();//链接网络图片地址
        urlConnection.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
        urlConnection.setConnectTimeout(5 * 1000);//设置请求超时为5s
        urlConnection.setReadTimeout(60 * 1000);//设置读取的超时时间为1min

        InputStream is = urlConnection.getInputStream();
        FileOutputStream fos = null;
        BufferedOutputStream bos = null;

        File saveFile = new File(filePath);
        fos = new FileOutputStream(saveFile);//输入到文件
        int line = -1;
        byte[] bs = new byte[1024]; // 1K的数据缓冲
        while ((line = is.read(bs)) != -1) {
            fos.write(bs, 0, line);
        }
        fos.flush();
        fos.close();
        is.close();
        return webFilePath + fileName;
    }

    public static Map<String, String> checkIsLogin(String uuid) {
        System.setProperty("jsse.enableSNIExtension", "false");
        String url = "https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login?loginicon=true&uuid=%s&_=%s";
        url = String.format(url, uuid, System.currentTimeMillis());
        String result = HttpRequestTool.getRequest(url).getHtmlPage();
        String[] strArr = result.split(";");
        Map<String, String> resultMap = new HashMap<>();
        for (int i = 0; i < strArr.length; i++) {
            String itemStr = strArr[i];
            String[] item = itemStr.split("=");
            if (i == 0) {
                resultMap.put(item[0], item[1]);
            } else {
                StringBuilder sb = new StringBuilder();
                for (int j = 1; j < item.length; j++) {
                    String tmpItem = item[j].replace("\"", "");
                    sb.append(tmpItem + "=");
                }
                resultMap.put(item[0].replace("\n", ""), sb.substring(0, sb.length() - 1));

            }
        }
        System.out.println(result);
        return resultMap;
    }

    public static ResponseData visitRedirectUri(String redirect_uri) {
        System.setProperty("jsse.enableSNIExtension", "false");
        ResponseData responseData = HttpRequestTool.getRequest(redirect_uri, false);
        String xmlData = responseData.getHtmlPage();
        RedirectResponseData redirectResponseData = getRedirectData(xmlData);
        responseData.setRedirectResponseData(redirectResponseData);
        return responseData;
    }

    public static String loopCheckIsLogin(String uuid) {
        System.out.println("请扫一下微信登录二维码");
        String returnStr = null;
        int retryCount = 0;
        while (true) {
            try {
                Thread.sleep(600);
                Map<String, String> resultMap = checkIsLogin(uuid);
                String window_code = resultMap.get(WINDOW_CODE);
                if (StringUtils.isNotBlank(window_code)) {
                    if (window_code.equals("408")) {
                        System.out.println("您还没有扫微信登录的二维码！");
                    } else if (window_code.equals("201")) {
                        System.out.println("您已经扫了微信二维码，请在手机点击登录按钮!");
                    } else if (window_code.equals("200")) {
                        System.out.println("正在请求重定向地址......");
                        String window_redirect_uri = (String) resultMap.get(WINDOW_REDIRECT_URI);
                        if (StringUtils.isBlank(window_redirect_uri)) {
                            System.out.println("登录异常！");
                            break;
                        } else {
                            returnStr = window_redirect_uri;
                            return returnStr;
                        }
                    }
                } else {
                    System.out.println("登录异常......");
                }
                retryCount++;
                if (retryCount == 100) {
                    System.out.println("一分钟过去，微信登录二维码失效，请重新刷新页面！");
                    break;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return returnStr;
    }


    public static void initWebWXInfo(CookieStore cookieStore,
                                     RedirectResponseData redirectResponseData,
                                     String r,
                                     String devicedId) throws IOException {
        System.setProperty("jsse.enableSNIExtension", "false");
        Map<String, String> cookieMap = tramsformCookieStore2Map(cookieStore);
        String url = "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=%s&lang=zh_CN&pass_ticket=%s";
//        String url = "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=%s";
        url = String.format(url, r, redirectResponseData.getPass_ticket());
        System.out.println("url=" + url);
        String fuJsonParamStr = "{BaseRequest:{DeviceID:\"%s\",Sid:\"%s\",Skey:\"\",Uin:\"%s\"}}";
//        String fuJsonParamStr = "{BaseRequest:{DeviceID:\"%s\",Sid:\"%s\",Skey:\"%s\",Uin:\"%s\"}}";
        fuJsonParamStr = String.format(fuJsonParamStr,
                devicedId,
                cookieMap.get(WXConstant.WXSID),
                redirectResponseData.getSkey(),
                cookieMap.get(WXConstant.WXUIN));
        System.out.println(fuJsonParamStr);
        DefaultHttpClient httpClient = new DefaultHttpClient();
        cookieStore.addCookie(new MyCookie("login_frequency", "2"));
        cookieStore.addCookie(new MyCookie("last_wxuin", cookieMap.get(WXConstant.WXUIN)));
        cookieStore.addCookie(new MyCookie("MM_WX_NOTIFY_STATE", "1"));
        cookieStore.addCookie(new MyCookie("MM_WX_SOUND_STATE", "1"));
        cookieStore.addCookie(new MyCookie("refreshTimes", "1"));
        httpClient.setCookieStore(cookieStore);
        HttpPost method = new HttpPost(url);
        Map<String, String> headerMap = StringUtil.getHeaderMap(cookieStore);
        if (headerMap != null && headerMap.entrySet().size() > 0) {
            int i = 0;
            Header[] headers = new Header[headerMap.entrySet().size()];
            for (Map.Entry<String, String> header : headerMap.entrySet()) {
                headers[i] = new BasicHeader(header.getKey(), header.getValue());
                i++;
            }
            method.setHeaders(headers);
        }
        StringEntity entity = new StringEntity(fuJsonParamStr, "utf-8");//解决中文乱码问题
        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        method.setEntity(entity);
        HttpResponse response = httpClient.execute(method);
        String json = EntityUtils.toString(response.getEntity());
        for (Header header : response.getAllHeaders()) {
            System.out.println(header.getName() + ":" + header.getValue());
        }
        System.out.println(json);
    }

    private static RedirectResponseData getRedirectData(String hp1) {
        RedirectResponseData data = new RedirectResponseData();
        try {
            SAXReader sr = new SAXReader();
            Document doc = sr.read(new ByteArrayInputStream(hp1.getBytes("UTF-8")));
            Element rootEle = doc.getRootElement();
            Element retEle = rootEle.element("ret");
            Element messageEle = rootEle.element("message");
            Element skeyEle = rootEle.element("skey");
            Element wxsidEle = rootEle.element("wxsid");
            Element wxuinEle = rootEle.element("wxuin");
            Element pass_ticketEle = rootEle.element("pass_ticket");
            Element isgrayscaleEle = rootEle.element("isgrayscale");

            data.setRet(retEle.getText());
            data.setMessage(messageEle.getText());
            data.setIsgrayscale(isgrayscaleEle.getText());
            data.setPass_ticket(pass_ticketEle.getText());
            data.setSkey(skeyEle.getText());
            data.setWxsid(wxsidEle.getText());
            data.setWxuin(wxuinEle.getText());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return data;
    }

    public static MessageStatus sysccheck(ResponseData responseData, String deviceid) {
        System.setProperty("jsse.enableSNIExtension", "false");
        String url = "https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=%s&skey=%s&sid=%s&uin=%s&deviceid=%s&synckey=%s&_=%s";
        CookieStore cookieStore = responseData.getCookieStore();
        RedirectResponseData redirectResponseData = responseData.getRedirectResponseData();
        Map<String, String> cookieMap = tramsformCookieStore2Map(cookieStore);
        Long r = System.currentTimeMillis();
        String sid = URLEncoder.encode(cookieMap.get(WXConstant.WXSID));
        String uin = cookieMap.get(WXConstant.WXUIN);
        String skey = URLEncoder.encode(redirectResponseData.getSkey());
        String synckey = URLEncoder.encode("1_664369862|2_664369928|3_664369913|11_664369823|13_664330044|201_1494493069|1000_1494492791|1001_1494480632|1004_1494344568");
        Long _ = r - 3083037;
        url = String.format(url, r, skey, sid, uin, deviceid, synckey, _);
        Map<String, String> headerMap = StringUtil.getHeaderMap(cookieStore);
        String htmlPage = HttpRequestTool.getRequest(url, null, headerMap, cookieStore, true).getHtmlPage();
        MessageStatus msgStatus = getMessageStatus(htmlPage);
        return msgStatus;
    }

    private static Map<String, String> tramsformCookieStore2Map(CookieStore cookieStore) {
        Map<String, String> cookieMap = new HashMap<>();
        for (Cookie cookie : cookieStore.getCookies()) {
            cookieMap.put(cookie.getName(), cookie.getValue());
        }
        return cookieMap;
    }

    /**
     * 获取是否有未读信息
     * window.synccheck={retcode:"0",selector:"7"}
     */
    public static MessageStatus getMessageStatus(String msgStatusStr) {
        Gson gson = new Gson();
        String json = msgStatusStr.split("=")[1];
        Type type = new TypeToken<MessageStatus>() {
        }.getType();
        MessageStatus msgStatus = gson.fromJson(json, type);
        return msgStatus;

    }

    public static void main(String[] args) {
//        System.out.println(new Date(1494495848371L));
//        System.out.println(new Date(1494492765334L));
//        System.out.println(1494495848371L - 1494492765334L);
        String result = "window.synccheck={retcode:\"0\",selector:\"7\"}";
        MessageStatus msgStatus = getMessageStatus(result);
        System.out.println(msgStatus.getRetcode() + ":" + msgStatus.getSelector());
    }
}
