import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuCredenciamento } from "..";
import { menuSegmento } from "./segmento";

export default function ConfirmarNomeCredenciamento(props: NexusPropsMenuInterface): NexusReturnMenuInterface {

    const enterprise = props.hooks.dataManager.getData({ token: "enterprise" })

    if (!enterprise) {
        props.hooks.changeMenuByPath({ menuPath: "/conveniado" })
        return [
            ...menuCredenciamento()
        ]

    }
    switch (props.message.body) {
        case "1":
            props.hooks.changeMenuByPath({ menuPath: props.menu.currentMenu.path + "/segmento" })
            return [
                { type: "message", content: "Nome confirmado com sucesso. 😀" },
                ...menuSegmento()

            ]
        case "2":
            props.hooks.changeMenuByPath({ menuPath: "/credenciamento" })
            return [
                ...menuCredenciamento()
            ]

        default:
            return [
                { type: "message", content: opcaoIncorreta() },
                { type: "message", content: "por favor, insira apenas o número da opção desejada. 🔢" },
                { type: "message", content: menuConfirmarNomeCredenciamento(enterprise.data.toString()), messageDelay: 1000 }
            ]
    }

}


export const menuConfirmarNomeCredenciamento = (username: string) => `
🔍 CONFIRMAR SUA EMPRESA 📝✨

Entendemos que o nome da sua empresa é:
*${username}*

Por favor, confirme se os detalhes estão corretos:

1 - Está correto ✅
2 - Quero corrigir o nome da empresa ❌

Estamos aqui para garantir que suas informações sejam precisas. Selecione a opção desejada ou escolha outras alternativas disponíveis. 🤝🌟
`

const opcaoIncorreta = () => `
🛑 Opção Incorreta 🚫

Parece que houve um equívoco na seleção. Por favor, insira o número correspondente à opção desejada do menu para continuarmos. Sua escolha nos ajuda a fornecer o serviço adequado de maneira eficaz. Aguardamos a sua resposta para prosseguir. Obrigado! 🤝🔢🌟
`