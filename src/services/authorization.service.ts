import { PayloadToken } from "../dtos/auth.dto";
import { ResponseData } from "../dtos/response.dto";
import { TypeStudent } from "../models/student.model";
import { AuthService } from "./auth.service";

const authService = new AuthService()

export class AuthorizationService {
  public validateAuthorization(token: string, permittedTypes: TypeStudent[]): ResponseData {
    const payload = authService.decodeToken(token) as PayloadToken
    // const payload2 = authService.decodeTokenOld()

    if (!permittedTypes.includes(payload.type)) {
      return {
        success: false,
        message: 'Usuário não possui autorização.',
        code: 403 // Forbidden -> Proibido
      }
    }

    return {
      success: true,
      message: 'Validação feita com sucesso.',
      code: 200
    }
  }
}