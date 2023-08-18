import { NexusArrowFunct } from "nexus-wa/global/interfaces/messageController";
import { menuIndex } from "../../../../../";

const SegmentoMenu: NexusArrowFunct = (props) => {

    const enterprise = props.hooks.dataManager.getData({ token: "enterprise" })
    const segmento = props.hooks.dataManager.getData({ token: "segmento" })
    const username = props.hooks.dataManager.getData({ token: "username" })


    switch (props.message.body) {
        case "1":
            return [
                { type: "message", content: credenPeloSite },
            ]
        case "2":
            return [
                { type: "message", content: "Entre em contato conosco por:" },
                {
                    type: "message", content: sendWhatsappMessage({

                        enterprise: typeof enterprise?.data == "string" ? enterprise?.data : "nao definido",
                        segmento: typeof segmento?.data == "string" ? segmento?.data : "nao definido",
                        username: typeof username?.data == "string" ? username?.data : "nao definido"

                    }), messageDelay: 1000
                }
            ]
        case "3":
            props.hooks.changeMenuByPath({ menuPath: "/" })
            return [
                { type: "message", content: menuIndex(), messageDelay: 1000 }
            ]

        default:
            break;
    }
    return [

        { type: "message", content: menuSegmentoMenu }
    ]
}

export default SegmentoMenu

export const menuSegmentoMenu = `
🌟 ATENDIMENTO AOS CONVENIADOS 🏥✨

Estamos aqui para atender suas necessidades de maneira eficiente. Por favor, escolha uma das opções abaixo digitando o número correspondente:

*1* - 📝 Realizar Credenciamento
*2* - 🙋‍♂️ Falar com um Atendente
*3* - 🏠 Retornar para o menu principal

Sua comodidade e experiência são importantes para nós. Selecione a opção desejada para prosseguir ou explore outras alternativas disponíveis. 🤝📋🌻
`

const credenPeloSite = `
📋 CREDENCIAMENTO: TORNE-SE PARCEIRO 🌟

Desbrave novas possibilidades ao se tornar nosso parceiro! Realize o processo de credenciamento conosco e junte-se à nossa rede de cuidados de saúde excepcionais. 🏥🌈

Visite nosso site para dar o primeiro passo:
👉 https://www.abrasaude.com.br/credenciamento.php 👈

Estamos ansiosos para recebê-lo em nossa família e trabalhar juntos para um futuro mais saudável e promissor. 🤝💼✨
`

const sendWhatsappMessage = (props: { username: string, segmento: string, enterprise: string }) => {


    const buildMessage = `Olá, sou ${props.username}, representando a ${props.enterprise}, com atuação no segmento de ${props.segmento}.`
    return `
🌟 CONTATE NOSSOS ATENDENTES 📞✨

Estamos aqui para ajudar e responder a todas as suas perguntas. Para entrar em contato direto com um de nossos atendentes, clique no link abaixo:

👉 https://wa.me/554198515324?text=${encodeURI(buildMessage)} 👈

Sinta-se à vontade para compartilhar suas dúvidas, preocupações ou informações que necessita. Nossa equipe está pronta para lhe oferecer assistência personalizada e resolver suas questões da melhor forma possível. Não hesite em nos contatar! ☎️🤝🌼
`
}