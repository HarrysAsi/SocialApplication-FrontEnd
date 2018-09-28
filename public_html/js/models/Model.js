/* global master, runtime, library */

class Model {

    constructor(entityClass) {

        this.entityClass = entityClass;

        this.attributes;
        this.db = master.db;
        this.runtime = null;
    }

    attributesParsed() {
        var attributes = this.attributes;

        var result = {};
        for (var ob in attributes) {
            var attribute = attributes[ob];
            if (attribute.type === "date" && this[ob] !== 0) {
                result[ob] = library.dateFormat(this[ob]);

            } else
                result[ob] = this[ob];
        }
        return result;
    }

 
    remove(success = function() {}, failure = function(){}) {

        var self = this;
        var sql = "delete  from " + this.entityClass + " where ";

        var attrs = this.attributes;
        var id = "";
        for (var ob in attrs) {
            var attr = attrs[ob];
            if (attr.primary) {
                sql += ob + "='" + this[ob] + "'";
                id = this[ob];
            }
        }
        console.log(sql);
        delete self.runtime[id];
        this.db.transaction(sql, {success: function () {
                console.log(id);

                success();

            }, failure: failure});

    }

    update(success = function() {}, failure = function(){}) {
        var self = this;
        var set = "";

        var length = Object.keys(this.attributes).length;
        var attrs = this.attributes;

        var i = 0;
        var id_value;
        var id_name;
        for (var ob in attrs) {
            var element = attrs[ob];
            if (element.primary) {
                id_value = this[ob];
                id_name = ob;
            } else {
                var va = this[ob];
                switch (element.type) {
                    case "date":
                        if (va) {
                            if (va === "0000-00-00 00:00:00" || va === 0 || va === "0000-00-00") {
                                va = 0;
                            } else {
                                va = new Date(va).getTime();
                            }
                        }
                        break;
                    case "list":
                    case "number":
                        break;
                    case "real":
                        break;
                    default:
                        va = "\"" + this[ob] + "\"";
                        break;
                }

                set += ob + "=" + va;
                if (i < length - 1) {
                    set += ",";

                }
            }

            i++;
        }



        var sql = "update " + this.entityClass + " set " + set + " where " + id_name + "=" + id_value;
        console.log(sql);
        this.db.transaction(sql, {success: success, failure: failure});
    }

    toMemory() {

    }

    createSchemaSql() {
        console.log("creating schema..." + this.entityClass); 
        var attrs = this.attributes;
        var sql = "create table " + this.entityClass + " (";
        var length = Object.keys(attrs).length;
        var index = 0;
        for (var ob in attrs) {
            var element = attrs[ob];
            var type = "";
            switch (element.type) {
                case "enum":
                case "string":
                    type = "text";
                    break;
                case "date":
                    type = "integer";
                    break;
                case "number":
                    type = "integer";
                    break;
                default:
                    type = element.type;

            }
            sql += ob + " " + type + "";

            if (element.primary) {
                sql += " primary key";
            }

            if (length - 1 !== index) {
                sql += ",";
            }
            index++;
            
        }
        sql += ");";
        console.log(sql);
        return sql;
    }

    setNet(name, value) {
        if (this.attributes[name] && this.attributes[name].type === "date") {
            if (value === "0000-00-00 00:00:00" || value === 0 || value === "0000-00-00" || value === "0") {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                this[name] = 0;
            } else {
                this[name] = new Date(value).getTime();
            }


        } else if (this.attributes[name] && this.attributes[name].type === "string") {
            this[name] = value.replace(/"/g, "'");

        } else {
            this[name] = value;
        }
    }

    set(name, value) {
        if (this.attributes[name] && this.attributes[name].type === "date") {
            if (value === "0000-00-00 00:00:00" || value === 0 || value === "0000-00-00" || value === "0") {
                this[name] = 0;
            } else {
                this[name] = new Date(value).getTime();
            }


        } else {
            this[name] = value;
        }

    }
    insert() {
        var self = this;

        var vsql = " values(";
        var asql = " (";

        var length = Object.keys(this.attributes).length;
        var attrs = this.attributes;
        var i = 0;
        for (var ob in attrs) {
            var element = attrs[ob];

            var va = this[ob];

            switch (element.type) {
                case "date":
                    if (va !== undefined) {


                        if (va === "0000-00-00 00:00:00" || va === 0 || va === "0000-00-00" || !va) {
                            va = 0;
                        } else {
                            va = new Date(va).getTime();
                        }

                    }

                    break;
                case "list":
                case "number":
                    break;
                default:
                    va = "\"" + this[ob] + "\"";
                    break;
            }

            vsql += va;
            asql += ob;

            if (i < length - 1) {
                vsql += ",";
                asql += ",";
            }
            i++;
        }

        vsql += ");";
        asql += ")";
        var sql = "insert or replace into " + this.entityClass + asql + vsql;
        console.log(sql);
        //this.db === undefined ????;
        this.db.transaction(sql, {success: self.success, failure: self.failure});
    }

    select() {
        return "select * from " + this.entityClass + "";
    }


    success() {

    }
    failure(ms, error) {
        console.log(ms, error);
    }

    get attributes() {
        return null;
    }

    set attributes(value) {
        this.attributes = value;
    }
    getMap() {
        return null;
    }
}
