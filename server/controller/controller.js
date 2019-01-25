import parties from '../database/parties.js';
class PartyController {
    // Get all partiess
    static getAllParties(req, res) {
    	return res.status(200).json({
    		status: res.statusCode,
    		data: [...parties]
    	});
    }
}

export default PartyController;
