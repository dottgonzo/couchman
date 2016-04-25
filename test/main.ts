
import * as mocha from "mocha";
import * as chai from "chai";
import * as child_process from "child_process";

let exec = child_process.exec;

let rpj = require("request-promise-json");
let expect = chai.expect

import CouchMan = require("../index");
import couchObj = require("../../couchobject"); //to be changed!!!!!!!!!!
let startPouchServer = require('spawn-pouchdb-server');


before(function(done) {

    exec("rm -rf .db", function() {
        startPouchServer({
            config: {
                file: false,
                log: {
                    file: false
                }
            }
        }, function(error, pouch) {
            if (error) {
                done(error);
            }

            done();



        })

    })

})

describe("test new event creation", function() {
    let obj;
    before(function(done) {
        rpj.put('http://localhost:5985/test-db-create').then(function(d) {

            let CM = new CouchMan({ couch: "http://localhost:5985/test-db-create" });

            let newobj = CM.gen({ class: "event" });

            CM.create(newobj).then(function(_id) {

                CM.find(_id).then(function(obje: couchObj) {
                    obj = obje;
                    done();
                }).catch(function(err) {
                    done(err)
                });

            }).catch(function(err) {
                done(err)
            })
        }).catch(function(err) {
            done(err)
        })



    })
    it("expect an object", function() {
        expect(obj).to.be.an("Object");
    });


    describe("composition of _id", function() {

        it("expect that _id is composed of 4 word", function() {

            expect(obj._id.split("_").length).that.equal(4);

        });

        it("expect that first word of _id is class event", function() {

            expect(obj._id.split("_")[0]).that.equal("event");

        });
        it("expect that second word of _id is serial 00000", function() {

            expect(obj._id.split("_")[1]).that.equal("00000");

        });
        it("expect that third word of _id is a number equal to createdAt", function() {

            expect(parseInt(obj._id.split("_")[2])).that.is.a("number").that.equal(obj.createdAt);

        });
        it("expect fourth word of _id is an uid", function() {

            expect(obj._id.split("_")[3]).that.is.a("string");

        });
        it("expect fourth word of _id is an uid of 5 characters", function() {

            expect(obj._id.split("_")[3].length).that.equal(5);

        });
    });




});


describe("test edit event object", function() {
    let obj;
    before(function(done) {
        rpj.put('http://localhost:5985/test-db-edit').then(function(d) {
            let CM = new CouchMan({ couch: "http://localhost:5985/test-db-edit" });

            let newobj = CM.gen({ class: "event" });

            CM.create(newobj).then(function(_id) {

                CM.find(_id).then(function(obje: couchObj) {
                    CM.update(obje).then(function() {
                        obj = obje;
                        done();
                    }).catch(function(err) {
                        done(err)
                    });
                }).catch(function(err) {
                    done(err)
                });

            }).catch(function(err) {
                done(err)
            })

        }).catch(function(err) {
            done(err)
        })
    })
    it("expect an object", function() {
        expect(obj).to.be.an("Object");
    });


    describe("composition of _id", function() {

        it("expect that _id is composed of 4 word", function() {

            expect(obj._id.split("_").length).that.equal(4);

        });

        it("expect that first word of _id is class event", function() {

            expect(obj._id.split("_")[0]).that.equal("event");

        });
        it("expect that second word of _id is serial 00000", function() {

            expect(obj._id.split("_")[1]).that.equal("00000");

        });
        it("expect that third word of _id is a number equal to createdAt", function() {

            expect(parseInt(obj._id.split("_")[2])).that.is.a("number").that.equal(obj.createdAt);

        });
        it("expect fourth word of _id is an uid", function() {

            expect(obj._id.split("_")[3]).that.is.a("string");

        });
        it("expect fourth word of _id is an uid of 5 characters", function() {

            expect(obj._id.split("_")[3].length).that.equal(5);

        });
    });

});


