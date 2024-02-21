import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

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

    const student = await repository.student.findUnique({
      where: {
        id: idStudent
      }
    })

    if (!student || student.token !== authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "Token de autenticação inválido."
      })
    }

    next();
  } catch (error) {
    return response.status(500).json({
      success: false,
      code: response.statusCode,
      message: "Erro"
    })
  }
}