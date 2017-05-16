package com.water.bocai.utils.web.dto;

/**
 * Created by zhangmiaojie on 2017/5/16.
 */
public class Page {
    private Integer beginIndex;
    private Integer pageSize;
    private Integer currentPage;

    public Page(){
    }

    public Page(int beginIndex, int pageSize, int currentPage) {
        this.beginIndex = beginIndex;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
    }

    public Integer getBeginIndex() {
        return beginIndex;
    }

    public void setBeginIndex(Integer beginIndex) {
        this.beginIndex = beginIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }
}
