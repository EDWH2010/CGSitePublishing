const mysql = require('mysql');

const ConnectionsOption = {
    host: 'localhost',
    user: 'root',
    port:3306,
    password:'',
    database:''
}

class MysqlConnectorPool {
    consMap;

    constructor(map){
        map = map instanceof Map ? map : new Map();
        this.consMap = map;
    }

    createMyssqlConnection(name,options){
        this.consMap.set(name,options instanceof Object.getPrototypeOf(ConnectionsOption) ? options : {
            host: 'localhost',
            user: 'root',
            port:3306,
              password:'',
              database:''
        });
    }
}

module.exports = {
    Option : ConnectionsOption,
    MysqlPool : new MysqlConnectorPool(new Map())
};