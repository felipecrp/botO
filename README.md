# botO

A open-source chat bot for operations.

## How does botO works?

EventRegistry register regular expressions to match:

  - _from_ users
  - _to_ channel
  - _with_ content

The _from_, _to_, and _with_ are optionals. E.g., if only the _from_ was provided, the EventRegistry will match all message from that specific user. The EventRegistry also support arrays of regexp, which enable to match many different messages.

Private messages use an special _private channel_.

The EventRegistry also register an action, which is callback that will be triggered once the regular expressions match.

Under the hood, botO will create listener to dispatch the actions.
