/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ttrg.arry.Keyval = function () {
    function _class(dat) {
        _classCallCheck(this, _class);

        try {
            if (null === dat) {
                throw new Error('invalid parameter');
            }
            this.data = dat;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    _createClass(_class, [{
        key: 'getValue',
        value: function getValue(key) {
            try {
                if (null === key || '' == key) {
                    throw new Error('invalid parameter');
                }
                if (false === this.isKeyExists(key)) {
                    return null;
                }
                return this.data[key];
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
    }, {
        key: 'isKeyExists',
        value: function isKeyExists(key) {
            try {
                if (null === key || '' == key) {
                    throw new Error('invalid parameter');
                }
                for (var data_key in this.data) {
                    if (data_key === key) {
                        return true;
                    }
                }
                return false;
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
    }, {
        key: 'getCount',
        value: function getCount() {
            try {
                var ret = 0;
                for (var data_key in this.data) {
                    ret++;
                }
                return ret;
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
    }]);

    return _class;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ttrg.debg.dumpObj = function (obj) {
    try {
        var ret_str = "";
        for (var i in obj) {
            ret_str += i + "=" + obj[i] + "\n";
        }
        return ret_str;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ttrg.init.addLoadEvt = function (fnc) {
    try {
        if (null === fnc || 'function' !== typeof fnc) {
            throw new Error('invalid parameter');
        }

        if (window.addEventListener) {
            window.addEventListener('load', fnc, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', fnc);
        } else {
            window.onload = fnc;
        }
    } catch (e) {
        console.log(e.stack);
        throw e;
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ttrg.load.JsPara = function () {
    /**
     * initialize js loader
     *
     */
    function _class(bp) {
        _classCallCheck(this, _class);

        try {
            this.base_path = bp || './';
            this.load_path = new Array();
            this.callback = new Array(null, null);
            this.load_cnt = 0;
            this.loading = false;
            this.timeout = 1000;
            this.load_intvl = 200;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }

    _createClass(_class, [{
        key: 'addPath',
        value: function addPath(path) {
            try {
                if ('string' != typeof path) {
                    throw new Error('invalid parameter');
                }
                if (true === this.loading) {
                    throw new Error('Loader is busy');
                }
                /* check duplex */
                for (var load_path_idx in this.load_path) {
                    if (path == this.load_path[load_path_idx][0]) {
                        /* already  added */
                        return;
                    }
                }
                /* add load target path */
                this.load_path.push(new Array(path, false));
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
    }, {
        key: 'load',
        value: function load(cb_func, cb_prm, force) {
            try {
                /* check busy */
                if (true === this.loading) {
                    throw new Error('Loader is busy');
                }
                this.loading = true;

                /* set callback function */
                if (null !== cb_func) {
                    this.callback[0] = cb_func;
                    this.callback[1] = cb_prm;
                }
                var p_force = force || false;

                for (var load_path_idx in this.load_path) {
                    /* check loaded */
                    if (true === this.load_path[load_path_idx][1]) {
                        /* already loaded */
                        if (false === p_force) {
                            /* skip load */
                            continue;
                        }
                    }

                    /* load javascript */
                    var own_loader = this;
                    $.getScript(this.base_path + this.load_path[load_path_idx][0], function () {
                        try {
                            own_loader.loadedElem();
                        } catch (e) {
                            console.error(e.stack);
                        }
                    });
                }
                this.chkLoad(0);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
    }, {
        key: 'loadedElem',
        value: function loadedElem() {
            try {
                this.load_cnt++;
                if (this.load_cnt === this.load_path.length) {
                    /* finished load */
                    /* update loaded flag */
                    for (var load_path_idx in this.load_path) {
                        this.load_path[load_path_idx][1] = true;
                    }
                    /* check callback function */
                    if (null !== this.callback[0]) {
                        var cb_func = this.callback[0];
                        var cb_parm = this.callback[1];
                        setTimeout(function () {
                            try {
                                cb_func(cb_parm);
                            } catch (e) {
                                console.error(e.stack);
                            }
                        }, this.load_intvl);
                        this.callback[0] = null;
                        this.callback[1] = null;
                    }
                    this.loading = false;
                }
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
    }, {
        key: 'chkLoad',
        value: function chkLoad(idx) {
            try {
                var load_flg = true;
                for (var load_path_idx in this.load_path) {
                    if (false === this.load_path[load_path_idx][1]) {
                        load_flg = false;
                        break;
                    }
                }
                if (false === load_flg) {
                    if (idx * 100 > this.timeout) {
                        throw new Error('timeout load js : ' + this.base_path + this.load_path[load_path_idx][0]);
                    }
                    var own_loader = this;
                    setTimeout(function () {
                        try {
                            own_loader.chkLoad(idx + 1);
                        } catch (e) {
                            console.error(e.stack);
                        }
                    }, 100);
                }
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
    }]);

    return _class;
}();

ttrg.load.JsSeri = function () {
    /**
     * initialize js loader
     *
     */
    function _class2(bp) {
        _classCallCheck(this, _class2);

        try {
            this.base_path = bp || './';
            this.load_path = new Array();
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }

    _createClass(_class2, [{
        key: 'addPath',
        value: function addPath(path) {
            try {
                if ('string' != typeof path) {
                    throw new Error('invalid parameter');
                }
                if (true === this.loading) {
                    throw new Error('Loader is busy');
                }
                /* check duplex */
                for (var load_path_idx in this.load_path) {
                    if (path == this.load_path[load_path_idx][0]) {
                        /* already  added */
                        return;
                    }
                }
                /* add load target path */
                this.load_path.push(path);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
    }, {
        key: 'load',
        value: function load(force) {
            try {
                /* check stock */
                this.loadElm();
            } catch (e) {
                throw new Error(e.stack);
            }
        }
    }, {
        key: 'loadElm',
        value: function loadElm(idx) {
            try {
                var _idx = idx || 0;
                var own_obj = this;
                $.ajax({
                    url: this.base_path + this.load_path[_idx],
                    type: 'GET',
                    cache: false,
                    dataType: 'script',
                    async: false
                }).done(function (jqXHR, textStatus, errorThrown) {
                    try {
                        if (_idx < own_obj.load_path.length - 1) {
                            own_obj.loadElm(_idx + 1);
                        }
                    } catch (e) {
                        console.error(e.stack);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    throw new Error(textStatus);
                }).always(function (data, textStatus, errorThrown) {});
            } catch (e) {
                throw new Error(e.stack);
            }
        }
    }]);

    return _class2;
}();

/**
 * load css
 *
 * @param path to target css
 */
ttrg.load.css = function (path) {
    try {
        $('head').append('<link>');
        css = $('head').children(':last');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: path
        });
    } catch (e) {
        throw new Error(e.stack);
    }
};

/**
 * brief load html
 * 
 * @param hpath : (string) path to html file
 * @param h_id : (string) insert the destination 'id' attribute of html tag
 */
ttrg.load.html = function (h_path, h_id) {
    try {
        $.ajax({
            url: h_path,
            type: 'GET',
            cache: false,
            dataType: 'html',
            async: false
        }).done(function (jqXHR, textStatus, errorThrown) {
            $('#' + h_id).html(jqXHR);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            throw new Error();
        }).always(function (data, textStatus, errorThrown) {});
    } catch (e) {
        throw new Error(e.stack);
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ttrg.rest.private = {};
ttrg.rest.get = function (uri, data, func, prm) {
    try {
        ttrg.rest.private.request(uri, 'GET', data, func, prm);
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

ttrg.rest.post = function (uri, data, func, prm) {
    try {
        if (null == data) {
            throw new Error('invalid parameter');
        }
        ttrg.rest.private.request(uri, 'POST', data, func, prm);
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

ttrg.rest.private.request = function (uri, type, data, func, prm) {
    try {
        $.ajax({
            url: uri,
            type: type,
            dataType: 'json',
            data: data
        }).done(function (jqXHR, textStatus, errorThrown) {
            try {
                if (null != func) {
                    if (null == prm) {
                        func(jqXHR);
                    } else {
                        func(jqXHR, prm);
                    }
                }
            } catch (e) {
                console.error(e.stack);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('send request is failed');
        }).always(function (data, textStatus, errorThrown) {});
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ttrg.time.getDate = function () {
    try {
        var date = new Date();
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

ttrg.time.getTime = function () {
    try {
        var time = new Date();
        return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

ttrg.time.getUnix = function () {
    try {
        var start = new Date();
        return start.getTime();
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ttrg.url.getParam = function () {
    try {
        var ret_val = new Array();
        var prm = document.location.search;
        if ("" == prm) {
            return null;
        }
        prm = prm.substring(1);
        var ret_flg = false;
        var prm_array = prm.split('&');
        for (var prm_array_idx in prm_array) {
            var key_val = prm_array[prm_array_idx].split('=');
            if (2 != key_val.length) {
                continue;
            }
            ret_flg = true;
            ret_val[decodeURIComponent(key_val[0])] = decodeURIComponent(key_val[1]);
        }
        if (false === ret_flg) {
            return null;
        }
        return new tetraring.array.Keyval(ret_val);
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ttrg"] = __webpack_require__(8);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
    "use strict";

    if (_typeof(module.exports) === "object") {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error("requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {
    "use strict";

    return {
        arry: {}, /* array */
        debg: {}, /* debug */
        init: {}, /* init */
        load: {}, /* loader */
        rest: {}, /* rest */
        time: {}, /* time */
        url: {} /* url */
    };
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(0);
__webpack_require__(2);

/***/ })
/******/ ]);