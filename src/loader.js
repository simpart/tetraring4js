/**
 * @file   loader.js
 * @brief  loader of html,js,css file
 * @author simpart
 * @note   MIT license
 */
/*** initial ***/
$(function() {
    try {
        tetraring.loader = {};
        tetraring.loader.jsCnt      = new Array(7);
        tetraring.loader.jsList     = new Array();
        tetraring.loader.jsPathList = new Array();
        tetraring.loader.jsCheker   = null;
        tetraring.loader.private    = {};
        
        var loop = 0;
        for(loop=0; loop < tetraring.loader.jsCnt.length ; loop++) {
            tetraring.loader.jsCnt[loop] = 0;
        }
        
        /* set javascript loader */
        /**
         * parallel javascript loader
         * 
         * @param paths : (array) target javascript file paths
         * @param func : (object) callback function
         * @param prm : (mixed) paramter of callback function
         */
        tetraring.loader.js = function(paths, func, prm) {
            try {
                if( (null == paths) || (paths.length == 0) ) {
                    throw new Error('invalid parameter');
                }
                var pval = prm || null;
                
                if (0 === tetraring.loader.jsCnt[0]) {
                    tetraring.loader.private.jsElem(0, paths, func, pval);
                } else if(0 === tetraring.loader.jsCnt[1]) {
                    tetraring.loader.private.jsElem(1, paths, func, pval);
                } else if(0 === tetraring.loader.jsCnt[2]) {
                    tetraring.loader.private.jsElem(2, paths, func, pval);
                } else if(0 === tetraring.loader.jsCnt[3]) {
                    tetraring.loader.private.jsElem(3, paths, func, pval);
                } else if(0 === tetraring.loader.jsCnt[4]) {
                    tetraring.loader.private.jsElem(4, paths, func, pval);
                } else if(0 === tetraring.loader.jsCnt[5]) {
                    tetraring.loader.private.jsElem(5, paths, func, pval);
                } else if(0 === tetraring.loader.jsCnt[6]) {
                    tetraring.loader.private.jsElem(6, paths, func, pval);
                } else {
                    throw new Error('burst js loading stack.');
                }
            } catch (e) {
                throw new Error(e.stack);
            }
        }
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
        }
        
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
        }
        
        /* set loader private function */
        tetraring.loader.private.jsElem = function(idx, paths, func, pval) {
            try {
                tetraring.loader.jsCnt[idx] = paths.length;
                var chk_flg = false;
                for(var p_idx in paths) {
                    chk_flg = false;
                    for(var c_idx in tetraring.loader.jsPathList) {
                        if(paths[p_idx] == tetraring.loader.jsPathList[c_idx]) {
                            chk_flg = true;
                            break;
                        }
                    }
                    if(true == chk_flg) {
                        tetraring.loader.jsCnt[idx]--;
                        continue;  // already loaded , next js
                    }
                    // js load
                    tetraring.loader.jsPathList.push( paths[p_idx] );
                    var cnt_idx = idx;
                    $.getScript(paths[p_idx] ,
                        function(src,sts,obj) {
                            try {
                                tetraring.loader.jsCnt[cnt_idx]--;
                            } catch( e ) {alert( e.stack );}
                        }
                    );
                }
                tetraring.loader.private.waitJs(idx, func, pval);
            } catch (e) {
                throw new Error(e.stack);
            }
        };
        
        tetraring.loader.private.waitJs = function(idx, func, pval) {
            try {
                if( 0 == tetraring.loader.jsCnt[idx] ) {
                    if( null != func ) {
                        if ( null == pval ) {
                            func();
                        } else {
                            func(pval);
                        }
                    }
                    return;
                } else {}
                setTimeout(function (p1, p2, p3) {
                    try {
                        tetraring.loader.private.waitJs(p1, p2, p3);
                    } catch (e) {
                        console.error(e.stack);
                    }
                }, 200, idx, func, pval);
            } catch (e) {
                throw new Error(e.stack);
            }
        }
    } catch (e) {
        console.error(e.stack);
    }
});
/* end of file */
