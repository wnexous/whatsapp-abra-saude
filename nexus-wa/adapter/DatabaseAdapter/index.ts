import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class DatabaseAdapter {
  protected database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  constructor() {
    this.database = new PrismaClient();
  }
}
