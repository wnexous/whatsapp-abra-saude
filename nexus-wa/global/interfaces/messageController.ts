import { whatsappApionMessage } from "nexus-wa/adapter/WhatsappAdapter/interface";
import { defaultHooksInterface } from "nexus-wa/controllers/HooksController/interface";
import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface";

export interface NexusMenuInterface {
    message: whatsappApionMessage
    menu: {
        currentMenu: builtMenuInterface
        menuList: builtMenuInterface[]
    }
    hooks: {}
    userProfile: {
        id: string;
        phoneId: string;
        currentMenu: string;
        updateAt: Date;
        createAt: Date;
    }
}