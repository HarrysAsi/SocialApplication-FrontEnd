class Utilities {
    constructor(params) {
        this.toast = new Toast();
        this.language = "english";
        this.access = false;
        this.current_page = null;
    }

    init() {
        console.log("Program helper init");
    }

}

var utility = new Utilities();