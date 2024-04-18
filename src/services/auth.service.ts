// import { randomUUID } from "crypto";
import jwt from 'jsonwebtoken';

import repository from "../database/prisma.connection";

import { AuthDTO, PayloadToken } from "../dtos/auth.dto";
import { ResponseData } from "../dtos/response.dto";

export class AuthService {
  /**
   * Realiza uma autenticação na API através de login com e-mail e senha.
   * ```ts
   *    const authService = new AuthService();
   *    const result = await authService.login({
   *      email: "exemplo@gmail.com",
   *      password: "123456"
   *    })
   * ```
   * 
   * @author Carla Silva
   * @param data DTO contendo email e password
   * @async por conta da chamada ao banco de dados
   * @returns um objeto contendo informações de erro/sucesso e os dados do usuário logado (com token)
   */
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
        type: true
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
    const user = {
      id: student.id,
      type: student.type
    }

    const token = this.generateToken(user)

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

  /**
   * Valida se o token é válido ou não
   * @param token token informado pelo usuário
   * @param idStudent ID do aluno
   * @returns os dados do aluno
  */
  public async validateLogin(token: string, idStudent: string): Promise<ResponseData> {
    // Validar o token
    const payload = this.validateToken(token) as PayloadToken

    if (!payload || idStudent !== payload.id) {
      return {
        success: false,
        message: 'Token de autenticação inválido.',
        code: 401 // unauthorized
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

  // Criar o token
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

  public decodeToken(token: string) {
    return jwt.decode(token)
  }

  /**
   * Método para decodificar um token JWT.
   * 
   * @deprecated Esse método está obsoleto
   */
  public decodeTokenOld(token: string) {
    return jwt.decode(token)
  }
}