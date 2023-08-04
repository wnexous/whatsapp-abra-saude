/**
 *
 * Deploy Whatsapp
 *
 */

import WhatsappApi from "../adapter/whatsapp_api";


// deploy whatsapp
export default function DeployAdapters() {
  console.log("starting deployment controller");
  const whatsapp = new WhatsappApi();

  whatsapp.onReady(() => console.log("Whatsapp iniciado com sucesso"));
  whatsapp.onMessage((msg) =>
    whatsapp.sendMessageByAuthor({ chatId: msg.from, msg: msg.body })
  );
}
