package com.water.bocai.db.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by mrwater on 2017/5/7.
 */
@Controller
public class ViewDispater {

    @RequestMapping("/")
    public String index() {
        return "/index";
    }


}
