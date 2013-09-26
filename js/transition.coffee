# because working with absolute values is a pain in the ass

_ = require('underscore')

changeField = (field, fn) ->
  (input, arg1, arg2, arg3) ->
    input[field] = fn(input[field], arg1, arg2, arg3)
    input

adjustX   = changeField 'x',      (input, diff) -> input + diff
adjustY   = changeField 'y',      (input, diff) -> input + diff
rotate    = changeField 'rotate', (input, diff) -> input + diff
scale     = changeField 'scale',  (input, diff) -> input * diff

moveLeft  = (input, diff) -> adjustX input, -diff
moveUp    = (input, diff) -> adjustY input, -diff
moveRight = adjustX
moveDown  = adjustY

rotateCW  = rotate
rotateCCW = (input, diff) -> rotate input, -diff
flipRight = (input) -> rotate input, 90
flipLeft  = (input) -> rotate input, -90

zoomIn    = scale
zoomOut   = (input, diff) -> scale input, (1 / diff)


module.exports = transform =
  changeField : changeField
  rotateCW    : rotateCW
  rotateCCW   : rotateCCW
  flipRight   : flipRight
  flipLeft    : flipLeft
  moveLeft    : moveLeft
  moveUp      : moveUp
  moveRight   : moveRight
  moveDown    : moveDown
  zoomIn      : zoomIn
  zoomOut     : zoomOut
  adjustX     : adjustX
  adjustY     : adjustY
  rotate      : rotate
  scale       : scale


reduceOps = (chain, op) ->
  name = op[0]
  transform[name] and chain.push (input) ->
    transform[name].call transform, input, op[1], op[2]
  chain

chainOps = (ops) ->
  fns = _(ops).reduce(reduceOps, [])
  _.compose.apply _, fns

module.exports.run = (sKey, tKey, defaults) -> (input, state) ->
  source = input[sKey]
  input[tKey] = chainOps(source)(_.clone(state[tKey] or defaults))
  input
