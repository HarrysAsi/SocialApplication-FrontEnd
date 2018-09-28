class FriendRequestService extends ConnectionAjax {
    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];
        let users = dt['users'];
        console.log(users);
        for (let ob in users) {
            let curr_user = users[ob];
            let currrent_user = new User(curr_user.id, curr_user.email, null, curr_user.name, curr_user.surname,
                curr_user.birthdate, curr_user.mobile_tel, curr_user.image_id, curr_user.user_type, curr_user.country,
                curr_user.date_created, curr_user.date_updated);
            currrent_user.insert();
            currrent_user.toMemory();
        }

        let friend_requests = dt['friend_requests'];
        console.log(friend_requests);
        let i = 0;
        for (let ob in friend_requests) {
            let curr_req = friend_requests[ob];
            let current_request = new FriendRequest(curr_req.sender_user_id, curr_req.sender_user_id, curr_req.receiver_user_id, curr_req.status_id, curr_req.date_created);
            current_request.insert();
            current_request.toMemory();
            i++;
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
