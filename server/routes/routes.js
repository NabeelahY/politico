import { Router } from "express";
import PartyController from "../controller/party-controller";
import OfficeController from "../controller/office-controller";

const router = Router();

router.get("/parties", PartyController.getAllParties);

router.get("/parties/:id", PartyController.getSpecificParty);

router.post("/parties", PartyController.createNewParty);

router.patch("/parties/:id/name", PartyController.updatePartyName);

router.delete("/parties/:id", PartyController.deleteParty);

router.post("/offices", OfficeController.createNewOffice)

export default router;
