import { Film } from "./film";
import { Room } from "./Room";

export interface Showtime {
  id: number;
  date: string;
  film: Film;
  room: Room;
}
