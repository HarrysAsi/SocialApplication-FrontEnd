function Paging() {
    this.redirect = function (name = "loader", bundle, params) {
        console.log(name);
        switch (name) {
            case "loader":
                location.hash = "loader";
                new Loader(params, bundle);
                break;
            case "signup":
                location.hash = "signup";
                new Signup(params, bundle);
                break;
            case "login":
                location.hash = "login";
                new Login(params, bundle);
                break;
            case "main":
                location.hash = "main";
                new Main(params, bundle);
                break;
            case "menu_profile":
                location.hash = "menu_profile";
                new MenuProfile(params, bundle);
                break;
            case "global_conversation":
                location.hash = "global_conversation";
                new GlobalConversation(params, bundle);
                break;
            case "menu_friends":
                location.hash = "menu_friends";
                new MenuFriends(params, bundle);
                break;
            case "global_friends":
                location.hash = "global_friends";
                new GlobalFriends(params, bundle);
                break;
            case "menu_recommended_users":
                location.hash = "menu_recommended_users";
                new MenuRecommendedUsers(params, bundle);
                break;
            case "chat":
                location.hash = "chat";
                new Chat(params, bundle);
                break;
            case "edit_profile":
                location.hash = "edit_profile";
                new EditProfile(params, bundle);
                break;
            case "friend_requests":
                location.hash = "friend_requests";
                new MenuFriendRequest(params, bundle);
        }
    }
}