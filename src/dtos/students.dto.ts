export interface CreateStudentDTO {
  name: string
  email: string
  password: string
  age?: number
}

export interface UpdateStudentDTO {
  id: string
  email?: string
  name?: string
  password?: string
  age?: number
}