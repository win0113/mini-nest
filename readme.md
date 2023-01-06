### IOC

Class A中用到了Class B的对象b，一般情况下，需要在A的代码中显式地用 new 创建 B 的对象。

采用依赖注入技术之后，A 的代码只需要定义一个 private 的B对象，不需要直接 new 来获得这个对象，而是通过相关的容器控制程序来将B对象在外部new出来并注入到A类里的引用中。

IoC也可以理解为把流程的控制从应用程序转移到框架之中。以前，应用程序掌握整个处理流程；现在，控制权转移到了框架，框架利用一个引擎驱动整个流程的执行。

### DI

“依赖”是指接收方所需的对象。“注入”是指将“依赖”传递给接收方的过程。
依赖注入的方法
- 基于接口。实现特定接口以供外部容器注入所依赖类型的对象。
- 基于 set 方法。实现特定属性的public set方法，来让外部容器调用传入所依赖类型的对象。
- 基于构造函数。实现特定参数的构造函数，在新建对象时传入所依赖类型的对象

控制反转是目的，依赖注入是手段

### 源码阅读

正常启动一个http server时会调用 NestFactory.create 方法

#### NestFactory.create方法依赖的相关类
```
  - ApplicationConfig // 管理一些全局的guard、interrupter、pipe等等
  - NestContainer // 初始化一个容器用来管理对象的生命周期
  - NestApplication // nest 应用的容器
  - ModuleTokenFactory // 模块token生成、cache、管理
  - ModuleCompiler // ModuleTokenFactory wrapper && extract module metadata
  - MetadataScanner // 收集metadata
  - DependenciesScanner // 扫描所有module，并且新建
  - InstanceLoader // 根据模块结构实例化所需对象，暴露对外的接口
  - Injector // 工具类，服务于InstanceLoader
  - RoutesResolver // 创建http server route并映射
  - Module // module的结构
```
instance-loader
injector
routes-resolver
#### 流程
```
  - new ApplicationConfig()
  - new NestContainer()
  - initialize()
    - new InstanceLoader()
    - new MetadataScanner()
    - new DependenciesScanner()
    - DependenciesScanner.scan()
      - scanForModules()
      - scanModulesForDependencies()
    - InstanceLoader.createInstancesOfDependencies()
  - new NestApplication()
  - request map To httpAdapter

```
