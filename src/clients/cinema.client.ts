import * as axios from "axios";

interface Response {
  error?: string;
  content?: any;
}

interface Return<T> {
  error?: T;
  content?: any;
}

type RegisterErrors = "USER_EXISTS";

export class CinemaClient {
  private instance: axios.AxiosInstance;

  constructor() {
    this.instance = axios.default.create({
      baseURL: "http://localhost:5000/api",
      timeout: 3000,
    });
  }

  async login(input: { Username: string; Password: string }) {
    const res = await this.instance.post("Authenticate/register", input);

    console.log(res);
  }

  async register(input: {
    Username: string;
    Email: string;
    Password: string;
  }): Promise<Return<RegisterErrors>> {
    try {
      await this.instance.post("Authenticate/register", input);
    } catch (e) {
      const error = e as axios.AxiosError<Response>;

      console.log(error);
      console.log(error.response);

      if (error.response?.data?.error === "USER_EXISTS") {
        return { error: "USER_EXISTS" };
      }

      throw error;
    }

    return {};
  }
}
