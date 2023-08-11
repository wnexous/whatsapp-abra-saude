import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuIntroduction } from "./introdution";

export default function handle({ message, hooks, menu }: NexusPropsMenuInterface): NexusReturnMenuInterface {

    // const lastMessage = hooks.dataManager.getData({ token: "lastMessage" }) || { data: "sem mensagens" }
    hooks.dataManager.setData({ token: "lastMessage", data: message.body })


    switch (message.body) {
        case "introdução":
            hooks.changeMenuByPath({ menuPath: "/introdution" })
            return [
                { type: "message", content: menuIntroduction() },
            ]

        default:
            return [
                { type: "message", content: menuIndex() },
            ]
    }
}

export const menuIndex = () => `
*MENU PRINCIPAL*

Bem vindo ao menu principal
digite *intrudução* para saber mais sobre o projeto

_nexus bot_ by nexous
`