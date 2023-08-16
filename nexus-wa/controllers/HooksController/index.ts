import DataController from "../DataController";
import { builtMenuInterface } from "../MenuController/interface";
import UserController from "../UserManager";
import { HooksControllerProps, changeMenuByPathProps, changeMenuByUUIDProps } from "./interface";
export default class HooksController {
    protected phoneId: string
    protected userController: UserController
    protected menuController: builtMenuInterface[]
    protected dataController: DataController
    constructor(props: HooksControllerProps) {

        this.phoneId = props.phoneId
        this.userController = props.userController
        this.menuController = props.menuController
        this.dataController = props.dataController

    }

    public async changeMenuByPath(args: changeMenuByPathProps) {
        const menu = this.menuController.find(m => m.path == args.menuPath)

        // caso retorne um menu correto, faz a alteração de menu, caso contrario retorna false
        return menu && await this.userController.changeUserMenu({ phoneId: this.phoneId, menuId: menu.id })
    }
    public async changeMenuByUUID(args: changeMenuByUUIDProps) {
        const menu = this.menuController.find(m => m.id == args.menuUUID)

        // caso retorne um menu correto, faz a alteração de menu, caso contrario retorna false
        return menu && await this.userController.changeUserMenu({ phoneId: this.phoneId, menuId: menu.id })
    }

    public dataManager = {
        setData: (args: { token: string, data: string | object }) => {
            this.dataController.setData({ phoneId: this.phoneId, data: args.data, token: args.token })
        },
        deleteData: (args: { token: string }) => {
            this.dataController.deleteData({ phoneId: this.phoneId, token: args.token })
        },
        getData: (args: { token: string }) => {
            return this.dataController.getData({ phoneId: this.phoneId, token: args.token })
        },
        getTokenList: () => {
            return this.dataController.getTokenList({ phoneId: this.phoneId })
        }
    }
}