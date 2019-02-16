import db from '../models/db';

class PartyController {
  // Get all partiess
  static async getAllParties(req, res) {
    const allParties = 'SELECT * FROM parties';
    try {
      const { rows, rowCount } = await db.query(allParties);
      if (rowCount < 1) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No parties found',
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
  // Get specific party

  static async getSpecificParty(req, res) {
    const findParty = 'SELECT * FROM parties WHERE id = $1';
    try {
      const { rows } = await db.query(findParty, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'Party id not found',
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }
  // Create new party

  static async createNewParty(req, res) {
    const populate = `INSERT INTO parties(name, hqaddress, logourl, created_at) 
    VALUES($1, $2, $3, $4) returning *`;

    const newParty = [
      req.body.name,
      req.body.hqaddress,
      req.body.logourl,
      new Date(),
    ];

    try {
      const { rows } = await db.query(populate, newParty);
      return res.status(201).send({
        status: res.statusCode,
        data: [rows[0]],
      });
    } catch (error) {
      if (!req.body.name) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'Please enter a name with a minimum of 3 alpha characters.',
        });
      }

      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: res.statusCode,
          message: 'This party name already exists. Please choose another',
        });
      }
      console.log(error.detail.messages);
      return res.status(400).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }

  // Edit Party name

  static async updatePartyName(req, res) {
    const findParty = 'SELECT * FROM parties WHERE id=$1';
    const updateParty = 'UPDATE parties SET name=$1, updated_at=$2 WHERE id=$3 returning *';
    try {
      const { rows } = await db.query(findParty, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'Party id not found',
        });
      }
      const values = [
        req.body.name || rows[0].name,
        new Date(),
        req.params.id,
      ];
      const response = await db.query(updateParty, values);
      return res.status(200).send({
        status: res.statusCode,
        data: response.rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: res.statusCode,
          message: 'This party name already exists. Please choose another',
        });
      }
      return res.status(400).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }
  // Delete party

  static async deleteParty(req, res) {
    const deleteParty = 'DELETE FROM parties WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteParty, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'The party does not exist',
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        data: [{
          id: rows[0].id,
          message: 'Party has been deleted',
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

export default PartyController;
