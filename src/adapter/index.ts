import DatabaseApi from "./Database"
import WebApi from "./WebApi"
import WhatsappApi from "./WhatsappApi"


const DeployAdapter = () => {
    return {
        whatsApp: new WhatsappApi(),
        webApi: new WebApi(),
        databaseApi: new DatabaseApi()
    }
}

export default DeployAdapter


