import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import { builtMenuInterface } from "../MenuController/interface";
import UserController from "../UserManager";
import { whatsappApionMessage } from "nexus-wa/adapter/WhatsappAdapter/interface";
import Hooks from "nexus-wa/hooks";

export interface messageManagerContructorInterface {
    whatsappAdapter: WhatsappAdapter,
    menuController: builtMenuInterface[],
    userController: UserController,
}
type HookesInterface = typeof Hooks

export interface menuPropsInterface {
    message: whatsappApionMessage
    menu: {
        currentMenu: builtMenuInterface
        menuList: builtMenuInterface[]
    },
    hooks: HookesInterface
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