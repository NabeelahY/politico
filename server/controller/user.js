import db from '../models/db';
import Helper from '../helper/helper';

class User {
  static userDetails(detail) {
    return {
      id: detail.id,
      firstname: detail.firstname,
      othername: detail.othername,
      email: detail.email,
      phonenumber: detail.phonenumber,
      passporturl: detail.passporturl,
      isadmin: detail.isadmin,
      created_date: detail.created_date,
    };
  }

  static async createUser(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(firstname, othername, email, phonenumber, passporturl, password, isadmin, created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning *`;
    const newUser = [
      req.body.firstname,
      req.body.othername,
      req.body.email,
      req.body.phonenumber,
      req.file.url,
      hashPassword,
      req.body.isadmin || 'false',
      new Date(),
    ];

    try {
      const { rows } = await db.query(createQuery, newUser);
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      const tken = { 'token': token };
      return res.status(201).send({
        status: res.statusCode,
        data: [User.userDetails(rows[0]),
          tken],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: res.statusCode,
          message: 'User with that credential already exists. Please login with it or sign up with another',
        });
      }
      return res.status(400).send({
        status: res.statusCode,
        message: error,
      });
    }
  }

  static async userLogin(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'Invalid email/password supplied',
        });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'Invalid email/password supplied',
        });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      const tken = { 'token': token };
      return res.status(200).send({
        status: res.statusCode,
        data: [User.userDetails(rows[0]),
          tken],
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        message: error,
      });
    }
  }
}
export default User;
