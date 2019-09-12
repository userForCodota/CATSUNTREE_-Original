package com.data.entity;

/**
 * 封装了JDBC需要的属性的实体类
 */
public class JDBCInfo {

    private String url;
    private String dbname;
    private String username;
    private String password;
    private String sql;

    private boolean isElementNull;//是否出现元素空
    private String nullElements;//哪些元素为空

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDbname() {
        return dbname;
    }

    public void setDbname(String dbname) {
        this.dbname = dbname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public boolean getIsElementNull() {
        return isElementNull;
    }

    public void setElementNull(boolean elementNull) {
        isElementNull = elementNull;
    }

    public String getNullElements() {
        return nullElements;
    }

    public void setNullElements(String nullElements) {
        this.nullElements = nullElements;
    }
}
