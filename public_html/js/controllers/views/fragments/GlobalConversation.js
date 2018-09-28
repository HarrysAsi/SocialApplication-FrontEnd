class GlobalConversation extends Controller {
    constructor(params, bundle) {
        super("global_conversation", "global_conversation", params);
        super.redirect();
    }

    init() {
        console.log("global_conversation");
    }

    bindEvents() {

        this.refreshConversationList();

        $(this.container + " #menu_home ").click(function () {
            master.paging.redirect("main");
        });
        $(this.container + " #menu_profile").click(function () {
            master.paging.redirect("menu_profile");
        });
        $(this.container + " #menu_friends").click(function () {
            master.paging.redirect("menu_friends");
        });
        $(this.container + " #menu_logout").click(function () {
            master.paging.redirect("login");
        });
        $(this.container + " #global_friends").click(function () {
            master.paging.redirect("global_friends");
        });

        $(this.container + " #global_conversations").click(function () {
            master.paging.redirect("global_conversations");
        });

        $(this.container + " .conversation-user").click(function () {
            let conversation_id = $(this).data('conversation');
            console.log(conversation_id);
            master.paging.redirect("chat", {conversation_id: conversation_id});
        });
    }

    refreshConversationList() {
        let conversations = runtime.conversations;
        let str = "";
        for (let ob in conversations) {
            let conversation_title = "";
            let curr_conversation = conversations[ob];
            let curr_participants = curr_conversation.participants;
            //In case we have more than one participant / GROUP CHAT (As title appears all the participants name)
            for (let obj in curr_participants) {
                conversation_title += curr_participants[obj].name + " " + curr_participants[obj].surname + "<br>";
            }

            str += ' <li class="left clearfix conversation-user" data-conversation=' + curr_conversation.id + ' >\n' +
                '       <span class="chat-img pull-left">\n' +
                '           <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar" class="img-circle">\n' +
                '       </span>\n' +
                '       <div class="chat-body clearfix">\n' +
                '           <div class="header_sec">\n' +
                '               <strong class="primary-font">' + conversation_title + ' </strong> ' +
                '               <strong class="pull-right "> 09:45AM</strong>\n' +
                '           </div>\n' +
                '           <div class="contact_sec">\n' +
                '               <strong class="primary-font">(123) 123-456</strong> ' +
                '               <span class="badge pull-right">3</span>\n' +
                '           </div>\n' +
                '       </div>\n' +
                '    </li>';
        }

        $(this.container + " #conversation_list").html(str);
    }
}