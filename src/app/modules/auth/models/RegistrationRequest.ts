import { LoginRequest } from "./LoginRequest";

export interface RegistrationRequest extends LoginRequest {
  name: string;
  password_confirmation: string;
}
