### 遇到过的疑问(次序随意~~)(?未完全确定)(仅使用过小程序原生)
1. tabbar在app.json里的配置上限为5个, 首次访问后对应页面会缓存(?), 目测行为约等于浏览器开多个页面会话(tab页签)
2. 其他页面中更新自定义tabbar data需要通过this.getTabBar().setData
3. 自定义tabbar无法被覆盖(?), 即使覆盖z-index极高
4. 组件 展示/交互 -> web渲染/平台原生组件(?)
5. navigateTo 新页面, 老页面生命周期不会结束(?最多几层)
6. 页面样式页面间样式屏蔽, app.(less|wxss)各处生效
7. "navigationStyle": "custom" 首个子元素margin-top等不生效(?)
8. 渲染层逻辑层分开, 逻辑层选取/操作dom元素约等于woker里发消息给主线程再去操作dom(?)
9. 所有的逻辑层代码在同一全局(上下文)下(?), 各处都可以访问app对象下的变量方法等....
10. wx.uploadFile name字段含义(?貌似后端约定), 返回的报文json字符串
11. canvas节点异步插入/display方式控制显隐时, 绘制会提示找不到canvas(?即使在ready中,应该跟页面生命周期无关)
12. wxs....
13. 待了解 Web Components, web worker, 样式变量env(....) var(..)
14. 待实施 分包、页面状态保留、初始渲染缓存、sitemap等等
15. ts模式下默认类型貌似更新不及时, 与文档脱节(?如RenderingContext)
16. 进入后台/非激活状态, 多久会销毁(?文档30min)
17. 跨平台问题
  - 页面title居中
  - 未指定/指定未引入(?记不清了)导致文字乱码
  - 其他ing
18.      文档问题
  - 检索太难用, 上个algolia吧
  - 与实际api脱节, 如canvas离屏渲染createOffscreenCanvas(?)
19.     ing
### 其他
1. 通过环境变量绕过部分关键词/功能审核
2. canvas绘制存在绘制模糊的问题, 缩放属性scale不够灵活(?貌似对图片绘制不生效), 海报一类无交互场景, 可先canvas固定尺寸绘制转临时文件, 以image展示
3. canvas绘制文字设置textBaseline已左上角为位置基点;圆角矩形、多边形等用path实现
4. 获取(createSelectorQuery().select)canvas对象后需要手动设置canvas宽高
5. ing


~~~React大法好, 放飞自我首选~~~