import express from "express";
import { StudentController } from "../controllers/student.controller";

const router = express.Router();

const studentController = new StudentController()

router.get('/students', studentController.index)

router.post('/students', studentController.store)

router.get('/students/:id', studentController.show)

router.put('/students/:id', studentController.update)

router.delete('/students/:id', studentController.delete)

export default router;