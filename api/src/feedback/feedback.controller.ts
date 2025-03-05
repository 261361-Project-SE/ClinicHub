import { Request, Response } from "express";
import { feedbackService } from "./feedback.service";

class FeedbackController {
  constructor() {}
  async createFeedback(req: Request, res: Response): Promise<any> {
    try {

      let { rating, comment } = req.body;
      comment = "test";
      if (!rating || !comment) {
        return res.status(400).send({ error: "Missing required fields" });
      }

      const result = await feedbackService.createFeedback(rating, comment);
      return res.status(result.status).send(result);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error" });
    }
  }

  async getFeedback(req: Request, res: Response): Promise<any> {
    try {
      const { rating } = req.query;

      if (!rating) {
        const result = await feedbackService.getAllFeedback();

        if (result.error) {
          return res.status(result.status).send({ error: result.error });
        }

        return res.status(200).send(result.data);
      }

      const ratingFilter = parseInt(rating as string, 10);
      if (isNaN(ratingFilter) || ratingFilter < 1 || ratingFilter > 3) {
        return res
          .status(400)
          .send({ error: "Invalid rating value (must be 1-3)" });
      }

      const result = await feedbackService.getFeedbackByRating(ratingFilter);

      if (result.error) {
        return res.status(result.status).send({ error: result.error });
      }

      return res.status(200).send(result.data);
    } catch (error: any) {
      return res.status(500).send({
        error:
          "An unexpected error occurred while fetching feedback: " +
          error.message,
      });
    }
  }
  async deleteFeedback(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Feedback ID is required" });
      }

      const feedbackId = parseInt(id, 10);
      if (isNaN(feedbackId)) {
        return res.status(400).json({ error: "Invalid feedback ID" });
      }

      const result = await feedbackService.deleteFeedback(feedbackId);
      return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export const feedbackController = new FeedbackController();
