import { NexusMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface";
import { CONFIG_MENU_MAPPING } from "../MenuController/config";
import { messageManagerContructorInterface } from "./interface";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import HooksController from "../HooksController";
import UserController from "../UserManager";

export default class MessageManager {
    protected whatsappAdapter: WhatsappAdapter
    protected menuController: builtMenuInterface[]
    protected userController: UserController
    protected hooksController: HooksController

    constructor({ whatsappAdapter, menuController, userController, hooksController }: messageManagerContructorInterface) {
        this.whatsappAdapter = whatsappAdapter
        this.menuController = menuController
        this.userController = userController
        this.hooksController = hooksController
        this.setup()
    }

    setup() {
        this.whatsappAdapter.onMessage(async msg => {

            const userProfile = await this.userController.fetchUserProfile({ phoneId: msg.phoneId })
            const currentMenu = this.fetchMenu({ menuId: userProfile.currentMenu })

            // TRY RUN FUNCTION
            try {
                const hooksObj = await this.hooksController.hooksObj()
                const functionInjectProps: NexusMenuInterface = {
                    message: msg,
                    menu: {
                        currentMenu: currentMenu,
                        menuList: this.menuController
                    },
                    hooks: hooksObj,
                    userProfile: userProfile
                }
                const runFunction = await currentMenu.functionsFile.default(functionInjectProps)
                this.whatsappAdapter.sendMessageByAuthor({ chatId: msg.phoneId, msg: runFunction })
            } catch (error) {
                new Error("error when try run function inside menu. Error message:", error)
            }
        })
    }
    fetchMenu(props: { menuId: string }) {
        return this.menuController.find(menu => menu.id == props.menuId) || this.menuController.find(menu => menu.name == CONFIG_MENU_MAPPING.mainMenuName)
    }


}