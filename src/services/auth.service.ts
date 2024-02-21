import { randomUUID } from "crypto";

import { repository } from "../database/prisma.connection";

export class AuthService {
  public async login(email: string, password: string): Promise<string> {
    const student = await repository.student.findFirst({
      where: {
        email,
        password
      }
    })

    if (!student) {
      throw new Error("Credenciais inválidas")
    }

    const token = randomUUID()

    await repository.student.update({
      where: {
        id: student.id
      },
      data: {
        token
      }
    })

    return token
  }
}