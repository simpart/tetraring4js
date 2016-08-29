function dumpObj(obj) {
    var ret_str = "";
    for (var i in obj){
        ret_str += i + "=" + obj[i] + "\n";
    }
    return ret_str;
}
