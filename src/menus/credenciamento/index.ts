import { NexusArrowFunct, NexusBuildMultiMessage } from "nexus-wa/global/interfaces/messageController";
import { menuConfirmarNomeCredenciamento } from "./confirmar-nome";

const Credenciamento: NexusArrowFunct = (props) => {


    if (props.message.body.length > 3) {

        props.hooks.dataManager.setData({ token: "enterprise", data: props.message.body })
        props.hooks.changeMenuByPath({ menuPath: props.menu.currentMenu.path + "/confirmar-nome" })
        return [
            { type: "message", content: menuConfirmarNomeCredenciamento(props.message.body) },
        ]
    }
}


export default Credenciamento


export const menuCredenciamento: NexusBuildMultiMessage = () => {
    return [

        { type: "message", content: "Qual o nome da sua empresa?", messageDelay: 1000 },
    ]
}