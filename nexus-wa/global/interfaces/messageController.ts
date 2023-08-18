import { menuPropsInterface, menuReturnInterface } from "nexus-wa/controllers/MessageManager/interface";

export type NexusReturnMenuInterface = menuReturnInterface[]
export type NexusBuildMultiMessage = () => menuReturnInterface[]
export type NexusPropsMenuInterface = menuPropsInterface

export type NexusArrowFunct = (props: NexusPropsMenuInterface) => NexusReturnMenuInterface