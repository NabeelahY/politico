import db from '../models/db';

class Candidate {
  static async createCandidate(req, res) {
    if (!req.body.office || !req.body.party) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Some values are missing',
      });
    }

    const findUser = 'SELECT * FROM users WHERE id=$1';
    try {
      const { rows } = await db.query(findUser, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'User id not found',
        });
      }
      const queryCandidate = `INSERT INTO candidates (office, party, candidate, created_at, confirmed) 
        VALUES($1, $2, $3, $4, $5) returning *`;
      const newCandidate = [
        req.body.office,
        req.body.party,
        req.user.id,
        new Date(),
        req.body.confirm || 'false',
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

  static async getCandidates(req, res) {
    const allCandidates = `SELECT candidates.id, offices.office_name, offices.office_id, parties.party_name, parties.logourl, users.firstname, users.othername, users.passporturl, candidates.confirmed 
                           FROM candidates 
                           INNER JOIN users on users.id = candidates.candidate 
                           INNER JOIN parties on parties.id = candidates.party
                           INNER JOIN offices on offices.office_id = candidates.office`;
    try {
      const { rows, rowCount } = await db.query(allCandidates);
      if (rowCount < 1) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No candidates found',
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        data: [...rows],
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }

  static async confirmCandidate(req, res) {
    const findCandidate = 'SELECT * FROM candidates WHERE id=$1';
    const updateCandidate = 'UPDATE candidates SET confirmed=$1 WHERE id=$2 returning *';
    try {
      const { rows } = await db.query(findCandidate, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'Candidate not found',
        });
      }
      const values = [req.body.confirmed || rows[0].confirmed,
        req.params.id,
      ];
      const response = await db.query(updateCandidate, values);
      return res.status(200).send({
        status: res.statusCode,
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }

  static async deleteCandidate(req, res) {
    const deleteParty = 'DELETE FROM candidates WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteParty, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'The candidate does not exist',
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        data: [{
          id: rows[0].id,
          message: 'Candidate has been declined',
        }],
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
