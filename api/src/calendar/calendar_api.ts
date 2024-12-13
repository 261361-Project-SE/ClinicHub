import express, { Request, Response } from "express";
import { google, calendar_v3 } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5001;

// Setup Google OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  scope:
    "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

app.use(express.json());

// GET /list-events เพื่อดึงข้อมูลเหตุการณ์
app.get("/list-events", (req, res) => {
  const now = new Date();

  // ดึงเหตุการณ์จาก Google Calendar (เช่นในช่วงเวลาปัจจุบัน)
  calendar.events.list(
    {
      calendarId: "primary", // ใช้ primary calendar
      timeMin: now.toISOString(), // เริ่มจากเวลาปัจจุบัน
      timeMax: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // ระยะเวลา 30 วัน
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, response) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error fetching events", message: err.message });
      }

      const events = response?.data.items || [];
      if (events.length) {
        // แสดงรายชื่อเหตุการณ์พร้อม eventId
        const eventIds = events.map((event) => ({
          summary: event.summary,
          eventId: event.id, // นี่คือลักษณะของ eventId
          startTime: event.start?.dateTime || event.start?.date,
        }));
        return res.status(200).json({ events: eventIds });
      } else {
        return res.status(404).json({ message: "No upcoming events found." });
      }
    }
  );
});

// POST: Create event
app.post("/create-event", (req: Request, res: Response): void => {
  const { year, month, day, hour, minute } = req.body;

  if (!year || !month || !day || !hour || !minute) {
    res
      .status(400)
      .json({ message: "Please provide complete date and time information." });
    return; // Return to stop further processing
  }

  // Set event start time
  const eventStartTime = new Date(year, month - 1, day, hour, minute);

  // Ensure 15-minute interval
  if (eventStartTime.getMinutes() % 15 !== 0) {
    res.status(400).json({
      message: "Please select a time that is a multiple of 15 minutes.",
    });
    return; // Return to stop further processing
  }

  // Set event end time (15 minutes after start)
  const eventEndTime = new Date(eventStartTime.getTime() + 15 * 60000);

  const calendarEvent: calendar_v3.Schema$Event = {
    summary: `Event on ${eventStartTime.toISOString()}`,
    location: "Test location Mongkol Clinic",
    description: "Test description",
    colorId: "1",
    start: {
      dateTime: eventStartTime.toISOString(),
      timeZone: "Asia/Bangkok",
    },
    end: {
      dateTime: eventEndTime.toISOString(),
      timeZone: "Asia/Bangkok",
    },
  };

  // Check availability before creating event
  calendar.freebusy.query(
    {
      requestBody: {
        timeMin: eventStartTime.toISOString(),
        timeMax: eventEndTime.toISOString(),
        timeZone: "Asia/Bangkok",
        items: [{ id: "primary" }],
      },
    },
    (err, resFreebusy) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Free Busy Query Error", message: err.message });
        return; // Return to stop further processing
      }

      const busyTimes = resFreebusy?.data?.calendars?.primary?.busy || [];
      if (busyTimes.length === 0) {
        calendar.events.insert(
          { calendarId: "primary", requestBody: calendarEvent },
          (err: any) => {
            if (err) {
              res.status(500).json({
                error: "Error Creating Calendar Event",
                message: err.message,
              });
              return; // Return to stop further processing
            }
            res
              .status(200)
              .json({ message: "Calendar event successfully created." });
          }
        );
      } else {
        res.status(400).json({ message: "Sorry, I'm busy during that time." });
      }
    }
  );
});

// DELETE: Delete event
app.delete("/delete-event", (req: Request, res: Response): void => {
  const { eventId } = req.body;

  if (!eventId) {
    res.status(400).json({ message: "Please provide the event ID to delete." });
    return; // Return to stop further processing
  }

  calendar.events.delete(
    { calendarId: "primary", eventId },
    (err: Error | null) => {
      if (err) {
        res.status(500).json({
          error: "Error Deleting Calendar Event",
          message: err.message,
        });
        return; // Return to stop further processing
      }
      res.status(200).json({ message: "Calendar event successfully deleted." });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
