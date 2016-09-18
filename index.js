#!/usr/bin/env node

'use strict';

var ws = require("nodejs-websocket");
var console = require("better-console");

ws.createServer(function (conn) {
  conn.on("text", function (msg) {
    msg = JSON.parse(msg);
    console[msg.level].apply(console, msg.args);
  });
  conn.on("close", function (code, reason) {
    console.log("---------------------------------");
  });
}).listen(19375)
