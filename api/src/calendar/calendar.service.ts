import { google, calendar_v3 } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

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

class CalendarService {
  async listEvents(): Promise<any[]> {
    const now = new Date();
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: now.toISOString(),
      timeMax: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ahead
      singleEvents: true,
      orderBy: "startTime",
    });
    return response.data.items || [];
  }

  async createEvent(eventDetails: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    description?: string;
  }): Promise<string> {
    const { year, month, day, hour, minute, description } = eventDetails;

    const eventStartTime = new Date(year, month - 1, day, hour, minute);
    if (eventStartTime.getMinutes() % 15 !== 0) {
      throw new Error("Please select a time that is a multiple of 15 minutes.");
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

    // Check for free/busy status
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: eventStartTime.toISOString(),
        timeMax: eventEndTime.toISOString(),
        timeZone: "Asia/Bangkok",
        items: [{ id: "primary" }],
      },
    });

    const busyTimes = freeBusy?.data?.calendars?.primary?.busy || [];
    if (busyTimes.length > 0) {
      throw new Error("Time slot is busy.");
    }

    // Create the event
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: calendarEvent,
    });

    return response.data.id || "Event created, but no event ID returned.";
  }

  async deleteEvent(eventId: string): Promise<void> {
    if (!eventId) {
      throw new Error("Event ID is required.");
    }
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });
  }
}

export const calendarService = new CalendarService();
