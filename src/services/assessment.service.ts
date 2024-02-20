import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";

export class AssessmentService {
  public async findAll(idStudent: string): Promise<ResponseDTO> {
    const student = await repository.student.findUnique({
      where: {
        id: idStudent
      }
    })

    if (!student) {
      throw new Error("Aluno não encontrado")
    }

    const assessments = await repository.assessment.findMany({
      where: {
        studentId: idStudent
      }
    })

    return {
      success: true,
      code: 200,
      message: "Avaliações listadas com sucesso.",
      data: assessments
    }
  }
}