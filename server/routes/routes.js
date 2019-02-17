import { Router } from 'express';
// import validate from 'express-validation';
// import validateRequest from '../middleware/validation';
import middleware from '../middleware/middleware';
import PartyController from '../controller/party-controllers';
import OfficeController from '../controller/office-controller';
import User from '../controller/user';
import Candidate from '../controller/candidate-controller';
import VoteController from '../controller/vote';
import Auth from '../middleware/auth';


const router = Router();

const validateRequest = middleware(true);

router.get('/parties', Auth.verifyToken, PartyController.getAllParties);

router.get('/parties/:id', Auth.verifyToken, PartyController.getSpecificParty);

router.post('/parties', validateRequest, Auth.verifyRole, PartyController.createNewParty);

router.patch('/parties/:id/name', validateRequest, Auth.verifyRole, PartyController.updatePartyName);

router.delete('/parties/:id', Auth.verifyRole, PartyController.deleteParty);

router.post('/offices', validateRequest, Auth.verifyRole, OfficeController.createNewOffice);

router.get('/offices', Auth.verifyToken, OfficeController.getAllOffices);

router.get('/offices/:id', Auth.verifyToken, OfficeController.getSpecificOffice);

router.post('/auth/signup', validateRequest, User.createUser);

router.post('/auth/login', validateRequest, User.userLogin);

router.post('/office/:id/register', Auth.verifyRole, Candidate.createCandidate);

router.post('/votes', VoteController.vote);

router.get('/office/:id/result', Auth.verifyToken, VoteController.getResults);

export default router;
