import { AuthService } from '../../src/services/auth.service'
import { prismaMock } from '../config/prisma.mock'

import * as dotenv from 'dotenv'
dotenv.config()

describe("Testes UNITÁRIOS de login no service de autenticação", () => {
  // Deve ... quando ...
  test("Deve retornar falha (401) quando o aluno não existir no banco de dados", async () => {
    // 1 - sut (instância que eu quero testar)
    const sut = new AuthService()

    // Comportamento simulado
    // Simular que não existe o aluno no banco de dados (findFirst)
    // Quando chamar login, o findFirstdeve retornar null
    prismaMock.student.findFirst.mockResolvedValue(null)

    // 2 - chamar o método
    const result = await sut.login({
      email: "daphne@gmail.com",
      password: "123456"
    })

    // 3 - validações
    expect(result).toBeDefined()

    expect(result).toHaveProperty("success")
    expect(result.success).toBe(false)

    expect(result).toHaveProperty("message", "Credenciais inválidas")
    expect(result).toHaveProperty("code", 401)

    expect(result).not.toHaveProperty("data")
    expect(result.data).toBeUndefined()
  })

  test("Deve retornar sucesso (200) quando o usuário existir no banco de dados", async () => {
    // 1 - sut (instância que eu quero testar)
    const sut = new AuthService()

    // Comportamento simulado
    // Simular que existe o aluno no banco de dados (findFirst)
    prismaMock.student.findFirst.mockResolvedValue({
      id: "123456",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "carla@gmail.com",
      age: 35,
      name: "Carla Silva",
      password: "123456",
      type: "M",
      token: "eyjqualquer"
    })

    // 2 - chamar o método
    const result = await sut.login({
      email: "carla@gmail.com",
      password: "123456"
    })

    // 3 - Validações
    expect(result).toBeDefined()

    expect(result).toHaveProperty("success", true)
    expect(result).toHaveProperty("message", "Login realizado com sucesso.")
    expect(result).toHaveProperty("code", 200)
    expect(result).toHaveProperty("data")

    expect(result.data).toHaveProperty("id")
    expect(result.data).toHaveProperty("email")
    expect(result.data).toHaveProperty("name")
    expect(result.data).toHaveProperty("age")
    expect(result.data).toHaveProperty("token")

    expect(result.data.token).toContain("eyJ")
  })
})