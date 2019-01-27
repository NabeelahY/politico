import offices from '../database/office';
class OfficeController {
	//Create new office
	static createNewOffice(req, res) {
    	if(!req.body.name || !req.body.type) {
    		return res.status(400).send({
    			status: res.statusCode,
    			message: "Office name and type are required"
    		});
    	}
    	const newOffice = {
    		id : offices.length + 1, 
    		type : req.body.type,
    		name : req.body.name 
    	};
    	offices.push(newOffice);
    	return res.status(201).json({
    		status: res.statusCode,
    		data: [{
    			id: newOffice.id,
    			type: newOffice.type,
    			name: newOffice.name
    		}]
    	});
    }
    static getAllOffices(req, res){
    	return res.status(200).json({
    		status: res.statusCode,
    		data: [...offices]
    	});
    }
    static getSpecificOffice(req, res){
    	const findOffice = offices.find(office => office.id === parseInt(req.params.id));
    	if (findOffice) {
    		return res.status(200).json({
    			status: res.statusCode,
    			data: [findOffice]
    		});
    	}
    	return res.status(404).json({
    		status: res.statusCode,
    		message: "Office id not found"
    	});
    }
}
export default OfficeController;
