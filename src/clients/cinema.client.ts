import * as axios from "axios";
import { Film } from "../types/film";
import { Room } from "../types/room";
import { Showtime } from "../types/showtime";

interface Response {
  error?: string;
  content?: any;
}

interface Return<E, C> {
  error?: E;
  content?: C;
}

type RegisterErrors = "USER_EXISTS";
type LoginErrors = "INVALID_CREDENTIALS";

export class CinemaClient {
  private instance: axios.AxiosInstance;

  constructor() {
    this.instance = axios.default.create({
      baseURL: "http://localhost:5000/api",
      timeout: 3000,
    });

    this.setAuthInterceptor();
  }

  private setAuthInterceptor() {
    this.instance.interceptors.request.use(function (config) {
      const authentication = localStorage.getItem("authentication");

      if (authentication && authentication.length > 0) {
        config.headers!.Authorization = `Bearer ${authentication}`;
      }

      return config;
    });
  }

  async login(input: {
    Username: string;
    Password: string;
  }): Promise<Return<LoginErrors, { token: string; expiration: string }>> {
    try {
      const res = await this.instance.post("Authenticate/login", input);

      return {
        content: {
          token: res.data.token,
          expiration: res.data.expiration,
        },
      };
    } catch (e) {
      const error = e as axios.AxiosError<Response>;

      console.log(error);
      console.log(error.response);

      if (error.response?.data?.error === "INVALID_CREDENTIALS") {
        return { error: "INVALID_CREDENTIALS" };
      }

      throw error;
    }
  }

  async register(input: {
    Username: string;
    Email: string;
    Password: string;
  }): Promise<Return<RegisterErrors, undefined>> {
    try {
      await this.instance.post("Authenticate/register", input);
      return {};
    } catch (e) {
      const error = e as axios.AxiosError<Response>;

      console.log(error);
      console.log(error.response);

      if (error.response?.data?.error === "USER_EXISTS") {
        return { error: "USER_EXISTS" };
      }

      throw error;
    }
  }

  async registerAdmin(input: {
    Username: string;
    Email: string;
    Password: string;
  }): Promise<Return<RegisterErrors, undefined>> {
    try {
      await this.instance.post("Authenticate/register-admin", input);
      return {};
    } catch (e) {
      const error = e as axios.AxiosError<Response>;

      console.log(error);
      console.log(error.response);

      if (error.response?.data?.error === "USER_EXISTS") {
        return { error: "USER_EXISTS" };
      }

      throw error;
    }
  }

  async getShowtimes(): Promise<Return<undefined, Showtime[]>> {
    const res = await this.instance.get("Showtimes");

    return res.data;
  }

  async getShowtime(id: string): Promise<Return<undefined, Showtime>> {
    const res = await this.instance.get(`Showtimes/${id}`);

    return res.data;
  }

  async lockASeat({
    showtimeId,
    seat,
  }: {
    showtimeId: number;
    seat: number;
  }): Promise<any> {
    await this.instance.post(`Bookings/`, {
      ShowtimeId: showtimeId,
      Seat: seat,
    });
  }

  async confirmLock({
    showtimeId,
    seat,
  }: {
    showtimeId: number;
    seat: number;
  }) {
    await this.instance.post(`Bookings/confirm`, {
      ShowtimeId: showtimeId,
      Seat: seat,
    });
  }

  async getFilms(): Promise<Return<undefined, Film[]>> {
    const res = await this.instance.get("Films");

    return res.data;
  }

  async getFilm(id: string): Promise<Return<undefined, Film>> {
    const res = await this.instance.get(`Film/${id}`);

    return res.data;
  }

  async createFilm(input: { Title: string; Runtime: number }) {
    const res = await this.instance.post(`Films`, input);

    return res.data;
  }

  async updateFilm(
    id: string,
    input: { Id: string; Title: string; Runtime: number }
  ) {
    const res = await this.instance.put(`Film/${id}`, input);

    return res.data;
  }

  async getRooms(): Promise<Return<undefined, Room[]>> {
    const res = await this.instance.get("Rooms");

    return res.data;
  }

  async createRoom(input: { Number: number; Seats: number }) {
    const res = await this.instance.post(`Rooms`, input);

    return res.data;
  }

  async addShowtime(input: { Date: Date; FilmId: number; RoomId: number }) {
    const res = await this.instance.post(`Showtimes`, input);

    return res.data;
  }
}
