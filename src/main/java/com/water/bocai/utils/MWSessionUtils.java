package com.water.bocai.utils;

import com.water.bocai.db.model.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by mrwater on 16/6/4.
 */
public class MWSessionUtils {
    public static String GLOBAL_USER = "global_user";

    private MWSessionUtils() {
    }

    /**
     * @param request
     * @param user
     * @description 添加用户对象到session中
     * @time 2016-06-04
     */
    public static void addUser2Session(HttpServletRequest request, User user) {
        HttpSession session = request.getSession();
        session.setAttribute(GLOBAL_USER, user);
    }

    public static User getUser2Session(HttpServletRequest request) {
        return (User) request.getSession().getAttribute(GLOBAL_USER);
    }

}
