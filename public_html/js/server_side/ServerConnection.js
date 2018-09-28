class ServerConnection {
    constructor() {
        this.url = "http://localhost:4500";
    }

    init(){
        this.url = "http://localhost:4500";
        this.socket = null;
        console.log("Server Connection Established");
    }

    connect() {
        this.init();
        let current_user = runtime.current_user.toServer;
        this.socket = io(this.url, {query: current_user});
    }
}