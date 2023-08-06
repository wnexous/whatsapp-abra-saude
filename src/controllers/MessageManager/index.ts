import WhatsappApi from "src/adapter/WhatsappApi";
import { messageManagerContructorInterface } from "./interface";
import { builtMenuInterface } from "src/adapter/MenuMapping/interface";

export default class MessageManager {
    protected WhatsApp: WhatsappApi
    protected Menus: builtMenuInterface[]

    constructor({ whatsApp, menus }: messageManagerContructorInterface) {
        this.WhatsApp = whatsApp
        this.Menus = menus

        this.setup()

    }

    setup() {
        this.WhatsApp.onMessage(msg => this.WhatsApp.sendMessageByAuthor({chatId:msg.authorId, msg:msg.body}))
    }
}