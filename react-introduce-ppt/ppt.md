## node优势
- Node.js采用事件驱动、异步编程，为网络服务而设计
- Node.js非阻塞模式的IO处理给Node.js带来相对低系统资源耗用下的高性能与出众的负载能力
- Node.js轻量高效，可以认为是数据密集型分布式部署环境下的实时应用系统的完美解决方案



## node.js缺点
- 单进程，单线程。
- 异步编程，callback回调地狱。



## thinkjs介绍
- Thinkjs 是一个快速、简单的基于MVC和面向对象的轻量级Node.js开发框架，秉承简洁易用的设计原则，在保持出色的性能和至简的代码同时，注重开发体验和易用性，为WEB应用开发提供强有力的支持。
- Thinkjs里面很多特性来源于ThinkPHP，同时根据Node.js的特点，使用了async/await, WebSocket等特性，让代码更简洁、优雅。



## 与其他node框架区别
- Express或Koa属于弱约束的MVC框架，基本功能完备，但要拿来给项目团队使用，需要大量定制
- 与阿里egg 相比 thinkjs目前版本就已经支持了async/await语法。 egg计划在下个版本才支持
- 阿里egg 去年9月份才开源，文档缺乏。 Thinkjs 2014年9月份发布 文档健全，是经过设计的
- 在目前来看，对于最潮的es6/es7/ts特性上，Thinkjs几乎是唯一的选型



## thinkjs特点
- ES6/7特性
- 支持丰富的数据库
- 丰富的Adapter
- 断点调试
- 遵循mvc和惯例优先
- 支持i18n等实用功能



## ES6/7特性
```javascript
  async listAction(){
    let data = await this.model('component').getList();
    this.success(data);
  }
```
--
## 支持丰富的数据库
- ThinkJS 现在支持 MySQL，SQLite，MongoDB 和 PostgreSQL 4 种数据库
- SAM后台数据库用的是mysql,根据对mysql使用的经验，对mysql封装的比较好
```javascript
  async listByComponentIdAction(){
    let componentId = this.get("component_id");
    let data = await this.model('team')
                         .field("JOB_NUMBER AS id, MEMBER_NAME AS name, role AS title")
                         .where({component_id: componentId})
                         .select();
    this.success(data);
  }
```



## 丰富的Adapter
- Adapter是用来解决一类功能的多种实现
- thinkjs默认支持的Adapter有 cache、Session、WebSocket、Template、db等
- 以cache为例，支持 file文件缓存、memory内存缓存、memcache缓存、redis缓存
```javascript
export default {
  type: "file", //缓存类型
  timeout: 0.5 * 3600, //失效时间，单位：秒
  adapter: { //不同 adapter 下的配置
    file: {
      path: think.RUNTIME_PATH + "/cache", //缓存文件的根目录
      path_depth: 2, //缓存文件生成子目录的深度
      file_ext: ".json" //缓存文件的扩展名
    },
    redis: {
      prefix: "sam_"
    }
  }
};
let cacheResult = await think.cache(key); //默认使用file
let cacheResult = await think.cache(key, {type:'redis'}); //使用redis接口
```



## 断点调试
- 支持 node-inspector 、vscode、 webstorm断点调试
- 演示vscode调试

## 遵循mvc和惯例优先

```javascript
└─webapi
    ├─config
    │      config.js
    │
    ├─controller
    │      component.js
    │
    ├─logic
    │      component.js
    │
    └─model
            component.js

  async listAction(){
    let data = await this.model('component').getList();
    this.success(data);
  }
```
- 采用惯例优先， 不需要自己再写路由

- listAction对应的路由就是 http://127.0.0.1:8360/webapi/component/list



## 支持i18n等实用功能
- i18n
```javascript
│  └─locale
│          en.js
│          zh-cn.js

'SUCCESS': [10000, '操作成功。'],
'SERVER_INVALID': [10001, '服务器错误，请重新尝试。'],
'TOKEN_INVALID': [10002, '请核对您的登录信息后重新登录。'],
'NEED_LOGIN': [10003, '您没有权限，需要登陆'],
'DATA_NULL': [10004, '查询不到相关数据'],
'PASSWORD_ERROR': [10005, '用户名密码错误，请重新登录。'],
'DATA_REPEAT': [10006, '数据重复，请核对数据。'],
````
- CSRF
- 子域名部署
- 禁止商品访问



## 安装 & 运行
> npm install -g thinkjs
>
> thinkjs new demo
>
> cd demo
>
> npm install
>
> npm start



## 创建模块 & 控制器
> thinkjs module webapi
>
> thinkjs controller webapi/component



## thinkjs logic
```javascript
addAction(){
    this.allowMethods = "post"; //只允许 post 请求类型
    let rules = {
    token: "required",
    component_id: "required",
    content:"required"
        };
        let flag = this.validate(rules);
        if (!flag) {
            return this.fail("服务验证错误，请核对数据重试", this.errors());
        }
}
```



## thinkjs model
```javascript
    getList() {
      return  this.alias("a")
                  .field('a.id,a.name,CONCAT(b.NAME,b.job_number) AS master,a.FUNCLIST AS intro,a.LOGO AS image,COUNT(c.USER_ID) AS love,COUNT(d.id) AS comment,0 AS support')
                  .join([" sam_committee b ON a.LEADER_ID = b.ID","sam_love c ON a.ID = c.component_id","sam_discuss d ON a.ID = d.COMPONENT_ID "])
                  .group("a.id,a.name,CONCAT(b.NAME,b.job_number),a.FUNCLIST,a.LOGO")
                  .select();
    }
