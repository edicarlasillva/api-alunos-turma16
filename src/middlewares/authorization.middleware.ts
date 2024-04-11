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

export async function validateEditDeleteAssessment(request: Request, response: Response, next: NextFunction) {
  try {
    // 1. entrada
    const { authorization } = request.headers

    // 2. processamento
    const result = authorizationService.validateAuthorization(authorization!, [
      TypeStudent.TechHelper
    ])

    if (!result.success) {
      return response.status(result.code).json(result)
    }

    // 3. saída
    next()
  } catch (error: any) {
    return serverError(response, error)
  }
}

export function validateAuthorizationPermissions(permittedTypes: TypeStudent[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers

      const result = authorizationService.validateAuthorization(authorization!, permittedTypes)

      if (!result.success) {
        return response.status(result.code).json(result)
      }

      next()
    } catch (error: any) {
      return serverError(response, error)
    }
  }
}