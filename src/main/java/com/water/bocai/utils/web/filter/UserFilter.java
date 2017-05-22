package com.water.bocai.utils.web.filter;

import com.water.bocai.db.model.User;
import com.water.bocai.utils.MWSessionUtils;
import com.water.bocai.utils.WebUtils;
import com.water.bocai.utils.web.OperationTips;
import com.water.bocai.utils.web.ResultView;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangmiaojie on 2017/5/22.
 */
public class UserFilter implements Filter{
    /**
     * 日志工具
     */
    private static final Log logger = LogFactory.getLog(UserFilter.class);

    private String urlPattern;
    private String excludeUrlPattern;

    @Override
    public void init(FilterConfig fConfig) throws ServletException {
        urlPattern = fConfig.getInitParameter("url-pattern");
        excludeUrlPattern = fConfig.getInitParameter("exclude-url-pattern");
        if (logger.isInfoEnabled())
            logger.info("urlPattern:\t" + urlPattern);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        boolean isAllow = false;
        String errorMessage = null;
        HashMap<String, Object> map = new HashMap<String, Object>();
        String path = ((HttpServletRequest) request).getServletPath();
        HttpSession session = ((HttpServletRequest) request).getSession();
        //session1小时过期
        session.setMaxInactiveInterval(60 * 60);
        // url匹配,jsp,.do的文件需要权限校验
        if (!path.matches(urlPattern) || path.matches(excludeUrlPattern)) {
            isAllow = true;
        } else {
            User user = MWSessionUtils.getUser2Session((HttpServletRequest) request);
            if (user != null) {
                isAllow = true;
            }
        }
        if (isAllow)
            chain.doFilter(request, response);
        else {
            WebUtils.sendResult((HttpServletResponse) response, new ResultView(OperationTips.TipsCode.TIPS_FAIL, "用户未登陆状态！"));
        }
    }

    @Override
    public void destroy() {

    }
}
