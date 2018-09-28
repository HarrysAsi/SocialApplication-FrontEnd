var getUrl = window.location;
const localDomain = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] +"/public_html";

class Controller {
    constructor(name = "loader", page = "loader", params = {hash: false, role:"dialog", transition: 'none', reload: true, reverse: false}){
        var self = this;
        this.changeHash = params.hash ? params.hash : false;
        this.name = name;
        this.transition = params.transition;
        this.role = params.undefined;
        this.reload = params.reload !== undefined ? params.reload : true;
        this.reverse = params.reverse;
        this.page = localDomain + "/views/" + page + ".html";
        this.container = "." + this.name + "-page";
        this.content = "." + this.name + "-page .ui-content";
        this.hash = this.name;

    }

    redirect() {
        var self = this;
        $(":mobile-pagecontainer").pagecontainer("change", this.page, {transition: this.transition, changeHash: this.changeHash, role: this.role, reload: this.reload, reverse: this.reverse});
        $(document).off("pageinit", this.container);
        $(document).on("pageinit", this.container, function () {
            self.init();
            self.bindEvents();
            utility.current_page = self;
        });
        window.location.hash = this.name;
        history.pushState({url: location.href}, "", location.href);
    }


    init() {

    }

    bindEvents() {
    }
}