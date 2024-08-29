import { Tracks } from "../model/Tracks";

export class TrackService {
  async getTracks(userId: string) {
    return Tracks.find({ userId });
  }
}