describe("test edit data object", function() {
    let obj;
    before(function(done) {
        rpj.put('http://localhost:5985/test-db-data').then(function(d) {
            let CM = new CouchMan({ couch: "http://localhost:5985/test-db-data" });

            let newobj = CM.gen();

            CM.create(newobj).then(function(_id) {

                CM.find(_id).then(function(obje: couchObj) {
                    CM.update(obje).then(function() {
                        obj = obje;
                        done();
                    }).catch(function(err) {

                        done(err)
                    });
                }).catch(function(err) {

                    done(err)
                });

            }).catch(function(err) {

                done(err)
            })

        }).catch(function(err) {

            done(err)
        })
    })
    it("expect an object", function() {
        expect(obj).to.be.an("Object");
    });


    describe("composition of _id", function() {

        it("expect that _id is composed of 4 word", function() {

            expect(obj._id.split("_").length).that.equal(4);

        });

        it("expect that first word of _id is class data", function() {

            expect(obj._id.split("_")[0]).that.equal("data");

        });
        it("expect that second word of _id is serial 00000", function() {

            expect(obj._id.split("_")[1]).that.equal("00000");

        });
        it("expect that third word of _id is a number equal to createdAt", function() {

            expect(parseInt(obj._id.split("_")[2])).that.is.a("number").that.equal(obj.createdAt);

        });
        it("expect fourth word of _id is an uid", function() {

            expect(obj._id.split("_")[3]).that.is.a("string");

        });
        it("expect fourth word of _id is an uid of 5 characters", function() {

            expect(obj._id.split("_")[3].length).that.equal(5);

        });
    });




});

describe("test edit location object defined inside couchman", function() {
    let obj;
    before(function(done) {
        rpj.put('http://localhost:5985/test-db-location').then(function(d) {
            let CM = new CouchMan({ couch: "http://localhost:5985/test-db-location", class: "location" });

            let newobj = CM.gen();

            CM.create(newobj).then(function(_id) {

                CM.find(_id).then(function(obje: couchObj) {
                    CM.update(obje).then(function() {
                        obj = obje;
                        done();
                    }).catch(function(err) {
                        done(err)
                    });
                }).catch(function(err) {
                    done(err)
                });

            }).catch(function(err) {
                done(err)
            })

        }).catch(function(err) {
            done(err)
        })
    })
    it("expect an object", function() {
        expect(obj).to.be.an("Object");
    });


    describe("composition of _id", function() {

        it("expect that _id is composed of 4 word", function() {

            expect(obj._id.split("_").length).that.equal(4);

        });

        it("expect that first word of _id is class location", function() {

            expect(obj._id.split("_")[0]).that.equal("location");

        });
        it("expect that second word of _id is serial 00000", function() {

            expect(obj._id.split("_")[1]).that.equal("00000");

        });
        it("expect that third word of _id is a number equal to createdAt", function() {

            expect(parseInt(obj._id.split("_")[2])).that.is.a("number").that.equal(obj.createdAt);

        });
        it("expect fourth word of _id is an uid", function() {

            expect(obj._id.split("_")[3]).that.is.a("string");

        });
        it("expect fourth word of _id is an uid of 5 characters", function() {

            expect(obj._id.split("_")[3].length).that.equal(5);

        });
    });




});


describe("test take", function() {
    let objs = [];
    before(function(done) {
        rpj.put('http://localhost:5985/test-db-take').then(function(d) {
            let CM = new CouchMan({ couch: "http://localhost:5985/test-db-take", class: "take" });

            let newobj = CM.gen();

            CM.create(newobj).then(function(_id) {

                CM.create(CM.gen()).then(function(_id) {

                    CM.take().then(function(objects: couchObj[]) {

                        objs = objects;
                        done();

                    }).catch(function(err) {
                        done(err)
                    });

                }).catch(function(err) {
                    done(err)
                })


            }).catch(function(err) {
                done(err)
            })

        }).catch(function(err) {
            done(err)
        })
    })
    it("expect an Array", function() {
        expect(objs).to.be.an("Array");
    });


    describe("composition of _id", function() {
        let obj = objs[0];
        it("expect that _id is composed of 4 word", function() {

            expect(obj._id.split("_").length).that.equal(4);

        });

        it("expect that first word of _id is class location", function() {

            expect(obj._id.split("_")[0]).that.equal("location");

        });
        it("expect that second word of _id is serial 00000", function() {

            expect(obj._id.split("_")[1]).that.equal("00000");

        });
        it("expect that third word of _id is a number equal to createdAt", function() {

            expect(parseInt(obj._id.split("_")[2])).that.is.a("number").that.equal(obj.createdAt);

        });
        it("expect fourth word of _id is an uid", function() {

            expect(obj._id.split("_")[3]).that.is.a("string");

        });
        it("expect fourth word of _id is an uid of 5 characters", function() {

            expect(obj._id.split("_")[3].length).that.equal(5);

        });
    });




});



after(function(done) {
    exec("rm -rf .db", function() {
        done();
        process.exit(0)
    })
})