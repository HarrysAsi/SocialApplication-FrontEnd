/* global runtime */

class User extends Model {
    constructor(id = 0, email = "", password = "", name = "", surname = "", birthdate = 0,
                mobile_tel = "", image_id = 0, user_type = 0, country = "", date_created = 0, date_updated = 0, current_user = 0) {
        super("User");

        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.mobile_tel = mobile_tel;
        this.image_id = image_id;
        this.user_type = user_type;
        this.country = country;
        this.date_created = date_created;
        this.date_updated = date_updated;
        this.current_user = current_user;

    }

    toMemory() {
        if (this.current_user) {
            runtime.current_user = this;
        } else {
            runtime.users[this.id] = this;
        }
    }

    get attributes() {
        // Types - number, string , date
        var array =
            {
                id: {
                    value: this.id,
                    visible: false,
                    label: "Id",
                    type: "number",
                    primary: true
                },
                email: {
                    value: this.email,
                    visible: true,
                    label: "Email",
                    type: "string"
                },
                password: {
                    value: this.password,
                    visible: true,
                    label: "Password",
                    type: "string"
                },
                name: {
                    value: this.name,
                    visible: true,
                    label: "Name",
                    type: "string"
                },
                surname: {
                    value: this.surname,
                    visible: true,
                    label: "Surname",
                    type: "string"
                },
                birthdate: {
                    value: this.birthdate,
                    visible: true,
                    label: "Birthdate ",
                    type: "date"
                },
                mobile_tel: {
                    value: this.mobile_tel,
                    visible: true,
                    label: "Mobile Telephone",
                    type: "string"
                },
                image_id: {
                    value: this.image_id,
                    visible: true,
                    label: "Icon",
                    type: "number"
                },
                user_type: {
                    value: this.user_type,
                    visible: true,
                    label: "User Type",
                    type: "number"
                },
                country: {
                    value: this.country,
                    visible: true,
                    label: "Country",
                    type: "string"
                },
                date_created: {
                    value: this.date_created,
                    visible: true,
                    label: "Date Created",
                    type: "date"
                },
                date_updated: {
                    value: this.date_updated,
                    visible: true,
                    label: "Date Updated",
                    type: "date"
                },
                current_user: {
                    value: this.current_user,
                    visible: true,
                    label: "Current User",
                    type: "number"
                }
            };
        return array;
    }

    get  toServer() {
        var attr = {
            "id": this.id,
            "email": this.email,
            "name": this.name,
            "surname": this.surname,
            "birthdate": this.birthdate,
            "mobile_tel": this.mobile_tel,
            "image": this.image,
            "user_type": this.user_type,
            "date_created": this.date_created,
            "date_updated": this.date_updated
        };
        return attr;
    }

    get userInformation() {
        return {
            "name": this.name,
            "surname": this.surname,
            "email": this.email
        };
    }

   get userImage(){
        var images = runtime.images;
        let image = new Imaging();
        for(let ob in images){
            let curr_image = images[ob];
            if(this.image_id === curr_image.id){
                return curr_image;
            }
        }
        return image;
   }

    get userTypeDescription() {
        var description;
        var user_types = runtime.usertypes;
        for (let ob in user_types) {
            let curr_user_type = user_types[ob];
            if (this.user_type === curr_user_type.id) {
                description = curr_user_type.descr_represent;
            }
        }
        return description;
    }
}