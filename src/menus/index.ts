import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuTeste } from "./testes";

export default function handle({ message, hooks }: NexusPropsMenuInterface): NexusReturnMenuInterface {

    // save last message 
    const lastMessage = hooks.dataManager.getData({ token: "lastMessage" }) || { data: "sem mensagens" }
    hooks.dataManager.setData({ token: "lastMessage", data: message.body })


    if (message.body == "teste") {
        hooks.changeMenuByPath({ menuPath: "/testes" })
        return [
            { type: "message", content: "PolenguinhoOOOONEXUSIndo OIEpara o menu de testes" },
            { type: "message", content: menuTeste() },
        ]

    }

    return [
        { type: "message", content: menuIndex() },
        { type: "message", content: "12yoie1" },
    ]

}


export const menuIndex = () => `

*MENU PRINCIPAL*
polenta
para ir ao menu de teste, digite *teste*
`