
class User {
    id: string;
    name: string;
}

class Channel {
    id: string;
    name: string;
}

class PrivateChannel extends Channel {
}

type MessageContent = {
    from: string,
    to: string,
    content: string
}

export class Message {
    id: string;
    content: MessageContent;
    constructor(id: string, content: MessageContent) {
        this.id = id;
        this.content = content;
    }
}


/*
on.message()
  .from()
  .in()

export default function(on) {
    on.message().from().in().do()
    on.message().from().inPrivate().do()
    on.command('^!', parser).from().in().do()
    on.time('* * * * 3').do()
    on.event(join|part).do()
}

listener {
    regexp
        in
        from
        message
        
}
*/



