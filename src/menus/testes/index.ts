import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuIndex } from "..";

export default function MenuTeste(props: NexusPropsMenuInterface): NexusReturnMenuInterface {

    if (props.message.body == "voltar") {
        props.hooks.changeMenuByPath({ menuPath: "/" })
        return [
            { type: "message", content: "voltandos para o menu principal" },
            { type: "message", content: menuIndex() },
            { type: "message", content: "1oie" },
        ]
    }
    return [
        { type: "message", content: menuTeste() }
    ]
}



export const menuTeste = () => `

*MENU DE TESTES*
aa33
para ir ao menu principal, digite *voltar*
`