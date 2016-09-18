In client, do either:

    require("console2terminal");

or in ES6:

    import "console2terminal";

After this all console log messages will also be sent to any listening server.

To run the server, run:

    node_modules/.bin/console2terminal

or in Windows:

    node_modules\.bin\console2terminal

The server will output all the messages on stdout.
