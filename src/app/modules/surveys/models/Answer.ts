import { User } from "../../auth/models/User";

export interface Answer {
  answer?: string;
  created_at: string;
  id: number;
  question_id: number;
  option_id?: number;
  user_id: number;
  users: User[];
}
