import { AuthService } from '../../src/services/auth.service'

// Estamos criando no arquivo auth.service.spec.ts os mesmos testes, porém "mockados". Por isso, precisamos pular (skip) esses testes, porque sempre vão dar erro. Em um projeto real, não faremos os mesmos testes integrados e "mockados", portanto esse erro não vai acontecer.
describe.skip("Testes de login no service de autenticação", () => {
  // Deve ... quando ...
  test("Deve retornar falha (401) quando o aluno não existir no banco de dados", async () => {
    // 1 - sut (instância que eu quero testar)
    const sut = new AuthService()

    // 2 - chamar o método
    const result = await sut.login({
      email: "daphne@dog.com",
      password: "123456",
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

    // 2 - chamar o método
    const result = await sut.login({
      email: "carla@gmail.com",
      password: "123456",
    });

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