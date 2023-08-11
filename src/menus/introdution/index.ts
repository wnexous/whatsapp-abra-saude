import { NexusPropsMenuInterface, NexusReturnMenuInterface } from "nexus-wa/global/interfaces/messageController";
import { menuIndex } from "..";

export default function Introduction(props: NexusPropsMenuInterface): NexusReturnMenuInterface {


    switch (props.message.body) {
        case "voltar":
            // caso a mensagem seja "voltar", mudará o menu do ususario e retornara o menu como mensagem
            props.hooks.changeMenuByPath({ menuPath: "/" })
            return [{
                type: "message", content: menuIndex()
            }]

        default:
            break;
    }
    return [{
        type: "message", content: menuIntroduction()
    }]
}

export const menuIntroduction = () => `
*MENU DE INTRODUÇÃO*

o projeto foi criado com a finalidade de facilitar a criação de bots de whatsapp.

a meta é poder desenvolver estruturas complexas de menus de forma facil, intuitiva e de facil manutenção.

o projeto conta com LiveReload ao qual permite editar menus e visualizar as alterações de forma instantânea.

para voltar ao menu principal, digite: *voltar*
`