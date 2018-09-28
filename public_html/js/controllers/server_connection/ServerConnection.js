class ServerConnection {
    constructor() {
        this.url = null;
    }

    init(){
        this.url = "http://localhost:4500";
        this.socket = null;
    }

    connect() {
        this.init();
        let current_user = runtime.current_user.toServer;
        this.socket = io(this.url, {query: current_user});
    }
}

var server = new ServerConnection();