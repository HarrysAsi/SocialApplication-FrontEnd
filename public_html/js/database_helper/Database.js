/* global master, sqlitePlugin, runtime */

class Database {
    constructor() {
        this.db = null;
    }

    init(callback = function () {
    }) {
        var self = this;
//        if (master.device.platform === "browser") {
        this.db = openDatabase("social_appy", 1, "social_appy", 2400);
//        } else {
//            this.db = sqlitePlugin.openDatabase({name: "project_management.db", location: "default"});
//        }
        if (master.sharedPref.isFirstTime) {
            this.createDynamicDatabase(function () {
                callback(true);
            });
        } else {
            this.selectPrimaryData();
            callback();
//            this.createDatabase(function () {
//                callback(true);
//            });
        }

    }

    transaction(sql, ob = {
        success: function () {
        }, failure: function () {
        }
    }) {
        var fail = ob.failure;
        this.db.transaction(function (tx) {
            tx.executeSql(sql);
        }, fail, ob.success);
    }

    createDynamicDatabase(callback = function () {
    }) {
        var schema = runtime.allSchema;
        this.db.transaction(function (tx) {

            for (var ob in schema) {
                var current_instance = new schema[ob]();
                tx.executeSql(current_instance.createSchemaSql());
            }

        }, function (err) {

            console.log(err);
            callback(err);
        }, function () {
            callback(true);
        });


    }

    dropDatabase(callback = function () {
    }) {
        var schema = runtime.allSchema;
        this.db.transaction(function (tx) {

            for (var ob in schema) {
                var current_instance = new schema[ob]();
                tx.executeSql("drop table " + current_instance.entityClass);
            }

        }, function (err) {

            console.log(err);
            callback(err);
        }, function () {
            callback(true);
        });
    }

    selectPrimaryData(callback = function () {
    }) {
        var self = this;
        var entities = runtime.primaryEntities;
        var length = entities.length;
        var count = 0;


        this.db.transaction(function (tx) {

                for (var ob in entities) {

                    function Handle(entity) {
                        var self = this;
                        this.currentInstance = new entity();

                        this.entity = entity;
                        this.success = function (tx, results) {

                            if (results.rows.length) {
                                for (var ob = 0; ob < results.rows.length; ob++) {
                                    var element = results.rows[ob];
                                    var obj = new entity();

                                    for (var cur in obj.attributes) {

                                        obj.set(cur, element[cur]);

                                    }


                                    obj.toMemory();
                                }
                            }

                        };
                        this.failure = function (tx, err) {
                            console.log(err);
                        };

                    }
                    ;

                    var handler = new Handle(entities[ob]);
                    tx.executeSql(handler.currentInstance.select(), [], handler.success, handler.failure);
                }

            }, function (err) {
                console.log(err);
                callback(err);
            }, function () {
                callback(true);
            }
        );


    }

    selectBusinessData(callback = function () {
    }, business_id) {
        var self = this;
        var entities = runtime.businessEntities;
        var length = entities.length;
        var count = 0;


        this.db.transaction(function (tx) {

                for (var ob in entities) {

                    function Handle(entity) {
                        var self = this;
                        this.currentInstance = new entity();

                        this.entity = entity;
                        this.success = function (tx, results) {

                            if (results.rows.length) {
                                for (var ob = 0; ob < results.rows.length; ob++) {
                                    var element = results.rows[ob];
                                    var obj = new entity();

                                    for (var cur in obj.attributes) {

                                        obj.set(cur, element[cur]);

                                    }


                                    obj.toMemory();
                                }
                            }

                        };
                        this.failure = function (tx, err) {
                            console.log(err);
                        };

                    }
                    ;

                    var handler = new Handle(entities[ob]);
                    console.log(handler.currentInstance.selectForBusiness(business_id));
                    tx.executeSql(handler.currentInstance.selectForBusiness(business_id), [], handler.success, handler.failure);
                }

            }, function (err) {
                console.log(err);
                callback(err);
            }, function () {
                callback(true);
            }
        );
    }
}