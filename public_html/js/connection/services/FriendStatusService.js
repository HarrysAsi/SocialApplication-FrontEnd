class FriendStatusService extends ConnectionAjax {
    constructor(data = {}, method, url, callbackSuccess, callbackError) {
        super(data, method, url);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['friend_status'];

        for (let i = 0; i < dt.length; i++) {
            let data = dt[i];
            
            let friendstatus = new FriendStatus(data.id, data.description);
            friendstatus.toMemory();
            friendstatus.insert();
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
