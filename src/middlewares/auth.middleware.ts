import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService()

export async function validateToken(request: Request, response: Response, next: NextFunction) {
  try {
    // 1. entrada
    const { authorization } = request.headers
    const { idStudent } = request.params

    if (!authorization) {
      // 401 -> Unauthorized
      return response.status(401).json({
        success: false,
        message: 'Token de autenticação não informado.',
        code: response.statusCode
      })
    }

    // 2. processamento
    const result = await authService.validateLogin(authorization, idStudent)

    if(!result.success) {
      return response.status(result.code).json(result)
    }

    // 3. saída
    // Deu tudo certo, chama o próximo
    next()
  } catch (error: any) {
    return response.status(500).json({
      success: false,
      message: error.toString(),
      code: response.statusCode
    })
  }
}

export async function validateLoginOlderAge(request: Request, response: Response, next: NextFunction) {
  try {
    const { idStudent } = request.params

    const result = await authService.validateLoginOlderAge(idStudent)

    if (!result.success) {
      return response.status(result.code).json(result)
    }

    // Se der tudo certo, chama o próximo
    next()
  } catch (error: any) {
    return response.status(500).json({
      success: false,
      message: error.toString(),
      code: response.statusCode
    })
  }
}