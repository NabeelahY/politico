import { Router } from 'express';
import middleware from '../middleware/middleware';
import PartyController from '../controller/party-controllers';
import OfficeController from '../controller/office-controller';
import User from '../controller/user';
import Candidate from '../controller/candidate-controller';
import Auth from '../middleware/auth';


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

router.post('/auth/signup', User.createUser);

router.post('/auth/login', User.userLogin);

router.post('/office/:id/register', Candidate.createCandidate);

export default router;
