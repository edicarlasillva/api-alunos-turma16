import express from "express";
import { StudentController } from "../controllers/student.controller";
import { AssessmentController } from "../controllers/assessment.controller";

const router = express.Router();

const studentController = new StudentController()
const assessmentController = new AssessmentController()

router.get('/students', studentController.index)

router.post('/students', studentController.store)

router.get('/students/:id', studentController.show)

router.put('/students/:id', studentController.update)

router.delete('/students/:id', studentController.delete)

router.get('/students/:idStudent/assessments', assessmentController.index)

export default router;