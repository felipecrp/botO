import { describe, expect, test, it } from '@jest/globals';
import { EventHandler, EventRegistry } from "./listener";
import { Message } from './message';


describe('Messages to #general', () => {
  const messages = [
    new Message('1', {from: 'ana', to: '#general', content: 'hello everybody!'}),
    new Message('2', {from: 'bob', to: '#general', content: 'hello!'}),
    new Message('3', {from: 'ana', to: '#general', content: ':)'})
  ];

  describe('A event registry from ana', () => {
    const eventHandler = new EventHandler();
    const on = new EventRegistry(eventHandler);  
    on.message({
        from: 'ana'
    }).do((message) => 1);

    it('Catch ana messages', () => {
      for (const message of messages) {
        const match = eventHandler.process(message);
        if (message.content.from == 'ana') {
          expect(match).toBe(true);
        }
      }
    });

    it('Don\'t catch bob messages', () => {  
      for (const message of messages) {
        const match = eventHandler.process(message);
        if (message.content.from == 'bob') {
          expect(match).toBe(false);
        }
      }
    });
  });

  describe('A event registry for message starting with hello', () => {
    const eventHandler = new EventHandler();
    const on = new EventRegistry(eventHandler);  
    on.message({
        content: '^hello'
    }).do((message) => 1);

    it('Catch first ana messages', () => {
      expect(eventHandler.process(messages[0])).toBe(true);
      expect(eventHandler.process(messages[2])).toBe(false);
    });

    it('Catch bob message', () => {  
      expect(eventHandler.process(messages[1])).toBe(true);
    });
  });

});
