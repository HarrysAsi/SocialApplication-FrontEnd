/* global runtime */

class UserType extends Model {
    constructor(id = 0, description = "" , descr_represent = "") {
        super("UserType");

        this.id = id;
        this.description = description;
        this.descr_represent = descr_represent;
    }

    toMemory() {
            runtime.usertypes[this.id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    visible: false,
                    label: "Email",
                    type: "number",
                    primary: true
                },
                description: {
                    value: this.description,
                    visible: true,
                    label: "Description",
                    type: "string"
                },
                descr_represent: {
                    value: this.descr_represent,
                    visible: true,
                    label: "Description",
                    type: "string"
                }
            };
        return array;
    }

}