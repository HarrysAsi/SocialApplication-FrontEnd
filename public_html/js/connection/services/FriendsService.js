class FriendsService extends ConnectionAjax {
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
            let friend = new Friend(data.friend_id, data.user_id, data.friend_id, data.friend_type, data.friend_status);
            friend.toMemory();
            friend.insert();
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
