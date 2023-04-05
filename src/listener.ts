import { Message } from "./message";

type Matcher = {
    from: string|string[]|undefined,
    to: string|string[]|undefined,
    content: string|string[]|undefined
}

export class EventRegister {
    messagelisteners: Listener[];
    
    message(matcher: Matcher) {
        let listener = new Listener(matcher);
        this.messagelisteners.push(listener);        
        return new ActionRegister(listener);
    }
}

type ActionCallback = (message: Message) => void;
export class ActionRegister {
    listener: Listener;

    constructor(listener: Listener) {
        this.listener = listener;
    }

    do(action: ActionCallback): void {
        this.listener.action = action;
    }
}

class Listener {
    action: ActionCallback;
    matcher: Matcher;

    constructor(matcher: Matcher) {
        this.matcher = matcher;
    }

    match(message: Message): boolean {
        return true;
    }
}

class ListenerProcessor {
    listeners: Listener[];

    process(message: Message): void {
        this.listeners
            .filter(listener => listener.match(message))
            .forEach(listener => listener.action(message))
    }
}