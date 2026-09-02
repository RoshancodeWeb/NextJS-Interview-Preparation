import {Router} from "express";
import { createUser } from "../controllers/user.controller.js";

const route=Router();

route.post('/login',createUser);


export default route;