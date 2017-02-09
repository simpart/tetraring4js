
ttrg.url.getParam = function() {
    try {
        var ret_val = new Array();
        var prm = document.location.search;
        if ("" == prm) {
            return null;
        }
        prm = prm.substring(1);
        var ret_flg   = false;
        var prm_array = prm.split('&');
        for (var prm_array_idx in prm_array) {
            var key_val = prm_array[prm_array_idx].split('=');
            if (2 != key_val.length) {
                continue;
            }
            ret_flg = true;
            ret_val[decodeURIComponent(key_val[0])] = decodeURIComponent(key_val[1]);
        }
        if (false === ret_flg) {
            return null;
        }
        return new tetraring.array.Keyval(ret_val);
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};
