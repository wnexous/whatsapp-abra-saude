import express, { Express } from "express";
import { configWebApi } from "./config";


export default class WebApi {
  app: Express
  constructor() {
    this.app = express()

    this.setup()
  }

  setup() {
    this.app.listen(configWebApi.port, () => {
      console.log("WebApi ouvindo na porta: " + configWebApi.port);
    })
  }


}