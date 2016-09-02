
try {
    if (typeof tetraring === "undefined"){
        var tetraring  = {};
        tetraring.conf = {};
        tetraring.conf.baseUrl = '';
        tetraring.conf.loaded  = false;
        $.getScript(tetraring.conf.baseUrl + '/src/loader.js', function() {
            try {
                tetraring.conf.loaded = true;
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
