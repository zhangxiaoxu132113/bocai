package com.water.bocai.db.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by zhangmiaojie on 2017/5/18.
 */
@Controller
@RequestMapping(value = "/chart")
public class ChartController {
    @RequestMapping(value = "/financial", method = RequestMethod.GET)
    public ModelAndView amounts() {
        ModelAndView mav = new ModelAndView("kaijiang/chat/home");
        return mav;
    }
}
