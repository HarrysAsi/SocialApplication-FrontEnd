class LoginService extends ConnectionAjax {

    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];
        try {
            let user_data = dt['user'];
            console.log
            let user = new User(user_data.id, user_data.email, null, user_data.name, user_data.surname, user_data.birthdate,
                user_data.mobile_tel, user_data.image_id, user_data.user_type, user_data.country, user_data.date_created, user_data.date_updated, 1);
            user.insert();
            user.toMemory();

            let user_image = dt['user_image'];
            for(let ob in user_image) {
                let curr_img = user_image[ob];
                let image = new Imaging(curr_img.id, curr_img.image, curr_img.description, curr_img.date_uploaded);
                image.insert();
                image.toMemory();
            }
        }catch (e) {
            console.log(e);
            this.callbackErr(dt);
        }
        if (this.callbackSucc !== undefined) {
            this.callbackSucc(dt);
        }

    }

    fatal(data) {
        super.fatal(data);
        if (this.callbackErr !== undefined) {
            this.callbackErr(data);
        } else {
            console.log("error", data);
        }
    }

}
