class Chat extends Controller {
    constructor(params, bundle) {
        super("chat", "chat", params);
        super.redirect();
        this.conversation_id = bundle.conversation_id;
        this.current_user_id = runtime.current_user.id;
    }

    init() {
        let self = this;
        console.log("Chat");
        console.log(this.conversation_id);
        let token = master.sharedPref.getToken();
        // Socket to get the messages for the current conversation...
        new MessagesService({conversation_id: this.conversation_id}, "POST", "messages", true, token, function (data) {
            for (let ob in data) {
                let curr_message = data[ob];
                if (curr_message.sender_id === self.current_user_id) {
                    self.insertChat("me", curr_message.content);
                } else {
                    self.insertChat("you", curr_message.content);
                }
            }

        });


    }

    bindEvents() {
        var self = this;


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

        $(this.container + " #send_message_icon").click(function () {
            let message = $(self.container + " #my_message").val();
            if (message !== "") {
                self.insertChat("me", message);
                $(self.container + " #my_message").val("");
                //Socket emit the message
                let object = {conversation_id: self.conversation_id, message: message};
                server.socket.emit('new_message', object);
                let msg = new Message(new Date().getTime(), message, self.current_user_id, self.conversation_id, new Date().getTime());
                msg.insert();
                msg.toMemory();
            }
        });


    }

    insertChat(who, text, time) {
        if (time === undefined) {
            time = 0;
        }
        var control = "";
        let date = "1h";

        if (who === "me") {
            control = '<li style="width:100%">' +
                '<div class="msj macro">' +
                '<div class="avatar"><img class="img-circle" style="width:100%;" src="https://www.w3schools.com/howto/img_avatar.png" /></div>' +
                '<div class="text text-l">' +
                '<h5>' + text + '</h5>' +
                '<p style="padding-bottom: 5px"><small>' + date + '</small></p>' +
                '</div>' +
                '</div>' +
                '</li>';
        } else {
            control = '<li style="width:100%;">' +
                '<div class="msj-rta macro">' +
                '<div class="text text-r">' +
                '<h5 style="float: right">' + text + '</h5>' +
                '<p  style="padding-bottom: 5px"><small style="float: left">' + date + '</small></p>' +
                '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="https://www.w3schools.com/howto/img_avatar.png" /></div>' +
                '</li>';
        }

        $("#chat_list").append(control);
        $(".frame").scrollTop(99999);

    }

}