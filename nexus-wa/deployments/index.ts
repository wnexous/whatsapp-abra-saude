import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface"
import DeployAdapter from "../adapter"
import DeployController from "../controllers"
import { PrismaClient } from "@prisma/client"
import fs from "fs"
import shellJs from "shelljs"
export default async () => {
    const { WhatsappAdapter, WebApi } = DeployAdapter
    const { MessageManager, UserManager, MenuController, DataController } = DeployController

    console.log("Starting deploy instances")
    // ADAPTERD
    const whatsappAdapter = new WhatsappAdapter()
    const databaseAdapter = new PrismaClient()
    // const webApi = new WebApi()
    // CONTROLLER
    const menuController = new MenuController()
    const dataController = new DataController()

    // wait menus is mappeds to skip - when menu is mapped, the promisse is resolved by callback
    let menuMapInstance = await new Promise<builtMenuInterface[]>(resolve => menuController.setup(resolve))
    // wait whatsapp starts to init messageManager
    await new Promise(resolve => whatsappAdapter.setup(() => resolve(0)))

    const userController = new UserManager({
        databaseAdapter,
        whatsappAdapter,
        menuController: menuMapInstance
    })

    // also controllers need inject other controllers or adapters inside constructor
    const messageManager = new MessageManager({
        userController,
        whatsappAdapter,
        menuController: menuMapInstance,
        dataController
    })

    liveRefresh("/../../../src/", async () => {
        shellJs.exec("npx tsc")
        menuMapInstance = await new Promise<builtMenuInterface[]>(resolve => menuController.setup(resolve))
        messageManager.reloadMenuController(menuMapInstance)
        userController.reloadMenuController(menuMapInstance)
        console.log("Atualizado com sucesso");
    })

}

function liveRefresh(dir: string, callback: () => void) {
    let filterDuplicateRequest: string
    const watchPath = __dirname + dir
    fs.watch(watchPath, { recursive: true, persistent: true }, (event, filename) => {

        // save last archive to block multi requests
        const getFile = fs.readFileSync(watchPath + filename, "utf-8")
        if (getFile != filterDuplicateRequest) {
            console.log(`Atualização em ${filename} encontrada.`);
            callback()
            filterDuplicateRequest = getFile
        }
    })
}