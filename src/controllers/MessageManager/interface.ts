import WhatsappApi from "src/adapter/WhatsappApi";
import { builtMenuInterface } from "../../adapter/MenuMapping/interface";

export interface messageManagerContructorInterface {
    whatsApp: WhatsappApi,
    menus: builtMenuInterface[]
}