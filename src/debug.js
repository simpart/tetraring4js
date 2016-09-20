
$(function() {
    try {
        tetraring.debug = {};
        tetraring.debug.dumpObj = function(obj) {
            try {
                var ret_str = "";
                for (var i in obj) {
                    ret_str += i + "=" + obj[i] + "\n";
                }
                return ret_str;
            } catch (e) {
                throw new Error(e.stack);
            }
        }
        tetraring.mng.loadflg.debug = true;
    } catch (e) {
        console.error(e.stack);
    }
});
/* end of file */
