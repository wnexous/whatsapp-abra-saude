import fs from "fs"
import { builtMenuInterface, menuMappingCallbackStupInterface } from "./interface";
import { CONFIG_MENU_MAPPING } from "./config";
import crypto from "crypto"


export default class MenuController {
    menuPath: string
    menuList: builtMenuInterface[] = []
    currentJsonFile: builtMenuInterface[]
    constructor() {
        console.log("[controller] starting MenuController");
    }

    async setup(callback?: menuMappingCallbackStupInterface) {

        const pathname = __dirname + "/" + CONFIG_MENU_MAPPING.menuFolderPath
        let readMenuFolder = fs.readdirSync(pathname, { recursive: true })

        // get current json file
        this.currentJsonFile = this.getMenuFile()


        // tranform read buffer to string array
        readMenuFolder = readMenuFolder.map((r) => `${r}`)

        // create menus array
        const mapDirOnObj: builtMenuInterface[] = []

        // mapping all functions readed by recursive menu
        for (let row of readMenuFolder) {
            const stringSplited = row.split("\\")

            if (stringSplited[stringSplited.length - 1] == CONFIG_MENU_MAPPING.indexFileName) {
                const functionPath = stringSplited.slice(0, stringSplited.length - 1)
                const functionPathWithBar = functionPath.join("/")
                const filePathToImport = __dirname + CONFIG_MENU_MAPPING.menuFolderPath + functionPathWithBar + "/" + CONFIG_MENU_MAPPING.indexFileName

                // to live reload works, need delete module cache before import
                delete require.cache[require.resolve(filePathToImport)];
                try {
                    const functionFetched = await import(filePathToImport)

                    // find to verify if menu has exists and pick UUID
                    const currentMenuUUID = this.currentJsonFile.find(f => f.path == functionPathWithBar)

                    const menuBuilted: builtMenuInterface = {
                        name: functionPath[functionPath.length - 1] || CONFIG_MENU_MAPPING.mainMenuName,
                        path: "/" + functionPathWithBar,
                        functionsFile: functionFetched,
                        hasDefaultFunction: !!functionFetched.default.name,
                        id: currentMenuUUID.id || crypto.randomUUID()
                    }

                    // push menu obj on array
                    mapDirOnObj.push(menuBuilted)

                } catch (error) {
                    console.log(`Falha ao importar modulo ${functionPathWithBar}`);
                    console.log(error);
                }

            }
        }
        this.menuList = mapDirOnObj
        callback(mapDirOnObj)
        this.saveMenu()
    }

    saveMenu() {
        fs.writeFileSync("./data/menuList.json", JSON.stringify(this.menuList))
    }
    getMenuFile() {
        const fetchFile = fs.readFileSync("./data/menuList.json", "utf-8")
        return JSON.parse(fetchFile)
    }
    getMenuList() {
        return this.menuList
    }

}


