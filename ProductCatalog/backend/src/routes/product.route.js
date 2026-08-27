import { createProduct, deleteProduct, getProducts } from "../controllers/product.controller.js";
import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/mutler.middleware.js";

const router=Router();


router.post("/createProduct",verifyJWT,upload.single("productImage"),createProduct);
router.get("/getAllProduct",verifyJWT,getProducts);
router.delete("/deleteProduct/:id",verifyJWT,deleteProduct);


export default router;