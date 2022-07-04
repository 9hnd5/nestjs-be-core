import axios, { AxiosRequestHeaders } from "axios";
type Response<T> = {
  status: number;
  data?: T;
};
export class CommonHelper {
  public static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  public static async httpGet<T>(
    url: string,
    params?: Record<string, any>,
    headers?: AxiosRequestHeaders
  ) {
    try {
      const response = await axios.get(url, {
        params,
        headers,
      });
      return {
        status: response.status,
        data: response.data as T,
      } as Response<T>;
    } catch (error) {
      throw error;
    }
  }

  public static async httpPost<T>(
    url: string,
    body: any,
    headers?: AxiosRequestHeaders
  ) {
    try {
      const response = await axios.post(url, body, {
        headers,
      });
      return {
        status: response.status,
        data: response.data as T,
      } as Response<T>;
    } catch (error) {
      throw error;
    }
  }
}
