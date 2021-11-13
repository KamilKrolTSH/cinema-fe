import { ApplicationUser } from "./application-user";

export interface Booking {
  id: number;

  applicationUser: ApplicationUser;

  seat: number;

  confirmed: boolean;

  dateToConfirm: Date;
}
