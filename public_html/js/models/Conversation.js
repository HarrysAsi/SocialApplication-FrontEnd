/* global runtime */

class Conversation extends Model {
    constructor(id = 0, creator_id = 0, title = "", created_date = 0) {
        super("Conversation");

        this.id = id;
        this.creator_id = creator_id;
        this.title = title;
        this.created_date = created_date;

    }

    toMemory() {
        runtime.conversations[this.id] = this;
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
                creator_id: {
                    value: this.creator_id,
                    label: "creator id",
                    type: "number",
                    visible: true,
                },
                title: {
                    value: this.title,
                    label: "Title",
                    type: "string",
                    visible: true
                },
                created_date: {
                    value: this.created_date,
                    label: "Created Date",
                    type: "date",
                    visible: true
                }
            };
        return array;
    }

    get participants() {
        let result = new Map();
        let participants = runtime.conversation_participants;
        let users = runtime.users;
        for (let ob in participants) {
            let curr_participant = participants[ob];
            if (this.id === curr_participant.conversation_id) {
                for (let obj in users) {
                    let curr_user = users[obj];
                    if (curr_participant.participant_id === curr_user.id) {
                        result[curr_user.id] = curr_user;
                    }
                }
                //result[curr_participant.id] = curr_participant;
            }
        }
        return result;
    }

}