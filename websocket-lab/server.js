import http from "http"
import fs from "fs"
import { WebSocketServer } from "ws";

const PORT = 4000;


const server=http.createServer((req,res)=>{
        const html=fs.readFileSync(new URL("./public/index.html",import.meta.url));
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(html);
})

const broadcast=(payload)=>{
    const message=JSON.stringify(payload);
    for(const client of wss.clients){
          if(client.readyState==client.OPEN){
            client.send(message);
          }
    }
}


const wss=new WebSocketServer({server});


let nextId=1;
wss.on("connection",(socket,req)=>{
     socket.id=nextId++;
     console.log(`Client # ${socket.id} connected from ${req.socket.remoteAddress} - ${wss.clients.size} online`);

     socket.send(JSON.stringify({
        type:"welcome",
        id:socket.id,
        text:`You are welcom client # ${socket.id}`
     }));

     broadcast({type:"count",count:wss.clients.size});


     socket.on("message",(raw)=>{
        const text=raw.toString();
        console.log(`${socket.id} sending message ${text}`);

        broadcast({
           type:'chat',
           from:socket.id,
           text,
           at:new Date().toLocaleTimeString()
        });


     });
      
    
     socket.on("close",()=>{
        
        console.log(`[-] client #${socket.id} left — ${wss.clients.size} online`);
        broadcast({type:"count",count:wss.clients.size})
     });


     socket.on("error",(err)=>{
        console.error(`client ${socket.id} error:`,err.message);
     })


});


server.listen(PORT, () => {
    console.log(`HTTP  →  http://localhost:${PORT}`);
    console.log(`WS    →  ws://localhost:${PORT}   (same server, same port)`);
});