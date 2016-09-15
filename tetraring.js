
try {
    if (typeof tetraring === "undefined"){
        var tetraring          = {};
        tetraring.mng          = {};
        tetraring.mng.isloaded = false;
        tetraring.mng.loadflg  = {
            'loader' : false,
            'rest'   : false
        }
        tetraring.mng.chkLoad  = function() {
            try {
                for (var key in tetraring.mng.loadflg) {
                    if(false === tetraring.mng.loadflg[key]) {
                        setTimeout(tetraring.mng.chkLoad,100);
                        return;
                    }
                }
                tetraring.mng.isloaded = true;
            } catch (e) {
                console.error(e.stack);
            }
        }
        tetraring.conf         = {
            'baseurl' : './src/js/lib/tetraring4js'
        };
        
        /* initialize */
        $.getScript(tetraring.conf.baseurl + '/src/loader.js');
        $.getScript(tetraring.conf.baseurl + '/src/rest.js');
        
        tetraring.mng.chkLoad();
    } else {
        throw new Error('tetraring is already defined');
    }
} catch (e) {
    console.error(e.stack);
}

/* end of file */
