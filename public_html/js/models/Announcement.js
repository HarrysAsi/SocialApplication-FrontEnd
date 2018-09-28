/* global runtime */

class Announcement extends Model {
    constructor(id = 0, content = "", user_id = 0, date_created = 0) {
        super("Announcement");

        this.id = id;
        this.content = content;
        this.user_id = user_id;
        this.date_created = date_created;

    }

    toMemory() {
        runtime.announcements[this.id] = this;
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
                content: {
                    value: this.content,
                    label: "Content",
                    type: "string",
                    visible: true
                },
                user_id: {
                    value: this.user_id,
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

    get userInfo() {
        let users = runtime.users;
        let result = runtime.current_user;
        for (let ob in users) {
            if (this.user_id === users[ob].id) {
                result = users[ob];
            }
        }
        return result;
    }

    get isLikedByMe() {
        let likes = runtime.announcement_likes;
        let current_user_id = runtime.current_user.id;
        for (let ob in likes) {
            let curr_like = likes[ob];
            if (this.id === curr_like.announcement_id) {
                return true;
            }
        }
        return false;
    }

}