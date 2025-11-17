import Message from "../models/message";
import minioService from "./minioService.service";

class MessageService {
    static async sendMessage(senderId: string, receiverId: string, content: string, imageUrl?: string | null) {
        try {
            const newMessage = new Message({ 
                senderId, 
                receiverId, 
                content,
                image: imageUrl || null
            });
            await newMessage.save();
            return newMessage;
        } catch (error: any) {
            throw new Error(`error: cannot saving message: ${error}`);
        }
    }

    static async saveImage(imageBuffer: Buffer, fileName: string): Promise<string> {
        return await minioService.upload(imageBuffer, fileName);
    }

    static async getRoom(userId1: string, userId2: string) {
        try {
            return Message.find({
                $or: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            }).sort({ createdAt: 1 });
        } catch (error: any) {
            throw new Error(`error: failed to get room, ${error}`);
        }
    }
}

export default MessageService;