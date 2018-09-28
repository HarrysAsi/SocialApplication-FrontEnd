class Loader extends Controller {
    constructor(params, bundle) {
        super("loader", "loader");
        super.redirect();
    }

    init() {
        console.log("loader");
    }

    bindEvents() { }
}