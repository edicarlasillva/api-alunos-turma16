import { JwtPayload } from "jsonwebtoken";

export interface AuthDTO {
  email: string
  password: string
}

export interface PayloadToken extends JwtPayload {
  id: string
  name: string
  email: string
  age: number
}