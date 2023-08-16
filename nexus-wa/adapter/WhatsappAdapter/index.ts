import { Buttons, Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { LogtimerWhatsappAdapter } from "../../utils/logtimer/adapter/whatsapp_api";
import { sendMessageByAuthorInterface, whatsappApiCallbackStupInterface, whatsappApionMessage } from "./interface";

export default class {
  whatsapp: Client;
  isReady: boolean = false;

  constructor() {
    console.log("Starting whatsapp Adapter");
    console.time(LogtimerWhatsappAdapter.deployApiId);
    this.whatsapp = new Client({
      puppeteer: { args: ["--no-sandbox"] },
      authStrategy: new LocalAuth(),

    });

  }

  setup(callback?: whatsappApiCallbackStupInterface) {

    this.whatsapp.on("qr", this.renderQrCode);
    this.whatsapp.on("ready", () => {
      this.isReady = true;
      console.timeEnd(LogtimerWhatsappAdapter.deployApiId);
      callback()
    });

    this.whatsapp.initialize();
  }

  renderQrCode(qr: string) {
    console.log("generation qrcode...");
    qrcode.generate(qr, { small: true });
  }

  onMessage(callback: (callback: whatsappApionMessage) => void) {
    this.whatsapp.on("message", msg => callback({
      phoneId: msg.from,
      body: msg.body,
      others: msg
    }));
  }

  sendMessageByAuthor(msg: sendMessageByAuthorInterface) {
    return this.whatsapp.sendMessage(msg.chatId, msg.msg);
  }

}

