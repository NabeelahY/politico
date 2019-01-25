import parties from '../database/parties.js';
class PartyController {
    // Get all partiess
    static getAllParties(req, res) {
    	return res.status(200).json({
    		status: res.statusCode,
    		data: [...parties]
    	});
    }
    static getSpecificParty(req, res) {
    	const findParty = parties.find(party => party.id === parseInt(req.params.id));
    	if (findParty) {
    		return res.status(200).json({
    			status: res.statusCode,
    			data: [findParty]
    		});
    	}
    	return res.status(404).json({
    		status: res.statusCode,
    		message: "Party id not found"
    	});
    }
}

export default PartyController;
