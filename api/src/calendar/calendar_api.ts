import express, { Request, Response, Router } from "express";
import { calendarService } from "./calendar.service";

// const app = express();
// const port = 5001;

// app.use(express.json());
const router: Router = express.Router();

// GET - List Events
router.get("/list-events", async (req: Request, res: Response): Promise<any> => {
  try {
    const events = await calendarService.listEvents();
    if (events.length === 0) {
      return res.status(404).json({ message: "No upcoming events found." });
    }

    const formattedEvents = events.map((event) => {
      const startTime = new Date(
        event.start?.dateTime || event.start?.date || ""
      );

      const formattedDate = startTime.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Bangkok",
      });

      const formattedStartTime = startTime.toLocaleString("en-GB", {
        timeZone: "Asia/Bangkok",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        summary: event.summary,
        eventId: event.id,
        startTime: `${formattedDate} at ${formattedStartTime}`,
        description: event.description || "- No description -",
      };
    });

    res.status(200).json({ events: formattedEvents });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ error: "Error fetching events", message: err.message });
  }
});

// POST - Create Event
router.post("/create-event", async (req: Request, res: Response): Promise<any> => {
  try {
    const { year, month, day, hour, minute, description } = req.body;

    if (!year || !month || !day || !hour || !minute) {
      return res.status(400).json({
        message: "Please provide complete date and time information.",
      });
    }

    if (new Date(year, month - 1, day, hour, minute).getMinutes() % 15 !== 0) {
      return res
        .status(400)
        .json({ message: "Time must be in multiples of 15 minutes." });
    }

    const eventId = await calendarService.createEvent({
      year,
      month,
      day,
      hour,
      minute,
      description,
    });

    res.status(200).json({ message: "Event created successfully.", eventId });
  } catch (error) {
    const err = error as Error;
    res
      .status(500)
      .json({ error: "Error creating event", message: err.message });
  }
});

// DELETE - Delete Event
router.delete(
  "/delete-event",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { eventId } = req.body;

      if (!eventId) {
        return res
          .status(400)
          .json({ message: "Please provide the event ID to delete." });
      }

      await calendarService.deleteEvent(eventId);
      res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
      const err = error as Error;
      res
        .status(500)
        .json({ error: "Error deleting event", message: err.message });
    }
  }
);

export default router;
