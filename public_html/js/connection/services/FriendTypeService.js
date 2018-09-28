class FriendTypeService extends ConnectionAjax {
    constructor(data = {}, method, url, callbackSuccess, callbackError) {
        super(data, method, url);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['friend_type'];

        for (let i = 0; i < dt.length; i++) {
            let data = dt[i];

            let friendtype = new FriendType(data.id, data.description);
            friendtype.toMemory();
            friendtype.insert();

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
