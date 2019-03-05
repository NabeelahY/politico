import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import middleware from '../middleware/middleware';
import PartyController from '../controller/party-controllers';
import OfficeController from '../controller/office-controller';
import User from '../controller/user';
import Candidate from '../controller/candidate-controller';
import VoteController from '../controller/vote';
import Auth from '../middleware/auth';

const router = Router();

const storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  transformation: [{
    width: 400, height: 400, crop: 'limit',
  }],
});

const upload = multer({ storage: storageCloud });

const validateRequest = middleware(true);

router.get('/parties', Auth.verifyToken, PartyController.getAllParties);

router.get('/parties/:id', Auth.verifyToken, PartyController.getSpecificParty);

router.post('/parties', upload.single('logourl'), validateRequest, Auth.verifyRole, PartyController.createNewParty);

router.patch('/parties/:id/name', validateRequest, Auth.verifyRole, PartyController.updatePartyName);

router.delete('/parties/:id', Auth.verifyRole, PartyController.deleteParty);

router.post('/offices', validateRequest, Auth.verifyRole, OfficeController.createNewOffice);

router.get('/offices', Auth.verifyToken, OfficeController.getAllOffices);

router.get('/offices/:id', Auth.verifyToken, OfficeController.getSpecificOffice);

router.post('/auth/signup', upload.single('passporturl'), validateRequest, User.createUser);

router.post('/auth/login', validateRequest, User.userLogin);

router.get('/profile', Auth.verifyToken, User.getSpecificUser);

router.post('/office/:id/register', Auth.verifyToken, Candidate.createCandidate);

router.get('/candidates', Auth.verifyToken, Candidate.getCandidates);

router.patch('/office/:id/confirm', Auth.verifyRole, Candidate.confirmCandidate);

router.delete('/candidates/:id', Auth.verifyRole, Candidate.deleteCandidate);

router.post('/votes', Auth.verifyToken, VoteController.vote);

router.get('/office/:id/result', Auth.verifyToken, VoteController.getResults);

export default router;
