import { User } from "../../../core/models/User";
import { TokenResponse } from "./TokenResponse";

export interface LoginResponse extends TokenResponse {
  user: User;
}
