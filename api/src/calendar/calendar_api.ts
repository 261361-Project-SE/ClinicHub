import express, { Request, Response } from "express";
import { google, calendar_v3 } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5001;

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

// GET
app.get("/list-events", (req, res) => {
  const now = new Date();

  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: now.toISOString(),
      timeMax: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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
        const eventIds = events.map((event) => {
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

          // Format the time as "HH:MM"
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

        return res.status(200).json({ events: eventIds });
      } else {
        return res.status(404).json({ message: "No upcoming events found." });
      }
    }
  );
});

// POST
app.post("/create-event", (req: Request, res: Response): void => {
  const { year, month, day, hour, minute, description } = req.body;

  if (!year || !month || !day || !hour || !minute) {
    res
      .status(400)
      .json({ message: "Please provide complete date and time information." });
    return;
  }

  const eventStartTime = new Date(year, month - 1, day, hour, minute);

  if (eventStartTime.getMinutes() % 15 !== 0) {
    res.status(400).json({
      message: "Please select a time that is a multiple of 15 minutes.",
    });
    return;
  }

  const eventEndTime = new Date(eventStartTime.getTime() + 15 * 60000);

  const calendarEvent: calendar_v3.Schema$Event = {
    summary: `Patient - ${hour}:${minute}`,
    location: "Mongkol Clinic",
    description: description || "- No description -",
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
        return;
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
              return;
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

// DELETE
app.delete("/delete-event", (req: Request, res: Response): void => {
  const { eventId } = req.body;

  if (!eventId) {
    res.status(400).json({ message: "Please provide the event ID to delete." });
    return;
  }

  calendar.events.delete(
    { calendarId: "primary", eventId },
    (err: Error | null) => {
      if (err) {
        res.status(500).json({
          error: "Error Deleting Calendar Event",
          message: err.message,
        });
        return;
      }
      res.status(200).json({ message: "Calendar event successfully deleted." });
    }
  );
});

app.listen(port, () => {
  console.log(`Calendar API running on port ${port}`);
});
