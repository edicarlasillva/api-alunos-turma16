import { Request, Response } from "express";
import { AssessmentService } from "../services/assessment.service";
import { CreateAssessmentDTO } from "../dtos/assessment.dto";

const assessmentService = new AssessmentService()

export class AssessmentController {
  public async index(request: Request, response: Response) {
    const { idStudent } = request.params

    const result = await assessmentService.findAll(idStudent)

    return response.status(result.code).json(result)
  }

  public async store(request: Request, response: Response) {
    try {
      const { idStudent } = request.params;
      const { discipline, grade } = request.body;

      if (!discipline || !grade) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha os campos obrigatórios."
        })
      }

      const assessment: CreateAssessmentDTO = { discipline, grade, idStudent }

      const result = await assessmentService.create(assessment)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao cadastrar avaliação."
      })
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id, idStudent } = request.params;
      const { grade } = request.body;

      if (!grade) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha os campos obrigatórios."
        })
      }

      const result = await assessmentService.update({
        id,
        idStudent,
        grade
      })

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar avaliação."
      })
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id, idStudent } = request.params

      const result = await assessmentService.delete(id, idStudent)

      return response.status(result.code).json(result)
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar avaliação."
      })
    }
  }
}