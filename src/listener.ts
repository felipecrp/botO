import { Message } from "./message";

type Matcher = {
    from?: string|string[],
    to?: string|string[],
    content?: string|string[]
}

export class EventRegistry {
    protected eventHandler: EventHandler;
    
    constructor(eventHandler: EventHandler) {
        this.eventHandler = eventHandler; 
    }

    message(matcher: Matcher) {
        let listener = new Listener(matcher);
        this.eventHandler.register(listener)        
        return new ActionRegister(listener);
    }
}

type ActionCallback = (message: Message) => void;
export class ActionRegister {
    protected listener: Listener;

    constructor(listener: Listener) {
        this.listener = listener;
    }

    do(action: ActionCallback): void {
        this.listener.action = action;
    }
}

export class Listener {
    action: ActionCallback;
    matcher: Matcher;

    constructor(matcher: Matcher) {
        this.matcher = matcher;
    }

    match(message: Message): boolean {
        if (!this.matchMessageField(message.content.from, this.matcher.from)) {
            return false;
        }
        if (!this.matchMessageField(message.content.to, this.matcher.to)) {
            return false;
        }
        if (!this.matchMessageField(message.content.content, this.matcher.content)) {
            return false;
        }
        return true;
    }

    protected matchMessageField(value: string, regexp: string|string[]|undefined): boolean {
        if(regexp === undefined) {
            return true;
        }
        
        if (!Array.isArray(regexp)) {
            regexp = [regexp];
        }

        for (let r of regexp) {
            let rxp = new RegExp(r);
            let match = rxp.test(value);
            if (match) {
                return true;
            }
        }

        return false;
    }
}

export class EventHandler {
    listeners: Listener[] = [];

    register(listener: Listener) {
        this.listeners.push(listener);
    }

    process(message: Message): boolean {
        let matchedListeners = this.listeners
            .filter(listener => listener.match(message))
        
        if (matchedListeners.length == 0) {
            return false;
        }

        matchedListeners.forEach(listener => listener.action(message))
        return true;
    }
}