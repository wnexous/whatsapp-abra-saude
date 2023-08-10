import DataController from "../DataController"
import { builtMenuInterface } from "../MenuController/interface"
import UserController from "../UserManager"

export interface HooksControllerProps {
    phoneId: string
    userController: UserController
    menuController: builtMenuInterface[]
    dataController: DataController
}

export type changeMenuByPathProps = { menuPath: string }
export type changeMenuByUUIDProps = { menuUUID: string }
