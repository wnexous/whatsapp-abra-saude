import { builtMenuInterface } from "nexus-wa/controllers/MenuController/interface"
import DeployAdapter from "../adapter"
import DeployController from "../controllers"
import fs from "fs"
import shellJs from "shelljs"
import { PrismaClient } from "@prisma/client"
export default async () => {
    const { WhatsappAdapter, WebApi } = DeployAdapter
    const { MessageManager, UserManager, MenuController, DataController } = DeployController

    // ADAPTERD
    const whatsappAdapter = new WhatsappAdapter()

    const databaseAdapter = new PrismaClient({ errorFormat: "pretty" })
    const menuController = new MenuController()
    const dataController = new DataController()

    // wait menus is mappeds to skip - when menu is mapped, the promisse is resolved by callback
    let menuMapInstance = await new Promise<builtMenuInterface[]>(resolve => menuController.setup(resolve))
    // wait whatsapp starts to init messageManager
    await new Promise(resolve => whatsappAdapter.setup(() => resolve(0)))

    const userController = new UserManager({
        databaseAdapter,
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
    })

}

function liveRefresh(dir: string, callback: () => void) {
    let filterDuplicateRequest: string
    const watchPath = __dirname + dir
    fs.watch(watchPath, { recursive: true, persistent: true }, (event, filename) => {

        let insidePath = filename.split("\\").join("/")
        try {
            const getFile = fs.readFileSync(watchPath + filename, "utf-8")

            if (getFile != filterDuplicateRequest) {
                // delete require.cache[require.resolve(watchPath + insidePath)];
                console.log(`Atualização em ${filename} encontrada.`);
                callback()
                filterDuplicateRequest = getFile
            }

        } catch (error) {
            console.log("erro ao ler arquivo");
            console.log(error);
        }

    })
}