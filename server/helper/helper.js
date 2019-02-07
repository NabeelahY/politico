import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id, isadmin) {
    const token = jwt.sign({
      userId: id,
      userRole: isadmin,
    },
    process.env.SECRET, { expiresIn: '7h' });
    return token;
  },
};

export default Helper;
