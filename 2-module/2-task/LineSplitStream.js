const stream = require('stream');
const {EOL} = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this._encoding = options.encoding 
    this._data = '';
  }

  _transform(chunk, encoding, callback) {
    this._data += chunk.toString(this._encoding);
    callback();
  }

  _flush(callback) {
    this._data.split(EOL).forEach((el) => this.push(el));
    callback();
  }
}

module.exports = LineSplitStream;
