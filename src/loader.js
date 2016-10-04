        tetraring.loader          = {};
        tetraring.loader.JsPara = class {
            /**
             * initialize js loader
             *
             */
            constructor (bp) {
                try {
                    this.base_path  = bp || './'; 
                    this.load_path  = new Array();
                    this.callback   = new Array(null,null);
                    this.load_cnt   = 0;
                    this.loading    = false;
                    this.timeout    = 0;
                    this.load_intvl = 200;
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
            
            load (cb_func, cb_prm, force) {
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
                    var p_force  = force || false;
                    
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
                        if (null !== this.callback[0]) {
                            var cb_func = this.callback[0];
                            var cb_parm = this.callback[1];
                            setTimeout(
                                function() {
                                    try {
                                        cb_func(cb_parm);
                                    } catch (e) {
                                        console.error(e.stack);
                                    }
                                },
                                this.load_intvl
                            );
                            this.callback[0] = null;
                            this.callback[1] = null;
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
        tetraring.loader.JsSeri = class {
            /**
             * initialize js loader
             *
             */
            constructor (bp) {
                try {
                    this.base_path  = bp || './';
                    this.load_path  = new Array();
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
                    this.load_path.push(path);
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            load (force) {
                try {
                    /* check stock */
                    this.loadElm();
                } catch (e) {
                    throw new Error(e.stack);
                }
            }
            
            loadElm (idx) {
                try {
                    var _idx    = idx || 0;
                    var own_obj = this;
                    $.ajax({
                        url      : this.base_path + this.load_path[_idx] ,
                        type     : 'GET'       ,
                        cache    : false       ,
                        dataType : 'script'    ,
                        async    : false
                    })
                    .done(function(jqXHR, textStatus, errorThrown) {
                        try {
                            if (_idx < (own_obj.load_path.length-1)) {
                                this.jsSeri(_idx+1);
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
                    url      :  h_path ,
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
