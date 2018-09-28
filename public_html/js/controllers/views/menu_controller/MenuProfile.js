class MenuProfile extends Controller {
    constructor(params, bundle) {
        super("menu_profile", "menu_profile", params);
        super.redirect();

        if (bundle !== undefined) {
            if(bundle.user_id !== undefined){
                this.user_id = bundle.user_id;
            } else{
                this.suggested_user_id = bundle.suggested_user_id;
            }

        }
        else {
            this.user_id = runtime.current_user.id;
        }
    }

    init() {
        console.log("menu_profile");
    }

    bindEvents() {
        this.setUserInfo();

        $(this.container + " #menu_home ").click(function () {
            master.paging.redirect("main");
        });
        $(this.container + " #menu_profile").click(function () {
            master.paging.redirect("menu_profile");
        });
        $(this.container + " #menu_friends").click(function () {
            master.paging.redirect("menu_friends");
        });
        $(this.container + " #menu_logout").click(function () {
            master.paging.redirect("login");
        });
        $(this.container + " #global_friends").click(function () {
            master.paging.redirect("global_friends");
        });

        $(this.container + " #global_conversations").click(function () {
            master.paging.redirect("global_conversations");
        });

        $(this.container + " #edit_profile").click(function () {
            master.paging.redirect("edit_profile");
        });

    }

    setUserInfo() {
        let userInfo = "";
        let userImage = "";
        let info = '';
        // Friends information
        if (this.user_id !== runtime.current_user.id) {
            userInfo = runtime.users[this.user_id].userInformation;
            userImage = runtime.users[this.user_id].userImage;
        } else {// Profile information
            userInfo = runtime.current_user.userInformation;
            userImage = runtime.current_user.userImage;
            info = '<a href="#" id="edit_profile" class="card-link"> <u> Edit Information</u></a>\n';
        }
        let str = "";
        str += '<h2 class="text-center"> Image</h2>' +
            '   <div class="card" style="width: 90%; margin: 15px">\n' +
            '       <img src="' + userImage.image + '" id="user_image" width="100%" height="50%"/>\n' +
            '                <ul class="list-group list-group-flush">\n' +
            '                    <li class="list-group-item"> <div class="header-text">Name: </div> <div class="content-text">' + userInfo.name + ' </div> </li>' +
            '                    <li class="list-group-item"> <div class="header-text">Surname: </div> <div class="content-text">' + userInfo.surname + ' </div> </li>' +
            '                    <li class="list-group-item"> <div class="header-text">Email: </div> <div class="content-text">' + userInfo.email + ' </div> </li>' +
            '                    <li class="list-group-item"> <div class="header-text">User Type: </div> <div class="content-text">' + runtime.current_user.userTypeDescription + ' </div> </li>' +
            '                </ul>\n' +
            '        <div class="card-body">\n' + info +
            '        </div>\n' +
            '   </div>';
        $(this.container + " #user_information").append(str);

    }
}