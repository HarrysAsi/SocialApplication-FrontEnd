/* global runtime */

class ConversationParticipants extends Model {
    constructor(id = 0, conversation_id = 0, participant_id = "", date_joined = 0) {
        super("ConversationParticipants");

        this.id = id;
        this.conversation_id = conversation_id;
        this.participant_id = participant_id;
        this.date_joined = date_joined;

    }

    toMemory() {
        runtime.conversation_participants[this.id] = this;
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
                conversation_id: {
                    value: this.conversation_id,
                    label: "Conversation Id",
                    type: "number",
                    visible: true,
                },
                participant_id: {
                    value: this.participant_id,
                    label: "Participant Id",
                    type: "number",
                    visible: true
                },
                date_joined: {
                    value: this.date_joined,
                    label: "Joined Date",
                    type: "date",
                    visible: true
                }
            };
        return array;
    }

}