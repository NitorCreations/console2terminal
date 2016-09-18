#!/usr/bin/env node

'use strict';

var ws = require("nodejs-websocket");
var console = require("better-console");
var stringifyObject = require("stringify-object");

var conf = {inlineCharacterLimit: 1000000000};

ws.createServer(function (conn) {
  conn.on("text", function (msg) {
    msg = JSON.parse(msg);
    var str = stringifyObject(msg.args, conf);
    str = str.substring(1, str.length - 1);
    console[msg.level].call(console, str);
  });
  conn.on("close", function (code, reason) {
    console.log("---------------------------------");
  });
}).listen(19375)
