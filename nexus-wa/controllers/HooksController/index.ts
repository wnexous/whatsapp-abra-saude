import { CONFIG_HOOKS_CONTROLLER } from "./config"
import fs from "fs"
import { defaultHooksInterface } from "./interface";
export default class HooksController {
    hooksConfig = CONFIG_HOOKS_CONTROLLER
    hookObj = {}

    constructor() {
        this.hooksObj()
    }

    private async readFileByDir(props: { hookList: string[], hookPath: string }) {
        const hooksList: defaultHooksInterface[] = []
        for (const rowRead of props.hookList) {
            const splitRow = rowRead.split("\\")
            const fileName = splitRow[splitRow.length - 1]

            if (fileName.toLowerCase() == "index.js") {
                const hookPath = props.hookPath + rowRead
                const readDefaultFunction = await import(hookPath)

                if (typeof readDefaultFunction.default != "function") throw new Error(`hook "${fileName}" no have a default function exported`)
                if (!readDefaultFunction.default.name.startsWith(CONFIG_HOOKS_CONTROLLER.startWithName)) throw new Error(`hook "${rowRead}" need start withs "use" on default function name. Exemple: useStore. Currently your hook name is: ${readDefaultFunction.default.name}`)

                hooksList.push({
                    hookName: readDefaultFunction.default.name,
                    function: readDefaultFunction.default,
                    hookPath: hookPath
                })
            }
        }
        return hooksList

    }
    private async readDefaultHooks() {
        const defaultHooksPath = __dirname + this.hooksConfig.defaultHooksPath
        let readHooks = fs.readdirSync(defaultHooksPath, { recursive: true }).map((row) => `${row}`)

        return await this.readFileByDir({
            hookList: readHooks,
            hookPath: defaultHooksPath
        })
    }
    private async readUserHooks() {
        const userHooksPath = __dirname + this.hooksConfig.userHooksPath
        let readHooks = fs.readdirSync(userHooksPath, { recursive: true }).map((row) => `${row}`)

        return await this.readFileByDir({
            hookList: readHooks,
            hookPath: userHooksPath
        })

    }

    private async hooksObj() {
        const hookDefaultList = await this.readDefaultHooks()
        const hooksObj = {}

        hookDefaultList.forEach(hook => {
            if (hook.hookName in hooksObj) throw new Error(`hook ${hook.hookName} already exists. Please choose other hook name. Path: ${hook.hookPath}`)
            hooksObj[hook.hookName] = hook.function

            console.log(hook.hookName);
        })

        this.hookObj = hooksObj
    }

    getHookObj() {
        return this.hookObj
    }

}