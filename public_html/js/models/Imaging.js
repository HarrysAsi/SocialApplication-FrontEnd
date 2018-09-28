/* global runtime */

class Imaging extends Model {
    constructor(id = 0, image = "", description = "" , date_uploaded = 0) {
        super("Imaging");

        this.id = id;
        this.image = image;
        this.description = description;
        this.date_uploaded = date_uploaded;

    }
    toMemory() {
            runtime.images[this.id] = this;
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
                image: {
                    value: this.image,
                    visible: true,
                    label: "Image",
                    type: "string"
                },
                description: {
                    value: this.description,
                    visible: true,
                    label:"Description",
                    type: "string"
                },
                date_uploaded: {
                    value: this.date_uploaded,
                    visible: true,
                    label: "Date Uploaded",
                    type: "date"
                }
            };
        return array;
    }
}