import { TypeStudent } from "../models/student.model"

export interface CreateStudentDTO {
  name: string
  email: string
  password: string
  type: TypeStudent
  age?: number
}

export interface UpdateStudentDTO {
  id: string
  email?: string
  name?: string
  password?: string
  age?: number
}