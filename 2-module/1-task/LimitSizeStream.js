const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._limit = options.limit
    this._size = 0

  }

  _transform(chunk, encoding, callback) {

    if ( this._size + chunk.length >= this._limit ) {
      callback(new LimitExceededError, chunk);
    } else {
      callback(null, chunk);
    }

    this._size += chunk.length;

  }
}

module.exports = LimitSizeStream;
