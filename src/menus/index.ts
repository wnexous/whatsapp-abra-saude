import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";

export default function handle({ message, hooks }: NexusPropsMenuInterface): NexusReturnMenuInterface {

    // save last message 
    const lastMessage = hooks.dataManager.getData({ token: "lastMessage" }) || { data: "sem mensagens" }
    hooks.dataManager.setData({ token: "lastMessage", data: message.body })

    const buildMessage = `
*Mensagem de:* ${message.phoneId}
*LastMessage:* ${lastMessage.data}
*Body:* ${message.body}
    `
    return [
        { type: "message", content: buildMessage }
    ]

}
