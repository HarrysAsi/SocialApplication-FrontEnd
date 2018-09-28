/* global runtime */

class Friend extends Model {
    constructor(user_id = 0 , friend_id = 0, friend_type = 0, friend_status = "") {
        super("Friend");

        this.user_id = user_id;
        this.friend_id = friend_id;
        this.friend_type = friend_type;
        this.friend_status = friend_status;

    }

    toMemory() {
            runtime.friends[this.friend_id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                user_id: {
                    value: this.user_id,
                    label: "User id",
                    type: "number",
                    visible: true,
                },
                friend_id: {
                    value: this.friend_id,
                    label: "Friend id",
                    type: "number",
                    visible: true,
                    primary: true
                },
                friend_type: {
                    value: this.friend_type,
                    label: "Friend type",
                    type: "number",
                    visible: true
                },
                friend_status: {
                    value: this.friend_status,
                    label: "Friend status",
                    type: "string",
                    visible: true
                }
            };
        return array;
    }

    get toUserInformation() {
        let users = runtime.users;
        for (let ob in users){
            let curr_user = users[ob];
            if(this.friend_id === curr_user.id){
                return curr_user;
            }
        }
    }

}