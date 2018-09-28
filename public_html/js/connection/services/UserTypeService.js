class UserTypeService extends ConnectionAjax {
    constructor(data = {}, method, url, callbackSuccess, callbackError) {
        super(data, method, url);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['user_types'];

        for (let i = 0; i < dt.length; i++) {
            let data = dt[i];
            let user_type = new UserType(data.id, data.description, data.descr_represent);
            user_type.insert();
            user_type.toMemory();
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
