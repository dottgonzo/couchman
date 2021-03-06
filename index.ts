import * as Promise from "bluebird";

// import * as _ from "lodash";

import couchObj from 'couchobject';
import couchNode from 'couch-node';
import merge = require("json-add");

import * as superagent from "superagent";


interface Idepends {
    class: string,
    mount: string;
    relation?: Irelations
}
interface Irelations {
    dependents: Idependents;
    depends: Idepends
}

interface Idependents {
    class: string,
    mount: string;
    relation?: Irelations
}

interface IAuth {
    user: string;
    password: string;
}


class CouchManager extends couchNode {
    auth: IAuth;
    couchdb: string;
    class: string;
    serial: string;
    apiVersion: string;

    constructor(conf: { url: string, couch: string, class?: string, serial?: string, apiVersion?: string, auth?: IAuth }) {

        if (!conf) throw Error("No conf of couchman")

        super(conf.url);


        this.couchdb = conf.couch;
        if (conf.class) this.class = conf.class;
        if (conf.serial) this.class = conf.serial;
        if (conf.apiVersion) this.apiVersion = conf.apiVersion;
    }





    gen(options?: any) { //to be tiped
        let opt = <couchObj>{};
        let that = this;

        if (options) {
            if (options.class) opt.class = options.class;
            if (options.serial) opt.serial = options.serial
            if (options.apiVersion) opt.apiVersion = options.apiVersion
        }

        if (!opt.class && that.class) opt.class = that.class;
        if (!opt.serial && that.serial) opt.serial = that.serial;
        if (!opt.apiVersion && that.apiVersion) opt.apiVersion = that.apiVersion

        return new couchObj(opt);

    }



    new(newobj) {

        let obj = this.gen();
        merge(obj, newobj);
        return obj
    }
    find_by_label(newobj) {


    }

    find_by_tags(newobj) {


    }
    where(wh: { any }) {


    }

    all(data?: { number?: number, offset?: number, order?: string, startId?: string, stopId?: string, startTime?: number, stopTime?: number }, relation?: Irelations) {
        if (!data) {
            data = {};
        }
        let that = this;
        let startId;
        let stopId;
        if (data.startId) {
            startId = data.startId
            if (data.stopId) {
                stopId = data.stopId
            } else {
                stopId = false
            }
        } else {

            if (that.class) {
                if (that.serial) {
                    startId = that.class + "_" + that.serial + "_"
                } else {
                    startId = that.class + "_00000_"
                }

            } else {
                if (that.serial) {
                    startId = "data_" + that.serial + "_"
                } else {
                    startId = "data_00000_"
                }

            }


            if (data.stopId) {
                stopId = data.stopId
            } else {

                if (that.class) {
                    if (that.serial) {
                        stopId = that.class + "_" + that.serial + "_"
                    } else {
                        stopId = that.class + "_00000_"
                    }

                } else {
                    if (that.serial) {
                        stopId = "data_" + that.serial + "_"
                    } else {
                        stopId = "data_00000_99999999999"
                    }

                }

            }


        }

        let q;

        if (stopId) {
            q = that.couchdb + '/_all_docs?startkey="' + startId + '"&endkey=' + stopId;
        } else {
            q = that.couchdb + '/_all_docs?startkey="' + startId + '"';
        }
        console.log(q)
        return new Promise(function (resolve, reject) {
            rpj.get(q).then(function (objects) {
                console.log(objects)
                resolve(objects.rows);

                if (relation) {
                    resolve(that.relation(objects, relation))
                }
            }).catch(function (err) {
                reject(err);
            })

        })

    }

    relation(obj: any, relations: Irelations): any {

    }

}


export = CouchManager