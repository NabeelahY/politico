import db from '../models/db';
class Candidate {
    static async createCandidate(req, res) {
        if (!req.body.office || !req.body.party || !req.body.candidate) {
            return res.status(400).send({
                status: res.statusCode,
                message: 'Some values are missing',
            });
        }
        const query = 'SELECT * FROM users WHERE isadmin = $1';
        const value = 'true'
        try {
            if (isadmin === 'true') {
                const { rows } = await db.query(query, value);
                res.status(201).send({
                    status: res.statusCode,
                    data: [rows[0]],
                });
            } else {
                return res.status(400).send({
                    status: res.statusCode,
                    message: 'Only Admins have access to this page',
                });
            }
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}
