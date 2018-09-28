class LoginConnection extends ConnectionAjax {

    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];
        try {
            console.log(dt);
            let user = new User(dt.id, dt.email, null, dt.name, dt.surname, dt.birthdate,
                dt.mobile_tel, dt.image_id, dt.user_type, dt.country, dt.date_created, dt.date_updated, 1);
            console.log(user);
            user.insert();
            user.toMemory();
            //Connect with server
        }catch (e) {
            console.log(e);
            this.callbackErr(dt);
        }
        if (this.callbackSucc !== undefined) {
            this.callbackSucc(dt);
        }

    }

    failure(data) {
        if (this.callbackErr !== undefined) {
            this.callbackErr(data);
        } else {
            console.log("error", data);
        }
    }

}
