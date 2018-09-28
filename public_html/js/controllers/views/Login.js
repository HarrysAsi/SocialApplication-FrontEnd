class Login extends Controller {
    constructor(params, bundle) {
        super("login", "login", params);
        super.redirect();
        this.formHelper = null;
    }

    init() {
        var attributes = [{attribute: "email", type: "email"}, {attribute: "password", type: "password"}];
        let user = new User();
        var models = [user];
        var form_name = "login-form";
        this.formHelper = new FormHelper(models, attributes, form_name);
        this.formHelper.button_id = "login_button";
        var str = this.formHelper.main_str();

        $("#login").append(str);
    }

    bindEvents() {
        var self = this;
        $("#signup_view").click(function () {
            master.paging.redirect("signup");
        });

        this.formHelper.bindEvents(function () {
            self.bindFormEvents();
        });
    }

    bindFormEvents() {
        $("#login_button").click(function (e) {
            e.preventDefault();
            master.sharedPref.succeedFirstTime();
            let email = $("#email").val();
            let password = $("#password").val();
            let data = {email: email, password: password};
            new LoginService(data, "POST", "users/login", false, "", function (data) {
                utility.toast.success("Logged in successfully");
                master.paging.redirect("loader");
                master.sharedPref.succeedFirstTime();
                master.sharedPref.succeedLogIn(email, password, data['user']['token']);
                new AllModelsService({userId: data['user'].id}, "POST", "all-models", true, master.sharedPref.getToken(), function (dt) {
                    server.connect();
                    new GlobalFriendsConnection();
                    new ChatConnection();
                    master.paging.redirect("main");
                });
            }, function(err){
                $("#email").val('');
                $("#password").val('');
            });
        });
    }


}