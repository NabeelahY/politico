import parties from '../database/parties';

class PartyController {
  // Get all partiess
  static getAllParties(req, res) {
    return res.status(200).json({
      status: res.statusCode,
      data: [...parties],
    });
  }
  // Get specific party

  static getSpecificParty(req, res) {
    const findParty = parties.find(party => party.id === parseInt(req.params.id, 10));
    if (findParty) {
      return res.status(200).json({
        status: res.statusCode,
        data: [findParty],
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'Party id not found',
    });
  }
  // Create new party

  static createNewParty(req, res) {
    if (!req.body.name) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Party name is required',
      });
    }
    const newParty = {
      id: parties.length + 1,
      name: req.body.name,
      logoUrl: req.body.logoUrl,
    };
    parties.push(newParty);
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        id: newParty.id,
        name: newParty.name,
      }],
    });
  }

  // Edit Party name

  static updatePartyName(req, res) {
    const findParty = parties.find(party => party.id === parseInt(req.params.id, 10));
    if (findParty) {
      delete findParty.name;
      findParty.name = req.body.name;

      return res.status(200).json({
        status: res.statusCode,
        data: [{
          id: findParty.id,
          name: findParty.name,
        }],
      });
    }
    /* if (findParty) {
       delete findParty.id;
      for( let i in req.body ) {
        findParty[i] = req.body[i];
      }
      return res.status(200).json({
        status: res.statusCode,
           data: [{
           id: findParty.id,
           name: findParty.name
      }]
     });
    } */
    return res.status(404).json({
      status: res.statusCode,
      message: 'Party id not found',
    });
  }
  // Delete party

  static deleteParty(req, res) {
    const findParty = parties.find(party => party.id === parseInt(req.params.id, 10));
    if (!findParty) res.status(404).send('The record does not exist');

    const index = parties.indexOf(findParty);
    parties.splice(index, 1);

    res.status(200).json({
      status: res.statusCode,
      data: [{
        id: findParty.id,
        message: 'Party has been deleted',
      }],
    });
  }
}
export default PartyController;
