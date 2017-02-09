
ttrg.time.getDate = function () {
    try {
        var date = new Date();
        return date.getFullYear()  + '/' + 
               (date.getMonth()+1) + '/' + 
               date.getDate();
        
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

ttrg.time.getTime = function () {
    try {
        var time = new Date();
        return time.getHours()   + ':' +
               time.getMinutes() + ':' +
               time.getSeconds();
        
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};

ttrg.time.getUnix = function () {
    try {
        var start = new Date();
        return start.getTime();
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
};
