import { Router } from "express";
import PartyController from "../controller/controller.js";
const router = Router();

router.get("/parties", PartyController.getAllParties);

router.get("/parties/:id", PartyController.getSpecificParty);

router.post("/parties", PartyController.createNewParty);

export default router;
