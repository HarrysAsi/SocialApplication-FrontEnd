// Form creator...
// in class constructor : this.formHelper = null;
// init: var attributes = [{attribute: "username", type: "text"}, {attribute: "password", type: "password"}];
//        var model = new User();
//        this.formHelper = new FormHelper([model], attributes, "login");
//        var str = this.formHelper.main_str();
//        $("#loginform").html(str);
// attribute = {attribute: project_id, :type: "text"}
// Types: password, text, date, dropdown

class FormHelper {
    constructor(model, attributes, form_name) {
        this.model = model;
        this.attributes = attributes;
        this.form_name = form_name;
        this.button_id = "login-button";
        this.button_val = "Submit";
        this.button_image_val = "Take a Picture";
        this.action = "";
    }

    main_str() {
        return this.createFormStr();
    }

    createFormStr() {
        var str = "";
        var models = this.model; // array of models...
        var model_size = models.length; // array of models...
        var main_attributes = this.attributes;
        str += "<form name='" + this.form_name + "' class='" + this.form_name + "' enctype=\"multipart/form-data\" action='" + this.action + "'>\n";
        var input = true; // if its text or textarea
        var rows = 5; // for text area foeld

        for (var ob in main_attributes) {
            var single_str = "";
            var attribute = main_attributes[ob].attribute;
            var attr_type = main_attributes[ob].type;
            var required = "";
            var type = "";
            var label = "";
            var class_name = "form-control";
            var select = "";
            var image = false;
            var update_image = false;
            var self = false;

            for (var i = 0; i < model_size; i++) {
                select = "";
                label = "";
                type = "";
                required = "";
                single_str = "";
                input = true;
                image = false;
                update_image = false;
                self = false;
                var curr_model = models[i]; // array of models...
                var model_attributes = curr_model.attributes;

                var model_attribute = model_attributes[attribute];

                if (model_attribute !== undefined) {
                    type = model_attribute.type;
                    single_str += '<div class="form-group">\n';

                    // Model construction
                    if (model_attribute.visible) {
                        required = "required";
                    }
                    //End of model construction


                    //Attributes construction
                    if (attr_type === "date") {
                        type = "date";
                        class_name += " date";
                    } else if (attr_type === "textarea") {
                        type = "textarea";
                        input = false;
                    } else if (attr_type === "password") {
                        type = "password";
                    } else if (attr_type === "dropdown") {
                        select += "<select class='" + class_name + "' id='" + attribute + "'></select> \n";
                    } else if (attr_type === "image") {
                        type = "file";
                        image = true;
                    } else if (attr_type === "update-image") {
                        update_image = true;
                    } else if (attr_type === "self") {
                        console.log("handmade");
                        single_str += "<div id=self>";
                        self = true;
                    } else {
                        type = "text";
                    }
                    //End of attributes construction
                    if (!self) {
                        single_str += "<label for='" + attribute + "' style='font-weight:bold' '>" + model_attribute.label + "</label>\n";
                    }
                    if (input) {
                        if (image) { // type = "image"
                            single_str += ' <input class="' + class_name + '" type="'+ type +'" id="' + attribute + '" accept="image/*">';
                        } else if (update_image) {
                            console.log("update image");
                            //self-handled
                            //single_str += "<textarea id='" + attribute + "' " + required + " rows = " + rows + " class='" + class_name + "' name='" + attribute + "'/>\n";
                        } else if (self) {
                            console.log("handmade form");
                            single_str += "</div>";
                        } else {
                            if (select !== "") { // "type = "dropdown"
                                single_str += select;
                            } else { // type= "text"
                                single_str += "<input id='" + attribute + "' " + required + " type='" + type + "' class='" + class_name + "' name='" + attribute + "'/>\n";
                            }
                        }
                    } else { //type = "textarea"
                        single_str += "<textarea id='" + attribute + "' " + required + " rows = " + rows + " class='" + class_name + "' name='" + attribute + "'/>\n";
                    }
                    single_str += "</div>";
                    str += single_str;
                }
            } // end of if (model !== "undefined")
        }// end of models loops
        str += "<input type='button' id='" + this.button_id + "' class='btn btn-primary " + class_name + "'  value=" + this.button_val + " />\n";
        str += "</form>";
        console.log(str);
        return str;
    }

    bindEvents(callback = function ($form) {
    }) {
        var $form = "";
        $form = $("." + this.form_name);
        //$form.submit();
        callback();
    }

}