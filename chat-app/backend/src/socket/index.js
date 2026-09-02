
const onlineUsers=new Map();

export const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {


        socket.on("user:join",(name)=>{
            if(typeof name!=="string" || !name.trim()) return;
            onlineUsers.set(socket.id,{id:socket.id,name:name.trim()});

            io.emit("total:userslist",[...onlineUsers.values()]);
        });


        socket.on("message:user",({to,text})=>{
           if(!onlineUsers.has(to)) return; 
           if(typeof text !== "string" || !text.trim()) return;

           io.to(to).emit("message:new",{
               _id:`${socket.id}-${Date.now()}`,
               from:socket.id,
               to,
               text:text.trim().slice(0,500),
               createdAt:new Date().toISOString()
           });
        });



        socket.on("disconnect", () => {
            onlineUsers.delete(socket.id);
            io.emit("total:userslist",[...onlineUsers.values()]);
            console.log("User Connection Got Deleted", socket.id);
        });
    })
}