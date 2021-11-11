import * as axios from "axios";

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
}
