import { AxiosRequestConfig } from "axios";
import AxiosService from "./axios.service";
import { LoginBody, LoginResponse } from "@interfaces/auth.interfaces";

export const AuthService = {
  async login(body: LoginBody): Promise<LoginResponse> {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/auth/login",
      data: body,
    };
    return await AxiosService.http(config);
  },
};
