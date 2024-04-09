import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService()

export async function validateToken(request: Request, response: Response, next: NextFunction) {
  try {
    // authorization: b00c9d5a-f84e-4407-a747-ad574722c919
    const { authorization } = request.headers;
    const { idStudent } = request.params

    if (!authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "Token de autenticação não informado."
      })
    }

    const result = await authService.validateLogin(authorization, idStudent)

    if (!result.success) {
      return response.status(result.code).json(result)
    }

    // const student = await repository.student.findUnique({
    //   where: {
    //     id: idStudent
    //   }
    // })

    // if (!student || student.token !== authorization) {
    //   return response.status(401).json({
    //     success: false,
    //     code: response.statusCode,
    //     message: "Token de autenticação inválido."
    //   })
    // }

    // Se deu certo, próxima etapa
    next();
  } catch (error: any) {
    return response.status(500).json({
      success: false,
      code: response.statusCode,
      message: error.toString()
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