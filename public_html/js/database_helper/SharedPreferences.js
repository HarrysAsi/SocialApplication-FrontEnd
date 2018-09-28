class SharedPreferences {

    constructor(data) {
        this.isFirstTime = false;
        this.init();
    }

    init(callback = function() {}){
        var firstTime = localStorage.getItem("exists");
        if (firstTime === null) {
            this.isFirstTime = true;
            callback(true);
        } else {
            callback(false);
    }
    }

    succeedFirstTime() {
        master.sharedPref.isFirstTime = false;
        localStorage.setItem("exists", "true");
    }

    succeedLogIn(username, password, token) {
        localStorage.setItem("email", username);
        localStorage.setItem("password", password);
        localStorage.setItem("token", token);
    }

    getToken(){
        let token = localStorage.getItem("token");
        return token;
    }

    getPassword(){
        let pass = localStorage.getItem("password");
        return pass;
    }

    removeSharedPreferences() {
        master.sharedPref.isFirstTime = true;
        localStorage.removeItem("exists");
        localStorage.removeItem("timeUploaded");
        localStorage.removeItem("timeSynced");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }

}