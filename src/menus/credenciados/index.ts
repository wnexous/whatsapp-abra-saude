import { NexusArrowFunct } from "nexus-wa/global/interfaces/messageController";
import { menuIndex } from "..";

const Credenciado: NexusArrowFunct = (props) => {

    switch (props.message.body) {
        case "1":
            return [
                {
                    type: "message", content: sendWhatsappMessage()
                }
            ]
        case "2":
            return [
                {
                    type: "message", content: outrasAtualizacoes()
                }
            ]
        case "3":
            return [
                {
                    type: "message", content: outrasAtualizacoes()
                }
            ]
        case "4":
            props.hooks.changeMenuByPath({ menuPath: "/" })
            return [
                {
                    type: "message", content: menuIndex()
                }
            ]

        default:
            break;
    }


    return [
        { type: "message", content: menuCredenciado() }
    ]
}


export const menuCredenciado = () => `
🌟 MENU PARA CREDENCIADOS 📋✨

Bem-vindo ao menu exclusivo para nossos parceiros credenciados. Aqui estão as opções disponíveis:

1 - 📢 Divulgação aos Conveniados
2 - 📝 Atualizar Dados Cadastrais
3 - 💲 Atualizar Valores e Procedimentos
4 - 🏠 Retornar ao menu principal

Por favor, selecione o número correspondente à ação que deseja realizar. Estamos aqui para garantir que sua experiência conosco seja eficaz e satisfatória. 🤝🔗🌼
`


export default Credenciado

const sendWhatsappMessage = () => {
    // props: { username: string, segmento: string, enterprise: string }
    // const buildMessage = `Olá, sou ${props.username}, representando a ${props.enterprise}, com atuação no segmento de ${props.segmento}.`
    return `
🌟 CONTATE NOSSOS ATENDENTES 📞✨

Estamos aqui para ajudar e responder a todas as suas perguntas. Para entrar em contato direto com um de nossos atendentes, clique no link abaixo:

👉 https://wa.me/554198515324 👈

Sinta-se à vontade para compartilhar suas dúvidas, preocupações ou informações que necessita. Nossa equipe está pronta para lhe oferecer assistência personalizada e resolver suas questões da melhor forma possível. Não hesite em nos contatar! ☎️🤝🌼
`
}

const outrasAtualizacoes = () => `
🌟 ATUALIZAÇÕES 🔄✨

Mantenha-se sempre atualizado e informado. Aqui está a opção para realizar atualizações:

Para atualizar informações, visite:
👉 https://abrasaude.com.br/ 👈

Fique à vontade para usar o link acima para acessar todas as atualizações relevantes. Estamos comprometidos em manter você informado e atualizado. 📰🔖🌻
`