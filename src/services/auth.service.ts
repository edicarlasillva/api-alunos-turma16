// import { randomUUID } from "crypto";
import jwt from 'jsonwebtoken';

import { repository } from "../database/prisma.connection";

import { AuthDTO, PayloadToken } from "../dtos/auth.dto";
import { ResponseData } from "../dtos/response.dto";

export class AuthService {
  public async login(data: AuthDTO): Promise<ResponseData> {
    const student = await repository.student.findFirst({
      where: {
        email: data.email,
        password: data.password
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
      }
    })

    // Se não tiver aluno, 401 - Unauthorized
    if (!student) {
      return {
        success: false,
        message: 'Credenciais inválidas',
        code: 401
      }
    }

    // const token = randomUUID()
    // const token = jwt.sign(student, process.env.JWT_SECRET!)
    const token = this.generateToken(student)

    // await repository.student.update({
    //   where: {
    //     id: student.id
    //   },
    //   data: {
    //     token
    //   }
    // })

    return {
      success: true,
      message: 'Login realizado com sucesso.',
      code: 200,
      data: {
        id: student.id,
        email: student.email,
        name: student.name,
        age: student.age ?? 0,
        token
      }
    };
  }

  public async validateLogin(token: string, idStudent: string): Promise<ResponseData> {
    // Verifico se o token jwt é válido
    const payload = this.validateToken(token) as PayloadToken

    // Busca o id do estudante no jwt
    // Valido o id do token com o id da requisição
    if (payload === null || idStudent !== payload.id) {
      return {
        success: false,
        message: 'Token de autenticação inválido',
        code: 401
      }
    }

    return {
      success: true,
      message: 'Validação de login feita com sucesso.',
      code: 200
    }
  }

  public async validateLoginOlderAge(idStudent: string): Promise<ResponseData> {
    const student = await repository.student.findUnique({
      where: {
        id: idStudent
      }
    })

    if (!student) {
      return {
        success: false,
        message: 'Estudante não encontrado.',
        code: 404
      }
    }

    if (!student.age || student.age < 18) {
      return {
        success: false,
        message: 'Estudante não possui 18 anos ou mais.',
        code: 403 // Forbidden -> Proibido
      }
    }

    return {
      success: true,
      message: 'Validação feita com sucesso.',
      code: 200
    }
  }

  public generateToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d'
    })

    return token
  }

  public validateToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!)

      return payload
    } catch (error: any) {
      return null
    }
  }
}