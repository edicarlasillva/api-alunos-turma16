import express from "express";

import { StudentController } from "../controllers/student.controller";
import { AssessmentController } from "../controllers/assessment.controller";
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

const studentController = new StudentController()
const assessmentController = new AssessmentController()

router.get('/students', studentController.index)

router.post('/students', studentController.store)

router.get('/students/:id', studentController.show)

router.put('/students/:id', studentController.update)

router.delete('/students/:id', studentController.delete)

// Lista avaliações de um usuário
router.get('/students/:idStudent/assessments', validateToken, assessmentController.index)

// Cria avaliações para um usuário
router.post('/students/:idStudent/assessments', validateToken, assessmentController.store)

// Atualiza avaliação de um usuário
router.put('/students/:idStudent/assessments/:id', validateToken, assessmentController.update)

// Exclui avaliação de um usuário
router.delete('/students/:idStudent/assessments/:id', validateToken, assessmentController.delete)

export default router;