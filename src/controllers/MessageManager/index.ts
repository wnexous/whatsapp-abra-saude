import WhatsappAdapter from "src/adapter/WhatsappAdapter";
import { messageManagerContructorInterface } from "./interface";
import { builtMenuInterface } from "src/controllers/MenuController/interface";
import UserController from "../UserManager";

export default class MessageManager {
    protected whatsappAdapter: WhatsappAdapter
    protected menuController: builtMenuInterface[]
    protected userController: UserController

    constructor({ whatsappAdapter, menuController, userController }: messageManagerContructorInterface) {
        this.whatsappAdapter = whatsappAdapter
        this.menuController = menuController
        this.userController = userController
        this.setup()
    }

    setup() {
        this.whatsappAdapter.onMessage(async msg => {
            this.whatsappAdapter.sendMessageByAuthor({ chatId: msg.authorId, msg: msg.body })
        })
    }
}