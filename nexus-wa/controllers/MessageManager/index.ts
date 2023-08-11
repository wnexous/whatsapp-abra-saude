import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface";
import { CONFIG_MENU_MAPPING } from "../MenuController/config";
import { menuPropsInterface, menuReturnInterface, messageManagerContructorInterface } from "./interface";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import UserController from "../UserManager";
import HooksController from "../HooksController";
import DataController from "../DataController";

export default class MessageManager {
    private whatsappAdapter: WhatsappAdapter
    private menuController: builtMenuInterface[]
    private userController: UserController
    private dataController: DataController

    constructor({ whatsappAdapter, menuController, userController, dataController }: messageManagerContructorInterface) {
        console.log("[controller] starting MessageManager");

        this.whatsappAdapter = whatsappAdapter
        this.menuController = menuController
        this.userController = userController
        this.dataController = dataController
        this.setup()
    }

    async setup() {
        this.whatsappAdapter.onMessage(async msg => {
            const userProfile = await this.userController.fetchUserProfile({ phoneId: msg.phoneId })
            const currentMenu = this.fetchMenu({ menuId: userProfile.currentMenu })

            // instance hooks
            const instanceUserHooks = new HooksController({ ...userProfile, userController: this.userController, menuController: this.menuController, dataController: this.dataController })

            // TRY RUN FUNCTION
            try {
                const functionInjectProps: menuPropsInterface = {
                    message: msg,
                    hooks: instanceUserHooks,
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
    private fetchMenu(props: { menuId: string }) {
        return this.menuController.find(menu => menu.id == props.menuId) || this.menuController.find(menu => menu.name == CONFIG_MENU_MAPPING.mainMenuName)
    }

    reloadMenuController(menuList: builtMenuInterface[]) {
        this.menuController = menuList
    }
}