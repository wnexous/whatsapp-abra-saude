import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";
import MenuController from "../MenuController";
import { builtMenuInterface } from "../MenuController/interface";

export interface userManagerContructorInterface {
    menuController: builtMenuInterface[]
    databaseAdapter: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}