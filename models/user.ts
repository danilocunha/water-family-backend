import {BasicUser, User} from "../types/user";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (user: User, callback: Function) => {
    const queryString = "INSERT INTO User (name, password, email) VALUES (?, ?, ?)"
  
    db.query(
      queryString,
      [user.name, user.password, user.email],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
        *
      FROM User AS u`
  
    db.query(queryString, (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const users: User[] = [];
  
      rows.forEach(row => {
        const user: User =  {
          id: row.id,
          name: row.name,
          email: row.email
        }
        users.push(user);
      });
      callback(null, users);
    });
}