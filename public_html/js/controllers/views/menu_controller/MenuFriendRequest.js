class MenuFriendRequest extends Controller {
    constructor(params, bundle) {
        super("menu_friend_requests", "menu_friend_requests", params);
        super.redirect();
    }

    init() {
        let self = this;
        console.log("friend_request");
        new FriendRequestService({userId: runtime.current_user.id}, "POST", "friend-requests", true, master.sharedPref.getToken(), function () {
        });
    }

    bindEvents() {
        var self = this;
        this.refreshFriendRequestList();

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

        $(this.container + " .list-group-item .accept-user").click(function () {
            let $item = $(this).closest(".list-group-item");
            let sender_user_id = $(this).data('id');

            let data = {sender_user_id: sender_user_id, receiver_user_id: runtime.current_user.id};
            new AcceptFriendRequestService(data, "POST", "friend-requests/accept", true, master.sharedPref.getToken(), function (dt) {
                utility.toast.success("Friend Request Accepted");
                delete runtime.friend_requests[sender_user_id];
                $item.remove();
            });
            console.log(sender_user_id);
        });
        $(this.container + " .list-group-item .decline-user").click(function () {
            let selfa = this;
            let $item = $(this).closest(".list-group-item");
            let sender_user_id = $(this).data('id');

            let data = {sender_user_id: sender_user_id, receiver_user_id: runtime.current_user.id};
            new DeclineFriendRequestService(data, "POST", "friend-requests/decline", true, master.sharedPref.getToken(), function (dt) {
                utility.toast.info("Friend Request Declined");
                delete runtime.friend_requests[sender_user_id];
                $item.remove();
            });
            console.log(sender_user_id);
        });

    }


    refreshFriendRequestList() {
        let str = "";

        for (let ob in runtime.friend_requests) {
            let user_who_sent_friend_request = runtime.friend_requests[ob].userByFriendRequest;
            console.log(user_who_sent_friend_request);
            // in case something goes wrong...
            if (user_who_sent_friend_request !== null) {
                str += '<a class="online-friends" data-user_id=' + user_who_sent_friend_request.id + '>' +
                    '       <li class="list-group-item">\n' +
                    '          <div class="col-xs-12">\n' +
                    '               <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Scott Stevens" class="img-responsive img-circle img-small">\n' +
                    '          </div>\n' +
                    '          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n' +
                    '               <span class="name responsive-size">' + user_who_sent_friend_request.name + " " + user_who_sent_friend_request.surname + '</span><br>\n' +
                    '               <span class="fa fa-comments text-muted c-info" data-toggle="tooltip"></span>\n' +
                    '               <span class="text-muted responsive-size"> ' + user_who_sent_friend_request.email + ' </span><br>' +
                    '               <a href="#" id="" class="deco-none btn btn-success btn-sm accept-user" data-id=' + user_who_sent_friend_request.id + '>\n' +
                    '                   <span class=" glyphicon glyphicon-plus"></span> Accept \n' +
                    '               </a>\n' +
                    '                  <a href="#" id="" class="deco-none btn btn-danger btn-sm decline-user " data-id=' + user_who_sent_friend_request.id + '>\n' +
                    '                       <span class="glyphicon glyphicon-user text-right"></span> Decline \n' +
                    '                  </a>\n' +
                    '           </div>\n' +
                    '           <div class="clearfix"></div>\n' +
                    '       </li>' +
                    '  </a>';
            }
            $("#friend_requests_list").html(str);
        }
    }
}