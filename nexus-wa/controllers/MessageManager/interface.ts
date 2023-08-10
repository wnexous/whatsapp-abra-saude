import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import { builtMenuInterface } from "../MenuController/interface";
import UserController from "../UserManager";
import { whatsappApionMessage } from "nexus-wa/adapter/WhatsappAdapter/interface";
import HooksController from "../HooksController";
import DataController from "../DataController";

export interface messageManagerContructorInterface {
    whatsappAdapter: WhatsappAdapter,
    menuController: builtMenuInterface[],
    userController: UserController,
    dataController: DataController
}

export interface menuPropsInterface {
    message: whatsappApionMessage
    menu: {
        currentMenu: builtMenuInterface
        menuList: builtMenuInterface[]
    },
    hooks: HooksController
    userProfile: {
        id: string;
        phoneId: string;
        currentMenu: string;
        updateAt: Date;
        createAt: Date;
    }
}

export type menuReturnInterface = (
    messageReturn | imageReturn)

interface messageReturn extends defaultReturn {
    type: "message"
    content: string
}
interface imageReturn extends defaultReturn {
    type: "image"
    imagePath: string
}

interface defaultReturn {
    messageDelay?: number
}