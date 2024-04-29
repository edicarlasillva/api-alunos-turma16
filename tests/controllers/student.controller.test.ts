import supertest from "supertest"

import repository from "../../src/database/prisma.connection"
import { TypeStudent } from "../../src/models/student.model"
import { createApp } from "../../src/server"

describe("Testes integrados para rotas de alunos", () => {
  beforeEach(async () => {
    await repository.assessment.deleteMany()
    await repository.student.deleteMany()
  })

  afterAll(async () => {
    await repository.assessment.deleteMany()
    await repository.student.deleteMany()
  })
  describe("Criar aluno", () => {
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

  describe("Listar avaliações", () => {
    test("Deve retornar 401 quando o token não for fornecido", async () => {
      const sut = createApp()

      const result = await supertest(sut)
        .get("/students/any_id/assessments")

      // validações
      expect(result.status).toBe(401) // 401 -> Unauthorized
      expect(result.body).toHaveProperty("message", "Token de autenticação não informado.")
      expect(result.body).toHaveProperty("success", false)
    })

    test("Deve retornar 401 quando o token fornecido for inválido", async () => {
      const sut = createApp()

      const result = await supertest(sut)
        .get("/students/any_id/assessments")
        .set("Authorization", "any_token")

      // validações
      expect(result.status).toBe(401)
      expect(result.body).toHaveProperty("message", "Token de autenticação inválido.")
      expect(result.body).toHaveProperty("success", false)
    })

    test("Deve retornar 200 quando listar as avaliações do aluno.", async () => {
      const sut = createApp()

      const createStudentResponse = await supertest(sut)
        .post("/students")
        .send({
          name: "John Doe",
          email: "john.doe@gmail.com",
          password: "123456",
          age: 25,
          type: "M"
        })

      const loginResponse = await supertest(sut)
        .post("/login")
        .send({
          email: "john.doe@gmail.com",
          password: "123456",
        })

      let studentId = createStudentResponse.body.data.id
      let token = loginResponse.body.data.token

      console.log(studentId, token, createStudentResponse)

      // let {id, token} = loginResponse.body.data

      const result = await supertest(sut)
        .get(`students/${studentId}/assessments`)
        .set("Authorization", token)

      // validações
      expect(result.status).toBe(200)
      expect(result.body.success).toBe(true)
      expect(result.body.data).toBeDefined()
    })
  })
})