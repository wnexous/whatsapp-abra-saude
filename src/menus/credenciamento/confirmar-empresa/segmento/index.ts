import { NexusArrowFunct, NexusBuildMultiMessage } from "nexus-wa/global/interfaces/messageController";
import { menuConfirmarNomeConvenio } from "./confirmar-segmento";

const Segmento: NexusArrowFunct = (props) => {

    const userInput = props.message.body

    if (props.message.body.length >= 3) {
        props.hooks.dataManager.setData({
            token: "segmento",
            data: userInput
        })
        props.hooks.changeMenuByPath({ menuPath: props.menu.currentMenu.path + "/confirmar-segmento" })
        return [
            { type: "message", content: menuConfirmarNomeConvenio(userInput) }
        ]
    }


    return [
        ...menuSegmento()
    ]
}



export const menuSegmento: NexusBuildMultiMessage = () => [
    { type: "message", content: "Qual o segmento de atuação?" }
]

export default Segmento;