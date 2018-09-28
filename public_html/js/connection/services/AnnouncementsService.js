class AnnouncementsService extends ConnectionAjax {

    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];
        try {
            for (let i = 0; i < dt.length; i++) {
                let curr_ann = dt[i];
                let announcement = new Announcement(curr_ann.id, curr_ann.content, curr_ann.user_id , curr_ann.date_created);
                announcement.insert();
                announcement.toMemory();
            }

        } catch (e) {
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
