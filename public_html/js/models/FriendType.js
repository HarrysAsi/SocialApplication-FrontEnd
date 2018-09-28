/* global runtime */

class FriendType extends Model {
    constructor(id = 0, description = "") {
        super("FriendType");

        this.id = id;
        this.description = description;
    }

    toMemory() {
        runtime.friendtypes[this.id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    visible: false,
                    label: "Id",
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