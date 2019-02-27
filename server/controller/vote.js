import db from '../models/db';

class VoteController {
  // Vote for candidate
  static async vote(req, res) {
    const populate = `INSERT INTO vote(created_at, created_by, office, candidate) 
    VALUES($1, $2, $3, $4) returning *`;
    const voteCandidate = [
      new Date(),
      req.user.id,
      req.body.office,
      req.body.candidate,
    ];
    try {
      const { rows } = await db.query(populate, voteCandidate);
      return res.status(201).send({
        status: res.statusCode,
        data: [rows[0]],
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }

  static async getResults(req, res) {
    const voteResults = 'SELECT office, candidate, COUNT(candidate) AS result FROM vote GROUP BY office, candidate';
    const findOffice = 'SELECT * FROM offices WHERE office_id = $1';
    try {
      const id = await db.query(findOffice, [req.params.id]);
      if (!id) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'Office id not found',
        });
      }
      const { rows, rowCount } = await db.query(voteResults);
      if (rowCount < 1) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No results found',
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
}
export default VoteController;
