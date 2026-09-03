import { Message } from "../models/message.model.js";

const onlineUsers=new Map();

export const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {


        const {_id,name}=socket.handshake.auth;
        if(!_id) return socket.disconnect();
        onlineUsers.set(_id,{id:_id,name:name.trim()});
        socket.join(_id);
        io.emit("total:userslist",[...onlineUsers.values()]);
        


        socket.on("message:user",async({to,text})=>{
           
           try{
            if(!onlineUsers.has(to)) return; 
           if(typeof text !== "string" || !text.trim()) return;
        
           const conversationId=[_id,to].sort().join("_");

           const saved=await Message.create({
             conversationId,
             from:_id,
             to,
             text:text.trim().slice(0,500)
           })
           


           io.to(to).emit("message:new",saved);

           }catch(err){
                console.error("message:user failed:", err);
                socket.emit("message:error", { message: "Message failed to send" });

           }

        
        });
    



        socket.on("disconnect", () => {
            onlineUsers.delete(_id);
            io.emit("total:userslist",[...onlineUsers.values()]);
            console.log("User Connection Got Deleted", socket.id);
        });
    })
}