import { Server } from 'socket.io';


const socketConnection = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://10.141.130.183:5173"],
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on("setup", (userId) => {
            socket.join(userId);
            console.log("user joined room", userId);
            socket.emit("connected");
        })

        socket.on("message", (data) => {
            if (!data?.receiver) return;
            console.log("message received:", data);
            io.to(data.receiver).emit("incomingMsg", data);
        });

        socket.on("typing", (data) => {
            if (!data?.receiver) return;
            console.log("message received:", data);
            io.to(data.receiver).emit("typing", data);
        });

        socket.on("stopTyping", (data) => {
            if (!data?.receiver) return;
            console.log("message received:", data);
            io.to(data.receiver).emit("stopTyping");
        })


    });
}

export default socketConnection;
