"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.create = void 0;
const db_1 = require("../db");
const create = (user, callback) => {
    const queryString = "INSERT INTO User (name, password, email) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [user.name, user.password, user.email], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findAll = (callback) => {
    const queryString = `
      SELECT 
        *
      FROM User AS u`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const users = [];
        rows.forEach(row => {
            const user = {
                id: row.id,
                name: row.name,
                email: row.email
            };
            users.push(user);
        });
        callback(null, users);
    });
};
exports.findAll = findAll;
