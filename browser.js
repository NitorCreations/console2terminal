'use strict';

var common = require("./common");

var origConsole = window.console;

var connected = false;
var queue = [];
var opts = {};

function config(newOpts) {
  opts = newOpts || {};
}

var socket = new WebSocket("ws://localhost:19375/");
socket.onopen = function socketOpen() {
  //origConsole.log("WS connected");
  connected = true;
  queue.forEach(function (msg) { socket.send(msg); });
  queue = undefined;
};

function send(level, args) {
  const msg = JSON.stringify({
    level: level,
    args: Array.prototype.slice.call(args, 0)
  }, function(k,v) {
    return v === undefined ? common.placeholders.undef : v;
  });
  if (connected) {
    socket.send(msg);
  } else {
    queue.push(msg);
  }
}

const console = {
  log:   function () { if (!opts.silentBrowser) origConsole.log  .apply(origConsole, arguments); send("log",   arguments); },
  error: function () { if (!opts.silentBrowser) origConsole.error.apply(origConsole, arguments); send("error", arguments); },
  warn:  function () { if (!opts.silentBrowser) origConsole.warn. apply(origConsole, arguments); send("warn",  arguments); },
  info:  function () { if (!opts.silentBrowser) origConsole.info .apply(origConsole, arguments); send("info",  arguments); },
  debug: function () { if (!opts.silentBrowser) origConsole.debug.apply(origConsole, arguments); send("debug", arguments); },
  trace: function () { if (!opts.silentBrowser) origConsole.trace.apply(origConsole, arguments); send("trace", arguments); }
};

window.console = console;
module.exports = config;
