
ttrg.ini.addLoadEvt = function (fnc) {
    try {
        if ((null === fnc) || ('function' !== (typeof fnc))) {
            throw new Error('invalid parameter');
        }
        
        if( window.addEventListener ) {
            window.addEventListener('load', fnc, false);
        } else if( window.attachEvent ) {
            window.attachEvent('onload', fnc);
        } else {
            window.onload = fnc;
        }
    } catch (e) {
        console.log(e.stack);
        throw e;
    }
}
