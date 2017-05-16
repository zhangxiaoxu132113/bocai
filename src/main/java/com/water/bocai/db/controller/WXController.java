package com.water.bocai.db.controller;

import com.alibaba.fastjson.JSONObject;
import com.water.bocai.utils.WebUtils;
import com.water.bocai.utils.WeixinHelper;
import com.water.bocai.utils.entry.MessageStatus;
import com.water.bocai.utils.entry.MyCookie;
import com.water.bocai.utils.entry.RedirectResponseData;
import com.water.bocai.utils.entry.ResponseData;
import com.water.bocai.utils.web.MapView;
import com.water.bocai.utils.web.OperationTips;
import org.apache.http.client.CookieStore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by zhangmiaojie on 2017/5/11.
 * 处理微信接口
 */
@Controller
@RequestMapping(value = "/wx")
public class WXController {

    /**
     * 请求微信登录的二维码
     */
    @RequestMapping(value = "/qrcode", method = RequestMethod.GET)
    public void getLoginQRcode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        MapView mapView = new MapView(OperationTips.TipsCode.TIPS_SUCCESS, OperationTips.TipsMsg.TIPS_SUCCESS);
        String uuid = WeixinHelper.getuuid();
        String qrCodeImgPath = WeixinHelper.getLoginQRcodeImgPath(uuid);
        mapView.putParams("qr_code_img_path", qrCodeImgPath);
        mapView.putParams("uuid", uuid);
        Thread.sleep(5000);
        WebUtils.sendJson(response, mapView.getResultMap());
    }

    @RequestMapping(value = "/checkIsLogin", method = RequestMethod.GET)
    public void checkIsLogin(HttpServletRequest request, HttpServletResponse response) {
        MapView mapView = new MapView();
        String  uuid = request.getParameter("uuid");
        String  redirect_uri = WeixinHelper.loopCheckIsLogin(uuid);
        redirect_uri +=  "&fun=new&version=v2";
        mapView.setMsg(OperationTips.TipsMsg.TIPS_SUCCESS);
        mapView.setCode(OperationTips.TipsCode.TIPS_SUCCESS);
        ResponseData responseData = WeixinHelper.visitRedirectUri(redirect_uri);
        RedirectResponseData redirectResponseData = responseData.getRedirectResponseData();
        CookieStore cookieStore = responseData.getCookieStore();
        mapView.putParams("redirectResponseData", redirectResponseData);
        mapView.putParams("cookieStore", cookieStore);
        WebUtils.sendJson(response, mapView.getResultMap());
    }

    @RequestMapping(value = "/initData", method = RequestMethod.POST)
    public void initData(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String redirect_uri = request.getParameter("redirect_uri");
        String deviceid = request.getParameter("deviceid");
        String pgv_pvi = request.getParameter("pgv_pvi");
        String pgv_si = request.getParameter("pgv_si");
        String r = request.getParameter("r");

        ResponseData responseData = WeixinHelper.visitRedirectUri(redirect_uri);
        RedirectResponseData redirectResponseData = responseData.getRedirectResponseData();
        CookieStore cookieStore = responseData.getCookieStore();
        cookieStore.addCookie(new MyCookie("pgv_pvi",pgv_pvi));
        cookieStore.addCookie(new MyCookie("pgv_si",pgv_si));

        WeixinHelper.initWebWXInfo(cookieStore, redirectResponseData, r, deviceid);
        HttpSession session = request.getSession();
        session.setAttribute("responseData", responseData);
    }

    @RequestMapping(value = "/synccheck", method = RequestMethod.POST)
    public void synccheck(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        ResponseData responseData = (ResponseData) session.getAttribute("responseData");
        String deviceid = request.getParameter("deviceid");
        MessageStatus msgStatus = WeixinHelper.sysccheck(responseData, deviceid);
        WebUtils.sendJson(response, JSONObject.toJSON(msgStatus));
    }
}
