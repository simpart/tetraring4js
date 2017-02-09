ttrg.arry.Keyval = class {
    constructor (dat) {
        try {
            if (null === dat) {
                throw new Error('invalid parameter');
            }
            this.data = dat;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getValue (key) {
        try {
            if ((null === key) || ('' == key)) {
                throw new Error('invalid parameter');
            }
            if (false === this.isKeyExists(key)) {
                return null;
            }
            return this.data[key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
            
    isKeyExists (key) {
        try {
            if ((null === key) || ('' == key)) {
                throw new Error('invalid parameter');
            }
            for (var data_key in this.data) {
                if (data_key === key) {
                    return true;
                }
            }
            return false;
        } catch (e) {
             console.error(e.stack);
             throw e;
        }
    }
    
    getCount () {
        try {
            var ret = 0;
            for (var data_key in this.data) {
                ret++;
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
