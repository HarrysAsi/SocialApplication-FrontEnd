class MenuRecommendedUsers extends Controller {
    constructor(params, bundle) {
        super("menu_recommended_users", "menu_recommended_users", params);
        super.redirect();
    }

    init() {
        console.log("menu_recommended_users");
        new SuggestedUsersService({userId: runtime.current_user.id}, "POST", "suggested-users", true, master.sharedPref.getToken(), function () {
        });
    }

    bindEvents() {
        let self = this;
        this.refreshSuggestedUsers();

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

        $(this.container + " .list-group-item .add-user").click(function () {
            let selfa = this;
            let friend_id = $(this).data('id');
            let data = {userId: runtime.current_user.id, friendId: friend_id};
            new AddFriendService(data, "POST", "friends/add-friend", true, master.sharedPref.getToken(), function (dt) {
                utility.toast.success("Frient Request Sent Succesfully!");
                delete runtime.suggested_users[friend_id];
                $(selfa).remove();
            });
        });
    }

    refreshSuggestedUsers() {
        //If is the current activity, refresh the listview
        let str = "";
        for (let ob in runtime.suggested_users) {
            let curr_suggested_user = runtime.suggested_users[ob];
            str += '<a class="online-friends">' +
                '       <li class="list-group-item">\n' +
                '          <div class="col-xs-12">\n' +
                '               <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Scott Stevens" class="img-responsive img-circle img-small">\n' +
                '          </div>\n' +
                '          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n' +
                '               <span class="name responsive-size">' + curr_suggested_user.name + " " + curr_suggested_user.surname + '</span><br>\n' +
                '               <span class="fa fa-comments text-muted c-info" data-toggle="tooltip"></span>\n' +
                '               <span class="text-muted responsive-size"> ' + curr_suggested_user.email + ' </span><br>' +
                '               <a href="#" id="add_user" class="btn btn-info btn-sm add-user" data-id=' + curr_suggested_user.id + '>\n' +
                '                   <span class=" glyphicon glyphicon-plus"></span> Add Friend \n' +
                '               </a>\n' +
                '           </div>\n' +
                '           <div class="clearfix"></div>\n' +
                '       </li>' +
                '  </a>';
        }
        $("#suggested-users-list").html(str);
    }
}