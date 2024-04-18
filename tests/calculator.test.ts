class Calculator {
  public sum(x: number, y: number) {
    return x + y
  }
}

describe("Testes da classe Calculator", () => {
  // Deve ... quando ...
  test("Deve retornar 10 quando somar 5 mais 5", () => {
    // 1 - sut (o que queremos testar)
    const sut = new Calculator()

    // 2 - Chamar o método que queremos testar
    const result = sut.sum(5, 5)

    // 3 - Asserts (realizar as validações)
    expect(result).toBeDefined() // é um valor definido
    expect(result).toBeGreaterThan(0) // é um número maior que
    expect(result).toBe(10) // se result é igual a 10
  })
})