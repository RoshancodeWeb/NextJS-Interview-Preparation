export type ChatUser = {
    id: string,
    name: string
}

export type Message = {
    _id: string,
    /** id of the sender — matches a ChatUser.id, or your own id */
    from: string,
    /** id of the recipient. Direct messages only, no rooms yet. */
    to: string,
    text: string,
    createdAt: string
}

/** Messages grouped by the id of the person you are talking to. */
export type Conversations = Record<string, Message[]>
