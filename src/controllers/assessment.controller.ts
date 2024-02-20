import { Request, Response } from "express";
import { AssessmentService } from "../services/assessment.service";

const assessmentService = new AssessmentService()

export class AssessmentController {
  public async index(request: Request, response: Response) {
    const { idStudent } = request.params

    const result = await assessmentService.findAll(idStudent)

    return response.status(result.code).json(result)
  }
}