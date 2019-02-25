import db from '../models/db';

class OfficeController {
  // Get all offices
  static async getAllOffices(req, res) {
    const allOffices = 'SELECT * FROM offices';
    try {
      const { rows, rowCount } = await db.query(allOffices);
      if (rowCount < 1) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No offices found',
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
  // Get Specific Office

  static async getSpecificOffice(req, res) {
    const findOffice = 'SELECT * FROM offices WHERE id = $1';
    try {
      const { rows } = await db.query(findOffice, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'Office id not found',
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
  // Create new office

  static async createNewOffice(req, res) {
    const populate = `INSERT INTO offices(type, office_name, created_at) 
    VALUES($1, $2, $3) returning *`;

    const newOffice = [
      req.body.type,
      req.body.office_name,
      new Date(),
    ];

    try {
      const { rows } = await db.query(populate, newOffice);
      return res.status(201).send({
        status: res.statusCode,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        message: error.detail,
      });
    }
  }
}
export default OfficeController;
