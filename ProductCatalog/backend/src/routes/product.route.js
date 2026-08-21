import { createProduct } from "../controllers/product.controller.js";
import Router from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/mutler.middleware.js";

const router=Router();


router.post("/createProduct",verifyJWT,upload.single("productImage"),createProduct);



export default router;