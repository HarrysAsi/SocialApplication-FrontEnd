class Main extends Controller {
    constructor(params, bundle) {
        super("main", "main", params);
        super.redirect();
    }

    init() {
        var self = this;

        new AnnouncementsService({userId: runtime.current_user.id}, "POST", "announcements", true, master.sharedPref.getToken(), function () {});
        new AnnouncementLikesService({userId: runtime.current_user.id}, "POST", "announcement-likes", true, master.sharedPref.getToken(), function (){});

        console.log("main");
        $(this.container + " #menu_friend_request a").append();
    }

    bindEvents() {
        let self = this;

        this.refreshAnnouncementList();
        $(this.container + " #menu_home ").click(function () {
            master.paging.redirect("main");
        });
        $(this.container + " #menu_profile").click(function () {
            master.paging.redirect("menu_profile");
        });
        $(this.container + " #menu_friends").click(function () {
            master.paging.redirect("menu_friends");
        });
        $(this.container + " #menu_friend_request").click(function () {
            master.paging.redirect("friend_requests");
        });
        $(this.container + " #menu_logout").click(function () {
            master.paging.redirect("login");
        });
        $(this.container + " #global_friends").click(function () {
            master.paging.redirect("global_friends");
        });

        $(this.container + " #global_conversation").click(function () {
            master.paging.redirect("global_conversation");
        });

        $(this.container + " #menu_recommended_users").click(function () {
            master.paging.redirect("menu_recommended_users");
        });

        $(this.container + " #publish_announcement",).click(function () {
            let content = $(self.container + " #content_text").val();
            let data = {userId: runtime.current_user.id, content: content};
            new AddAnnouncementService(data, "POST", "announcements/add-announcement", true, master.sharedPref.getToken(), function (data) {
                utility.toast.success("Published");
                let announcement = new Announcement(data.insertId, content, runtime.current_user.id, new Date().getTime());
                announcement.insert();
                announcement.toMemory();
                self.refreshAnnouncementList();
                self.bindEvents();
                $(self.container + " #content_text").val('');
            });

        });

        //TODO: Event to publish an announcement...

        $(this.container + " .list-group-item .like-icon").click(function () {
            let user_id = runtime.current_user.id;
            let announcement_id = $(this).parents('.list-group-item ').data('announcement_id');
            let data = {userId: user_id, announcement_id: announcement_id};
            //like
            if ($(this).hasClass('far')) {
                $(this).removeClass('far');
                $(this).addClass('fas');
                new RemoveAnnouncementLikeService(data, "POST", "announcement-likes/add-like", true, master.sharedPref.getToken());
                let like = new AnnouncementLikes(announcement_id, user_id, announcement_id, new Date().getTime());
                like.insert();
                like.toMemory();
            } else { // DisLike
                $(this).removeClass('fas');
                $(this).addClass('far');
                new AddAnnouncementLikeService(data, "POST", "announcement-likes/remove-like", true, master.sharedPref.getToken());
                delete runtime.announcement_likes[data.announcement_id];
            }
        });

    }

    refreshAnnouncementList() {
        let str = "";

        for (let ob in runtime.announcements) {
            let curr_ann = runtime.announcements[ob];
            let publisher = curr_ann.userInfo;
            let like_icon = '<i class="far fa-heart fa-2x like-icon" style="float: right; color: red;"></i>';
            // If i like the current post then update the like icon
            if (curr_ann.isLikedByMe)
                like_icon = '<i class="fas fa-heart fa-2x like-icon" style="float: right; color: red;"></i>';

            str += '   <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" data-id=' + curr_ann.user_id + ' data-announcement_id=' + curr_ann.id + ' ">\n' +
                '           <h5 class="mb-1 "> ' + publisher.name + ' ' + publisher.surname + ' </h5> ' +
                '           <div class="d-flex w-100 justify-content-between">\n' +
                '           </div>\n' +
                '           <p class="mb-1"> ' + curr_ann.content + ' </p>\n' +
                '           <small>' + moment(curr_ann.date_created, "YYYYMMDD").fromNow() + ' ' + like_icon + '</small>\n' +
                '       </a>';
        }
        $(this.container + " #announcements_list").html(str);
    }
}