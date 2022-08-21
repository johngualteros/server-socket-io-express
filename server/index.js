import express from "express";
import morgan from "morgan";
import {Server as SocketServer} from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server,{
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection",(socket)=>{
    socket.on('message', function(message){
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id
        });
    });
})

server.listen(PORT, () => {
  console.log("🚀🦄 Server is running on port " + PORT);
});
