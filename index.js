#!/usr/bin/env node

'use strict';

var ws = require("nodejs-websocket");
var console = require("better-console");
var stringifyObject = require("stringify-object");

var conf = {inlineCharacterLimit: 1000000000};

ws.createServer(function (conn) {
  conn.on("text", function (msg) {
    msg = JSON.parse(msg);
    if(!console[msg.level]) console.error(msg)
    else console[msg.level].apply(console, msg.args.map(function(arg){return stringifyObject(arg, conf)}));
  });
  conn.on("close", function (code, reason) {
    console.log("---------------------------------");
  });
}).listen(19375)
