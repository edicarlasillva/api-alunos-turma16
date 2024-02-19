import { repository } from "../database/prisma.connection";

import { ResponseDTO } from "../dtos/response.dto";
import { CreateStudentDTO } from "../dtos/students.dto";
import { Student } from "../models/student.model";

export class StudentService {
  public async findAll(): Promise<ResponseDTO> {
    // entrada e processamento
    const students = await repository.student.findMany()

    return {
      success: true,
      code: 200,
      message: 'Alunos listados com sucesso.',
      data: students
    }
  }

  public async create(studentDTO: CreateStudentDTO): Promise<ResponseDTO> {
    // Cria um novo aluno
    const newStudent = new Student(
      studentDTO.name,
      studentDTO.email,
      studentDTO.password,
      studentDTO.age
    )

    const createdStudent = await repository.student.create({
      data: {
        name: newStudent.name,
        email: newStudent.email,
        password: newStudent.password,
        age: newStudent.age
      }
    })

    return {
      success: true,
      code: 201,
      message: 'Aluno criado com sucesso.',
      data: createdStudent
    }
  }

  public async findById(id: string): Promise<ResponseDTO> {
    // processamento
    const student = await repository.student.findUnique({
      where: { id }
    })

    if (!student) {
      throw new Error("Aluno não encontrado")
    }

    return {
      success: true,
      code: 200,
      message: "Aluno encontrado com sucesso.",
      data: student
    }
  }
}