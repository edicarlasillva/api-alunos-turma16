import { TypeStudent } from "../../src/models/student.model";
import { StudentService } from "../../src/services/student.service";
import { prismaMock } from '../config/prisma.mock';

import * as dotenv from "dotenv";
dotenv.config();

describe("Testes unitários do StudentService", () => {
  let studentService: StudentService
  // executa antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    studentService = new StudentService();
  })

  // executa uma vez, antes de todos os teste
  beforeAll(() => {

  })

  // executa depois de cada teste
  afterEach(() => {

  })

  // executa depois de todos os testes
  afterAll(() => {

  })
  test("findAll - deve retornar sucesso (200) quando listar alunos", async () => {
    // 1 - sut
    // const studentService = new StudentService()

    prismaMock.student.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Alice",
        email: "alice@gmail.com",
        password: "123456",
        age: 25,
        token: "eyJ",
        type: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Bob",
        email: "bob@gmail.com",
        password: "654321",
        age: 30,
        token: "",
        type: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])

    // 2 - chamar o método
    const result = await studentService.findAll()

    // 3 - asserts (validações)
    expect(result).toBeDefined();

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("message", "Alunos listados com sucesso.")
    expect(result).toHaveProperty("code", 200)
  })

  test("findById deve retornar sucesso (200) quando o aluno for encontrado", async () => {
    // 1 - sut
    // const studentService = new StudentService()

    // comportamento simulado (mock)
    prismaMock.student.findUnique.mockResolvedValue({
      id: "1",
      name: "Alice",
      email: "alice@gmail.com",
      password: "123456",
      age: 25,
      token: "eyJ",
      type: "M",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // 2 - chamar o método
    const result = await studentService.findById("1")

    // 3 - asserts (validações)
    expect(result).toBeDefined()
    expect(result).toHaveProperty("success", true)
    expect(result).toHaveProperty("message", "Aluno encontrado com sucesso.")
    expect(result).toHaveProperty("code", 200)
    expect(result).toHaveProperty("data")

    expect(result.data).toHaveProperty("id", "1")
    expect(result.data).toHaveProperty("name", "Alice")
    expect(result.data).toHaveProperty("email", "alice@gmail.com")
    expect(result.data).toHaveProperty("password", "123456")
    expect(result.data).toHaveProperty("age", 25)
    expect(result.data).toHaveProperty("type", "M")
  });

  test("create deve retornar sucesso (201) quando o aluno for criado", async () => {
    // 1 - sut
    // const studentService = new StudentService()

    // comportamento simulado (mock)
    prismaMock.student.create.mockResolvedValue({
      id: "3",
      name: "Charlie",
      email: "charlie@gmail.com",
      password: "654321",
      age: 35,
      type: "M",
      createdAt: new Date(),
      updatedAt: new Date(),
      token: null
    })

    // 2 - chama o método
    const result = await studentService.create({
      name: "Charlie",
      email: "charlie@gmail.com",
      password: "654321",
      age: 35,
      type: TypeStudent.Matriculado
    })

    // 3 - asserts (validações)

    expect(result).toBeDefined()

    expect(result).toHaveProperty("success", true)
    expect(result).toHaveProperty("message", "Aluno criado com sucesso.")
    expect(result).toHaveProperty("code", 201)
    expect(result).toHaveProperty("data")

    expect(result.data).toHaveProperty("id", "3")
    expect(result.data).toHaveProperty("name", "Charlie")
    expect(result.data).toHaveProperty("email", "charlie@gmail.com")
    expect(result.data).toHaveProperty("password", "654321")
    expect(result.data).toHaveProperty("age", 35)
    expect(result.data).toHaveProperty("type", "M")
  })

  test("update deve retornar sucesso (200) quando o aluno for atualizado", async () => {
    // const studentService = new StudentService()

    prismaMock.student.findUnique.mockResolvedValue({
      id: "1",
      name: "Alice",
      email: "alice.updated@gmail.com",
      password: "123456",
      age: 25,
      token: "eyJ",
      type: "M",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    prismaMock.student.update.mockResolvedValue({
      id: "1",
      name: "Alice Updated",
      email: "alice.updated@gmail.com",
      password: "123456",
      age: 25,
      token: "eyJ",
      type: "M",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await studentService.update({
      id: "1",
      name: "Alice Updated",
      password: "123456",
      age: 25
    })

    expect(result).toBeDefined()

    expect(result).toHaveProperty("success", true)
    expect(result).toHaveProperty("message", "Aluno atualizado com sucesso.")
    expect(result).toHaveProperty("code", 200)
    expect(result).toHaveProperty("data")

    expect(result.data).toHaveProperty("id", "1")
    expect(result.data).toHaveProperty("name", "Alice Updated")
    expect(result.data).toHaveProperty("email", "alice.updated@gmail.com")
    expect(result.data).toHaveProperty("password", "123456")
    expect(result.data).toHaveProperty("age", 25)
  })
})