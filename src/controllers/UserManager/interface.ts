import DatabaseApi from "src/adapter/DatabaseAdapter";
import WhatsappAdapter from "src/adapter/WhatsappAdapter";

export interface userManagerContructorInterface {
    whatsappAdapter: WhatsappAdapter,
    databaseAdapter: DatabaseApi
}