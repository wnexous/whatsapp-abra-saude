import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuIndex } from "..";

export default function MenuTeste(props: NexusPropsMenuInterface): NexusReturnMenuInterface {

    if (props.message.body == "voltar") {
        props.hooks.changeMenuByPath({ menuPath: "/" })
        return [
            { type: "message", content: "voltando para o menu principal" },
            { type: "message", content: menuIndex() },
        ]
    }
    return [
        { type: "message", content: menuTeste() }
    ]
}



export const menuTeste = () => `

*MENU DE TESTES*

para ir ao menu principal, digite *voltar*
`