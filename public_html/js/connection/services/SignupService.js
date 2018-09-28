class SignupService extends ConnectionAjax {

    constructor(data = {}, method, url,auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        console.log(data);
        if (this.callbackSucc !== undefined) {
            this.callbackSucc(data);
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
