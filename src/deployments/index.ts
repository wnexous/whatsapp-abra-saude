import { builtMenuInterface } from "src/adapter/MenuMapping/interface"
import DeployAdapter from "../adapter"
import DeployController from "../controllers"

export const DeployInstances = () => new Promise(async (resolve, reject) => {
    const { WhatsappApi, DatabaseApi, WebApi, MenuMapping } = DeployAdapter
    const { MessageManager } = DeployController


    // adapters
    const whatsApp = new WhatsappApi()
    const menuMapInstance = new MenuMapping()
    // const databaseApi = new DatabaseApi()
    // const webApi = new WebApi()

    // wait menus is mappeds to skip - when menu is mapped, the promisse is resolved by callback
    const menusMapped = await new Promise<builtMenuInterface[]>(resolve => menuMapInstance.setup(resolve))

    // wait whatsapp starts to init messageManager
    await new Promise(resolve => whatsApp.setup(() => resolve(0)))

    // controllers - also controllers need inject other controllers or adapters inside constructor
    const messageManager = new MessageManager({ whatsApp, menus: menusMapped })

    // messageManager.
})
