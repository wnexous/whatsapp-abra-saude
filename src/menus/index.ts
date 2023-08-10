import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";

export default function handle({ message, hooks }: NexusPropsMenuInterface): NexusReturnMenuInterface {

    // save last message 
    const lastMessage = hooks.dataManager.getData({ token: "lastMessage" }) || { data: "sem mensagens" }
    hooks.dataManager.setData({ token: "lastMessage", data: message.body })

    const buildMessage = `
*Mensagem de:* ${message.phoneId}
*LastMessage:* ${lastMessage.data}
*Body:* ${message.body}

para acessar menu de teste, digite: *teste*
    `
    if (message.body == "teste") {
        hooks.changeMenuByPath({ menuPath: "/testes" })
        return [
            { type: "message", content: "Indo para o menu de testes" }
        ]

    }

    return [
        { type: "message", content: buildMessage }
    ]

}
