class GlobalFriendsConnection {
    constructor() {
        console.log("GlobalFriends Connection init");
        this.init();
    }

    init() {
        this.getOnlineFriends();
        this.onDisconnectedUser();
        this.onConnectedUser();
    }

    onDisconnectedUser() {
        var self = this;
        //Get all The Online Friends From server
        server.socket.on('on_disconnect_user', function (data) {
            data = JSON.parse(data);
            console.log("ON DISCONNECTED EVENT");
            console.log(data);
            for (let ob in runtime.online_friends) {
                if (runtime.online_friends[ob].id === data.user.id) {
                    delete runtime.online_friends[ob];
                }
            }

            if (utility.current_page.name === "global_friends") {
                utility.current_page.refreshOnlineFriends();
                console.log(true);
            }

        });
    }

    onConnectedUser() {
        var self = this;
        //Get all The Online Friends From server
        server.socket.on('on_connected_user', function (data) {
            data = JSON.parse(data);
            console.log("ON CONNECTED EVENT");
            console.log(data);
            for (let obj in data) {
                runtime.online_friends[data[obj].id] = data[obj];
            }
            //Refresh the list view..
            if (utility.current_page.name === "global_friends") {
                utility.current_page.refreshOnlineFriends();
            }
        });
    }


    getOnlineFriends() {
        var self = this;
        //Get all The Online Friends From server
        server.socket.on('online_friends', function (data) {
            console.log("all_online_friends~~~~~");
            data = JSON.parse(data);
            console.log(data);
            for (let ob in data) {
                runtime.online_friends[data[ob].id] = data[ob];
            }
        });
    }
}