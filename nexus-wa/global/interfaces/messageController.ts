import { whatsappApionMessage } from "nexus-wa/adapter/WhatsappAdapter/interface";
import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface";

export interface NexusMenuInterface {
    message: whatsappApionMessage
    menu: {
        currentMenu: builtMenuInterface
        menuList: builtMenuInterface[]
    }
    userProfile: {
        id: string;
        phoneId: string;
        currentMenu: string;
        updateAt: Date;
        createAt: Date;
    }
}