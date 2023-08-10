import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";

export default function handle({ message }: NexusPropsMenuInterface): NexusReturnMenuInterface {
    const buildMessage = `
*Mensagem de:* ${message.phoneId}
*Body:* ${message.body}
    `
    return [
        { type: "message", content: buildMessage }
    ]

}
