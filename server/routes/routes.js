import { Router } from "express";
import PartyController from "../controller/controller.js";
const router = Router();

router.get("/parties", PartyController.getAllParties);

export default router;
