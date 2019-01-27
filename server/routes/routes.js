import { Router } from "express";
import PartyController from "../controller/controller.js";
const router = Router();

router.get("/parties", PartyController.getAllParties);

router.get("/parties/:id", PartyController.getSpecificParty);

router.post("/parties", PartyController.createNewParty);

router.patch("/parties/:id/name", PartyController.updatePartyName);

router.delete("/parties/:id", PartyController.deleteParty);

export default router;
