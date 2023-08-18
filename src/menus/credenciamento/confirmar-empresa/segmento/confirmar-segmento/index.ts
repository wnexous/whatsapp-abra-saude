import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuSegmento } from "..";
import { menuSegmentoMenu } from "./segmento-menu";
export default function ConfirmarNomeConveniado(props: NexusPropsMenuInterface): NexusReturnMenuInterface {

    const segmento = props.hooks.dataManager.getData({ token: "segmento" })

    if (!segmento) {
        props.hooks.changeMenuByPath({ menuPath: "/segmento" })
        return [
            ...menuSegmento()
        ]

    }
    switch (props.message.body) {
        case "1":
            props.hooks.changeMenuByPath({ menuPath: props.menu.currentMenu.path + "/segmento-menu" })
            return [
                { type: "message", content: "Nome confirmado com sucesso. 😀" },
                { type: "message", content: menuSegmentoMenu }

            ]
        case "2":
            props.hooks.changeMenuByPath({ menuPath: "/segmento" })
            return [
                ...menuSegmento()
            ]

        default:
            return [
                { type: "message", content: opcaoIncorreta() },
                { type: "message", content: "por favor, insira apenas o número da opção desejada. 🔢" },
                { type: "message", content: menuConfirmarNomeConvenio(segmento.data.toString()), messageDelay: 1000 }
            ]
    }

}


export const menuConfirmarNomeConvenio = (username: string) => `
🔍 CONFIRMAR SEU SEGMENTO DE ATUAÇÃO 📝✨

Entendemos que seu segmento de atuação é:
*${username}*

Por favor, confirme se os detalhes estão corretos:

1 - Está correto ✅
2 - Quero corrigir o segmento de atuação ❌

Estamos aqui para garantir que suas informações sejam precisas. Selecione a opção desejada ou escolha outras alternativas disponíveis. 🤝🌟
`

const opcaoIncorreta = () => `
🛑 Opção Incorreta 🚫

Parece que houve um equívoco na seleção. Por favor, insira o número correspondente à opção desejada do menu para continuarmos. Sua escolha nos ajuda a fornecer o serviço adequado de maneira eficaz. Aguardamos a sua resposta para prosseguir. Obrigado! 🤝🔢🌟
`