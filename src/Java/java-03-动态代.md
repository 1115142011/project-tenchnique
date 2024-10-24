### 代理模式 
1. 静态代理 硬编码模式-多对象多方法需要代理时需要创建代理类；
2. 动态代理 根据需要动态的创建代理对象 （AOP 底层实现原理）
```java
package com.painter.calculator;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;


public class DynamicProxyObject {
    private Object target;

    public DynamicProxyObject(Object target) {
        this.target = target;
    }

    public Object getProxyObject() {
        /*
         * 参数1:classLocader:
         * 参数2:interface 列表
         * 参数3:代理对象实现目标对象方法的过程
         */
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class<?>[] interfaces = target.getClass().getInterfaces();
        InvocationHandler prxyHandle = new InvocationHandler() {

            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                // 自己想干的事
                System.out.println("代理对象-方法执行>>>>>");
                Object result = method.invoke(target, args);
                // 方法执行后 doSomeThing
                System.out.println("代理对象-方法执行后>>>");
                return result;
            }
        };
        return  Proxy.newProxyInstance(classLoader, interfaces, prxyHandle);

//        return Proxy.newProxyInstance(classLoader, interfaces, prxyHandle);
    }
}

```
```java
package com.painter.calculator;

public class TestProxy {
    public static void main(String[] args) {
        System.out.println(">>>>");
        DynamicProxyObject dynamicProxyObject = new DynamicProxyObject(new CalculatorImp());
        // 注意类型转换的时候 仅能往父类转
        CalculatorInterFace calculator =(CalculatorInterFace)  dynamicProxyObject.getProxyObject();

        calculator.add(2,4);

    }
}

```
1. Aop 是以预编译和动态代理的方式 在不改变原代码的情况下
2. 术语：横切关注点 （要插入的事物）
3. 术语：通知方法 在横切关注点需要实现的方法叫通知方法
4. 术语：前置@before 返回@afterReturning 后置@after 异常@afterThrowing 环绕@Around  通知方式：
5. 连接点：允许使用通知的地方
6. 切入点：定位到连接点的方式
7. 动态代理的分类：1，jdk 的动态代理 2.cglib 的动态代理
8. 代理对象有接口 ：使用的是jdk 的动态代理 （生成接口实现类的动态代理，要求代理对象和目标对象都实现了接口）
9. 代理对象没有接口：使用 cglib 的动态代理 （通过继承被代理的目标类（生成目标类的字类））
10. AspectJ 实现AOP思想的框架 ，sprin 依赖于AOP 的注解实现动态代理
11. 切入点表达式（excution(访问控制符｜返回值 ｜全类名｜方法名｜（参数类型，参数类型）)
12. jdbctemplete 
13. mysqlconnection
14. druid 德鲁伊连接池
15. 对象克隆 需要实现 cloeable 接口
16. objects 对象工具类 equals isNull nonNull
17. bigDecimal 小数精确运算
