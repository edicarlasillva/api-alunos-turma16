import supertest from "supertest"

import { TypeStudent } from "../../src/models/student.model"
import { createApp } from "../../src/server"

describe("Testes integrados para rotas de alunos", () => {
  test("Deve retornar (400) quando o campo nome, email ou senha não forem informados", async () => {
    // 1 - sut
    const sut = createApp()

    const result = await supertest(sut).post("/students").send({
      email: "daphne@gmail.com",
      password: "123456",
      age: 20,
      type: TypeStudent.Matriculado
    })

    // 3 - asserts
    expect(result).toBeDefined()
    expect(result).toHaveProperty("ok", false)
    expect(result.status).toEqual(400)

    expect(result.body).toBeDefined()
    expect(result.body.message).toBe("Preencha todos os campos obrigatórios.")
  })

  test("Deve retornar (201) quando criar uma aluno com sucesso", async () => {
    const sut = createApp()

    const result = await supertest(sut).post("/students").send({
      name: "Daphne",
      email: "daphne@gmail.com",
      password: "123456",
      type: TypeStudent.Matriculado,
      age: 20
    })

    // 3 - asserts
    expect(result).toBeDefined()
    expect(result).toHaveProperty("ok", true)
    expect(result.status).toEqual(201)

    expect(result.body).toBeDefined()
    expect(result.body.message).toBe("Aluno criado com sucesso.")
  })
})