import express, { Express } from "express";
import { configWebApi } from "./config";
import { menuApiCallbackSetupInterface } from "./interface";


export default class WebApi {
  app: Express
  constructor() {
    this.app = express()

    this.setup()
  }

  setup(callback?: menuApiCallbackSetupInterface) {
    this.app.listen(configWebApi.port, () => {
      console.log("WebApi ouvindo na porta: " + configWebApi.port);
      callback()
    })
  }


}