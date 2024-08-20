import { Reply } from "./reply";

export class Message {

    id?: number;
    content: string= '';
    sentTime?: string;
    userId?: number;
    userName?: string;
    reply?: Reply;
}