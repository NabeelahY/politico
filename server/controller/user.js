import db from '../models/db';
import Helper from '../helper/helper';

class User {
  static async createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Please enter a valid email address',
      });
    }
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
      req.body.passporturl,
      hashPassword,
      'false',
      new Date(),
    ];

    try {
      const { rows } = await db.query(createQuery, newUser);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({
        status: res.statusCode,
        data: [rows[0],
          `token: ${token}`],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: res.statusCode,
          message: 'User with that credential already exists. Please login with it or sign up with another',
        });
      }
      return res.status(400).send(error);
    }
  }

  static async userLogin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Please enter email and password',
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Please enter a valid email address',
      });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'The credentials you provided is incorrect',
        });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'The credentials you provided is incorrect',
        });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
        status: res.statusCode,
        data: [rows[0],
          `token: ${token}`],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
export default User;
