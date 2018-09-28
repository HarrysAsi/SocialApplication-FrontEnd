class Toast {
    constructor(positionClass = "bot-full", data = {closeButton: false, debug: false, newestOnTop: true, progressBar: false, preventDuplicates: true, onclick: null,
            showDuration: "300", hideDuration: "1000", timeOut: "5000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut"}) {

        //Positions: "toast-top-right","toast-bottom-right","toast-bottom-left","toast-bottom-center",
        //"toast-top-left","toast-top-full-width","toast-bottom-full-width","toast-bottom-full-width",
        this.positionClass = positionClass;
        this.filter();

        toastr.options = {
            "closeButton": data.closeButton,
            "debug": data.debug,
            "newestOnTop": data.newestOnTop,
            "progressBar": data.progressBar,
            "positionClass": this.positionClass,
            "preventDuplicates": data.preventDuplicates,
            "onclick": data.onclick,
            "showDuration": data.showDuration,
            "hideDuration": data.hideDuration,
            "timeOut": data.timeOut,
            "extendedTimeOut": data.extendedTimeOut,
            "showEasing": data.showEasing,
            "hideEasing": data.hideEasing,
            "showMethod": data.showMethod,
            "hideMethod": data.hideMethod
    }

    }

    filter() {
        switch (this.positionClass) {
            case "top-right":
                this.positionClass = "toast-top-right";
                break;
            case "bot-right":
                this.positionClass = "toast-bottom-right";
                break;
            case "bot-left":
                this.positionClass = "toast-bottom-left";
                break;
            case "bot-center":
                this.positionClass = "toast-bottom-center";
                break;
            case "top-left":
                this.positionClass = "toast-top-left";
                break;
            case "top-full":
                this.positionClass = "toast-top-full-width";
                break;
            case "bot-full":
                this.positionClass = "toast-bottom-full-width";
                break;
            case "top-center":
                this.positionClass = "toast-top-center";
                break;
            default:
                this.positionClass = "toast-bottom-full-width";
                break;

        }
    }

    success(message, title) {
        toastr["success"](message, title);
    }

    info(message, title) {
        toastr["info"](message, title);
    }

    warning(message, title) {
        toastr["warning"](message, title);
    }

    error(message, title) {
        toastr["error"](message, title);
    }
}