import { Tracks } from "../model/Tracks";

// TODO: Move out of here
interface Coords {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  heading: number;
  speed: number;
}

interface Location {
  timestamp: string;
  coords: Coords;
}

export class TrackService {
  async getTracks(userId: string) {
    return Tracks.find({ userId });
  }

  async createNewTrack(userId: string, name: string, locations: Location[]) {
    return new Tracks({ name, locations, userId }).save();
  }
}
