import {Router} from "express"
import { getAllTask,createTask,deleteTask } from "../controllers/task.controllers.js";
const router=Router();


router.post("/",createTask);
router.get("/",getAllTask);
router.delete("/:id",deleteTask);

export default router;