import { Router } from "express";
import { createUser, verifyAndSignIn } from "../controllers/user.controller.js";

const router=Router();


router.post("/signup",createUser);
router.post("/login",verifyAndSignIn);


export default router