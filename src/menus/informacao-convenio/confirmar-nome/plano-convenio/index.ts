import { NexusBuildMultiMessage, NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuIndex } from "../../..";

export default function PlanoConvenio(props: NexusPropsMenuInterface): NexusReturnMenuInterface {



    switch (props.message.body) {
        case "1":
            return [{ type: "message", content: "Ficamos muito felizes que tenha interesse no plano 😊" }]

        case "2":
            return [{ type: "message", content: "Beleza, vamos direcionar você para um de nossos atendentes 📞" }]

        case "3":
            return [{ type: "message", content: "📌 Nossa localização atual é: '...'" }]

        case "4":
            return [{ type: "message", content: menuPlanoConvenio1() }]

        case "5":
            props.hooks.changeMenuByPath({ menuPath: "/" })
            return [{ type: "message", content: menuIndex() }]

        default:
            return [
                { type: "message", content: opcaoIncorreta() },
                { type: "message", content: menuPlanoOpcoes(), messageDelay: 2000 },
            ]
    }


}

const menuPlanoConvenio1 = () => `
*ABRA-SAÚDE CONVÊNIO*

*Plano Gold* 🏆

Pelo ABRA-Saúde, os usuários têm atendimento em todos os procedimentos da área da saúde: consultas, exames, cirurgias, internamentos, atendimento 24h e emergenciais. 🔬👨🏽‍⚕️👩🏼‍⚕️🏥 Os usuários pagam, porém, um valor mais acessível sempre! O atendimento é como se fosse particular, (melhor que planos de saúde).

Quando precisarem utilizar, os usuários escolhem em qual local desejam ser atendidos 🏥(mais de 2000 médicos cadastrados, os melhores), telefonam ou mandam mensagens diretamente para os locais conveniados, agendam, dirigem-se com a carteirinha 💳, um documento de identificação com foto, e efetuam o pagamento no local credenciado no momento do atendimento.

Não é necessário passar em nossa sede para autorização ou pagamento.

📣 Além disso, existem os locais de pronto atendimento emergencial 24 horas. Assim, caso precise de atendimento durante a noite, madrugada ou final de semana, você terá a comodidade e o acolhimento dos melhores atendimentos.
`
const menuPlanoConvenio2: NexusBuildMultiMessage = () => (
    [
        { type: "message", content: "Assim que esteja feito o cadastro, abrirá o link para pagamento, ou, caso prefira, o financeiro encaminhará o link referente à anuidade do convênio. " },
        { type: "message", content: "Estando pago,  os usuários recebem as carteirinhas e o guia informativo primeiramente digitalizados pelo whatsapp, já para apresenta-la em seu celular, para utilização, sem carência por enquanto." },
        { type: "message", content: "Em alguns dias os receberá através do correio fisicamente no endereço informado." },

    ]
)

const menuPlanoOpcoes = () => `
🌟 MENU DE OPÇÕES 🌟

*1* - 👉 Tenho interesse no plano 😍
*2* - 👤 Falar Agora com um Atendente
*3* - 📍 Encontrar Nossa Localização
*4* - 👁️‍🗨️ Reever lista de planos
*5* - 🏠 Retornar para o menu principal.

Nossos planos foram criados pensando em você, proporcionando cuidado excepcional a preços acessíveis. 🌈🌼 Dê o primeiro passo rumo a uma saúde plena!

Digite o número correspondente à opção desejada ou explore outras alternativas. Estamos aqui para tornar sua experiência incrível. ✨🌻
`

export const menuPlanoConveio = (): NexusReturnMenuInterface => [
    { type: "message", content: menuPlanoConvenio1() },
    ...menuPlanoConvenio2(),
    { type: "message", content: menuPlanoOpcoes() },
]

const opcaoIncorreta = () => `
🛑 Opção Incorreta 🚫

Parece que houve um equívoco na seleção. Por favor, insira o número correspondente à opção desejada do menu para continuarmos. Sua escolha nos ajuda a fornecer o serviço adequado de maneira eficaz. Aguardamos a sua resposta para prosseguir. Obrigado! 🤝🔢🌟
`