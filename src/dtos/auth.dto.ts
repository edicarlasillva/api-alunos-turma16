import { JwtPayload } from "jsonwebtoken";
import { TypeStudent } from "../models/student.model";

export interface AuthDTO {
  email: string
  password: string
}

export interface PayloadToken extends JwtPayload {
  id: string
  type: TypeStudent
  // name: string
  // email: string
  // age: number
}