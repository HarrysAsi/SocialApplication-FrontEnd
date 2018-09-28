class GlobalUsersService extends ConnectionAjax {
    constructor(data = {}, method, url, callbackSuccess, callbackError) {
        super(data, method, url);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['non-friends'];
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
