import {Router} from "express"
import { getChatMessages } from "../controllers/message.controller.js";


const route=Router();


route.get("/:userId/:selectedUserId",getChatMessages);


export default route;