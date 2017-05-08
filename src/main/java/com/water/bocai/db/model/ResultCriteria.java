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

        public Criteria andRed1IsNull() {
            addCriterion("red1 is null");
            return (Criteria) this;
        }

        public Criteria andRed1IsNotNull() {
            addCriterion("red1 is not null");
            return (Criteria) this;
        }

        public Criteria andRed1EqualTo(Float value) {
            addCriterion("red1 =", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1NotEqualTo(Float value) {
            addCriterion("red1 <>", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1GreaterThan(Float value) {
            addCriterion("red1 >", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1GreaterThanOrEqualTo(Float value) {
            addCriterion("red1 >=", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1LessThan(Float value) {
            addCriterion("red1 <", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1LessThanOrEqualTo(Float value) {
            addCriterion("red1 <=", value, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1In(List<Float> values) {
            addCriterion("red1 in", values, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1NotIn(List<Float> values) {
            addCriterion("red1 not in", values, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1Between(Float value1, Float value2) {
            addCriterion("red1 between", value1, value2, "red1");
            return (Criteria) this;
        }

        public Criteria andRed1NotBetween(Float value1, Float value2) {
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

        public Criteria andRed2EqualTo(Float value) {
            addCriterion("red2 =", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2NotEqualTo(Float value) {
            addCriterion("red2 <>", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2GreaterThan(Float value) {
            addCriterion("red2 >", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2GreaterThanOrEqualTo(Float value) {
            addCriterion("red2 >=", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2LessThan(Float value) {
            addCriterion("red2 <", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2LessThanOrEqualTo(Float value) {
            addCriterion("red2 <=", value, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2In(List<Float> values) {
            addCriterion("red2 in", values, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2NotIn(List<Float> values) {
            addCriterion("red2 not in", values, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2Between(Float value1, Float value2) {
            addCriterion("red2 between", value1, value2, "red2");
            return (Criteria) this;
        }

        public Criteria andRed2NotBetween(Float value1, Float value2) {
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

        public Criteria andRed3EqualTo(Float value) {
            addCriterion("red3 =", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3NotEqualTo(Float value) {
            addCriterion("red3 <>", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3GreaterThan(Float value) {
            addCriterion("red3 >", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3GreaterThanOrEqualTo(Float value) {
            addCriterion("red3 >=", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3LessThan(Float value) {
            addCriterion("red3 <", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3LessThanOrEqualTo(Float value) {
            addCriterion("red3 <=", value, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3In(List<Float> values) {
            addCriterion("red3 in", values, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3NotIn(List<Float> values) {
            addCriterion("red3 not in", values, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3Between(Float value1, Float value2) {
            addCriterion("red3 between", value1, value2, "red3");
            return (Criteria) this;
        }

        public Criteria andRed3NotBetween(Float value1, Float value2) {
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

        public Criteria andRed4EqualTo(Float value) {
            addCriterion("red4 =", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4NotEqualTo(Float value) {
            addCriterion("red4 <>", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4GreaterThan(Float value) {
            addCriterion("red4 >", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4GreaterThanOrEqualTo(Float value) {
            addCriterion("red4 >=", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4LessThan(Float value) {
            addCriterion("red4 <", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4LessThanOrEqualTo(Float value) {
            addCriterion("red4 <=", value, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4In(List<Float> values) {
            addCriterion("red4 in", values, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4NotIn(List<Float> values) {
            addCriterion("red4 not in", values, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4Between(Float value1, Float value2) {
            addCriterion("red4 between", value1, value2, "red4");
            return (Criteria) this;
        }

        public Criteria andRed4NotBetween(Float value1, Float value2) {
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

        public Criteria andRed5EqualTo(Float value) {
            addCriterion("red5 =", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5NotEqualTo(Float value) {
            addCriterion("red5 <>", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5GreaterThan(Float value) {
            addCriterion("red5 >", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5GreaterThanOrEqualTo(Float value) {
            addCriterion("red5 >=", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5LessThan(Float value) {
            addCriterion("red5 <", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5LessThanOrEqualTo(Float value) {
            addCriterion("red5 <=", value, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5In(List<Float> values) {
            addCriterion("red5 in", values, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5NotIn(List<Float> values) {
            addCriterion("red5 not in", values, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5Between(Float value1, Float value2) {
            addCriterion("red5 between", value1, value2, "red5");
            return (Criteria) this;
        }

        public Criteria andRed5NotBetween(Float value1, Float value2) {
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

        public Criteria andRed6EqualTo(Float value) {
            addCriterion("red6 =", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6NotEqualTo(Float value) {
            addCriterion("red6 <>", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6GreaterThan(Float value) {
            addCriterion("red6 >", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6GreaterThanOrEqualTo(Float value) {
            addCriterion("red6 >=", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6LessThan(Float value) {
            addCriterion("red6 <", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6LessThanOrEqualTo(Float value) {
            addCriterion("red6 <=", value, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6In(List<Float> values) {
            addCriterion("red6 in", values, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6NotIn(List<Float> values) {
            addCriterion("red6 not in", values, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6Between(Float value1, Float value2) {
            addCriterion("red6 between", value1, value2, "red6");
            return (Criteria) this;
        }

        public Criteria andRed6NotBetween(Float value1, Float value2) {
            addCriterion("red6 not between", value1, value2, "red6");
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