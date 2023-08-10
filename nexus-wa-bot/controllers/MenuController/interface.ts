export interface builtMenuInterface {
    name: string
    path: string,
    functionsFile: {
        default?: Function
    },
    hasDefaultFunction: boolean,
    id: string
}

export type menuMappingCallbackStupInterface = (menus: builtMenuInterface[]) => void
