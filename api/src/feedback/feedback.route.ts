import express from "express";
import { feedbackController } from "./feedback.controller";

const router = express.Router();

router.get("/", feedbackController.getFeedback);
router.post("/create", feedbackController.createFeedback);
//for dev delete
router.delete("/:id", feedbackController.deleteFeedback);

export default router;
