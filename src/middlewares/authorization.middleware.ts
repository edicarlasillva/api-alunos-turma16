import { NextFunction, Request, Response } from "express";
import { TypeStudent } from "../models/student.model";
import { AuthorizationService } from "../services/authorization.service";
import { serverError } from "../util/response.helpers";

const authorizationService = new AuthorizationService()

export async function validateCreateAssessment(request: Request, response: Response, next: NextFunction) {
  try {
    // 1. entrada
    const { authorization } = request.headers

    // 2. processamento
    const result = authorizationService.validateAuthorization(authorization!, [
      TypeStudent.Matriculado,
      TypeStudent.TechHelper
    ])

    // 3. saída
    if (!result.success) {
      return response.status(result.code).json(result)
    }

    next() // Chama o próximo se der tudo ok
  } catch (error: any) {
    return serverError(response, error)
  }
}