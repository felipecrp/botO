import { EventRegister } from "./listener";


function hello(on: EventRegister) {

    on.message({
        from: 'x', 
        to: 'y', 
        content: 'content'
    }).do(message => console.log('hello!'));

}
