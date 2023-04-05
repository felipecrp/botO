
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

export class Message {
    id: string;
    from: User;
    in: Channel;
    content: string;
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



