
ttrg.dbg.dumpObj = function(obj) {
    try {
        var ret_str = "";
        for (var i in obj) {
            ret_str += i + "=" + obj[i] + "\n";
        }
        return ret_str;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}
