const ServerDomain = "http://localhost:4500/";

class ConnectionAjax {
    constructor(data = {}, method = "POST", url = "", auth, token) {
        this.method = method;
        this.domain = ServerDomain;
        this.url = this.domain + url;
        this.data = data;
        this.authorization = auth || false;
        this.token = token;
        console.log(this.authorization);
    }

    init() {
        if (this.authorization)
            this.ajaxAuth();
        else
            this.ajaxNotAuth();
    }

    //TODO: CLEAR EVERYTHING ON ERRORS - REDIRECTS
    ajaxNotAuth() {
        let self = this;
        $.ajax({
            method: self.method,
            url: self.url,
            data: self.data,
            success: function (data) {
                //var data = JSON.parse(data);
                if (data.error) {
                    self.failure(data);
                } else {
                    self.success(data);
                }
            },
            error: function (code, msg) {
                self.fatal(code, msg);
            }
        });
    }

    ajaxAuth() {
        let self = this;
        $.ajax({
            method: self.method,
            url: self.url,
            data: self.data,
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + self.token
            },
            success: function (data) {
                //var data = JSON.parse(data);
                if (data.error) {
                    self.failure(data);
                } else {
                    self.success(data);
                }
            },
            error: function (code, msg) {
               self.fatal(code, msg);
            }
        });
    }

    success(data) {
        console.log(data);
    }

    fatal(code, msg) {
        if (code.status === 401) {
            utility.toast.info("Unauthorized request, please login first");
            master.paging.redirect("login");
        }
        else if (code.status === 400) {
            utility.toast.info("Email exists, please try another one");
            master.paging.redirect("login");
        } else if(code.status === 403){
            utility.toast.info("Authentication failed, please try again");
        }
        else {
            utility.toast.info(msg.statusText);
            master.paging.redirect("login");
        }
    }

    failure(data) {
        console.log(data);
    }
}