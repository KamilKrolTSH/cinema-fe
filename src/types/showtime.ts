import { Booking } from "./booking";
import { Film } from "./film";
import { Room } from "./room";

export interface Showtime {
  id: number;
  date: string;
  film: Film;
  room: Room;
  bookings: Booking[];
}
