import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuInformacaoConvenio } from "..";
import { menuPlanoConveio } from "./plano-convenio";

export default function ConfirmarNomeConveniado(props: NexusPropsMenuInterface): NexusReturnMenuInterface {

    const username = props.hooks.dataManager.getData({ token: "username" })

    if (!username) {
        props.hooks.changeMenuByPath({ menuPath: "/informacao-convenio" })
        return [
            ...menuInformacaoConvenio()
        ]
    }

    switch (props.message.body) {
        case "1":

            props.hooks.changeMenuByPath({ menuPath: props.menu.currentMenu.path + "/plano-convenio" })
            return [
                { type: "message", content: "Nome confirmado com sucesso. 😀" },
                ...menuPlanoConveio()

            ]
        case "2":
            props.hooks.changeMenuByPath({ menuPath: "/informacao-convenio" })
            return [
                ...menuInformacaoConvenio()
            ]

        default:

            return [
                { type: "message", content: opcaoIncorreta() },
                { type: "message", content: "por favor, insira apenas o número da opção desejada. 🔢" },
                { type: "message", content: menuConfirmarNomeConvenio(username.data.toString()), messageDelay: 1000 }
            ]
    }

}


export const menuConfirmarNomeConvenio = (username: string) => `
🔍 CONFIRMAR SEU NOME 📝✨

Entendemos que o nome registrado é:
*${username}*

Por favor, confirme se os detalhes estão corretos:

1 - Está correto ✅
2 - Quero corrigir meu nome ❌

Estamos aqui para garantir que suas informações sejam precisas. Selecione a opção desejada ou escolha outras alternativas disponíveis. 🤝🌟
`

const opcaoIncorreta = () => `
🛑 Opção Incorreta 🚫

Parece que houve um equívoco na seleção. Por favor, insira o número correspondente à opção desejada do menu para continuarmos. Sua escolha nos ajuda a fornecer o serviço adequado de maneira eficaz. Aguardamos a sua resposta para prosseguir. Obrigado! 🤝🔢🌟
`