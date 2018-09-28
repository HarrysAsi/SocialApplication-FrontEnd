/* global runtime */

class FriendStatus extends Model {
    constructor(id = 0, description = "") {
        super("FriendStatus");

        this.id = id;
        this.description = description;
    }

    toMemory() {
        runtime.friendstatus[this.id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    visible: false,
                    label: "id",
                    type: "number",
                    primary: true
                },
                description: {
                    value: this.description,
                    visible: true,
                    label: "Description",
                    type: "string"
                }
            };
        return array;
    }


}