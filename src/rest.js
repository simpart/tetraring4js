
ttrg.rest.private = {};
ttrg.rest.get = function(uri, data, func, prm) {
    try {
        ttrg.rest.private.request(uri, 'GET', data, func, prm);
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
}

ttrg.rest.post = function(uri, data, func, prm) {
    try {
        if (null == data) {
            throw new Error('invalid parameter');
        }
        ttrg.rest.private.request(uri, 'POST', data, func, prm);
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
}
        
ttrg.rest.private.request = function(uri, type, data, func, prm) {
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
                 console.error( e.stack );
             }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            console.error('send request is failed');
        })
        .always(function( data, textStatus, errorThrown ) {});
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}
