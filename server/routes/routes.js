import { Router } from 'express';
import middleware from '../middleware/middleware';
import PartyController from '../controller/party-controllers';
import OfficeController from '../controller/office-controller';


const router = Router();

const validateRequest = middleware(true);

router.get('/parties', PartyController.getAllParties);

router.get('/parties/:id', PartyController.getSpecificParty);

router.post('/parties', validateRequest, PartyController.createNewParty);

router.patch('/parties/:id/name', validateRequest, PartyController.updatePartyName);

router.delete('/parties/:id', PartyController.deleteParty);

router.post('/offices', validateRequest, OfficeController.createNewOffice);

router.get('/offices', OfficeController.getAllOffices);

router.get('/offices/:id', OfficeController.getSpecificOffice);

export default router;
