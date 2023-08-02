import { Client } from "whatsapp-web.js";

class WhatsappApi {
  whatsapp: Client;

  constructor() {
    console.log("starting whatsapp adapter");

    this.whatsapp = new Client({
      puppeteer: { args: ["--no-sandbox"] },
    });
  }

  setup() {
    return this.whatsapp.initialize();
  }
}

export default WhatsappApi
