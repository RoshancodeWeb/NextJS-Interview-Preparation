import { Router } from "express";
import { createUser, getCurrentUser, logoutUser, refreshTheSession, verifyAndSignIn } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

//public
router.post("/signup",createUser);
router.post("/login",verifyAndSignIn);
router.post("/refresh-token",refreshTheSession);


//private
router.get("/me",verifyJWT,getCurrentUser);

// dummy protected route, just to watch the refresh flow work
router.get("/ping",verifyJWT,(req,res)=>{
    res.status(200).json({
        success:true,
        message:`pong — authenticated as ${req.user.name}`,
        at:new Date().toISOString()
    });
});

router.post("/logout",verifyJWT,logoutUser);


export default router