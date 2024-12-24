- controller 层核心职责就是接收请求->设置响应
- 在 java 项目中 resource 是在 classpath 目录下
- 获取类加载器。this.getClass().getClassLoader().getResourec("classpath")->加载资源文件
- 后端项目一般都是三层架构 1.controller 层：接收请求->设置响应 2.Service 层：业务逻辑处理 3.Dao 层：数据访问
- Dao 层的处理结果->service 层->controller 层
- spring 依赖注入 1.字段注入（@Autowrite 直接标注到字段上） 2.设值注入（需要有对应的 set 方法） 3.构造注入
- @ComponentScan 默认启动类当前包及其子包
- 显示的使用@ComponentScan 会覆盖默认的 spring bean 扫描规则
- @SpringBootApplication 具备 @ComponentScan 的功效
- macos 启动 mysql 首先是 sudo /usr/local/mysql/support-files/mysql.server start 命令此时输入的密码是电脑的锁屏密码
- 关系型数据库 多张相互连接的二维表组成
- sql 语句是操纵关系型数据库的标准语句
- redis 非关系型数据库
- sql 语句也是以分号结尾的
- sql 语句不区分大小写的
- 命令 ： show databases -->查看数据库；
- lombok @Data 自动生成 getter setter 方法

- mybatis 预编译 sql 语句
- mybatis 占位符 # -->预编译的占位符,$ sql 拼接语句 --> 有 sql 注入的 f 风险
- mybatis @options 注解表示期待返回值--回写入 params 实体
- mybatis 开启驼峰命名自动映射
- lombok @Data 自动生成 getter setter 方法
- mybatis 预编译 sql 语句
- mybatis 占位符 # -->预编译的占位符,$ sql 拼接语句 --> 有 sql 注入的 f 风险
- mybatis @options 注解表示期待返回值--回写入 params 实体
- mybatis 开启驼峰命名自动映射
- spring boot 中 @value 注解表示读取 spring boot 配置文件的属性值
- 术语 会话：浏览器与服务器的一次连接，称之为一次会话 服务端跟踪回话的目的是为了识别，是否是同一客户端发起的请求
- 服务端跟踪回话的三种技术
- 1. 基于客户端的 cookie。（1.移动端 app 不支持 cookie 技术 2.浏览器 安全性不高，3。浏览器可主动关闭 cookie，4.不支持跨域 ）
- 2. 基于服务端的 session
- 3. jwt 令牌技术。json web token
- 区分请求是否跨域：1. 协议 2.ip 3. 端口
- 只部署一台服务器：--> 单点故障
- 在 springboot 项目中配置 filter 的步骤

```java
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;

// 在启动类上添加注释 @ ServletComponentScan ---> 代表启用 seevelet 三大件
@SpringBootApplication
@ServletComponentScan
public class MybatiswebApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybatiswebApplication.class, args);
    }

}

// 2 创建实现 Filter 接口的类，并实现 doFilter 方法
@Slf4j
@WebFilter(urlPatterns = "/*") // 添加注解 @webFter(并制定了拦截规则的正则)
public class RequestFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        log.info("filter 工作了");
        // 3.放行。// 验证通过后必须放行 否则，请求不会往后走
        filterChain.doFilter(servletRequest, servletResponse);
    }
}


```

- 符合 filter 拦截规则的请求 在请求的资源响应后还会回到 filter 执行放行后的逻辑 即 chain.doFilter(re1,res) 后的代码
- 全局异常处理器 类注解 @RestControllerAdvice + 方法注解 @ExceptionHandler(Exception.class)
- springboot 事物 @Transactional mysql 事务自动提交
- 事物回滚默认是 runtimeException --rollbackFor 指定回滚的异常类型
- 一个事务方法被另一个事务方法调用的时候 --涉及事务的传播
- @pointcut 定义切入点表达式 在方法上面 后续可以直接引用
- 默认情况下，通知运行顺序与类名排名相关
- @Order 注解可以指定 通知运行顺序
- 定义切入点的表达式 1.excution 2. annotation

```java
@Slf4j
@Aspect
@Component
public class ExampleAspet {

    @Before("execution(String com.painter.mybatisweb.Controller.UserController.*() )")
    public void motify(){
        log.info("前置通知");
    }
}


```

- annotation 注解的方式定义切入点表达式。--：表示，特定注解的方法作为切入点 @before(注解类)。
- 连接点 ---> 表示 aop 控制的方法
- jwt 令牌 JSON web token
- JWT 统一拦截
- 过滤器和拦截器的区别
- 过滤器的范围更广 ，拦截器只针对进入 spring 环境的资源

```java
package com.painter.javaservice.Intercepter;

import com.alibaba.fastjson2.JSONObject;
import com.painter.javaservice.Common.Jwtutils;
import com.painter.javaservice.Common.ResResult;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
@Slf4j
public class LogionCheck implements HandlerInterceptor {
    @Override // 返回true 代表放行 -- 返回false 代表拦截；执行前拦截
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("token");
        log.info("执行前拦截{}:", token);
        if (!StringUtils.hasLength(token)) {
            ResResult r = ResResult.error("帐号未登录");
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(JSONObject.toJSONString(r));
            return false;
        }
        try {
            Claims ob = Jwtutils.parseJwt(token);
            log.info("claims:{}", ob);
        } catch (Exception e) {
            //令牌无法被解析 1.伪造 2.登录过期
            // e.printStackTrace();
            ResResult r = ResResult.error("登录已过期");
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(JSONObject.toJSONString(r));
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("controller执行后拦截");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("视图渲染完成后执行");
    }
}

```

```java
package com.painter.javaservice.Config;

import com.painter.javaservice.Intercepter.LogionCheck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private LogionCheck logionCheck;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(logionCheck).addPathPatterns("/**").excludePathPatterns("/*/login");
    }
}


```
