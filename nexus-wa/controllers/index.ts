import DataController from "./DataController"
import HooksController from "./HooksController"
import MenuController from "./MenuController"
import MessageManager from "./MessageManager"
import UserManager from "./UserManager"

const DeployController = {
  MessageManager,
  UserManager,
  MenuController,
  DataController,
  HooksController
}

export default DeployController

