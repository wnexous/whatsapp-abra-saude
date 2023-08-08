import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import DatabaseApi from "src/adapter/DatabaseAdapter";
import WhatsappAdapter from "src/adapter/WhatsappAdapter";

export interface userManagerContructorInterface {
    whatsappAdapter: WhatsappAdapter,
    databaseAdapter: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
}