package com.water.bocai.fetchWX;

import com.water.bocai.utils.HttpRequestTool;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 * http://www.tanhao.me/talk/1466.html/
 * Created by zhangmiaojie on 2017/5/9.
 */
public class FetchWXMessage {
    private static String WINDOW_QRLOGIN_CODE = "window.QRLogin.code";
    private static String WINDOW_QRLOGIN_UUID = "window.QRLogin.uuid";
    private static String UUID;

    /**
     * 获取uuid
     *
     * @return
     */
    public static String getuuid() {
        String url = "https://login.weixin.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=zh_CN&_=";
        url = url + System.currentTimeMillis();
        String result = (String) HttpRequestTool.getRequest(url);
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
     * 获取二维码图片
     */
    public static String loginWX(String uuid) throws Exception {
        String url = "https://login.weixin.qq.com/qrcode/%s?t=webwx";
        String filePath = "D:\\" + uuid + ".jpeg";
        url = String.format(url, uuid);
        URL realurl = new URL(url);

        //链接网络图片地址
        HttpURLConnection urlConnection = (HttpURLConnection) realurl.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
        //设置请求超时为5s
        urlConnection.setConnectTimeout(5 * 1000);
        //设置读取的超时时间为1min
        urlConnection.setReadTimeout(60 * 1000);

        InputStream is = urlConnection.getInputStream();
        FileOutputStream fos = null;
        BufferedOutputStream bos = null;

        File saveFile = new File(filePath);
        //输入到文件
        fos = new FileOutputStream(saveFile);
        int line = -1;
        // 1K的数据缓冲
        byte[] bs = new byte[1024];
        while ((line = is.read(bs)) != -1) {
            fos.write(bs, 0, line);
        }
        fos.flush();

        return filePath;
    }

    public static String checkIsLogin(String uuid) {
        String url = "https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login?loginicon=true&uuid=%s&_=%s";
        url = String.format(url, uuid, System.currentTimeMillis());
        String result = (String) HttpRequestTool.getRequest(url);
        System.out.println(result);
    }

    public static void main(String[] args) throws Exception {
        System.setProperty("jsse.enableSNIExtension", "false");
        String uuid = getuuid();
        loginWX(uuid);
        int retryCount = 0;
        while (true) {
            Thread.sleep(1000);
            checkIsLogin(uuid);
            retryCount++;
            if (retryCount == 100) {
                break;
            }
        }
        System.out.println("over!");

    }
}
