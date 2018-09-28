class Signup extends Controller {
    constructor(params, bundle) {
        super("signup", "signup", params);
        super.redirect();
        this.formHelper = null;
    }

    init() {
        var attributes = [
            {attribute: "email", type: "email"},
            {attribute: "password", type: "password"},
            {attribute: "name", type: "text"},
            {attribute: "surname", type: "text"},
            {attribute: "birthdate", type: "date"},
            {attribute: "mobile_tel", type: "text"}
            ];
        let user = new User();
        var models = [user];
        var form_name = "signup_form";
        this.formHelper = new FormHelper(models, attributes, form_name);
        this.formHelper.button_id = "signup_button";
        var str = this.formHelper.main_str();
        $("#signup").append(str);
    }

    bindEvents() {
        var self = this;

        this.formHelper.bindEvents(function () {
            self.bindFormEvents();
        });

        $("#login-view").click(function () {
            master.paging.redirect("login");
            console.log("kappa");
        });


    }

    bindFormEvents() {
        $("#signup_button").on("click", function () {
            let email = $("#email").val();
            let password = $("#password").val();
            let name = $("#name").val();
            let surname = $("#surname").val();
            let birthdate = $("#birthdate").val();
            let mobile = $("#mobile_tel").val();

            var data = {
                "email": email,
                "password": password,
                "name": name,
                "surname": surname,
                "birthdate": birthdate,
                "mobile_tel": mobile
            };
            console.log(data);
            new SignupService(data, "POST", "users/signup", false, "", function (data) {
                console.log(data);
                utility.toast.success("Signed up successfully");
                master.paging.redirect("login");
            });
            //master.paging.redirect("login");
        });


    }


}