import db from '../models/db';

class Candidate {
  static async createCandidate(req, res) {
    if (!req.body.office || !req.body.party || !req.body.candidate) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Some values are missing',
      });
    }

    const findUser = 'SELECT * FROM users WHERE id=$1';
    try {
      const { rows } = await db.query(findUser, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'User id not found',
        });
      }
      const queryCandidate = `INSERT INTO candidates (office, party, candidate, created_at) 
        VALUES($1, $2, $3, $4) returning *`;
      const newCandidate = [
        req.body.office,
        req.body.party,
        req.body.candidate,
        new Date(),
      ];

      const response = await db.query(queryCandidate, newCandidate);
      return res.status(201).send({
        status: res.statusCode,
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(404).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }
}

export default Candidate;
