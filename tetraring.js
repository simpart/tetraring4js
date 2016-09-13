
try {
    if (typeof tetraring === "undefined"){
        var tetraring  = {};
        tetraring.conf = {};
        tetraring.conf.baseUrl = '';
        tetraring.conf.loaded  = false;
        $.getScript(tetraring.conf.baseUrl + '/src/loader.js', function() {
            try {
                tetraring.loader.js(
                    [tetraring.conf.baseUrl + '/src/rest.js'],
                    function(){
                        tetraring.conf.loaded = true;
                    },null
                );
            } catch (e) {
                console.error(e.stack);
            }
        });
    } else {
        throw new Error('tetraring is already defined');
    }
} catch (e) {
    console.error(e.stack);
}

/* end of file */
