class ImagingService extends ConnectionAjax {
    constructor(data = {}, method, url, callbackSuccess, callbackError) {
        super(data, method, url);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['images'];

        for (let i = 0; i < dt.length; i++) {
            let data = dt[i];
            let image = new Imaging(data.id, data.image, data.description, data.date_uploaded);
            image.toMemory();
            image.insert();


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
