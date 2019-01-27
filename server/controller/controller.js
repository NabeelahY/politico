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
    static createNewParty(req, res) {
    	if(!req.body.name) {
    		return res.status(400).send({
    			status: res.statusCode,
    			message: "Party name is required"
    		});
    	}
    	const newParty = {
    		id : parties.length + 1, 
    		name : req.body.name,
    		logoUrl : req.body.logoUrl 
    	};
    	parties.push(newParty);
    	return res.status(201).json({
    		status: res.statusCode,
    		data: [{
    			id: newParty.id,
    			name: newParty.name
    		}]
    	});
    }
}

export default PartyController;
