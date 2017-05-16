package com.water.bocai.db.model;

import java.util.ArrayList;
import java.util.List;

public class ResultCriteria {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public ResultCriteria() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(String value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(String value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(String value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(String value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(String value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(String value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLike(String value) {
            addCriterion("id like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotLike(String value) {
            addCriterion("id not like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<String> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<String> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(String value1, String value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(String value1, String value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andTaskIdIsNull() {
            addCriterion("task_id is null");
            return (Criteria) this;
        }

        public Criteria andTaskIdIsNotNull() {
            addCriterion("task_id is not null");
            return (Criteria) this;
        }

        public Criteria andTaskIdEqualTo(String value) {
            addCriterion("task_id =", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotEqualTo(String value) {
            addCriterion("task_id <>", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdGreaterThan(String value) {
            addCriterion("task_id >", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdGreaterThanOrEqualTo(String value) {
            addCriterion("task_id >=", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLessThan(String value) {
            addCriterion("task_id <", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLessThanOrEqualTo(String value) {
            addCriterion("task_id <=", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLike(String value) {
            addCriterion("task_id like", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotLike(String value) {
            addCriterion("task_id not like", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdIn(List<String> values) {
            addCriterion("task_id in", values, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotIn(List<String> values) {
            addCriterion("task_id not in", values, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdBetween(String value1, String value2) {
            addCriterion("task_id between", value1, value2, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotBetween(String value1, String value2) {
            addCriterion("task_id not between", value1, value2, "taskId");
            return (Criteria) this;
        }

        public Criteria andPackageNumIsNull() {
            addCriterion("package_num is null");
            return (Criteria) this;
        }

        public Criteria andPackageNumIsNotNull() {
            addCriterion("package_num is not null");
            return (Criteria) this;
        }

        public Criteria andPackageNumEqualTo(Integer value) {
            addCriterion("package_num =", value, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumNotEqualTo(Integer value) {
            addCriterion("package_num <>", value, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumGreaterThan(Integer value) {
            addCriterion("package_num >", value, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumGreaterThanOrEqualTo(Integer value) {
            addCriterion("package_num >=", value, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumLessThan(Integer value) {
            addCriterion("package_num <", value, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumLessThanOrEqualTo(Integer value) {
            addCriterion("package_num <=", value, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumIn(List<Integer> values) {
            addCriterion("package_num in", values, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumNotIn(List<Integer> values) {
            addCriterion("package_num not in", values, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumBetween(Integer value1, Integer value2) {
            addCriterion("package_num between", value1, value2, "packageNum");
            return (Criteria) this;
        }

        public Criteria andPackageNumNotBetween(Integer value1, Integer value2) {
            addCriterion("package_num not between", value1, value2, "packageNum");
            return (Criteria) this;
        }

        public Criteria andRed1IsNull() {
            addCriterion("red1 is null");
            return (Criteria) this;
        }

        public Criteria andRed1IsNotNull() {
            addCriterion("red1 is not null");
            return (Criteria) this;
        }

        public Criteria andRed1EqualTo(Integer value) {
            addCriterion("red1 =", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1NotEqualTo(Integer value) {
            addCriterion("red1 <>", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1GreaterThan(Integer value) {
            addCriterion("red1 >", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1GreaterThanOrEqualTo(Integer value) {
            addCriterion("red1 >=", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1LessThan(Integer value) {
            addCriterion("red1 <", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1LessThanOrEqualTo(Integer value) {
            addCriterion("red1 <=", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1In(List<Integer> values) {
            addCriterion("red1 in", values, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1NotIn(List<Integer> values) {
            addCriterion("red1 not in", values, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1Between(Integer value1, Integer value2) {
            addCriterion("red1 between", value1, value2, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1NotBetween(Integer value1, Integer value2) {
            addCriterion("red1 not between", value1, value2, "red1");
            return (Criteria) this;
        }

        public Criteria andRed2IsNull() {
            addCriterion("red2 is null");
            return (Criteria) this;
        }

        public Criteria andRed2IsNotNull() {
            addCriterion("red2 is not null");
            return (Criteria) this;
        }

        public Criteria andRed2EqualTo(Integer value) {
            addCriterion("red2 =", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2NotEqualTo(Integer value) {
            addCriterion("red2 <>", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2GreaterThan(Integer value) {
            addCriterion("red2 >", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2GreaterThanOrEqualTo(Integer value) {
            addCriterion("red2 >=", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2LessThan(Integer value) {
            addCriterion("red2 <", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2LessThanOrEqualTo(Integer value) {
            addCriterion("red2 <=", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2In(List<Integer> values) {
            addCriterion("red2 in", values, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2NotIn(List<Integer> values) {
            addCriterion("red2 not in", values, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2Between(Integer value1, Integer value2) {
            addCriterion("red2 between", value1, value2, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2NotBetween(Integer value1, Integer value2) {
            addCriterion("red2 not between", value1, value2, "red2");
            return (Criteria) this;
        }

        public Criteria andRed3IsNull() {
            addCriterion("red3 is null");
            return (Criteria) this;
        }

        public Criteria andRed3IsNotNull() {
            addCriterion("red3 is not null");
            return (Criteria) this;
        }

        public Criteria andRed3EqualTo(Integer value) {
            addCriterion("red3 =", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3NotEqualTo(Integer value) {
            addCriterion("red3 <>", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3GreaterThan(Integer value) {
            addCriterion("red3 >", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3GreaterThanOrEqualTo(Integer value) {
            addCriterion("red3 >=", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3LessThan(Integer value) {
            addCriterion("red3 <", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3LessThanOrEqualTo(Integer value) {
            addCriterion("red3 <=", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3In(List<Integer> values) {
            addCriterion("red3 in", values, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3NotIn(List<Integer> values) {
            addCriterion("red3 not in", values, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3Between(Integer value1, Integer value2) {
            addCriterion("red3 between", value1, value2, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3NotBetween(Integer value1, Integer value2) {
            addCriterion("red3 not between", value1, value2, "red3");
            return (Criteria) this;
        }

        public Criteria andRed4IsNull() {
            addCriterion("red4 is null");
            return (Criteria) this;
        }

        public Criteria andRed4IsNotNull() {
            addCriterion("red4 is not null");
            return (Criteria) this;
        }

        public Criteria andRed4EqualTo(Integer value) {
            addCriterion("red4 =", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4NotEqualTo(Integer value) {
            addCriterion("red4 <>", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4GreaterThan(Integer value) {
            addCriterion("red4 >", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4GreaterThanOrEqualTo(Integer value) {
            addCriterion("red4 >=", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4LessThan(Integer value) {
            addCriterion("red4 <", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4LessThanOrEqualTo(Integer value) {
            addCriterion("red4 <=", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4In(List<Integer> values) {
            addCriterion("red4 in", values, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4NotIn(List<Integer> values) {
            addCriterion("red4 not in", values, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4Between(Integer value1, Integer value2) {
            addCriterion("red4 between", value1, value2, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4NotBetween(Integer value1, Integer value2) {
            addCriterion("red4 not between", value1, value2, "red4");
            return (Criteria) this;
        }

        public Criteria andRed5IsNull() {
            addCriterion("red5 is null");
            return (Criteria) this;
        }

        public Criteria andRed5IsNotNull() {
            addCriterion("red5 is not null");
            return (Criteria) this;
        }

        public Criteria andRed5EqualTo(Integer value) {
            addCriterion("red5 =", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5NotEqualTo(Integer value) {
            addCriterion("red5 <>", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5GreaterThan(Integer value) {
            addCriterion("red5 >", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5GreaterThanOrEqualTo(Integer value) {
            addCriterion("red5 >=", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5LessThan(Integer value) {
            addCriterion("red5 <", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5LessThanOrEqualTo(Integer value) {
            addCriterion("red5 <=", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5In(List<Integer> values) {
            addCriterion("red5 in", values, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5NotIn(List<Integer> values) {
            addCriterion("red5 not in", values, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5Between(Integer value1, Integer value2) {
            addCriterion("red5 between", value1, value2, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5NotBetween(Integer value1, Integer value2) {
            addCriterion("red5 not between", value1, value2, "red5");
            return (Criteria) this;
        }

        public Criteria andRed6IsNull() {
            addCriterion("red6 is null");
            return (Criteria) this;
        }

        public Criteria andRed6IsNotNull() {
            addCriterion("red6 is not null");
            return (Criteria) this;
        }

        public Criteria andRed6EqualTo(Integer value) {
            addCriterion("red6 =", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6NotEqualTo(Integer value) {
            addCriterion("red6 <>", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6GreaterThan(Integer value) {
            addCriterion("red6 >", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6GreaterThanOrEqualTo(Integer value) {
            addCriterion("red6 >=", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6LessThan(Integer value) {
            addCriterion("red6 <", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6LessThanOrEqualTo(Integer value) {
            addCriterion("red6 <=", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6In(List<Integer> values) {
            addCriterion("red6 in", values, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6NotIn(List<Integer> values) {
            addCriterion("red6 not in", values, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6Between(Integer value1, Integer value2) {
            addCriterion("red6 between", value1, value2, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6NotBetween(Integer value1, Integer value2) {
            addCriterion("red6 not between", value1, value2, "red6");
            return (Criteria) this;
        }

        public Criteria andSumIsNull() {
            addCriterion("sum is null");
            return (Criteria) this;
        }

        public Criteria andSumIsNotNull() {
            addCriterion("sum is not null");
            return (Criteria) this;
        }

        public Criteria andSumEqualTo(Integer value) {
            addCriterion("sum =", value, "sum");
            return (Criteria) this;
        }

        public Criteria andSumNotEqualTo(Integer value) {
            addCriterion("sum <>", value, "sum");
            return (Criteria) this;
        }

        public Criteria andSumGreaterThan(Integer value) {
            addCriterion("sum >", value, "sum");
            return (Criteria) this;
        }

        public Criteria andSumGreaterThanOrEqualTo(Integer value) {
            addCriterion("sum >=", value, "sum");
            return (Criteria) this;
        }

        public Criteria andSumLessThan(Integer value) {
            addCriterion("sum <", value, "sum");
            return (Criteria) this;
        }

        public Criteria andSumLessThanOrEqualTo(Integer value) {
            addCriterion("sum <=", value, "sum");
            return (Criteria) this;
        }

        public Criteria andSumIn(List<Integer> values) {
            addCriterion("sum in", values, "sum");
            return (Criteria) this;
        }

        public Criteria andSumNotIn(List<Integer> values) {
            addCriterion("sum not in", values, "sum");
            return (Criteria) this;
        }

        public Criteria andSumBetween(Integer value1, Integer value2) {
            addCriterion("sum between", value1, value2, "sum");
            return (Criteria) this;
        }

        public Criteria andSumNotBetween(Integer value1, Integer value2) {
            addCriterion("sum not between", value1, value2, "sum");
            return (Criteria) this;
        }

        public Criteria andTotalIsNull() {
            addCriterion("total is null");
            return (Criteria) this;
        }

        public Criteria andTotalIsNotNull() {
            addCriterion("total is not null");
            return (Criteria) this;
        }

        public Criteria andTotalEqualTo(Float value) {
            addCriterion("total =", value, "total");
            return (Criteria) this;
        }

        public Criteria andTotalNotEqualTo(Float value) {
            addCriterion("total <>", value, "total");
            return (Criteria) this;
        }

        public Criteria andTotalGreaterThan(Float value) {
            addCriterion("total >", value, "total");
            return (Criteria) this;
        }

        public Criteria andTotalGreaterThanOrEqualTo(Float value) {
            addCriterion("total >=", value, "total");
            return (Criteria) this;
        }

        public Criteria andTotalLessThan(Float value) {
            addCriterion("total <", value, "total");
            return (Criteria) this;
        }

        public Criteria andTotalLessThanOrEqualTo(Float value) {
            addCriterion("total <=", value, "total");
            return (Criteria) this;
        }

        public Criteria andTotalIn(List<Float> values) {
            addCriterion("total in", values, "total");
            return (Criteria) this;
        }

        public Criteria andTotalNotIn(List<Float> values) {
            addCriterion("total not in", values, "total");
            return (Criteria) this;
        }

        public Criteria andTotalBetween(Float value1, Float value2) {
            addCriterion("total between", value1, value2, "total");
            return (Criteria) this;
        }

        public Criteria andTotalNotBetween(Float value1, Float value2) {
            addCriterion("total not between", value1, value2, "total");
            return (Criteria) this;
        }

        public Criteria andMoneyOutIsNull() {
            addCriterion("money_out is null");
            return (Criteria) this;
        }

        public Criteria andMoneyOutIsNotNull() {
            addCriterion("money_out is not null");
            return (Criteria) this;
        }

        public Criteria andMoneyOutEqualTo(Float value) {
            addCriterion("money_out =", value, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutNotEqualTo(Float value) {
            addCriterion("money_out <>", value, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutGreaterThan(Float value) {
            addCriterion("money_out >", value, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutGreaterThanOrEqualTo(Float value) {
            addCriterion("money_out >=", value, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutLessThan(Float value) {
            addCriterion("money_out <", value, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutLessThanOrEqualTo(Float value) {
            addCriterion("money_out <=", value, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutIn(List<Float> values) {
            addCriterion("money_out in", values, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutNotIn(List<Float> values) {
            addCriterion("money_out not in", values, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutBetween(Float value1, Float value2) {
            addCriterion("money_out between", value1, value2, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyOutNotBetween(Float value1, Float value2) {
            addCriterion("money_out not between", value1, value2, "moneyOut");
            return (Criteria) this;
        }

        public Criteria andMoneyInIsNull() {
            addCriterion("money_in is null");
            return (Criteria) this;
        }

        public Criteria andMoneyInIsNotNull() {
            addCriterion("money_in is not null");
            return (Criteria) this;
        }

        public Criteria andMoneyInEqualTo(Float value) {
            addCriterion("money_in =", value, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInNotEqualTo(Float value) {
            addCriterion("money_in <>", value, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInGreaterThan(Float value) {
            addCriterion("money_in >", value, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInGreaterThanOrEqualTo(Float value) {
            addCriterion("money_in >=", value, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInLessThan(Float value) {
            addCriterion("money_in <", value, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInLessThanOrEqualTo(Float value) {
            addCriterion("money_in <=", value, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInIn(List<Float> values) {
            addCriterion("money_in in", values, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInNotIn(List<Float> values) {
            addCriterion("money_in not in", values, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInBetween(Float value1, Float value2) {
            addCriterion("money_in between", value1, value2, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andMoneyInNotBetween(Float value1, Float value2) {
            addCriterion("money_in not between", value1, value2, "moneyIn");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeIsNull() {
            addCriterion("agency_fee is null");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeIsNotNull() {
            addCriterion("agency_fee is not null");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeEqualTo(Float value) {
            addCriterion("agency_fee =", value, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeNotEqualTo(Float value) {
            addCriterion("agency_fee <>", value, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeGreaterThan(Float value) {
            addCriterion("agency_fee >", value, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeGreaterThanOrEqualTo(Float value) {
            addCriterion("agency_fee >=", value, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeLessThan(Float value) {
            addCriterion("agency_fee <", value, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeLessThanOrEqualTo(Float value) {
            addCriterion("agency_fee <=", value, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeIn(List<Float> values) {
            addCriterion("agency_fee in", values, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeNotIn(List<Float> values) {
            addCriterion("agency_fee not in", values, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeBetween(Float value1, Float value2) {
            addCriterion("agency_fee between", value1, value2, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andAgencyFeeNotBetween(Float value1, Float value2) {
            addCriterion("agency_fee not between", value1, value2, "agencyFee");
            return (Criteria) this;
        }

        public Criteria andProfitIsNull() {
            addCriterion("profit is null");
            return (Criteria) this;
        }

        public Criteria andProfitIsNotNull() {
            addCriterion("profit is not null");
            return (Criteria) this;
        }

        public Criteria andProfitEqualTo(Float value) {
            addCriterion("profit =", value, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitNotEqualTo(Float value) {
            addCriterion("profit <>", value, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitGreaterThan(Float value) {
            addCriterion("profit >", value, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitGreaterThanOrEqualTo(Float value) {
            addCriterion("profit >=", value, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitLessThan(Float value) {
            addCriterion("profit <", value, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitLessThanOrEqualTo(Float value) {
            addCriterion("profit <=", value, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitIn(List<Float> values) {
            addCriterion("profit in", values, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitNotIn(List<Float> values) {
            addCriterion("profit not in", values, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitBetween(Float value1, Float value2) {
            addCriterion("profit between", value1, value2, "profit");
            return (Criteria) this;
        }

        public Criteria andProfitNotBetween(Float value1, Float value2) {
            addCriterion("profit not between", value1, value2, "profit");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}