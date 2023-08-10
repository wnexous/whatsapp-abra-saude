import { DataControllerFileInterface } from "./interface";

export default class DataController {

    private dataFile: DataControllerFileInterface[] = []

    constructor() {
        console.log("[controller] starting DataController");
    }

    setData(args: { phoneId: string, token: string, data: object | string }) {

        // verificar se a data ja existe
        const searchData = this.dataFile.find(d => d.token == args.token && d.phoneId == args.phoneId)

        // se caso existir, deleta da lista
        if (searchData) this.deleteData({ phoneId: args.phoneId, token: args.token })

        // adiciona o item na lista 

        this.dataFile.push({
            ...args
        })

    }

    deleteData(args: { phoneId: string, token: string }) {
        this.dataFile = this.dataFile.filter(f => f.phoneId == args.phoneId && f.token == args.token)
    }

    getData(args: { phoneId: string, token: string }) {
        return this.dataFile.find(g => g.phoneId == args.phoneId && g.token == args.token)
    }

    getTokenList(args: { phoneId: string }) {
        const filterByPhone = this.dataFile.filter(l => l.phoneId == args.phoneId)
        const tokenObjToArray = filterByPhone.map(t => t.token)

        return tokenObjToArray
    }
}