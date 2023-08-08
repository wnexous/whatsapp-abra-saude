import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import DatabaseApi from "nexus-wa/adapter/DatabaseAdapter";
import WhatsappAdapter from "nexus-wa/adapter/WhatsappAdapter";

export interface userManagerContructorInterface {
    whatsappAdapter: WhatsappAdapter,
    databaseAdapter: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}