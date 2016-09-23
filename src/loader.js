        tetraring.loader    = {};
        tetraring.base_path = "./";
        tetraring.loader.JsLoader = class {
            /**
             * initialize js loader
             *
             * @param bp : (string) base path
             */
            constructor (bp) {
                try {
                    var p_bp = bp || './';
                    this.base_path = p_bp;
                    this.load_path = new Array();
                    this.callback  = null;
                    this.load_cnt  = 0;
                    this.loading   = false;
                    this.timeout   = 0;
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            addPath (path) {
                try {
                    if ('string' != (typeof path)) {
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
            
            setCallback (func, prm) {
                try {
                    var p_prm = prm || null;
                    if (null === func) {
                        throw new Error('invalid param');
                    }
                    this.callback = new Array(func, p_prm);
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            load (force) {
                try {
                    if (true === this.loading) {
                        throw new Error('Loader is busy');
                    }
                    this.loading = true;
                    
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
                        $.getScript(
                            this.base_path + this.load_path[load_path_idx][0],
                            function() {
                                try {
                                    own_loader.loadedElem();
                                } catch (e) {
                                    console.error(e.stack);
                                }
                            }
                        );
                    }
                    
                    /* check load finish */
                    /* set load timeout */
                    if (0 === this.timeout) {
                        this.timeout = this.load_path.length * 200;
                    }
                    setTimeout(
                        function() {
                            try {
                                own_loader.chkLoad();
                            } catch (e) {
                                console.error(e.stack);
                            }
                        },
                        this.timeout
                    );
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            loadedElem () {
                try {
                    this.load_cnt++;
                    if (this.load_cnt === this.load_path.length) {
                        /* finished load */
                        /* update loaded flag */
                        for (var load_path_idx in this.load_path) {
                            this.load_path[load_path_idx][1] = true;
                        }
                        /* check callback function */
                        if (null !== this.callback) {
                            this.callback[0](this.callback[1]);
                        }
                        this.loading = false;
                    }
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            chkLoad() {
                try {
                    for (var load_path_idx in this.load_path) {
                        if (false === this.load_path[load_path_idx][1]) {
                            throw new Error('timeout load js : ' + this.base_path + this.load_path[load_path_idx][0]);
                        }
                    }
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
        };
        
        tetraring.loader.jsSerial = function (path, idx) {
            try {
                var p_idx = idx || 0;
                if ((null === path) || (0 === path.length)) {
                    throw new Error('invalid paramter');
                }
                $.ajax({
                    url      : path[p_idx] ,
                    type     : 'GET'       ,
                    cache    : false       ,
                    dataType : 'script'    ,
                    async    : false
                })
                .done(function(jqXHR, textStatus, errorThrown) {
                    try {
                        if (p_idx < path.length-1) {
                            tetraring.loader.jsSerial(path, p_idx+1);
                        }
                    } catch (e) {
                        console.error(e.stack);
                    }
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    throw new Error(textStatus);
                })
                .always(function(data, textStatus, errorThrown) {});
            } catch (e) {
                throw new Error(e.stack);
            }
        };
        
        /* set css loader */
        /**
         * load css
         *
         * @param path to target css
         */
        tetraring.loader.css = function(path) {
            try {
                $('head').append('<link>');
                css = $('head').children(':last');
                css.attr({
                    rel:  'stylesheet',
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
        tetraring.loader.html = function(h_path, h_id) {
            try {
                $.ajax({
                    url      : h_path ,
                    type     : 'GET'  ,
                    cache    : false  ,
                    dataType : 'html' ,
                    async    : false
                })
                .done(function(jqXHR, textStatus, errorThrown) {
                    $( '#' + h_id ).html(jqXHR);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    throw new Error();
                })
                .always(function(data, textStatus, errorThrown) {});
            } catch (e) {
                throw new Error(e.stack);
            }
        };
