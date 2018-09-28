class EditProfile extends Controller {
    constructor(params, bundle) {
        super("edit_profile", "edit_profile", params);
        super.redirect();
        this.formHelper = null;
    }

    init() {
        console.log("edit_profile");
        var attributes = [
            {attribute: "email", type: "email"},
            {attribute: "password", type: "password"},
            {attribute: "name", type: "text"},
            {attribute: "surname", type: "text"},
            {attribute: "birthdate", type: "date"},
            {attribute: "mobile_tel", type: "text"},
            {attribute: "image_id", type: "image"}
        ];
        let user = new User();
        let models = [user];
        let form_name = "edit_information";
        this.formHelper = new FormHelper(models, attributes, form_name);
        this.formHelper.button_id = "edit_button";
        let str = this.formHelper.main_str();
        $(this.container + " #edit_profile_form").append(str);
    }

    bindEvents() {
        this.bindFormEvents();

        $(this.container + " #menu_home").click(function () {
            master.paging.redirect("main");
        });
        $(this.container + " #menu_profile").click(function () {
            master.paging.redirect("menu_profile");
        });
        $(this.container + " #menu_logout").click(function () {
            master.paging.redirect("login");
        });

    }

    bindFormEvents() {
        var self = this;
        let user = runtime.current_user;
        $(this.container + " #email").val(user.email).attr('disabled', 'disabled');
        $(this.container + " #password").val(master.sharedPref.getPassword());
        $(this.container + " #name").val(user.name);
        $(this.container + " #surname").val(user.surname);
        $(this.container + " #birthdate").val(moment(runtime.current_user.birthdate).format("YYYY-MM-DD"));
        $(this.container + " #mobile_tel").val(user.mobile_tel);

        $(this.container + " #edit_button").click(function (e) {
            let self1 = this;
            e.preventDefault();
            let formData = new FormData();
            let email = $(self.container + " #email").val();
            formData.append("email", email);
            let password = $(self.container + " #password").val();
            formData.append("password", password);
            let name = $(self.container + " #name").val();
            formData.append("name", name);
            let surname = $(self.container + " #surname").val();
            formData.append("surname", surname);
            let birthdate = $(self.container + " #birthdate").val();
            formData.append("birthdate", birthdate);
            let mobile_tel = $(self.container + " #mobile_tel").val();
            formData.append("mobile_tel", mobile_tel);
            //let image = $(self.container + " #image_id").val().split("\\")[2];
            let image1 = $(self.container + " #image_id")[0].files[0];
            formData.append("userImage", image1);
            // Sending images requires FormData!!!
            $.ajax({
                data: formData,
                enctype: "multipart/form-data",
                method: "POST",
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
                url: "http://localhost:4500/users/update-user",
                headers: {
                    "Authorization": "Bearer " + master.sharedPref.getToken()
                },
                success: function (data) {
                    utility.toast.success("Information updated successfully");
                    master.paging.redirect("main");
                }, error: function (err) {
                    console.log(err);
                    if (err.status === 400) {
                        utility.toast.info("You have to select an image");
                    } else if(err.status === 500){
                        utility.toast.info("You have to select an image");
                    }else {
                        utility.toast.error("Something went wrong, please login");
                        master.paging.redirect("login");
                    }
                }
            });

        });


    }

}