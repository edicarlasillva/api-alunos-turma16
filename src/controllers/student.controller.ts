import { Request, Response } from 'express'

import { StudentService } from '../services/student.service'
import { CreateStudentDTO } from '../dtos/students.dto';

const studentService = new StudentService();

export class StudentController {
  // index -> lista todos
  public async index(request: Request, response: Response) {
    try {
      const students = await studentService.findAll()

      // saída
      return response.status(200).json(students)
    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Erro ao listar alunos.',
      })
    }
  }

  // store -> cria um novo recurso
  public async store(request: Request, response: Response) {
    try {
      //entrada
      const { name, email, password, age } = request.body

      if (!name || !email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: 'Preencha todos os campos obrigatórios.',
        })
      }

      const student: CreateStudentDTO = { name, email, password, age }

      const result = await studentService.create(student)

      // saída
      return response.status(result.code).json(result)
    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Erro ao criar aluno.',
      })
    }
  }

  // show -> detalhes de um único recurso
  public async show(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params

      const result = await studentService.findById(id)

      // saída
      return response.status(200).json(result)
    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Erro ao buscar aluno.',
      })
    }
  }

  // update -> atualiza um recurso
  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params
      const { name, age, password, email } = request.body

      const result = await studentService.update({
        id,
        name,
        password,
        age,
        email
      })

      response.status(result.code).json(result)

    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Erro ao atualizar aluno.',
      })
    }
  }

  // delete/destroy -> exclui um recurso
  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params

      const result = await studentService.delete(id)

      response.status(result.code).json(result)
    } catch (error) {
      // tratamento de erro
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: 'Erro ao exluir aluno.',
      })
    }
  }
}