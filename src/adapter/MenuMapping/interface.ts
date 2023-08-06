export interface builtMenuInterface {
    name: string
    path: string,
    functionsFile: Function,
    hasDefaultFunction: boolean,
    id: string
}

export type menuMappingCallbackStupInterface = (menus: builtMenuInterface[]) => void
