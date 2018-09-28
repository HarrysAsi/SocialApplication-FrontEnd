/* global runtime */

class AnnouncementLikes extends Model {
    constructor(id = 0 , user_id = 0, announcement_id = 0, date_created = 0) {
        super("AnnouncementLikes");

        this.id = id;
        this.user_id = user_id;
        this.announcement_id = announcement_id;
        this.date_created = date_created;

    }

    toMemory() {
        runtime.announcement_likes[this.id] = this;
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    label: "Announcement Id",
                    type: "number",
                    visible: true,
                    primary: true
                },
                user_id: {
                    value: this.user_id,
                    label: "Content",
                    type: "number",
                    visible: true
                },
                announcement_id: {
                    value: this.announcement_id,
                    label: "User Id",
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

}