```



## Q/A

### 一、CSRF
A：CSRF（Cross Site Request Forgery, 跨站域请求伪造）是一种网络的攻击方式
CSRF 攻击可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击站点，从而在并未授权的情况下执行在权限保护之下的操作。(即使httponly为true也没有用)

防御 CSRF 的三种策略
- 验证 HTTP Referer 字段
- 在请求地址中添加 token 并验证
- 在 HTTP 头中自定义属性并验证

thinkjs采用Token与cookie的双重校验 解决CSRF

### 二、ES7 async/await与 Generator 、promise的关系？
A：async/await = Generator  + promise + co执行器的语法糖

 http://es6.ruanyifeng.com/#docs/async

### 三、关于egg与 async/await
- async/await node 7.x 已经支持
- 当 node7 的 LTS 版本开始支持 async function 时，egg 核心将会迁移到 koa 2.x，并保持对 generator function 的兼容。

### 四、关于async/await 如何使用普通的回调函数
A：await命令后面可以直接跟Promise 对象和原始类型的值
，只要将普通的回调函数 封闭成Promise对象即可

示例可以见 SAM项目中 通过await调用zmp ldap用户验证接口
```javascript
      let user = await this.verfiyUserAccount(paramName,paramPassword);
      think.log(JSON.stringify(user,null,4));

  /**
   * 调用ldap接口去验证用户名与接口
   * @return {Promise} []
   */
    verfiyUserAccount(name, password) {
        //创建LDAP client，把服务器url传入
        var client = ldap.createClient({
          url: 'ldap://10.45.52.130:389'
        });
        var filter = `(uid=${name})`;
        //创建LDAP查询选项
        //filter的作用就是相当于SQL的条件
        var opts = {
          filter: filter, //查询条件过滤器，查找uid=kxh的用户节点
          scope: 'sub',        //查询范围 one base sub
          timeLimit: 5000       //查询超时
        };

        var dn = `uid=${name},dc=staff,dc=zmp,dc=com`;

        return new Promise(function(resolve, reject) {

          //将client绑定LDAP Server
          //第一个参数：是用户，必须是从根节点到用户节点的全路径
          //第二个参数：用户密码
          client.bind(dn, password, function (err, res1) {
            if (err != null)
              reject(new Error("bind error:" + err));

            //开始查询
            //第一个参数：查询基础路径，代表在查询用户信心将在这个路径下进行，这个路径是由根节开始
            //第二个参数：查询选项
            client.search(dn, opts, function (err, res2) {
              //查询结果事件响应
              res2.on('searchEntry', function (entry) {

                  //获取查询的对象
                  var user = entry.object;
                  var userText = JSON.stringify(user,null,2);
                  resolve(user);
              });

              //查询错误事件
              res2.on('error', function(err) {
                  reject(new Error("bind error:" + err));
                  //unbind操作，必须要做
                  client.unbind();
              });

              //查询结束
              res2.on('end', function(result) {
                  //unbind操作，必须要做
                  client.unbind();
              });
            });

          });
        })
```

### 五、关于使用async/await 如何处理错误
- thinkjs中的异常是统一在 common/controller/error.js中处理的。
- 如果想单独处理一个await语句的异常的话，可以使用try/catch捕获await错误

```javascript
    try {
        retId = await this.model("discuss").add(saveData);
      } catch (err) {
        think.log(err);
        return this.fail("SERVER_INVALID");
      }
```

### 六、子域名部署
- 将不同的功能部署在不同的域名下，但代码还是在一个项目下。
  如可以将
   1. http://fish.ztesoft.com/
   2. http://oa.ztesoft.com/
   3. http://bbs.ztesoft.com/

  部署到一个项目中
- 作用：
   1. 在搜索引擎中，子域名与主域名是作为分离的、独立的域而对待的，使用子域名可以提高网站的链接广度。
   2. 通过恰当的分类以子域名的方式会使网站的内容更为系统
   3. 对中小型网站而言，推出新的业务不愿意注册新的域名，可以使用子域名，如大软创都是xxx.ztesoft.com





