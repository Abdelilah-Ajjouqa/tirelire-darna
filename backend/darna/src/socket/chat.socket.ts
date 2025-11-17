import { Socket, Server } from "socket.io";
import MessageService from "../services/message.service";

export default (io: Server, socket: Socket, currentUser: string) => {

    socket.on("send-message", async (data: { receiverId: string; content: string, image: Buffer }) => {
        try {
            const fileName = `chat_${Date.now()}.jpg`;
            await MessageService.saveImage(data.image, fileName);
            await MessageService.sendMessage(data.receiverId, currentUser, data.content)

        } catch (error) {
            console.error(`Error sending message: ${error}`);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    socket.on("joinRoom", (userId: string) => {
        try {
            socket.join(userId);
            console.log(`user ${userId} joined the room `);
        } catch (error) {
            console.error(`Error joining room: ${error}`);
            socket.emit("error", { message: "Failed to join room" });
        }
    });
}
