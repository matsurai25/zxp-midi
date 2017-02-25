/**
 * Korg Nano
 * https://github.com/davidguttman/korg-nano
 * author: davidguttman
 * License: MIT
 *
 * 2017/02/25 change mapping for nanoKONTROL2 (by matsurai25)
 */

var midi = require('midi')
var Emitter = require('wildemitter')

module.exports = Korg

function Korg () {
  this.scene = 1

  this.input = this.createInput()

  this.input.on('message', this.handleMessage.bind(this))

  Emitter.call(this)
  return this
}

Korg.prototype = new Emitter

Korg.prototype.handleMessage = function(delta, raw) {
  var msg = this.parseMessage(raw)

  if (msg.scene) {
    this.scene = msg.scene
    return this.emit('scene', msg.scene)
  }

  if (msg.control >= 0 && msg.control <= 7) {
    n = msg.control + 1
    return this.emit('slider:'+n, msg.value)
  }

  if (msg.control >= 16 && msg.control <= 23) {
    n = msg.control - 15
    return this.emit('knob:'+n, msg.value)
  }

  if (msg.control >= 32 && msg.control <= 39) {
    n = msg.control - 31
    return this.emit('button:'+n+'-s', msg.value)
  }

  if (msg.control >= 48 && msg.control <= 55) {
    n = msg.control - 47
    return this.emit('button:'+n+'-m', msg.value)
  }

  if (msg.control >= 64 && msg.control <= 71) {
    n = msg.control - 63
    return this.emit('button:'+n+'-r', msg.value)
  }

  if (msg.control === 58) {
    return this.emit('button:track-prev', msg.value)
  }

  if (msg.control === 59) {
    return this.emit('button:track-next', msg.value)
  }

  if (msg.control === 46) {
    return this.emit('button:cycle', msg.value)
  }

  if (msg.control === 60) {
    return this.emit('button:marker-set', msg.value)
  }

  if (msg.control === 61) {
    return this.emit('button:marker-prev', msg.value)
  }

  if (msg.control === 62) {
    return this.emit('button:marker-next', msg.value)
  }

  if (msg.control === 43) {
    return this.emit('button:back', msg.value)
  }

  if (msg.control === 44) {
    return this.emit('button:forward', msg.value)
  }

  if (msg.control === 42) {
    return this.emit('button:stop', msg.value)
  }

  if (msg.control === 41) {
    return this.emit('button:play', msg.value)
  }

  if (msg.control === 45) {
    return this.emit('button:record', msg.value)
  }

}

Korg.prototype.parseMessage = function(raw) {
  if (raw[0] === 240) {
    var message = {
      scene: raw[9] + 1
    }
  } else {
    var message = {
      control: raw[1],
      value: raw[2]/127
    }
  }

  return message
}

Korg.prototype.createInput = function() {
  var input = new midi.input()

  var portCount = input.getPortCount()
  for (var i = 0; i <= portCount; i++) {
    var name = input.getPortName(i)
    if (name.match(/nanoKONTROL/)) {
      input.openPort(i)
      break
    }
  }

  input.ignoreTypes(false, false, false)

  return input
}

Korg.prototype.close = function() {
  this.input.closePort()
};
