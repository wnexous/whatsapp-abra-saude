import fs from "fs"
import { builtMenuInterface, menuMappingCallbackStupInterface } from "./interface";
import { CONFIG_MENU_MAPPING } from "./config";
import crypto from "crypto"


export default class MenuController {
    menuPath: string
    menuList: builtMenuInterface[] = []
    constructor() {
        console.log("[controller] starting MenuController");


     }

    async setup(callback?: menuMappingCallbackStupInterface) {
        const pathname = __dirname + "/" + CONFIG_MENU_MAPPING.menuFolderPath
        let readMenuFolder = fs.readdirSync(pathname, { recursive: true })

        // tranform read buffer to string array
        readMenuFolder = readMenuFolder.map((r) => `${r}`)

        // create menus array
        const mapDirOnObj: builtMenuInterface[] = []

        // mapping all functions readed by recursive menu
        for (let row of readMenuFolder) {
            const stringSplited = row.split("\\")

            if (stringSplited[stringSplited.length - 1] == CONFIG_MENU_MAPPING.indexFileName) {
                const functionPath = stringSplited.slice(0, stringSplited.length - 1)
                const functionPathWithBar = "/" + functionPath.join("/")
                const functionFetched = await import(CONFIG_MENU_MAPPING.menuFolderPath + functionPathWithBar + "/" + CONFIG_MENU_MAPPING.indexFileName)

                const menuBuilted: builtMenuInterface = {
                    name: functionPath[functionPath.length - 1] || CONFIG_MENU_MAPPING.mainMenuName,
                    path: functionPathWithBar,
                    functionsFile: functionFetched,
                    hasDefaultFunction: !!functionFetched.default.name,
                    id: crypto.randomUUID()
                }

                // push menu obj on array
                mapDirOnObj.push(menuBuilted)
            }
        }
        this.menuList = mapDirOnObj
        callback(mapDirOnObj)
    }


}


