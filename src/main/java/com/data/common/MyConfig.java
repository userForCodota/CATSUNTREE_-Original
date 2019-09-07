package com.data.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 本类是为了解决静态资源被拦截而创建的配置类，改写的目标是mvc的拦截，增加扫描的路径
 */
@Configuration
public class MyConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //将static下的所有文件夹及相关子文件夹都添加进扫描路径
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }
}
