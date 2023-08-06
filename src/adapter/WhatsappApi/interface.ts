import { Message } from "whatsapp-web.js"

export interface sendMessageByAuthorInterface {
    chatId: string
    msg: string
}


export type whatsappApiCallbackStupInterface = () => void

export interface whatsappApionMessage {
    authorId: string
    body: string
    others: Message
}