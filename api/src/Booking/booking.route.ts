import express,{ Router } from "express";
import { bookingController } from "./booking.controller";
const router: Router = express.Router();

router.get("/AllBooking", bookingController.getAllBooking); //doctor
router.get("/AllBooking/:date", bookingController.getAllBookingByDate); //doctor
router.get("/NameBooking/:firstname/:lastname", bookingController.getBookingByName); //patient
router.get("/PhoneBooking/:phone", bookingController.getBookingByPhone); //patient//patient

router.post("/", bookingController.createBooking);

router.patch("/Doctor/update", bookingController.updateBookingByUID);
router.patch("/Patient/update", bookingController.updateBookingByDate);


router.delete("/Doctor/delete", bookingController.deleteBooking);
router.delete("/Patient/delete", bookingController.deleteBookingByPatient);

export default router;
