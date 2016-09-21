export function setProto(target, descriptor) {
  target.prototype = descriptor;
  Object.defineProperty(target.prototype, 'constructor', {
    enumerable: false,
    value: target
  })
}