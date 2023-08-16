import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuInformacaoConvenio } from "./informacao-convenio";
import { menuConfirmarNomeConvenio } from "./informacao-convenio/confirmar-nome";
import { menuCredenciamento } from "./credenciamento";

export default function handle(props: NexusPropsMenuInterface): NexusReturnMenuInterface {
    const username = props.hooks.dataManager.getData({ token: "username" })

    switch (props.message.body) {
        case "1":
            if (username) {
                props.hooks.changeMenuByPath({ menuPath: "/informacao-convenio/confirmar-nome" })
                return [
                    { type: "message", content: menuConfirmarNomeConvenio(username.data.toString()) },
                ]
            }
            props.hooks.changeMenuByPath({ menuPath: "/informacao-convenio" })
            return [
                ...menuInformacaoConvenio(),
            ]
        case "2":
            if (username) {
                props.hooks.changeMenuByPath({ menuPath: "/conveniado/confirmar-nome" })
                return [
                    { type: "message", content: menuConfirmarNomeConvenio(username.data.toString()) },
                ]
            }
            props.hooks.changeMenuByPath({ menuPath: "/conveniado" })
            return [
                ...menuInformacaoConvenio(),
            ]
        case "3":
            props.hooks.changeMenuByPath({ menuPath: "/credenciamento" })
            return [
                { type: "message", content: "certo, estamos te direcionando ao credenciamento para atender aos conveniados" },
                ...menuCredenciamento()
            ]

        default:
            return [
                { type: "message", content: menuIndex() },
            ]
    }
}

export const menuIndex = () => `
🌼 BEM-VINDO AO ABRA-SAÚDE 🏥✨

Olá! Esperamos que você esteja bem e saudável. 😊 O convênio Abra-Saúde agradece por entrar em contato conosco.

Por favor, escolha a opção que melhor se adequa às suas necessidades digitando o número correspondente: 🔢

*1* - 🌟 Descubra os Benefícios do Convênio Abra-Saúde
*2* - 🙌 Sou um Conveniado Atual
*3* - 🏥 Tornar-se um Credenciado para Atender Nossos Conveniados
*4* - 🌐 Sou um Credenciado Atual
 
Estamos aqui para fornecer as informações que você procura e garantir que sua experiência conosco seja excepcional. Escolha a opção desejada ou explore outras alternativas. 💬🌻
`