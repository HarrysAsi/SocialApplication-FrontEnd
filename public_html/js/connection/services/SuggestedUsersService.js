class SuggestedUsersService extends ConnectionAjax {

    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];
        console.log(dt);

        for(let ob in dt){
            let curr_user = dt[ob];
            runtime.suggested_users[curr_user.id] = new User(curr_user.id, curr_user.email, null, curr_user.name,
                curr_user.surname, curr_user.birthdate, curr_user.mobile_tel, curr_user.image_id, curr_user.user_type,
                curr_user.country, curr_user.date_created, curr_user.date_updated);
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
