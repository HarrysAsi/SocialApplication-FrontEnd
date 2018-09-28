class AllModelsService extends ConnectionAjax {

    constructor(data = {}, method, url, auth = false, token = "", callbackSuccess, callbackError) {
        super(data, method, url, auth, token);
        this.callbackSucc = callbackSuccess;
        this.callbackErr = callbackError;
        this.init();
    }

    success(data) {
        console.log(data);
        let dt = data['success']['Data'];
        let curr_ob = dt;
        try {
            curr_ob = dt['users'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let user = new User(curr_ob[i].id, curr_ob[i].email, null, curr_ob[i].name, curr_ob[i].surname, curr_ob[i].birthdate,
                    curr_ob[i].mobile_tel, curr_ob[i].image_id, curr_ob[i].user_type, curr_ob[i].country, curr_ob[i].date_created,
                    curr_ob[i].date_updated, 0);
                user.insert();
                user.toMemory();
            }

            curr_ob = dt['user_type'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let user_types = new UserType(curr_ob[i].id, curr_ob[i].description, curr_ob[i].descr_represent);
                user_types.insert();
                user_types.toMemory();
            }

            curr_ob = dt['friend_type'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let friend_types = new FriendType(curr_ob[i].id, curr_ob[i].description);
                friend_types.insert();
                friend_types.toMemory();
            }

            curr_ob = dt['friend_status'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let friend_status = new FriendStatus(curr_ob[i].id, curr_ob[i].description);
                friend_status.insert();
                friend_status.toMemory();
            }

            curr_ob = dt['friends'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let friend = new Friend(curr_ob[i].user_id, curr_ob[i].friend_id, curr_ob[i].friend_type, curr_ob[i].friend_status);
                friend.insert();
                friend.toMemory();
            }

            curr_ob = dt['conversations'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let conversation = new Conversation(curr_ob[i].id, curr_ob[i].creator_id, curr_ob[i].title, curr_ob[i].created_date);
                conversation.insert();
                conversation.toMemory();
            }

            curr_ob = dt['conversation_participants'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let conversation_participant = new ConversationParticipants(i, curr_ob[i].conversation_id, curr_ob[i].participant_id, curr_ob[i].date_created);
                conversation_participant.insert();
                conversation_participant.toMemory();
            }

            curr_ob = dt['announcements'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let announcement = new Announcement(curr_ob[i].id, curr_ob[i].content, curr_ob[i].user_id, curr_ob[i].date_created);
                announcement.insert();
                announcement.toMemory();
            }

            curr_ob = dt['announcement_likes'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let announcement_like = new AnnouncementLikes(curr_ob[i].announcement_id, curr_ob[i].user_id, curr_ob[i].announcement_id, curr_ob[i].date_created);
                announcement_like.insert();
                announcement_like.toMemory();
            }

            curr_ob = dt['friend_images'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let friend_image = new Imaging(curr_ob[i].id, curr_ob[i].image, curr_ob[i].description, curr_ob[i].date_uploaded);
                friend_image.insert();
                friend_image.toMemory();
            }
            
            curr_ob = dt['requests']['friend_request_users'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let user = new User(curr_ob[i].id, curr_ob[i].email, null, curr_ob[i].name, curr_ob[i].surname,
                    curr_ob[i].birthdate, curr_ob[i].mobile_tel, curr_ob[i].image_id, curr_ob[i].user_type, curr_ob[i].country,
                    curr_ob[i].date_created, curr_ob[i].date_updated);
                user.insert();
                user.toMemory();
            }

            curr_ob = dt['requests']['friend_requests'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                let friend_request = new FriendRequest(curr_ob[i].sender_user_id, curr_ob[i].sender_user_id, curr_ob[i].receiver_user_id,
                    curr_ob[i].status_id, curr_ob[i].date_updated);
                friend_request.insert();
                friend_request.toMemory();
            }

            curr_ob = dt['suggested_users'];
            console.log(curr_ob);
            for (let i = 0; i < curr_ob.length; i++) {
                runtime.suggested_users[curr_ob[i].id] = new User(curr_ob[i].id, curr_ob[i].email, null, curr_ob[i].name,
                    curr_ob[i].surname, curr_ob[i].birthdate, curr_ob[i].mobile_tel, curr_ob[i].image_id, curr_ob[i].country,
                    curr_ob[i].user_type, curr_ob[i].date_created, curr_ob[i].date_updated);
            }

            // announcements gg
            // announcement_likes gg
            // friend_images gg
            // friend_requests gg
            // suggested_users
            // friend_requests (requests), users and the friends requests...

        } catch (e) {
            console.log(e);
            this.callbackErr(dt);
        }


        if (this.callbackSucc !== undefined) {
            this.callbackSucc(dt);
        }

    }

    failure(data) {
        if (this.callbackErr !== undefined) {
            this.callbackErr(data);
        } else {
            console.log("error", data);
        }
    }

}
