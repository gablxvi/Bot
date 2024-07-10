### 第一步，新建root-config类

```
const myConfig = new RootConfig('.myconfigrc',(Joi)=>{
    return joi.object({
      username: Joi.string().min(2).max(30).required(),
      birthyear: Joi.number().integer().min(1900).max(2019)        
    })
})
```

第一个参数为函数名称。
第二个参数为返回Joi schema对象的函数。 也可以直接提供Joi schema对象。




### 第二步，保存和读取options

保存到`.myconfigrc`：
```
    myConfig.saveOptions({
      username: 'test',
      birthyear: 1990
    })
```

读取`.myconfigrc`中的数据
```    
    myConfig.loadOptions()
```

获取`.myconfigrc`路径
```
    myConfig.rcPath
```



建议专门封装一个文件，用于项目中使用，如建立`utils/root-config.js`
```

```