'use strict';

var origConsole = window.console;

var connected = false;
var queue = [];

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
  });
  if (connected) {
    socket.send(msg);
  } else {
    queue.push(msg);
  }
}

const console = {
  log:   function () { origConsole.log  .apply(origConsole, arguments); send("log",   arguments); },
  error: function () { origConsole.error.apply(origConsole, arguments); send("error", arguments); },
  warn:  function () { origConsole.warn. apply(origConsole, arguments); send("warn",  arguments); },
  info:  function () { origConsole.info .apply(origConsole, arguments); send("info",  arguments); },
  debug: function () { origConsole.debug.apply(origConsole, arguments); send("debug", arguments); },
  trace: function () { origConsole.trace.apply(origConsole, arguments); send("trace", arguments); }
};

module.exports = window.console = console;
