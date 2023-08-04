import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { whatsappApiInterface } from "src/interface/adapters/whatsappApiInterface";
import { LogtimerWhatsappAdapter } from "../utils/logtimer/adapter/whatsapp_api";

class WhatsappApi {
  whatsapp: Client;
  isReady: boolean = false;

  constructor() {
    console.time(LogtimerWhatsappAdapter.deployApiId);
    this.whatsapp = new Client({
      puppeteer: { args: ["--no-sandbox"] },
      authStrategy: new LocalAuth(),
    });

    this.setup();
  }

  setup() {
    console.log("setuping whatsapp adapter");
    // include qr listener
    this.whatsapp.on("qr", this.renderQrCode);
    this.whatsapp.on("ready", () => {
      this.isReady = true;
      console.timeEnd(LogtimerWhatsappAdapter.deployApiId);
    });
    return this.whatsapp.initialize();
  }

  renderQrCode(qr: string) {
    console.log("generation qrcode...");
    qrcode.generate(qr, { small: true });
  }

  async onReady(callback: () => void) {
    if (this.isReady) callback();
    this.whatsapp.on("ready", () => callback());
  }

  onMessage(callback: (callback: Message) => void) {
    this.whatsapp.on("message", callback);
  }

  sendMessageByAuthor(msg: whatsappApiInterface) {
    return this.whatsapp.sendMessage(msg.chatId, msg.msg);
  }
}

export default WhatsappApi;
