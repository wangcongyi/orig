/**
 * viewFrame-all-1.1.js
 * 此类中包括对象:ViewFrame,ViewConfig,ViewManager
 * 模块加载框架
 */
define(function (require, exports) {
    /**
     * [名称] 模块加载框架类
     * [描述]
     *  1.提供模块加载策略。比如模块加载位置和加载顺序等。
     *  2.持有所有框架内对象，提供各模块之间交互。比如各模块中缓存数据和各模块接口调用等。
     * [主要方法]
     *  init() 初始化模块加载框架,
     *  getModule() 根据模块名称获取对象,
     *  setModule() 在框架中注册模块对象,
     *  loadModule() 从当前模块配置名称中加载模块到页面
     *
     * [使用说明]
     * var obj = new ViewFrame();
     * obj.xx(param, callback);
     *
     * [依赖对象]: jquery, sea.js,ViewManager
     * [创建日期]: 2015-04-28
     * [作者]: qianwb
     * [版本]: v1.0
     *
     * [修改内容]
     *  1.配置项中加入preloadModule模块
     *  2.加入_initPreloadModule()方法，支持预加载模块功能
     * [修改人]:qianwb
     * [版本]: v1.1
     *
     * [修改内容]
     * 1.增加不加载page，只加载js功能
     * [修改人] qianwb
     * [版本] v1.1
     *
     */
    var ViewFrame,
        ViewConfig,
        ViewManager,
        ViewFactory;
    ViewFrame = (function () {
        var _constr,
            _VC,
            _VM,
            _appendModule,
            _loadOnce,
            _configName;
            _loadOnce = false,
            _configName = null;
        _constr = function () {
            _VC = new ViewConfig();
            _VM = new ViewManager(this);
            this.modules = {};
            this.basePath = seajs.data.base;
        };
        var _initModule,
            _clearModule;
        /**
         * 初始化模块时，将模块填充至指定位置
         * @param param
         * {
                "loadOnceModule":[
                    {"name":"", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}
                ],
                "index":{
                    "module":[
                        {"name":"", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}
                    ]
                }
         *  }
         * @param callback
         * @private
         */
        _initModule = function (param, callback) {
            for (var key in param) {
                if (key === "loadOnceModule") {
                    if (_loadOnce) {
                        continue;
                    }
                    _VM.appendModule(param[key], callback);
                    _loadOnce = true;
                } else {
                    _VM.appendModule(param[key], callback);
                }
            }
        };
        /**
         * 根据配置项加载，预加载模块。
         * 1.读取配置项中是否有预加载模块参数preloadModule
         * 2.如果有则加载对应模块后，执行回调函数
         * 3.如果没有则直接执行回调函数
         * @param param
         * {
         *       "preloadModule":[
         *           {"name":"demo_level1", "page":"demo_level1.html", "main":"", "target":""}
         *       ]
         *  }
         * @param callback
         * @private
         */
        _initPreloadModule = function(param, callback) {

            if(param.preloadModule && !_loadOnce) {
                var len,
                    i;
                complete = false;
                len = param.preloadModule.length;
                if(len > 0) {
                    i = 0;
                    _VM.appendModule(param.preloadModule, function() {
                        i++;
                        if(i === len) {
                            i = null;
                            len = null;
                            callback.call(null);
                        }
                    });
                } else {
                    callback.call(null);
                }
            } else {
                callback.call(null);
            }
        };
        /**
         * 解析配置文件，装换数据
         * @param param {config:config对象, [moduleKey]:""}
         *      [moduleKey]: 配置唯一标识。根据此项解析数据
         * @private
         * @return modules [{target:"", name:""}]
         */
        _getModules = function(param) {
            var modules,
                m,
                i,
                len,
                config,
            modules = [];
            config = param["config"];
            if(param.moduleKey) {
                m = {};
                if(typeof config[param.moduleKey].module !== "undefined") {
                    m = config[param.moduleKey].module;
                }
                if(typeof config[param.moduleKey].waitModule !== "undefined") {
                    m = config[param.moduleKey].waitModule;
                }
                if(typeof config[param.moduleKey].multiModule !== "undefined") {
                    m = config[param.moduleKey].multiModule;
                }
                len = m.length;
                if(len > 0) {
                    for(i=0; i<len; i++) {
                        modules.push({target: m[i].target, name: m[i].name});
                    }
                }
            } else {
                for(var key in config) {
                    if (key === "loadOnceModule" || key === "container" || key === "preloadModule") {
                        continue;
                    } else {
                        m = {};
                        if(typeof config[key].module !== "undefined") {
                            m = config[key].module;
                        }
                        if(typeof config[key].waitModule !== "undefined") {
                            m = config[key].waitModule;
                        }
                        if(typeof config[key].multiModule !== "undefined") {
                            m = config[key].multiModule;
                        }
                        len = m.length;
                        if(len > 0) {
                            for(i=0; i<len; i++) {
                                modules.push({target: m[i].target, name: m[i].name});
                            }
                        }
                    }
                }
            }
            return modules;
        };
        /**
         * 在容器中，清除对应模块dom
         * @config config对象
         * @private
         */
        _clearModule = function() {
            var modules;
            modules = _getModules({config: _VC.config});
            _VM.clearModule(modules);
        };
        /**
         * 根据配置文件，显示对应模块数据
         * 1.获取隐藏所有模块的modules
         * 2.获取显示指定模块的modules
         * 3.调用ViewManaer隐藏模块和显示模块
         * @param {moduleKey:""}
         * @private
         */
        _showModule = function(param, callback) {
            var modules,
                hideModule,
                showModule;
            hideModule = _getModules({config:_VC.config});
            showModule =  _getModules({config:_VC.config, moduleKey: param.moduleKey});
            _VM.hideModule(hideModule);
            _VM.showModule(showModule);
        };
        _constr.prototype = {
            /**
             * 根据模块名称获取对象
             * @param name
             */
            getModule: function (name) {
                var result;
                result = {"result": true, "data": this.modules[name], "desc": ""};
                return result;
            },
            /**
             * 初始化模块加载框架
             * 1.读取模块配置文件
             * 2.根据配置文件,调用ViewManager生成模块
             * 3.根据加载策略,将模块加载到页面
             *
             * [修改]：
             *  内容：加入_initPreloadModule方法，支持预加载项
             *  日期：2015-06-26
             *  修改者:qianwb
             * @param param {url:"加载模块配置文件url地址", configName:"配置名称"}
             * @param callback 模块加载完成后回调函数，回调函数中传入{"name": 模块名称, "module": 模块对象}
             */
            init: function (param, callback) {
                var config = null,
                    onceModuleDOM,
                    moduleDOM,
                    loadMethod,
                    preloadModuleDOM,
                    method;
                try {
                    config = _VC.getConfig(this.basePath + param.url);
                    preloadModuleDOM = config["preloadModule"]? _VM.getModuleDOM(config["preloadModule"].module): {};
                    onceModuleDOM = config["loadOnceModule"]? _VM.getModuleDOM(config["loadOnceModule"].module): {};
                    moduleDOM = param.configName? _VM.getModuleDOM(config[param.configName].module): {};
                    if(param.configName) {
                        method = {
                            config: config,
                            loadOnceModule: onceModuleDOM,
                            preloadModule: preloadModuleDOM,
                            module: {moduleName: param.configName, moduleDOM: moduleDOM}
                        };
                    } else {
                        method = {
                            config: config,
                            loadOnceModule: onceModuleDOM,
                            preloadModule: preloadModuleDOM
                        };
                    }
                    loadMethod = _VC.genLoadMethod(method);
                    _initPreloadModule(loadMethod, function() {
                        delete loadMethod.preloadModule;
                        _initModule(loadMethod, callback);
                        onceModuleDOM = moduleDOM = loadMethod = null;
                    });
                } catch (e) {
                    console.log(e.message);
                    onceModuleDOM = moduleDOM = loadMethod = null;
                }
            },
            /**
             * 从当前模块配置名称中加载模块到页面
             * 1.根据模块名称查找到对应模块。
             * 2.加载该模块到对应的页面target中。
             * 3.将模块注册到框架中。
             * @param param {name:[{name:"", param:""}], parenteName:"", moduleKey:"模块配置唯一标识"}
             *      name:[{name:"", param:"动态传入参数"}] 根据模块名称加载
             *      moduleKey:"模块配置唯一标识"
             *      [parentName] 根据指定名称项目中查找，如果没有指定该参数，则默认从multiModule项中查找模块
             * @return {result:"true/false", "data":{}, desc:""}
             */
            loadModule: function (param, callback) {
                if (param && param.name.length > 0) {
                    var result,
                        pName,
                        m,
                        config,
                        loadMethod,
                        moduleDOM;
                    result = {"result": true, "data": {}, "desc": ""};
                    try {
                        if (typeof param.parentName === "undefined") {
                            pName = "multiModule";
                        } else {
                            pName = param.parentName;
                        }
                        config = _VC.config;
                        m = (config[param.moduleKey])[pName];
                        //根据param.name匹配过滤掉，传入参数加载到moduleDOM对象中
                        var len1,
                            len2;
                        len1 = param.name.length;
                        len2 = m.length;
                        dom = [];
                        for (var i = 0; i < len1; i++) {
                            for (var j = 0; j < len2; j++) {
                                if (m[j].name === param.name[i].name) {
                                    //m[j].initParam = param.name[i].param;
                                    //dom.push(m[j]);
                                    dom.push({
                                        initParam: param.name[i].param,
                                        name:m[j].name,
                                        page:m[j].page
                                    });
                                }
                            }
                        }
                        moduleDOM = _VM.getModuleDOM(dom);
                        loadMethod = _VC.genLoadMethod2({
                            config: config,
                            module: {moduleName: param.moduleKey, moduleDOM: moduleDOM},
                            parentName: pName
                        });
                        _initModule(loadMethod, callback);
                    } catch (e) {
                        console.log(e);
                    } finally {
                        loadMethod = moduleDOM = m = null;
                    }

                }
            },
            /**
             * 根据模块配置唯一标识(moduleKey)，加载整个模块
             * 1.从配置文件中查找整个模块配置
             * 2.调用ViewManagerg类getModuleDOM()
             * 3.调用ViewConfig的genLoadMethod()生成加载策略
             * 4.调用_initModule()方法加载模块
             * @param param:{moduleKey:"模块配置唯一标识"}
             * @param callback 模块加载完成后回调函数，回调函数中传入{"name": 模块名称, "module": 模块对象}
             * @return {result:"true/false", "data":{}, desc:""}
             */
            loadModuleAll: function (param, callback) {
                var config = null,
                    onceModuleDOM,
                    moduleDOM,
                    loadMethod,
                    preloadModuleDOM;
                try {
                    if (param.moduleKey) {
                        config = $.extend({}, _VC.config);
                        _clearModule();
                        _showModule(param);
                        onceModuleDOM = config["loadOnceModule"]? _VM.getModuleDOM(config["loadOnceModule"].module): {};
                        moduleDOM = _VM.getModuleDOM(config[param.moduleKey].module);
                        preloadModuleDOM = config["preloadModule"]? _VM.getModuleDOM(config["preloadModule"].module): {};
                        loadMethod = _VC.genLoadMethod({
                            config: config,
                            loadOnceModule: onceModuleDOM,
                            preloadModule: preloadModuleDOM,
                            module: {moduleName: param.moduleKey, moduleDOM: moduleDOM}
                        });
                        _initPreloadModule(loadMethod, function() {
                            delete loadMethod.preloadModule;
                            _initModule(loadMethod, callback);
                            onceModuleDOM = moduleDOM = loadMethod = null;
                        });
                    }
                } catch (e) {
                    console.log(e);
                    onceModuleDOM = moduleDOM = loadMethod = null;
                }
            },
            /**
             * 在框架中注册模块对象
             * @param param {key:"", "module"}
             */
            setModule: function (param) {
                this.modules[param.key] = param.module;
            },
            /**
             * 根据模块名称，模块加载完成后执行指定回调
             * @param param: {"name":"", "callback":""}
             *      name	获取对象的模块名称
             *      callback	指定模块加载完成后，指定回调函数
             */
            moduleOnload: function(param, callback) {

            }
        };
        return _constr;
    })();
    /**
     * 内部类
     * 读取页面配置文件，根据配置文件生成加载策略
     */
    ViewConfig = (function () {
        var _constr;
        _constr = function () {
            //配置文件保存在此变量
            this.config = null;
        };
        _constr.prototype = {
            /**
             * 读取页面配置文件
             * @param url:"加载模块配置文件url地址"
             * @param callback
             * @return
             * {
                    "container":"main.html",			            //装载所有模块的容器页面
                    "loadOnceModule":{								//只在容器中加载一次的模块
                       "module":[									//开始就加载一级模块
                           {"name":"模块名称标识", "page":"模块载体,一般为html页面", "main":"页面的js文件", "target":"将模块加载到容器的位置,一般为id"}
                       ]
                    },
                    "index":{										//配置名称
                       "module":[									//开始就加载一级模块
                           {"name":"login", "page":"login.html", "main":"a.js", "target":"id"},
                           {"name":"demo", "page":"demo.html", "main":"aa.js", "target":"id"}
                       ],
                       "waitModule":{                              //等待按需加载的一级模块
                           {"name":"login", "page":"login.html", "main":"a.js", "target":"id"},
                            {"name":"demo", "page":"demo.html", "main":"aa.js", "target":"id"}
                       },
                       "multiModule":[								//通过方法调用的加载子模块
                           {"name":"demo_level1", "page":"demo_level1.html", "main":"", "target":""}
                       ]
                    }
             *  }
             */
            getConfig: function (url, callback) {
                var async = null,
                    config = null;
                async = (typeof callback === "function");
                $.ajax({
                    url: url,
                    dataType: "json",
                    async: async,
                    cache: false,
                    success: function (data) {
                        config = data;
                        this.config = config;
                        if (async) {
                            callback.call(null, config);
                        }
                    }
                });
                return config;
            },
            /**
             * 根据配置文件，生成模块加载方法
             * [修改]：
             *  内容：加入返回preloadModule对象
             *  日期：2015-06-26
             *  修改者:qianwb
             * @param param {config:{}, "loadOnceModule":[], module:{moduleName:"", moduleDOM:[]}}}
             * config: 读取的配置文件对象
             * loadOnceModule:[{"name":"模块名称", "dom":"加载来的页面DOM结构"}]
             * module:{
             *      moduleName:"",
             *      moduleDOM:[{"name":"模块名称", "dom":"加载来的页面DOM结构"}]
             * }
             * @return
             * {
                    "loadOnceModule":[
                        {"name":"", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}
                    ],
                    "index":[
                        {"name":"", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}
                    ]
             * }
             */
            genLoadMethod: function (param) {
                var result,
                    len,
                    i,
                    loadOnceModule,
                    module,
                    temp,
                    m1,
                    m2,
                    p,
                    preloadModule;
                result = {};
                p = $.extend({}, param);
                //根据config和loadOnceModule，生成loadOnceModule到result;
                loadOnceModule = [];
                if (typeof p.config.loadOnceModule !== "undefined") {
                    var onceModule;
                    onceModule = p.config.loadOnceModule.module || [];
                    i = 0;
                    len = onceModule.length;
                    for (; i < len; i++) {
                        if (onceModule[i].name === p.loadOnceModule[i].name) {
                            temp = null;
                            temp = {
                                "name": onceModule[i].name,
                                "page": onceModule[i].page,
                                "dom": p.loadOnceModule[i].dom,
                                "main": onceModule[i].main,
                                "target": onceModule[i].target,
                                "initParam": onceModule[i].initParam
                            };
                            p.config.loadOnceModule.module[i] = temp;
                            loadOnceModule.push(temp);
                        }
                    }
                }
                module = [];
                //根据config和module中moduleName和moduleDOM，生成以moduleName为key的对象;
                if (p.module) {
                    m1 = p.config[p.module.moduleName].module;
                    m2 = p.module.moduleDOM;
                    len = m1.length;
                    for (i = 0; i < len; i++) {
                        temp = {
                            "name": m1[i].name,
                            "page": m1[i].page,
                            "dom": m2[i].dom,
                            "main": m1[i].main,
                            "target": m1[i].target,
                            "initParam": m1[i].initParam
                        };
                        p.config[p.module.moduleName].module[i] = temp;
                        module.push(temp);
                    }
                }
                //根据config和preloadModule，生成preloadModule到result;
                preloadModule = [];
                if (typeof p.config.preloadModule !== "undefined") {
                    var pmodule;
                    pmodule = p.config.preloadModule.module || [];
                    i = 0;
                    len = pmodule.length;
                    for (; i < len; i++) {
                        if (pmodule[i].name === p.preloadModule[i].name) {
                            temp = null;
                            temp = {
                                "name": pmodule[i].name,
                                "page": pmodule[i].page,
                                "dom": p.preloadModule[i].dom,
                                "main": pmodule[i].main,
                                "target": pmodule[i].target,
                                "initParam": pmodule[i].initParam
                            };
                            p.config.preloadModule.module[i] = temp;
                            preloadModule.push(temp);
                        }
                    }
                }
                if (!this.config) {
                    this.config = p.config;
                }
                return {"loadOnceModule": loadOnceModule, preloadModule: preloadModule,"module": module};
            },
            /**
             * 根据配置文件，moduleKey（配置文件唯一标识）和parentName(据指定名称项目中查找)，生成模块加载方法
             * @param param {config:{}, module:{moduleName:"", moduleDOM:[]}, moduleKey:"", parentName:""}}
             * config: 读取的配置文件对象
             * module:{
             *      moduleName:"",
             *      moduleDOM:[{"name":"模块名称", "dom":"加载来的页面DOM结构"}]
             * }
             * @return
             * {
                    module:[
                            {"name":"", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}
                    ]
             * }
             */
            genLoadMethod2: function (param) {
                var result,
                    len1,
                    i,
                    j,
                    len2,
                    loadOnceModule,
                    module,
                    temp,
                    m1,
                    m2,
                    p,
                    preloadModule;
                result = {};
                p = $.extend({}, param);
                //根据config和loadOnceModule，生成loadOnceModule到result;
                module = [];
                //根据config和module中moduleName和moduleDOM，生成以moduleName为key的对象;
                if (p.module) {
                    m1 = p.config[p.module.moduleName];
                    m1 = m1[p.parentName];
                    m2 = p.module.moduleDOM;
                    len1 = m1.length;
                    len2 = m2.length;
                    for(j = 0; j<len2; j++) {
                        for (i = 0; i < len1; i++) {
                            if(m1[i].name === m2[j].name) {
                                temp = {
                                    "name": m1[i].name,
                                    "page": m1[i].page,
                                    "dom": m2[j].dom,
                                    "main": m1[i].main,
                                    "target": m1[i].target,
                                    "initParam": m2[j].initParam
                                };
                                module.push(temp);
                            }
                        }
                    }

                }
                return {"module": module};
            }
        }
        return _constr;
    })();
    /**
     * [名称] 模块管理类,此类中包括对象:ViewFactory
     * [描述] 提供表现层模块管理,提供生成模块接口,加载模块具体方法。
     * [主要方法]
     * getModuleDOM() 获取模块的DOM结构并返回,
     * appendModule() 将模块添加到具体dom中
     *
     * [使用说明]
     * var obj = new ViewManager();
     * obj.xx(param, callback);
     *
     * @dependencies: jquery, sea.js,ViewFactory
     * @date: 2015-04-28
     * @author: qianwb
     * @version: v1.0
     *
     */
    ViewManager = (function() {
            var _constr,
                _VF,
                _VFrame;
            _constr = function(frame) {
                _VFrame = frame;
                _VF = new ViewFactory(frame);
            };
            _constr.prototype = {
                /**
                 * 获取模块的DOM结构并返回
                 * @param param [{name:"模块名称", page:"模块html文件地址"},{...}]
                 * @param callback
                 * @return [{name:"模块名称", dom:"dom结构"}]
                 */
                getModuleDOM: function(param, callback) {
                    return _VF.getModuleDOM(param, callback);
                },
                /**
                 * 将模块添加到具体dom中
                 * 1.清空指定id处的dom对象和事件
                 * 2.将模块DOM插入到指定DOM中
                 * 3.加载模块的主函数，初始化模块对象
                 * 4.调用框架方法，注册模块对象
                 * @param param [{"name":"模块对象名称", "page":"a.html", "dom":"", "main":"a.js", "target":"id", "initParam":{}}]
                 * @param callback
                 */
                appendModule: function(param, callback) {
                    var i,
                        len;
                    i = 0;
                    len = param.length;
                    for(; i<len; i++) {
                        if(param[i].dom !== "") {
                            $("#" + param[i].target).find("html").remove();
                            $("#" + param[i].target).empty();
                            $("#" + param[i].target).append(param[i].dom);
                        }
                        (function(p) {
                            seajs.use(_VFrame.basePath + param[i].main, function(d) {
                                $(function() {
                                    //动态生成对象
                                    var obj = new (eval(d[p.name]))(_VFrame);
                                    var param = p.initParam || "";
                                    //初始化模块
                                    obj.init.call(obj, p["initParam"]);
                                    //调用框架方法，注册对象
                                    _VFrame.setModule({"key": p.name, "module": obj});
                                    if(callback) {
                                        callback.call(null, {"name": p.name, "module": obj});
                                    }
                                    p = null;
                                });
                            });
                        })(param[i]);
                    }
                },
                /**
                 * 根据模块配置targetId已加载的模块
                 * @param param [{"name":"模块对象名称", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}]
                 * @param callback
                 */
                clearModule: function(param) {
                    var len,
                        i;
                    i = 0;
                    len = param.length;
                    for(; i<len; i++) {
                        $("#" + param[i].target).html("");
                    }
                },
                /**
                 * 根据模块配置target隐藏已加载的模块
                 * @param param [{"name":"模块对象名称", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}]
                 * @param callback
                 */
                hideModule: function(param) {
                    var len,
                        i;
                    i = 0;
                    len = param.length;
                    for(; i<len; i++) {
                        $("#" + param[i].target).hide();
                    }
                },
                /**
                 * 根据模块配置target显示已加载的模块
                 * @param param [{"name":"模块对象名称", "page":"a.html", "dom":"", "main":"a.js", "target":"id"}]
                 * @param callback
                 */
                showModule: function(param) {
                    var len,
                        i;
                    i = 0;
                    len = param.length;
                    for(; i<len; i++) {
                        $("#" + param[i].target).show();
                    }
                }
            };
            return _constr;
        })();
        /**
         * 内部类
         * 根据配置文件生成页面模块DOM
         */
        ViewFactory = (function() {
            var _constr,
                _loadModule,
                _VFrame = null;
            _constr = function(frame) {
                _VFrame = frame;
            };
            /**
             * 加载模块DOM结构并返回
             * @param url "模块html文件地址"
             * @param callback
             * @return
             * @private
             */
            _loadModule = function(url, callback) {
                var async = null,
                    dom = null,
                    body = null,
                    head = null;
                if(url !== "") {
                    async = (typeof callback === "function");
                    $.ajax({
                        url: url,
                        dataType: "html",
                        async: async,
                        cache:false,
                        success: function(data) {
                            dom = data;
                            if(data.indexOf("<html") > 0) {
                                head = dom.substring(dom.indexOf("<head>")+6, dom.indexOf("</head>"));
                                body = dom.substring(dom.indexOf("<body>")+6, dom.indexOf("</body>"));
                                //正则表达式去除title
                                head = head.replace(/<title[^>]*?>[\s\S]*?<\/title>/,"");
                                //正则表达式去除script
                                head = head.replace(/<script[^>]*?>[\s\S]*?<\/script>/,"");
                                //正则表达式去除meta
                                head = head.replace(/<meta *?[\s\S]*?>/,"");
                                dom = head + body;
                                ////dom = dom.substring(dom.indexOf("<html>")+6, dom.indexOf("</html>"));
                                //正则表达式去除head
                                //dom = dom.replace(/<\/?head>/g,"");
                                //正则表达式去除title
                                //dom = dom.replace(/<title[^>]*?>[\s\S]*?<\/title>/,"");
                                //正则表达式去除script
                                //dom = dom.replace(/<script[^>]*?>[\s\S]*?<\/script>/,"");
                                //正则表达式去除meta
                                //dom = dom.replace(/<meta *?[\s\S]*?>/,"");
                            }
                            if(async) {
                                callback.call(null, dom);
                            }
                        }
                    });
                } else {
                    dom = "";
                }

                return dom;
            };
            _constr.prototype = {
                /**
                 * 获取模块的DOM结构并返回
                 * @param param [{name:"模块名称", page:"模块html文件地址"},{...}]
                 * @param callback
                 * @return [{name:"模块名称", dom:"dom结构"}]
                 */
                getModuleDOM: function(param, callback) {
                    var len,
                        i,
                        arr,
                        dom;
                    i = 0;
                    len = param.length;
                    arr = [];
                    for(; i<len; i++) {
                        //一次请求所有dom对象
                        if(param[i].page !== "") {
                            dom = _loadModule(_VFrame.basePath + param[i].page);
                        } else {
                            dom = "";
                        }
                        var temp = $.extend({}, param[i], {name:param[i].name, dom:dom});
                        arr.push(temp);
                    }
                    if(typeof callback === "function") {
                        callback.call(null, arr);
                    }
                    return arr;
                }
            }
            return _constr;
        })();
    exports.ViewFrame = ViewFrame;
});