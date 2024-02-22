export interface CreateAssessmentDTO {
  discipline: string
  grade: number
  idStudent: string
}

export interface UpdateAssessmentDTO {
  id: string
  grade: number
  idStudent: string
}