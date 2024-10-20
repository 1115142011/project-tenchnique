#### 获取ioc bean 的三种方式

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="user" class="com.painter.xmlBean.User">

    </bean>
</beans>
```

```java
package com.painter.xmlBean;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestTool {
    public static void main(String[] ags) {
        testUserObject();
    }

    public static void testUserObject() {

        // 根据id 获取类
        ApplicationContext context = new ClassPathXmlApplicationContext("beanconfig.xml");// resource目录下的xml 配置文件

        User user = (User) context.getBean("user");

        System.out.println("user" + user);

        //根据类型获取对象--要求 xml bean 配置文件中只能有1个 User
        // 类型参数可以穿入接口 interface.class 同理 一个接口仅能有1个实现类
        // getBean 内部使用 instanceOf 判断是否是单例
        User user2 = context.getBean(User.class);

        // 根据 ID和类型 结合获取对象
        User user3 = context.getBean("user", User.class);

    }
}

```

```xml
<!-- 外部bean 注入-->
<bean id="dept" class="com.painter.xmlBean.Dept">
    <property name="deptName" value="企划部"/>
</bean>
<bean id="employ" class="com.painter.xmlBean.Employ">
<property name="ename" value="张先生"/>
<property name="dept" ref="dept"/>
</bean>
```

```xml
  <!-- 内部bean 注入-->
<bean id="employ" class="com.painter.xmlBean.Employ">
    <property name="ename" value="张先生"/>
    <property name="dept">
        <bean id="dept" class="com.painter.xmlBean.Dept">
            <property name="deptName" value="企划部"/>
        </bean>
    </property>
</bean>

```

```xml4联赋值注入
<!-- ji -->
    <bean id="dept" class="com.painter.xmlBean.Dept">
        <property name="deptName" value="企划部"/>
    </bean>
    <bean id="employ" class="com.painter.xmlBean.Employ" >
        <property name="ename" value="张先生" />
        <property name="dept" ref="dept" />
        <property name="dept.deptName" value="安保部" />
    </bean>
```



```xml
<!--注入 数组类型的属性 -->
<property name="dept">
    <array id="dept" class="com.painter.xmlBean.Dept">
        <value>企划部</value>
        <value>测试部</value>
        <value>研发部</value>

    </array>
</property>
```
1. ioc 多实例对象的创建时机不同 单实例是在 ioc 容器初始化的时候创建 多实例是在获取bean 时创建
2. factoryBean 配置用于整合三方代码包
3. 基于注解管理bean
 - 引入依赖
 - 开启组件扫描
 - 使用注解定义bean
 - 依赖注入
1. spring 默认是不会开启组件扫描的，需要进行配置
2. @Component 标识类 为纳入spring 容器管理的bean
3. @Reposit 将数据访问层（DAO）的类 标识类为 spring 容器管理的bean
4. @Service 将业务层中的类标识为 spring 容器管理的 bean
5. @Autowried 更具类型自动装配 （默认是byType）
6. @Resource 时java JDK 扩展包的内容-- 根据名称查找，@Resource(name="实现类名称")，@Resource 属性名与需要注入的类保持一致；
7. @Resource 既未写名称，属性名也没有与需要注入的类保持一致，会根据类型去查找