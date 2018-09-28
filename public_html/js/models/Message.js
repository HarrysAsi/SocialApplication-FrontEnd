/* global runtime */

class Message extends Model {
    constructor(id = 0, content = "", sender_id = 0, conversation_id = 0,  sent_date = 0) {
        super("Message");

        this.id = id;
        this.content = content;
        this.sender_id = sender_id;
        this.conversation_id = conversation_id;
        this.sent_date = sent_date;

    }

    toMemory() {
        runtime.messages[this.id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    label: "id",
                    type: "number",
                    visible: true,
                    primary: true
                },
                content: {
                    value: this.content,
                    label: "Message",
                    type: "string",
                    visible: true,
                },
                sender_id: {
                    value: this.sender_id,
                    label: "Sender",
                    type: "number",
                    visible: true
                },
                conversation_id: {
                    value: this.conversation_id,
                    label: "conversation_id",
                    type: "number",
                    visible: true
                },
                sent_date: {
                    value: this.sent_date,
                    label: "Sent Date",
                    type: "date",
                    visible: true
                }
            };
        return array;
    }



}