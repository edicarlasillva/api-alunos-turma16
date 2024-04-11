import express from "express";

import { AssessmentController } from "../controllers/assessment.controller";
import { StudentController } from "../controllers/student.controller";
import { validateLoginOlderAge, validateToken } from "../middlewares/auth.middleware";
import { validateCreateAssessment } from "../middlewares/authorization.middleware";

const router = express.Router();

const studentController = new StudentController()
const assessmentController = new AssessmentController()

router.get('/students', studentController.index)

router.post('/students', studentController.store)

router.get('/students/:id', studentController.show)

router.put('/students/:id', studentController.update)

router.delete('/students/:id', studentController.delete)

// Lista avaliações de um usuário
router.get('/students/:idStudent/assessments', validateToken, validateLoginOlderAge, assessmentController.index)

// Cria avaliações para um usuário
router.post('/students/:idStudent/assessments', validateToken, validateCreateAssessment, assessmentController.store)

// Atualiza avaliação de um usuário
router.put('/students/:idStudent/assessments/:id', validateToken, assessmentController.update)

// Exclui avaliação de um usuário
router.delete('/students/:idStudent/assessments/:id', validateToken, assessmentController.delete)

// Lista por ID da avaliação
router.get('/students/:idStudent/assessments/:id', validateToken, assessmentController.show)


export default router;