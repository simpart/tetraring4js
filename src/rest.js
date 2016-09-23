        tetraring.rest = {};
        tetraring.rest.private = {};
        tetraring.rest.get     = function(uri, data, func, prm) {
            try {
                tetraring.rest.private.request(uri, 'GET', data, func, prm);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
        
        tetraring.rest.post = function(uri, data, func, prm) {
            try {
                if (null == data) {
                    throw new Error('invalid parameter');
                }
                tetraring.rest.private.request(uri, 'POST', data, func, prm);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
        
        tetraring.rest.private.request = function(uri, type, data, func, prm) {
            try {
                $.ajax({
                    url         : uri    ,
                    type        : type   ,
                    dataType    : 'json' ,
                    data        : data
                })
                .done(function(jqXHR, textStatus, errorThrown) {
                    try {
                        if( null != func ) {
                            if( null == prm ) {
                                func(jqXHR);
                            } else {
                                func(jqXHR, prm);
                            }
                        }
                    } catch( e ) {
                        alert( e.stack );
                    }
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    try {
                        
                    } catch( e ) {
                        console.error(e.stack);
                    }
                })
                .always(function( data, textStatus, errorThrown ) {});
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
