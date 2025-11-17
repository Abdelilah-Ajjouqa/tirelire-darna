require("dotenv").config({ path: __dirname + "/../.env" });
import { Server, Socket } from "socket.io";
import http from 'http';
import express from "express";
import 'dotenv/config';
import priceEstimationRoutes from "./routes/priceEstimationRoutes";
import { connectionDB } from "./config/db_config";
import RealEstateRoutes from "./routes/realEstate.routes"
import chatSocket from "./socket/chat.socket";



connectionDB();

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", priceEstimationRoutes);

io.on('connection', (socket) => {
  try {
    console.log(`User connected: ${socket.id}`);
    socket.on('diconnect', () => {
      try {
        console.log(`User disconnected: ${socket.id}`);
      } catch (error: any) {
        console.error(`Error during disconnect: ${error}`);
      }
    })
  } catch (error: any) {
    console.log(`Connection error: ${error}`)
    socket.disconnect();
  }
})

app.get("/", (req, res)=>{
  res.send("the Darna-api is running")
})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const context: Record<string, Socket> = {};
