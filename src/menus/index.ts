import { NexusMenuInterface } from "nexus-wa/global/interfaces/messageController";

export default function handle(props: NexusMenuInterface) {
    console.log("props", props);

    return props.message.body
}
