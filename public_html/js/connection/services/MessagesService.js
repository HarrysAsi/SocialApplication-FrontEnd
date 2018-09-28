class MessagesService extends ConnectionAjax {

    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        let dt = data['success']['Data'];
        try {
            console.log(dt);
            for(let ob in dt){
                let curr_ob = dt[ob];
                //console.log(curr_ob);
                //let conversation = new ConversationMessages(curr_ob.id, curr_ob.message_id, curr_ob.conversation_id);
                let message = new Message(curr_ob.id, curr_ob.content, curr_ob.sender_id,curr_ob.conversation_id, curr_ob.sent_date);
                // conversation.insert();
                // conversation.toMemory();
                message.insert();
                message.toMemory();
            }
        }catch (e) {
            console.log(e);
            this.callbackErr(dt);
        }
        if (this.callbackSucc !== undefined) {
            this.callbackSucc(dt);
        }

    }

    failure(data) {
        if (this.callbackErr !== undefined) {
            this.callbackErr(data);
        } else {
            console.log("error", data);
        }
    }

}
