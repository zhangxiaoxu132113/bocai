package com.water.bocai.db.controller;

import com.water.bocai.db.service.TaskService;
import com.water.bocai.db.service.UserService;
import net.health.fw.util.JsonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;

/**
 * Created by mrwater on 2017/5/7.
 */
@Controller
public class ViewDispater {
    @Resource
    private UserService userService;

    @Resource
    private TaskService taskService;

    @RequestMapping("/")
    public String index() {
        return "/index";
    }

    /**
     * SELECT count(*) FROM `user`;
     * SELECT sum(profit) FROM `result`;
     *
     * @param request
     * @param response
     */
    /**
     * 主页面
     *
     * @return
     * @throws java.io.UnsupportedEncodingException
     */
    @SuppressWarnings({"unchecked"})
    @RequestMapping("/home")
    public String home(HttpServletRequest req, HttpSession session)
            throws UnsupportedEncodingException {
        String newMenus =
                "[" +
                        "{menus:[" +
                        "{'menuname':'报表导入','url':'task/xiazhu.do','menuid':'1','icon':'sys'}," +
                        "{'menuname':'长尾词挖掘','url':'seo/excavate.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'搜索词多维查询','url':'seo/search.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'词库维护','url':'seo/maintenance.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'多级词根','url':'seo/root.do','menuid':'2','icon':'sys'}]," +
                        "'menuname':'搜索词库','icon':'icon-filecl'}" +
                        ",{menus:[" +
                        "{'menuname':'词表创建','url':'dictionary/home.do','menuid':'2','icon':'sys'}," +
                        "{'menuname':'词表标签','url':'label/home.do','menuid':'9','icon':'sys'}," +
                        "{'menuname':'抓取任务','url':'task/home.do','menuid':'7','icon':'sys'}]," +
                        "'menuname':'词表管理','icon':'icon-filecl'}" +
                        ",{menus:[" +
                        "{'menuname':'搜索词筛选','url':'keyword/custom.do','menuid':'7','icon':'sys'}]," +
                        "'menuname':'搜索词分析','icon':'icon-filecl'}" +
                        ",{menus:[" +
                        "{'menuname':'搜索词组合检索','url':'tools/search.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'搜索词索引量','url':'tools/zhannei.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'搜索词PV','url':'tools/keywordPvRank.do','menuid':'9','icon':'sys'}," +
                        "{'menuname':'受访页PV','url':'statistics/url.do','menuid':'1','icon':'sys'}," +
                        "{'menuname':'指数爬取','url':'tools/indexCrawl.do','menuid':'1','icon':'sys'}," +
                        "{'menuname':'受访页收录检索','url':'statistics/indexes.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'受访页排名','url':'tools/urlPvRank.do','menuid':'8','icon':'sys'}]," +
                        "'menuname':'运营辅助工具','icon':'icon-filecl'}" +
                        ",{menus:[" +
                        "{'menuname':'排名点击优化','url':'statistics/keyword.do','menuid':'1','icon':'sys'}]," +
                        "'menuname':'SEO优化工具','icon':'icon-filecl'}" +
                        ",{menus:[" +
                        "{'menuname':'词表查询','url':'dictionary/search.do','menuid':'7','icon':'sys'}]," +
                        "'menuname':'销售词表管理','icon':'icon-filecl'}" +
                        ",{menus:[" +
                        "{'menuname':'业务管理','url':'business/home.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'账户管理','url':'account/home.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'竞争对手','url':'compare/home.do','menuid':'7','icon':'sys'}," +
                        "{'menuname':'业务数据项','url':'header/home.do','menuid':'8','icon':'sys'}," +
                        "{'menuname':'日志','url':'log/home.do','menuid':'6','icon':'sys'}]," +
                        "'menuname':'业务配置','icon':'icon-filecl'}" +
                        "]";
        req.setAttribute("json", JsonUtil.toJson(newMenus));
        return "home";


    }
}
