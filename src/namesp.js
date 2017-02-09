( function( global, factory ) {
    "use strict";
    if (
         (typeof module.exports === "object") ) {
        module.exports = global.document ?factory( global, true ) :
                         function( w ) {
                             if ( !w.document ) {
                                 throw new Error( "requires a window with a document" );
                             }
                             return factory( w );
                         };
	} else {
		factory( global );
	}

} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    "use strict";
    return {
        arry : {},  /* array */
        debg : {},  /* debug */
        init : {},  /* init */
        load : {},  /* loader */
        rest : {},  /* rest */
        time : {},  /* time */
        url  : {}   /* url */
    };
});
