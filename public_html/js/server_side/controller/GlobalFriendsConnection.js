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
        master.server.socket.on('on_disconnect_user', function (data) {
            data = JSON.parse(data);
            console.log("ON DISCONNECTED EVENT");
            console.log(data);
            for (let ob in runtime.online_friends) {
                if (runtime.online_friends[ob].id === data.user.id) {
                    delete runtime.online_friends[ob];
                }
            }
            //Refresh the list view...
            if (self === utility.current_page) {
                utility.current_page.refreshFriendList();
            }
        });
    }

    onConnectedUser() {
        var self = this;
        //Get all The Online Friends From server
        master.server.socket.on('on_connected_user', function (data) {
            data = JSON.parse(data);
            console.log("ON CONNECTED EVENT");
            console.log(data);
            for (let obj in data) {
                runtime.online_friends[data[obj].id] = data[obj];
            }
            //Refresh the list view...
            if (self === utility.current_page) {
                utility.current_page.refreshFriendList();
            }
        });
    }


    getOnlineFriends() {
        var self = this;
        //Get all The Online Friends From server
        master.server.socket.on('online_friends', function (data) {
            console.log("all_online_friends~~~~~");
            data = JSON.parse(data);
            // if (functions.isEmpty(data)) {
                for (let ob in data) {
                    runtime.online_friends[data[ob].id] = data[ob];
                }
            //}
        });
    }
}