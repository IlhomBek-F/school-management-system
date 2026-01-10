import { AuthTokens } from "@core/models/base";

export interface LoginRequest {
  username: string;
  password: string
}

export interface LoginResponse extends AuthTokens {}
