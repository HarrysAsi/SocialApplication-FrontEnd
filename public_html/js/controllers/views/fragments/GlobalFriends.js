class GlobalFriends extends Controller {
    constructor(params, bundle) {
        super("global_friends", "global_friends", params);
        super.redirect();
    }

    init() {
        console.log("global_friends");
    }

    bindEvents() {
        this.refreshOnlineFriends();
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

        $(this.container + " #main").click(function () {
            master.paging.redirect("main");
        });

    }

    bindEventsAfterRefresh() {
        $(this.container + " .online-friends").click(function () {
            let user_id = $(this).data('id');
            console.log(user_id);
            master.paging.redirect("menu_profile", {user_id: user_id});
        });

        $('#online-friends-list').searchable({
            searchField: '#online-friends-search',
            selector: 'li',
            childSelector: '.col-xs-12',
            show: function (elem) {
                elem.slideDown(100);
            },
            hide: function (elem) {
                elem.slideUp(100);
            }
        });
    }

    refreshOnlineFriends() {
        //If is the current activity, refresh the listview
        let str = "";
        for (let ob in runtime.online_friends) {
            let curr_online_friend = runtime.online_friends[ob];
            str += '<a class="online-friends" data-id=' + curr_online_friend.id + '>' +
                '       <li class="list-group-item">\n' +
                '          <div class="col-xs-12">\n' +
                '               <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Scott Stevens" class="img-responsive img-circle img-small">\n' +
                '          </div>\n' +
                '          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\n' +
                '               <span class="name responsive-size">' + curr_online_friend.name + " " + curr_online_friend.surname + '</span><br>\n' +
                '               <span class="fa fa-comments text-muted c-info" data-toggle="tooltip"></span>\n' +
                '               <span class="text-muted responsive-size"> ' + curr_online_friend.email + ' </span><br>' +
                '               <div class="text-muted responsive-size"><i class="fas fa-circle c-info" style="color: green;"></i>Online</div><br>' +
                '           </div>\n' +
                '           <div class="clearfix"></div>\n' +
                '       </li>' +
                '  </a>';
        }
        $("#online-friends-list").html(str);
        this.bindEventsAfterRefresh();

    }

}