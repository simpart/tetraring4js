function Fjsn_sendReq(rtype, uri, data, func, fprm) {
    try {
        var func_prm = fprm;
        $.ajax({
             url         : uri ,
             type        : rtype  ,
             dataType    : 'json' ,
             data        : data
        })
        .done(function(jqXHR, textStatus, errorThrown) {
            try {
                if( null != func ) {
                    if( null == func_prm ) {
                        func(jqXHR);
                    } else {
                        func(jqXHR, func_prm);
                    }
                }
            } catch( e ) {
                alert( e.stack );
            }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            try {
                alert( "send request is faied" );
            } catch( e ) {
                alert( e.stack );
            }
        })
        .always(function( data, textStatus, errorThrown ) {});
    } catch( e ) {
         alert( e.stack );
    }
}
