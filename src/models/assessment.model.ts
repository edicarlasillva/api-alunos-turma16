import { randomUUID } from "crypto"

export class Assessment {
  private _id: string

  constructor(
    private _discipline: string,
    private _grade: number,
    private _idStudent: string
  ) {
    this._id = randomUUID()
  }

  get id(): string {
    return this._id
  }

  get discipline(): string {
    return this._discipline
  }

  get grade(): number {
    return this._grade
  }

  get idStudent(): string {
    return this._idStudent
  }
}