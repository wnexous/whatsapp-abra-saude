import { NexusBuildMultiMessage, NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuConfirmarNomeConvenio } from "./confirmar-nome";

const CONFIGS = {
    maxNameSize: 64,
    minNameSize: 3
}
export default function infoConvenio(props: NexusPropsMenuInterface): NexusReturnMenuInterface {
    let nameRead = props.message.body

    if (nameRead.length >= CONFIGS.minNameSize) {
        props.hooks.dataManager.setData({ token: "username", data: nameRead })
        props.hooks.changeMenuByPath({ menuPath: props.menu.currentMenu.path + "/confirmar-nome" })
        return [
            { type: "message", content: menuConfirmarNomeConvenio(nameRead) },
        ]
    }
    else return [
        { type: "message", content: "Oops, parece que não conseguimos entender seu nome coretamente. Poderia digita-lo novamente?" }
    ]


}

export const menuInformacaoConvenio: NexusBuildMultiMessage = () => ([
    {
        type: "message", content: `
📚 INFORMAÇÕES SOBRE O CONVÊNIO 🏥📋

Perfeito! Estamos aqui para fornecer a você todas as informações necessárias sobre nosso convênio. 🌟📚
`
    },
    { type: "message", content: "Qual seu nome completo?", messageDelay: 2000 }
])

