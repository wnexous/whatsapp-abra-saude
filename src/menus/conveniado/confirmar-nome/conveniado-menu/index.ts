import { NexusArrowFunct } from "nexus-wa/global/interfaces/messageController";
import fs from "fs";
import { menuIndex } from "../../../index";

interface conveniadosInterface {
    renovarConvenio: string
    segundaVia: string
    "alteracaoDadosCadastrais": string
    "inclusaoDependente": string
    "exclusaoDependente": string
    falarComAtendente: string
}
const ConveniadoMenu: NexusArrowFunct = (props) => {
    const conveniados: conveniadosInterface = JSON.parse(
        fs.readFileSync("src/assets/conveniados.json", "utf-8")
    );
    console.log(ConveniadoMenu);
    switch (props.message.body) {
        case "1":
            return [
                {
                    type: "message",
                    content: "estamos preparando o link para renovação do convênio",
                },
                { type: "message", content: conveniados.renovarConvenio },
            ];
        case "2":
            return [
                {
                    type: "message",
                    content: "para a solicitação da segunda via",
                },
                { type: "message", content: conveniados.segundaVia },
            ];
        case "4":
            return [
                {
                    type: "message",
                    content: "Entendi, você poderá realizar a alteração de dados cadastrais através do link",
                },
                {
                    type: "message",
                    content: conveniados.alteracaoDadosCadastrais,
                },
            ];
        case "5":
            return [
                {
                    type: "message",
                    content: "Entendi, você poderá realizar a inclusão de dependente através do link",
                },
                {
                    type: "message",
                    content: conveniados.inclusaoDependente,
                },
            ];
        case "6":
            return [
                {
                    type: "message",
                    content: "Entendi, você poderá realizar a exclusão de dependente através do link",
                },
                {
                    type: "message",
                    content: conveniados.exclusaoDependente,
                },
            ];
        case "7":
            return [
                {
                    type: "message",
                    content: "para falar com um atendente, entre em contato pelo whatsapp ou ligação no telefone:",
                },
                {
                    type: "message",
                    content: conveniados.falarComAtendente,
                },
            ];
        case "8":
            props.hooks.changeMenuByPath({ menuPath: "/" })
            return [
                {
                    type: "message",
                    content: "estamos te retornando ao menu principal",
                },
                {
                    type: "message",
                    content: menuIndex(),
                },
            ];

        default:
            break;
    }

    return [{ type: "message", content: menuConveniado() }];
};

export const menuConveniado = () => `
🌟 MENUS PARA JÁ CONVENIADOS 🌟

Aqui estão as opções disponíveis para você. Escolha o número correspondente à ação que deseja realizar:

*1* - 🔄 Renovar Convênio
*2* - 📇 Solicitar Segunda Via da Carteirinha
*3* - 🗺️ Consultar Rede Credenciada
*4* - 📝 Alterar Dados Cadastrais
*5* - 👨‍👩‍👧‍👦 Incluir Dependente
*6* - 👨‍👩‍👧‍👦 Remover Dependente
*7* - 🙋‍♂️ Falar com um Atendente
*8* - 🏠 Retornar para o menu principal

Digite o número da opção desejada para que possamos lhe proporcionar a assistência necessária. Seu conforto e satisfação são nossa prioridade. 🌈🤝✨
`;

export default ConveniadoMenu;
