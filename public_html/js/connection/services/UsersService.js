class UsersService extends ConnectionAjax {
    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];

        for (let i = 0; i < dt.length; i++) {
            let data = dt[i];
            let user = new User(data.id, data.email, null, data.name, data.surname, data.birthdate,
                data.mobile_tel, data.image_id, data.user_type, data.date_created, data.date_updated, 0);
            user.toMemory();
            user.insert();
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
