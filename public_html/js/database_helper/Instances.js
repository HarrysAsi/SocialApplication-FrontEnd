class Instances {
    constructor() {
        this.current_user = null;

        this.users = new Map();
        this.usertypes = new Map();
        this.friends = new Map();
        this.friendstatus = new Map();
        this.friendtypes = new Map();
        this.images = new Map();
        this.announcements = new Map();
        this.announcement_likes = new Map();
        this.conversations = new Map();
        this.conversation_participants = new Map();
        this.messages = new Map();
        this.friend_requests = new Map();
        //this.conversation_messsages = new Map();

        this.allSchema = [User, UserType, Friend, FriendStatus, FriendType, Imaging,
            Announcement, AnnouncementLikes, Conversation, ConversationParticipants,
            Message, FriendRequest];

        this.online_friends = new Map();
        this.suggested_users = new Map();

    }

    get primaryEntities() {
        return [
            User,
            UserType,
            Friend,
            FriendStatus,
            FriendType,
            Imaging,
            Announcement,
            AnnouncementLikes,
            Conversation,
            ConversationParticipants,
            Message,
            FriendRequest,
            //ConversationMessages
        ];
    }

    get removeAllInstances() {
        runtime = new Instances();
    }

}

var runtime = new Instances();