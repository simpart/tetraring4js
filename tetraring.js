var Gtrg_baseurl = '';

try {
    if (typeof tetraring === "undefined"){
        var tetraring = {};
        $.getScript(Gtrg_baseurl+'/src/loader.js', function(){
            try {
                
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
