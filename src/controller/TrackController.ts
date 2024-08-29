import { Response } from "express";
import { TrackService } from "../service/TrackService";
import { CustomRequest } from "customTypes";

export class TrackController {
  private trackService: TrackService;

  constructor() {
    this.trackService = new TrackService();
  }

  async getTracks(req: CustomRequest, res: Response) {
    if (!req.user) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    try {
      const tracks = await this.trackService.getTracks(req.user._id as string);
      res.send(tracks);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(500).send({ error: "An unexpected error occurred." });
      }
    }
  }
}
