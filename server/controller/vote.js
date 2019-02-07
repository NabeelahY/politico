import db from '../models/db';

class VoteController {
  // Get all partiess
  static async vote(req, res) {
    const populate = `INSERT INTO vote(created_at, created_by, office, candidate) 
    VALUES($1, $2, $3, $4) returning *`;
    const voteCandidate = [
      new Date(),
      req.body.created_by,
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
      return res.status(404).send(error);
    }
  }
}
export default VoteController;
