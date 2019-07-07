var commonJsVersion = "v=20180926";

function getCommonJs() {
    this.scriptUrl = {
        require: path + "/js/require/require.js?" + commonJsVersion,
        config: path + "/js/config.js?" + commonJsVersion,
        bd: path + "/js/stat/bd.js?" + commonJsVersion,
        sid: path + "/js/stat/sid.js?" + commonJsVersion,
        webCommonUtil: pathWebCommonUtils + "/js/webCommonUtils.js?" + commonJsVersion,
        kxbdmarquee: pathWebCommonUtils + "/js/libself/jquery.kxbdmarquee.js?" + commonJsVersion,
        md5: pathWebCommonUtils + "/js/libself/md5.min.js?v=" + commonJsVersion
    };
    this.cssUrl = {
        swiper: path + "/css/common/swiper.min.css?" + commonJsVersion,
        mint: pathWebCommonUtils + "/css/mint.css?" + commonJsVersion,
        common: pathWebCommonUtils + "/css/common.css?" + commonJsVersion

    }
}
getCommonJs.prototype = {
    loadStyle: function(url, callback) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        if (typeof(callback) != "undefined") {
            if (link.readyState) {
                link.onreadystatechange = function() {
                    if (link.readyState == "loaded" || link.readyState == "complete") {
                        link.onreadystatechange = null;
                        callback();
                    }
                }
            } else {
                link.onload = function() {
                    callback();
                }
            }
        };
        var head = document.getElementsByTagName('head')[0];
        /*增加去重逻辑*/
        if ($("link[href='" + url + "']").length > 0) {
            return;
        } else {
            head.appendChild(link);
        }
        // head.appendChild(link);
    },
    loadJs: function(url, callback) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        if (typeof(callback) != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function() {

                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            } else {
                script.onload = function() {
                    callback();
                }
            }
        }
        script.src = url;
        /*增加去重逻辑*/
        if ($("script[src='" + url + "']").length > 0) {
            if (typeof(callback) != "undefined") { callback(); }
            // return;
        } else {
            document.body.appendChild(script);
        }
        // document.body.appendChild(script);
    },
    buildLayout: function() {
        var layout = document.createElement("div");
        layout.id = "documentLoading";
        layout.style = "background: #fff;position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 100; /* 此处的图层要大于页面 */";
        document.body.appendChild(layout);
    },
    initCSS: function(privateUrl) {
        var that = this;
        //预加载css
        this.loadStyle(path + privateUrl.cssURL + "?" + commonJsVersion);
    },
    initCSSwap02: function(privateUrl) {
        var that = this;
        //预加载css
        this.loadStyle(pathWap01 + privateUrl.cssURL + "?" + commonJsVersion);
    },
    initCSSNEW: function() {
        var that = this;
        this.loadStyle(that.cssUrl["mint"], function() {});
        this.loadStyle(that.cssUrl["common"], function() {});
    },
    initSingleCSSNEW: function(privateUrl) {
        var that = this;
        //预加载css
        this.loadStyle(pathWebCommonUtils + privateUrl.cssURL);
    },
    initDefaultJS: function(callback) {
        var that = this;
        //预加载js
        this.loadJs(this.scriptUrl["bd"]);
        this.loadJs(this.scriptUrl["sid"]);
        this.loadJs(this.scriptUrl["md5"]);
        that.loadJs(that.scriptUrl["webCommonUtil"], function() {
            that.loadJs(that.scriptUrl["require"], function() {
                that.loadJs(that.scriptUrl["config"], function() {
                    //引入私有js
                    callback();
                });
            });
        });
    },
    initJS: function(privateUrl) {
        var that = this;
        //预加载js
        this.loadJs(this.scriptUrl["bd"]);
        this.loadJs(this.scriptUrl["sid"]);
        this.loadJs(this.scriptUrl["md5"]);
        that.loadJs(that.scriptUrl["webCommonUtil"], function() {
            that.loadJs(that.scriptUrl["require"], function() {
                that.loadJs(that.scriptUrl["config"], function() {
                    //引入私有js
                    that.loadJs(path + privateUrl.jsURL + "?" + commonJsVersion, function() {
                        privateUrl.callback();
                    });
                });
            });
        });
    },
    initJSwap02: function(privateUrl) {
        var that = this;
        //预加载js
        this.loadJs(this.scriptUrl["bd"]);
        this.loadJs(this.scriptUrl["sid"]);
        this.loadJs(this.scriptUrl["md5"]);
        that.loadJs(that.scriptUrl["require"], function() {
            //引入私有js
            that.loadJs(pathWap01 + privateUrl.jsURL + "?" + commonJsVersion, function() {
                privateUrl.callback();
            });
        });
    },
    initJSNEW: function(callback) {
        var that = this;
        this.loadJs(this.scriptUrl["bd"]);
        this.loadJs(this.scriptUrl["sid"]);
        this.loadJs(this.scriptUrl["md5"]);
        //this.loadJs("//oo.tuanche.com/webCommonUtils/src/js/lib/jQuery-3.3.1.min.js",function(){
        this.loadJs(this.scriptUrl["webCommonUtil"], function() {
            callback();
        });
        //})

    }
}
var getCommonJsIns = new getCommonJs();