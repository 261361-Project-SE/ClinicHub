import express,{ Router } from "express";
import { bookingController } from "./booking.controller";
const router: Router = express.Router();

router.get("/AllBooking", bookingController.getAllBooking);
router.get("/NameBooking/:firstname/:lastname", bookingController.getBooking);
router.post("/", bookingController.createBooking);
router.patch("/", bookingController.updateBooking);
router.delete("/", bookingController.deleteBooking);

export default router;
