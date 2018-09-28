/* global runtime */

class FriendRequest extends Model {
    constructor(id = 0, sender_id = 0, receiver_id = 0, status_id = 0, date_created = 0) {
        super("FriendRequests");

        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.status_id = status_id;
        this.date_created = date_created;

    }

    toMemory() {
        runtime.friend_requests[this.id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    label: "Friend Request Id",
                    type: "number",
                    visible: true,
                    primary: true
                },
                sender_id: {
                    value: this.sender_id,
                    label: "Sender",
                    type: "string",
                    visible: true
                },
                receiver_id: {
                    value: this.receiver_id,
                    label: "Receiver",
                    type: "number",
                    visible: true
                },
                status_id: {
                    value: this.status_id,
                    label: "Status",
                    type: "number",
                    visible: true
                },
                date_created: {
                    value: this.date_created,
                    label: "Date Created",
                    type: "date",
                    visible: true
                }
            };
        return array;
    }

    get userByFriendRequest(){
        let users = runtime.users;
        for(let ob in users){
            let curr_user = users[ob];
            if(this.sender_id === curr_user.id){
                return curr_user;
            }
        }
        return null;
    }

    countFriendRequests(){
        let requests = runtime.friend_requests;
        let count = 0;
        for(let ob in requests){
            count++;
        }
        return count;
    }

}
