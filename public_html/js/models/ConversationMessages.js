/* global runtime */

class ConversationMessages extends Model {
    constructor(id = 0, message_id = 0, conversation_id = 0, sent_date = 0) {
        super("ConversationMessages");

        this.id = id;
        this.message_id = message_id;
        this.conversation_id = conversation_id;
        this.sent_date = sent_date;

    }

    toMemory() {
        runtime.conversation_messsages[this.id] = this;
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
                message_id: {
                    value: this.message_id,
                    label: "creator id",
                    type: "number",
                    visible: true,
                },
                conversation_id: {
                    value: this.conversation_id,
                    label: "Title",
                    type: "number",
                    visible: true
                },
                sent_date: {
                    value: this.sent_date,
                    label: "Created Date",
                    type: "date",
                    visible: true
                }
            };
        return array;
    }

}