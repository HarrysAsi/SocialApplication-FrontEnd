class ChatConnection {
    constructor() {
        console.log("ChatConnection init");
        this.init();
    }

    init() {
        this.onNewMessage();
    }

    onNewMessage() {
        var self = this;
        server.socket.on('new_message', function (message) {
            message = JSON.parse(message);
            console.log(message);
            let response_message = new Message(message.message.id, message.message.content, message.message.sender_id, message.conversation_messages.conversation_id, 0);
            response_message.toMemory();
            response_message.insert();
            //Append this sh1it if the current view  and the current conversation is opened.
            if (utility.current_page.name === "chat") {
                if (utility.current_page.conversation_id === message.conversation_messages.conversation_id) {
                    utility.current_page.insertChat("you", message.message.content);
                }
            }
        });
    }


}