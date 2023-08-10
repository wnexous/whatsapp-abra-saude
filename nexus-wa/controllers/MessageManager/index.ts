import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface";
import { CONFIG_MENU_MAPPING } from "../MenuController/config";
import { menuPropsInterface, menuReturnInterface, messageManagerContructorInterface } from "./interface";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import UserController from "../UserManager";
import Hooks from "../../hooks/index.js";

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

    async setup() {
        this.whatsappAdapter.onMessage(async msg => {
            const userProfile = await this.userController.fetchUserProfile({ phoneId: msg.phoneId })
            const currentMenu = this.fetchMenu({ menuId: userProfile.currentMenu })

            // TRY RUN FUNCTION
            try {

                const functionInjectProps: menuPropsInterface = {
                    message: msg,
                    hooks: Hooks,
                    menu: {
                        currentMenu: currentMenu,
                        menuList: this.menuController
                    },
                    userProfile: userProfile
                }
                const runFunction: menuReturnInterface[] = await currentMenu.functionsFile.default(functionInjectProps)
                if (runFunction.length > 0) {
                    for (const message of runFunction) {
                        message.messageDelay && await new Promise((resolve) => setTimeout(resolve, message.messageDelay))

                        if (message.type == "message") this.whatsappAdapter.sendMessageByAuthor({ chatId: msg.phoneId, msg: message.content })

                    }
                }

            } catch (error) {
                new Error("error when try run function inside menu. Error message:", error)
            }
        })
    }
    fetchMenu(props: { menuId: string }) {
        return this.menuController.find(menu => menu.id == props.menuId) || this.menuController.find(menu => menu.name == CONFIG_MENU_MAPPING.mainMenuName)
    }
}