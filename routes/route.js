import express from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  uploadProfileImage,
} from '../controller/controller.js';
const router = express.Router();

router.get('/students', getAllStudents);
router.post('/create', createStudent);
router.post('/student/:id/uploade_image', uploadProfileImage);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;
