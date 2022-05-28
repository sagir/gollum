import { User } from "./User";
import { TokenResponse } from "./TokenResponse";

export interface LoginResponse extends TokenResponse {
  user: User;
}
