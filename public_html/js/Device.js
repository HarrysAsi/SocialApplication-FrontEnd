/* global Connection, device */

class Device {

    constructor() {
        this.platform ;
        this.connection;
        this.init();
    }

    init(callback = function() {}){
        this.platform = this.getPlatformName();
        this.connection = this.checkConnection();
        console.log(this.platform);
        callback();
    }

    checkConnection() {
        if (navigator.onLine){
            return true;
        }
        return false;
        // var networkState = navigator.connection;
        //
        // var states = {};
        // states[Connection.UNKNOWN] = 'Unknown connection';
        // states[Connection.ETHERNET] = 'Ethernet connection';
        // states[Connection.WIFI] = 'WiFi connection';
        // states[Connection.CELL_2G] = 'Cell 2G connection';
        // states[Connection.CELL_3G] = 'Cell 3G connection';
        // states[Connection.CELL_4G] = 'Cell 4G connection';
        // states[Connection.CELL] = 'Cell generic connection';
        // states[Connection.NONE] = 'No network connection';
        // console.log(networkState);
        // return states[networkState];

    }

    getPlatformName() {
        
        if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
            return "mobile";
        } else {
            return "browser";
        }
    }

}

