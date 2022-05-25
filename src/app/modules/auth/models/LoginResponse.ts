import { User } from "../../../core/models/User";

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
}
