# console2terminal

*Stream browser console logging to terminal using websockets.*

* [on npmjs.com](https://www.npmjs.com/package/console2terminal)

In client, do either:

    require("console2terminal");

or in ES6:

    import "console2terminal";

After this all console log messages will also be sent to a listening server on localhost.

To run the server, run:

    node_modules/.bin/console2terminal

or in Windows:

    node_modules\.bin\console2terminal

For convenience, add the .bin directory to your PATH environment variable and get by with just `console2terminal`.

The server will output all the messages on stdout.

Navigating between/reloading pages will temporarily disconnect the websocket, which is indicated by an extra separator line on stdout like this, which helps to keep track of page loads.

    ---------------------------------

# Configuration

If you want to tune the configuration on the client side:

    var c2t = require("console2terminal");
    c2t({ silentBrowser: true });

or in ES6:

    import c2t from "console2terminal";
    c2t({ silentBrowser: true });

## Configuration options

* `silentBrowser` set to true to omit console log messages in the browser. This can improve performance noticeably.

# License

[Apache-2.0](LICENSE)
