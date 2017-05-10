package com.water.bocai.fetchWX;

import com.alibaba.fastjson.JSONObject;
import com.water.bocai.utils.HttpRequestTool;
import com.water.bocai.utils.StringUtil;
import com.water.bocai.utils.entry.MyCookie;
import com.water.bocai.utils.entry.RedirectResponseData;
import com.water.bocai.utils.entry.ResponseData;
import com.water.bocai.utils.entry.WXConstant;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.xml.sax.SAXException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * http://www.tanhao.me/talk/1466.html/
 * Created by zhangmiaojie on 2017/5/9.
 */
public class FetchWXMessage {
    private static String WINDOW_QRLOGIN_CODE = "window.QRLogin.code";
    private static String WINDOW_QRLOGIN_UUID = "window.QRLogin.uuid";
    private static String WINDOW_CODE = "window.code";
    private static String WINDOW_REDIRECT_URI = "window.redirect_uri";
    private static String UUID;

    /**
     * 获取uuid
     *
     * @return
     */
    public static String getuuid() {
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
    public static String loginWX(String uuid) throws Exception {
        String url = "https://login.weixin.qq.com/qrcode/%s?t=webwx";
        String filePath = "D:\\" + uuid + ".jpeg";
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
        return filePath;
    }

    /**
     * 检查是否已经登录
     * 返回是否登录状态码
     */
    public static Map<String, String> checkIsLogin(String uuid) {
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

    /**
     * 轮询判断是否已经登录
     * 如何登录，则返回重定向的地址
     * 如果超过60秒，则二维码失效
     */
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

    public static void initWebWXInfo(CookieStore cookieStore, Map<String, String> cookieMap, RedirectResponseData redirectResponseData) throws IOException {
        String url = "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=%s&lang=zh_CN&pass_ticket=%s";
        String r = "245987590";
        url = String.format(url, r, redirectResponseData.getPass_ticket());
        System.out.println("url1=" + url);
        JSONObject fuJsonParam = new JSONObject();
        JSONObject jsonParam = new JSONObject();
        jsonParam.put("Sid", cookieMap.get(WXConstant.WXSID));
        jsonParam.put("Uin", cookieMap.get(WXConstant.WXUIN));
        jsonParam.put("Skey", redirectResponseData.getSkey());
        jsonParam.put("Deviceid", StringUtil.getDeviceId());
        fuJsonParam.put("BaseRequest", jsonParam);
        String fuJsonParamStr = fuJsonParam.toString();
        System.out.println(fuJsonParam);
        DefaultHttpClient httpClient = new DefaultHttpClient();
        httpClient.setCookieStore(cookieStore);
        HttpPost method = new HttpPost(url);
        StringEntity entity = new StringEntity(fuJsonParamStr, "utf-8");//解决中文乱码问题
        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        method.setEntity(entity);
        HttpResponse result = httpClient.execute(method);
        String json = EntityUtils.toString(result.getEntity());
        System.out.println(json);
    }

    public static void getAllContactList(CookieStore cookieStore) {
        String url = "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact?r=" + System.currentTimeMillis();
        String htmlPage = HttpRequestTool.postRequest(url, null, null, cookieStore, null, false).getHtmlPage();
        System.out.println(htmlPage);
    }

    public static void synocheck(CookieStore cookieStore, Map<String, String> cookieMap) {
        String url = "https://webpush.wx2.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=%s&skey=%s&sid=%s&uin=%s&deviceid=%s&synckey=%s&_=%s";
        String s = System.currentTimeMillis() + "";
        String skey = "@crypt_7780a5ae_b607e488ad633df8724be9b3275f09b1";
        String sid = cookieMap.get(WXConstant.WXSID);
        String uin = cookieMap.get(WXConstant.WXUIN);
        String deviceid = StringUtil.getDeviceId();
        String synckey = "1_664368768|2_664369370|3_664369360|11_664369166|13_664330044|201_1494396758|1000_1494394202|1001_1494394232|1004_1494344568";
        String _ = System.currentTimeMillis() + "";
        url = String.format(url, s, skey, sid, uin, deviceid, synckey, _);
        String result = HttpRequestTool.getRequest(url, null, null, cookieStore, false).getHtmlPage();
        System.out.println(result);
    }

    private static RedirectResponseData getRedirectData(String hp1) {
        RedirectResponseData data = new RedirectResponseData();
        try {
            SAXReader sr = new SAXReader();
            Document doc = sr.read(new ByteArrayInputStream(hp1.getBytes("UTF-8")));
            Element rootEle = doc.getRootElement();
            Element retEle  = rootEle.element("ret");
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

    public static void main(String[] args) throws Exception {
        System.setProperty("jsse.enableSNIExtension", "false");
        String uuid = getuuid();
        loginWX(uuid);
        String redirectUri = loopCheckIsLogin(uuid)+"&fun=new&version=v2";
        ResponseData responseData = HttpRequestTool.getRequest(redirectUri, false);
        CookieStore cookieStore = responseData.getCookieStore();

        cookieStore.addCookie(new MyCookie("pgv_pvi",getWeixinCookie("")));
        cookieStore.addCookie(new MyCookie("pgv_si",getWeixinCookie("s")));


        String xmlData = responseData.getHtmlPage();
        RedirectResponseData redirectResponseData = getRedirectData(xmlData);
        System.out.println("hp = " + xmlData);
        Map<String, String> cookieMap = new HashMap<>();
        for (Cookie cookie : cookieStore.getCookies()) {
            System.out.println(cookie.getName() + " : " + cookie.getValue());
            cookieMap.put(cookie.getName(), cookie.getValue());
        }
        initWebWXInfo(cookieStore, cookieMap, redirectResponseData);
        getAllContactList(cookieStore);
        synocheck(cookieStore, cookieMap);

    }



    //(c || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10
    public static String getWeixinCookie(String d) {
        return (d != null? d : "") + (Math.round(2147483647 * Math.random()) + (new Date().getTime() % 10000000000L));
    }
}
