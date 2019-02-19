import jwt from 'jsonwebtoken';
import db from '../models/db';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'The token you provided is invalid',
        });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async verifyRole(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id=$1 AND isadmin=true';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(403).send({
          status: res.statusCode,
          message: 'Not authorized',
        });
      }
      req.user = { isadmin: decoded.userRole };
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default Auth;
