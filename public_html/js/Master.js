class Master {
    constructor(data) {
        this.paging = new Paging();
        this.device = new Device();
        this.sharedPref = new SharedPreferences();
        this.db = new Database();
        this.server = new ServerConnection();
        this.connection_instances = null;
    }

    initialize() {
        var self = this;
        console.log(this.sharedPref.isFirstTime);
        self.db.init(function () {
            self.sharedPref.init(function () {
                if (self.sharedPref.isFirstTime) {
                    self.paging.redirect("login");
                } else {
                    self.paging.redirect("main");
                }
                console.log("Creating database");
            });

//            if (!navigator.onLine) {
//                //if device has network / connection
//                alert("check your internet connection");
//            } else {
//                //if device is ready and supports the appy
//                self.device.init(function () {
//                    //if database can be created
//                    self.db.init(function () {
//                        //if function return false, the user will be created
//                        // and redirected to register page;
//                        if (self.sharedPref.isFirstTime) {
//                            self.paging.redirect("register");
//                        } else {
//                            //self.paging.redirect("splash");
//                        } 
//                    });
//                });
//            }

        });
    }

    // clearCache() {
    //     this.db.dropDatabase();
    //     this.db.isFirstTime = true;
    //     this.sharedPref.removeSharedPreferences();
    //     this.sharedPref.isFirstTime = true;
    //     runtime.removeAllInstances;
    //     this.initialize();
    // }


}

var master = new Master();


$(document).ready(function () {
    master.initialize();
});