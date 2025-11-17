export interface Message {
    id: string;
    text: string;
    userId: string;
    timestamp: Date;
}

export interface Notification {
    id: string;
    message: string;
    userId: string;
    timestamp: Date;
}