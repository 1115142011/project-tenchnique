#### 在vue或react中可能需要自定义事件以实现快组件通信的目的，自定义事件的实现原理为js的发布者订阅者模式
##### 以react为例
```js
    /*eventBus 文件*/
  const EventBus = {
     handle:{},
     subcribe:function(key,fn){
        if(!this.handle[key]){
            this.handle[key]=[]
        }
        this.handle[key].push(fn)
     },
     unsubcribe:function(key,fn){
         const fnList = this.handle[key]
         if(!fnList) return false
         if(!fn) {
             this.handle[key] = []
         }else{
             fnList.forEach((item,index) => {
                 if(item===fn){
                     this.handle[key].splice(index,1)
                 }
                 
             });
         }

     },
     emit:function(key,...args){
        for(let fn of this.handle[key]){
            console.log( this.handle[key])
                fn.call(this,...args)
        }
     }

}
export default EventBus
```
##### 测试组件 about 订阅事件并改变自身状态
```js
import React ,{useEffect, useState}from 'react'
import EventBus from "./EventBus";
import {Link } from 'react-router-dom'
export default function AboutPage() {
    const [total,setTotal]=useState(1)
    const testFn = ()=>{
        console.log('关于组件订阅')
        setTotal((prev)=>prev+1)
    }
useEffect(()=>{
    EventBus.subcribe('add',testFn)
    return()=>{
        EventBus.unsubcribe('add',testFn)
    }
},[])
    return (
        <div>

            <h3>关于页面</h3>
            <a>总计：：：{total}</a>
            <Link to='/home'>跳转主页</Link>
        </div>
    )
}
```
#### 测试组件 details 触发自定义事件并测试结果是否预期
```js
import React from 'react'
import {Link } from 'react-router-dom'
import About from "./about";
import EventBus from "./EventBus";
export default function Details() {
    const clickHandle = ()=>{
        EventBus.emit('add')
    }
    return (
        <div>
            <h3>详情页面</h3>
            <Link to='/about'>跳转主页</Link>
            <button onClick={clickHandle}>点击</button>
            <div style={{marginTop:100,background:'#e6e6'}}>
                
                <About />
            </div>
        </div>
    )
}
```