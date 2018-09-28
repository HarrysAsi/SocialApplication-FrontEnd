class AnnouncementLikesService extends ConnectionAjax {

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
                let curr_ann_like = dt[i];
                let announcementLikes = new AnnouncementLikes(curr_ann_like.announcement_id, curr_ann_like.user_id, curr_ann_like.announcement_id , curr_ann_like.date_created);
                announcementLikes.insert();
                announcementLikes.toMemory();
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
