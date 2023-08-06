import fs from "fs"

export default class MenuMapping {
    menuPath: string
    constructor() {
        this.menuPath = "../../menus/"
        this.deploy()
    }

    async deploy() {
        // const lib = await import(this.menuPath)
        // lib.default()

        console.log("Iniciando mapeamento de menus");
        const pathname = __dirname + "/../../menus/"
        console.log('pathname', pathname)

        let readMenuFolder = fs.readdirSync(pathname, {
            recursive: true
        })

        // tranform read buffer to string array
        readMenuFolder = readMenuFolder.map((r) => `${r}`)

        const mapDirOnObj = []

        for (let row of readMenuFolder) {

            const stringSplited = row.split("\\")
            console.log("stringSplited[stringSplited.length - 1]", stringSplited[stringSplited.length - 1]);
            if (stringSplited[stringSplited.length - 1] == "index.js") {
                // console.log('row', row)

                const functionPath = stringSplited.slice(0, stringSplited.length - 1)
                const functionPathWithBar = functionPath.join("/")
                const functionFetched = await import("../../menus/" + functionPathWithBar + "/index.js")
                const menuBuilted = {
                    name: functionPath[functionPath.length - 1] || "_default",
                    path: functionPathWithBar,
                    function: functionFetched.default,
                    functionName: functionFetched.default.name,
                    hasFunction: !!functionFetched.default.name
                }

                console.log("menuBuilted", menuBuilted);
                mapDirOnObj.push(menuBuilted)
            }







            // stringSplited.forEach((file, index) => {

            //     // const splitFileByDot = file.split(".")

            //     // // verify if not exist a extension on file and verify if splitedfiledot is not a array object 
            //     // if (!(splitFileByDot[splitFileByDot.length - 1].length > 0 || typeof splitFileByDot == "object")) {
            //     //     mapDirOnObj[splitFileByDot]
            //     // }

            //     // // case find a extension
            //     // else {

            //     // }


            // })
        }

        console.log('mapDirOnObj', mapDirOnObj)



    }


}


