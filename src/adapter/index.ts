import DatabaseApi from "./Database"
import WebApi from "./WebApi"
import WhatsappApi from "./WhatsappApi"
import MenuMapping from "../adapter/MenuMapping"


const DeployAdapter = {
    WhatsappApi,
    WebApi,
    DatabaseApi,
    MenuMapping
}

export default DeployAdapter


