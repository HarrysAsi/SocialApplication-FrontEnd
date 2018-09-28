class MenuFriends extends Controller {
    constructor(params, bundle) {
        super("menu_friends", "menu_friends", params);
        super.redirect();
    }

    init() {
        console.log("menu_friends");
        new UsersService({userId: runtime.current_user.id}, "POST", "friends", true, master.sharedPref.getToken(), function (dt) {
            console.log("Got All users already brah...");
        });
        new FriendsService({userId: runtime.current_user.id}, "POST", "friends/friends", true, master.sharedPref.getToken(), function () {
            console.log("Got All Friends");
        });
        this.setFriendsData();
    }

    bindEvents() {
        let self = this;

        $(this.container + " #menu_home").click(function () {
            master.paging.redirect("main");
        });
        $(this.container + " #menu_profile").click(function () {
            master.paging.redirect("menu_profile");
        });
        $(this.container + " #menu_logout").click(function () {
            master.paging.redirect("login");
        });

        $(this.container + " .list-group-item .message-to-user").click(function () {
            let user_id = $(this).data('id');
            //TODO:Redirect To Message Section
            console.log(user_id);
        });

        $(this.container + " .list-group-item .visit-user").click(function () {
            let user_id = $(this).data('id');
            master.paging.redirect("menu_profile", {user_id: user_id});
            console.log(user_id);
        });

        $(this.container + " .list-group-item .remove-user").click(function () {
            let user_id = $(this).data('id');
            //TODO:Remove User-Redirect To main menu
            console.log(user_id);
            let data = {userId: runtime.current_user.id, friendId: user_id};
            new RemoveFriendService(data, "POST", "friends/delete-friend", true, master.sharedPref.getToken(), function (dt) {
                utility.toast.success("Friend Removed Successfully");
                console.log(runtime.friends[user_id]);
                delete runtime.friends[user_id];
                self.setFriendsData();
            });
        });


    }

    setFriendsData() {
        let friends = runtime.friends;
        console.log(friends);
        let str = "";
        for (let ob in friends) {
            let curr_friend = friends[ob].toUserInformation;
            console.log(curr_friend);
            str += '<a class="online-friends">' +
                '       <li class="list-group-item">\n' +
                '          <div class="col-xs-12">\n' +
                '               <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Scott Stevens" class="img-responsive img-circle img-small">\n' +
                '          </div>\n' +
                '          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n' +
                '               <span class="name responsive-size">' + curr_friend.name + " " + curr_friend.surname + '</span><br>\n' +
                '               <span class="fa fa-comments text-muted c-info" data-toggle="tooltip"></span>\n' +
                '               <span class="text-muted responsive-size"> ' + curr_friend.email + ' </span><br>' +
                '               <div class="row"> ' +
                '                  <a href="#" id="" class="btn btn-info btn-sm message-to-user" data-id=' + curr_friend.id + '>\n' +
                '                       <span class="glyphicon glyphicon-comment text-right"></span> Message \n' +
                '                  </a>\n' +
                '                  <a href="#" id="" class="btn btn-info btn-sm visit-user" data-id=' + curr_friend.id + '>\n' +
                '                       <span class="glyphicon glyphicon-user text-right"></span> Profile \n' +
                '                  </a>\n' +
                '                  <a href="#" id="" class="btn btn-info btn-sm remove-user" data-id=' + curr_friend.id + '>\n' +
                '                       <span class="glyphicon glyphicon-remove text-right"></span> Remove \n' +
                '                  </a>\n' +
                '               </div>' +
                '          </div>\n' +
                '          <div class="clearfix"></div>\n' +
                '      </li>' +
                ' </a>';
        }
        $(this.container + " #all_friends").html(str);
    }

}