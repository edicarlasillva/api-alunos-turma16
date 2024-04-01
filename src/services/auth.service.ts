import { randomUUID } from "crypto";

import { repository } from "../database/prisma.connection";

export class AuthService {
  public async login(email: string, password: string): Promise<{ id: string, email: string, age: number, token: string, name: string }> {
    const student = await repository.student.findFirst({
      where: {
        email,
        password
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
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

    return {
      id: student.id, 
      email: student.email, 
      name: student.name,
      age: student.age ?? 0, 
      token
    };
  }
}