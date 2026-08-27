// import http from "http";
// import fs from "fs";
// import { WebSocketServer } from "ws";

// const PORT = 4000;

// /**
//  * A plain Node HTTP server. This is exactly what sits underneath Express —
//  * app.listen() creates one of these for you. Here it only serves index.html.
//  */
// const server = http.createServer((req, res) => {
//     const html = fs.readFileSync(new URL("./public/index.html", import.meta.url));
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(html);
// });

// /**
//  * The WebSocket server ATTACHES to the HTTP server — notice it never calls
//  * listen() itself. Node hands it any request carrying an `Upgrade: websocket`
//  * header, and everything else goes to the handler above.
//  *
//  * One port. Two protocols. This is the single-connection upgrade in practice.
//  */
// const wss = new WebSocketServer({ server });


// /**
//  * There is no built-in "send to everyone" in the WebSocket protocol. You loop.
//  * (Socket.IO's rooms and broadcasting exist because everybody writes this.)
//  */
// const broadcast = (payload) => {
//     const message = JSON.stringify(payload);

//     for (const client of wss.clients) {
//         // A socket that is closing or already closed will throw on send().
//         if (client.readyState === client.OPEN) {
//             client.send(message);
//         }
//     }
// };


// let nextId = 1;

// wss.on("connection", (socket, req) => {
//     // `socket` is this ONE client. `wss.clients` is a Set of all of them.
//     socket.id = nextId++;

//     console.log(`[+] client #${socket.id} connected from ${req.socket.remoteAddress} — ${wss.clients.size} online`);

//     /**
//      * The protocol has no concept of message types — it moves text and binary,
//      * nothing else. So we invent our own envelope with JSON and switch on `type`
//      * at the other end. Every real app ends up doing some version of this.
//      */
//     socket.send(JSON.stringify({
//         type: "welcome",
//         id: socket.id,
//         text: `You are client #${socket.id}`
//     }));

//     // Everyone (including the new arrival) learns the new headcount.
//     // Nobody requested this — the server just decided to speak.
//     broadcast({ type: "count", count: wss.clients.size });


//     socket.on("message", (raw) => {
//         // `raw` is a Buffer, not a string. Forgetting toString() gives you
//         // "<Buffer 68 69>" instead of "hi" — a classic first-day surprise.
//         const text = raw.toString();

//         console.log(`[>] #${socket.id}: ${text}`);

//         broadcast({
//             type: "chat",
//             from: socket.id,
//             text,
//             at: new Date().toLocaleTimeString()
//         });
//     });


//     socket.on("close", () => {
//         // By the time this fires the socket is already out of wss.clients,
//         // so size is the count AFTER the departure.
//         console.log(`[-] client #${socket.id} left — ${wss.clients.size} online`);
//         broadcast({ type: "count", count: wss.clients.size });
//     });


//     socket.on("error", (err) => {
//         console.error(`[!] client #${socket.id} error:`, err.message);
//     });
// });


// /**
//  * Pure server push. No request, no polling, no client involvement at all —
//  * the thing HTTP simply cannot do.
//  */
// setInterval(() => {
//     broadcast({ type: "tick", at: new Date().toLocaleTimeString() });
// }, 3000);


// server.listen(PORT, () => {
//     console.log(`HTTP  →  http://localhost:${PORT}`);
//     console.log(`WS    →  ws://localhost:${PORT}   (same server, same port)`);
// });

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



});


server.listen(PORT, () => {
    console.log(`HTTP  →  http://localhost:${PORT}`);
    console.log(`WS    →  ws://localhost:${PORT}   (same server, same port)`);
});