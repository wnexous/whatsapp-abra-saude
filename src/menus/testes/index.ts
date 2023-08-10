import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";

export default function MenuTeste(props: NexusPropsMenuInterface): NexusReturnMenuInterface {

    if (props.message.body == "voltar") {
        props.hooks.changeMenuByPath({ menuPath: "/" })
        return [
            { type: "message", content: "voltando para o menu principal" }
        ]
    }
    return [
        { type: "message", content: "Voce esta no menu de testes. para voltar, digite: *voltar*" }
    ]
}