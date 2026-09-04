import { Message } from "../models/message.model.js";
import asyncHandler from "../utils/asynchandler.util.js";

export const getChatMessages = asyncHandler(async (req, res) => {

    const { userId, selectedUserId } = req.params;

    const conversationId = [userId, selectedUserId].sort().join("_");


    const messages = await Message.find({ conversationId })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();
    messages.reverse();

    res.status(200).json({ success: true,message:"Last 50 Messages Loaded", messages });


});